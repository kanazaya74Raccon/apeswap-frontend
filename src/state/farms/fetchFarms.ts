import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import multicallABI from 'config/abi/Multicall.json'
import { getMulticallAddress, getMasterChefAddress } from 'utils/addressHelper'
import { getContract } from 'utils/web3'
import masterchefABI from 'config/abi/masterchef.json'
import { farmsConfig } from 'config/constants'

const fetchFarms = async (chainId: number) => {
  const multicallContractAddress = getMulticallAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const masterChefAddress = getMasterChefAddress(chainId)
  const data = await Promise.all(
    farmsConfig.map(async (farmConfig) => {
      const lpAdress = farmConfig.lpAddresses[chainId]
      const calls = [
        // Balance of token in the LP contract
        {
          address: farmConfig.tokenAddresses[chainId],
          name: 'balanceOf',
          params: [lpAdress],
        },
        // Balance of quote token on LP contract
        {
          address: farmConfig.quoteTokenAdresses[chainId],
          name: 'balanceOf',
          params: [lpAdress],
        },
        // Balance of LP tokens in the master chef contract
        {
          address: lpAdress,
          name: 'balanceOf',
          params: [masterChefAddress],
        },
        // Total supply of LP tokens
        {
          address: lpAdress,
          name: 'totalSupply',
        },
        // Token decimals
        {
          address: farmConfig.tokenAddresses[chainId],
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: farmConfig.quoteTokenAdresses[chainId],
          name: 'decimals',
        },
      ]

      const [tokenBalanceLP, quoteTokenBlanceLP, lpTokenBalanceMC, lpTotalSupply, tokenDecimals, quoteTokenDecimals] =
        await multicall(multicallContract, erc20, calls)

      // Ratio in % a LP tokens that are in staking, vs the total number in circulation
      const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

      // Total value in staking in quote token value
      const lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
        .div(new BigNumber(10).pow(18))
        .times(new BigNumber(2))
        .times(lpTokenRatio)

      // Total value in pool in quote token value
      const totalInQuoteToken = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(10).pow(18)).times(new BigNumber(2))

      // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
      const tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
      const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
        .div(new BigNumber(10).pow(quoteTokenDecimals))
        .times(lpTokenRatio)

      let alloc = null
      let multiplier = 'unset'
      try {
        const [info, totalAllocPoint] = await multicall(multicallContract, masterchefABI, [
          {
            address: masterChefAddress,
            name: 'poolInfo',
            params: [farmConfig.pid],
          },
          {
            address: masterChefAddress,
            name: 'totalAllocPoint',
          },
        ])
        const allocPoint = new BigNumber(info.allocPoint._hex)
        const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
        alloc = poolWeight.toJSON()
        multiplier = `${allocPoint.div(100).toString()}X`
        // eslint-disable-next-line no-empty
      } catch (error) {
        console.warn('Error fetching farm', error, farmConfig)
      }

      return {
        ...farmConfig,
        tokenAmount: tokenAmount.toJSON(),
        quoteTokenAmount: quoteTokenAmount.toJSON(),
        totalInQuoteToken: totalInQuoteToken.toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        tokenPriceVsQuote: quoteTokenAmount.div(tokenAmount).toJSON(),
        poolWeight: alloc,
        multiplier,
      }
    }),
  )
  return data
}

export default fetchFarms
