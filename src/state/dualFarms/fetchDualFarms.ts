import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import miniChefABI from 'config/abi/miniApeV2.json'
import miniComplexRewarderABI from 'config/abi/miniComplexRewarder.json'
import { dualFarmsConfig } from 'config/constants'
import { Contract } from 'web3-eth-contract'
import { TokenPrices } from 'state/types'

const fetchDualFarms = async (
  multicallContract: Contract,
  miniChefAddress: string,
  tokenPrices: TokenPrices[],
  chainId: number,
) => {
  const filteredDualFarms = dualFarmsConfig.filter((dualFarm) => dualFarm.network === chainId)
  const data = await Promise.all(
    filteredDualFarms.map(async (dualFarmConfig) => {
      const lpAdress = dualFarmConfig.stakeTokenAddress
      const quoteTokenPrice = tokenPrices?.find(
        (token) => token.address[chainId] === dualFarmConfig.stakeTokens.token0.address[chainId],
      ).price
      const calls = [
        // Balance of token in the LP contract
        {
          address: dualFarmConfig.stakeTokens.token0.address[chainId],
          name: 'balanceOf',
          params: [lpAdress],
        },
        // Balance of quote token on LP contract
        {
          address: dualFarmConfig.stakeTokens.token1.address[chainId],
          name: 'balanceOf',
          params: [lpAdress],
        },
        // Balance of LP tokens in the master chef contract
        {
          address: lpAdress,
          name: 'balanceOf',
          params: [miniChefAddress],
        },
        // Total supply of LP tokens
        {
          address: lpAdress,
          name: 'totalSupply',
        },
        // Token decimals
        {
          address: dualFarmConfig.stakeTokens.token0.address[chainId],
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: dualFarmConfig.stakeTokens.token1.address[chainId],
          name: 'decimals',
        },
      ]

      const [quoteTokenBlanceLP, tokenBalanceLP, lpTokenBalanceMC, lpTotalSupply, quoteTokenDecimals, tokenDecimals] =
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
        const [info, totalAllocPoint] = await multicall(multicallContract, miniChefABI, [
          {
            address: miniChefAddress,
            name: 'poolInfo',
            params: [dualFarmConfig.pid],
          },
          {
            address: miniChefAddress,
            name: 'totalAllocPoint',
          },
        ])
        const allocPoint = new BigNumber(info.allocPoint._hex)
        const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
        alloc = poolWeight.toJSON()
        multiplier = `${allocPoint.div(100).toString()}X`
        // eslint-disable-next-line no-empty
      } catch (error) {
        console.error('Error fetching farm', error, dualFarmConfig)
      }

      let rewarderTotalAlloc = null
      let rewarderInfo = null
      let rewardsPerSecond = null

      if (dualFarmConfig.rewarderAddress === '0x1F234B1b83e21Cb5e2b99b4E498fe70Ef2d6e3bf') {
        rewarderTotalAlloc = 10000
        const multiReturn = await multicall(multicallContract, miniComplexRewarderABI, [
          {
            address: dualFarmConfig.rewarderAddress,
            name: 'poolInfo',
            params: [dualFarmConfig.pid],
          },
          {
            address: dualFarmConfig.rewarderAddress,
            name: 'rewardPerSecond',
          },
        ])
        rewarderInfo = multiReturn[0]
        rewardsPerSecond = multiReturn[1]
        console.log(multiReturn)
      } else {
        const multiReturn = await multicall(multicallContract, miniComplexRewarderABI, [
          {
            address: dualFarmConfig.rewarderAddress,
            name: 'poolInfo',
            params: [dualFarmConfig.pid],
          },
          {
            address: dualFarmConfig.rewarderAddress,
            name: 'rewardPerSecond',
          },
          {
            address: dualFarmConfig.rewarderAddress,
            name: 'totalAllocPoint',
          },
        ])
        rewarderTotalAlloc = multiReturn[0]
        rewarderInfo = multiReturn[1]
        rewardsPerSecond = multiReturn[2]
      }

      const totalStaked = quoteTokenAmount.times(new BigNumber(2)).times(quoteTokenPrice)

      const rewarderAllocPoint = new BigNumber(rewarderInfo?.allocPoint?._hex)
      const rewarderPoolWeight = rewarderAllocPoint.div(new BigNumber(rewarderTotalAlloc)).toString()
      // const poolRewardPerSecond = 

      console.log(rewarderPoolWeight)
      console.log('TOTAL STAKED')
      console.log(`${dualFarmConfig.stakeTokens.token0.symbol} - ${dualFarmConfig.stakeTokens.token1.symbol}`)
      console.log(totalStaked.toString())
      // console.log(rewardsPerSecond)

      console.log({
        ...dualFarmConfig,
        tokenAmount: tokenAmount.toJSON(),
        totalStaked: totalStaked.toFixed(2),
        quoteTokenAmount: quoteTokenAmount.toJSON(),
        totalInQuoteToken: totalInQuoteToken.toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        tokenPriceVsQuote: quoteTokenAmount.div(tokenAmount).toJSON(),
        poolWeight: alloc,
        multiplier,
      })

      return {
        ...dualFarmConfig,
        tokenAmount: tokenAmount.toJSON(),
        totalStaked: totalStaked.toFixed(0),
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

export default fetchDualFarms
