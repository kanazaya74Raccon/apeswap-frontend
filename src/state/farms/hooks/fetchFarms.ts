import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { useMasterChefAddress, useMulticallAddress } from 'hooks/useAddress'
import masterchefABI from 'config/abi/masterchef.json'
import { farmsConfig } from 'config/constants'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const useFetchFarms = async () => {
  const multicallAddress = useMulticallAddress()
  const masterChefAddress = useMasterChefAddress()
  const data = await Promise.all(
    farmsConfig.map(async (farmConfig) => {
      const lpAdress = farmConfig.lpAddresses[CHAIN_ID]
      const calls = [
        // Balance of token in the LP contract
        {
          address: farmConfig.tokenAddresses[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAdress],
        },
        // Balance of quote token on LP contract
        {
          address: farmConfig.quoteTokenAdresses[CHAIN_ID],
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
          address: farmConfig.tokenAddresses[CHAIN_ID],
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: farmConfig.quoteTokenAdresses[CHAIN_ID],
          name: 'decimals',
        },
      ]

      const [tokenBalanceLP, quoteTokenBlanceLP, lpTokenBalanceMC, lpTotalSupply, tokenDecimals, quoteTokenDecimals] =
        await multicall(multicallAddress, erc20, calls)

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
        const [info, totalAllocPoint] = await multicall(multicallAddress, masterchefABI, [
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
        console.log('Error fetching farm', error, farmConfig)
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

export default useFetchFarms
