import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import miniChefABI from 'config/abi/miniApeV2.json'
import miniComplexRewarderABI from 'config/abi/miniComplexRewarder.json'
import multicallABI from 'config/abi/Multicall.json'
import { getMulticallAddress, getMiniChefAddress } from 'utils/addressHelper'
import { getContract } from 'utils/web3'
import { dualFarmsConfig } from 'config/constants'
import { TokenPrices } from 'state/types'
import { getDualFarmApr } from 'utils/apr'
import { getBalanceNumber } from 'utils/formatBalance'

const fetchDualFarms = async (tokenPrices: TokenPrices[], chainId: number) => {
  const multicallContractAddress = getMulticallAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const miniChefAddress = getMiniChefAddress(chainId)
  const filteredDualFarms = dualFarmsConfig.filter((dualFarm) => dualFarm.network === chainId)
  const data = await Promise.all(
    filteredDualFarms.map(async (dualFarmConfig) => {
      const lpAdress = dualFarmConfig.stakeTokenAddress
      const quoteToken = tokenPrices?.find(
        (token) => token.address[chainId] === dualFarmConfig.stakeTokens.token0.address[chainId],
      )
      const token1 = tokenPrices?.find(
        (token) => token.address[chainId] === dualFarmConfig.stakeTokens.token1.address[chainId],
      )
      const miniChefRewarderToken = tokenPrices?.find(
        (token) => token.address[chainId] === dualFarmConfig.rewardTokens.token0.address[chainId],
      )
      const rewarderToken = tokenPrices?.find(
        (token) => token.address[chainId] === dualFarmConfig.rewardTokens.token1.address[chainId],
      )

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
      ]

      const [quoteTokenBlanceLP, tokenBalanceLP, lpTokenBalanceMC, lpTotalSupply] = await multicall(
        multicallContract,
        erc20,
        calls,
      )

      // Ratio in % a LP tokens that are in staking, vs the total number in circulation
      const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

      // Total value in staking in quote token value
      const lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
        .div(new BigNumber(10).pow(quoteToken?.decimals))
        .times(new BigNumber(2))
        .times(lpTokenRatio)

      // Total value in pool in quote token value
      const totalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
        .div(new BigNumber(10).pow(quoteToken?.decimals))
        .times(new BigNumber(2))

      // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
      const tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(token1?.decimals)).times(lpTokenRatio)
      const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
        .div(new BigNumber(10).pow(quoteToken?.decimals))
        .times(lpTokenRatio)

      let alloc = null
      let multiplier = 'unset'
      let miniChefPoolRewardPerSecond = null
      try {
        const [info, totalAllocPoint, miniChefRewardsPerSecond] = await multicall(multicallContract, miniChefABI, [
          {
            address: miniChefAddress,
            name: 'poolInfo',
            params: [dualFarmConfig.pid],
          },
          {
            address: miniChefAddress,
            name: 'totalAllocPoint',
          },
          {
            address: miniChefAddress,
            name: 'bananaPerSecond',
          },
        ])
        const allocPoint = new BigNumber(info.allocPoint._hex)
        const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
        miniChefPoolRewardPerSecond = getBalanceNumber(
          poolWeight.times(miniChefRewardsPerSecond),
          miniChefRewarderToken?.decimals,
        )
        alloc = poolWeight.toJSON()
        multiplier = `${allocPoint.div(100).toString()}X`
        // eslint-disable-next-line no-empty
      } catch (error) {
        console.warn('Error fetching farm', error, dualFarmConfig)
      }

      let rewarderTotalAlloc = null
      let rewarderInfo = null
      let rewardsPerSecond = null

      if (dualFarmConfig.rewarderAddress === '0x1F234B1b83e21Cb5e2b99b4E498fe70Ef2d6e3bf') {
        // Temporary until we integrate the subgraph to the frontend
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
        rewarderInfo = multiReturn[0]
        rewardsPerSecond = multiReturn[1]
        rewarderTotalAlloc = multiReturn[2]
      }

      const totalStaked = quoteTokenAmount.times(new BigNumber(2)).times(quoteToken?.price)
      const totalValueInLp = new BigNumber(quoteTokenBlanceLP)
        .div(new BigNumber(10).pow(quoteToken?.decimals))
        .times(new BigNumber(2))
        .times(quoteToken?.price)
      const stakeTokenPrice = totalValueInLp.div(new BigNumber(getBalanceNumber(lpTotalSupply))).toNumber()

      const rewarderAllocPoint = new BigNumber(rewarderInfo?.allocPoint?._hex)
      const rewarderPoolWeight = rewarderAllocPoint.div(new BigNumber(rewarderTotalAlloc))
      const rewarderPoolRewardPerSecond = getBalanceNumber(
        rewarderPoolWeight.times(rewardsPerSecond),
        rewarderToken?.decimals,
      )
      const apr = getDualFarmApr(
        totalStaked?.toNumber(),
        miniChefRewarderToken?.price,
        miniChefPoolRewardPerSecond?.toString(),
        rewarderToken?.price,
        rewarderPoolRewardPerSecond?.toString(),
      )

      return {
        ...dualFarmConfig,
        tokenAmount: tokenAmount.toJSON(),
        totalStaked: totalStaked.toFixed(0),
        quoteTokenAmount: quoteTokenAmount.toJSON(),
        totalInQuoteToken: totalInQuoteToken.toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        tokenPriceVsQuote: quoteTokenAmount.div(tokenAmount).toJSON(),
        stakeTokenPrice,
        rewardToken0Price: miniChefRewarderToken?.price,
        rewardToken1Price: rewarderToken?.price,
        poolWeight: alloc,
        // TODO Remove - HIDE MATIC/CRYTL farm with 1 alloc point while SINGULAR Vault withdraws
        multiplier,
        apr,
      }
    }),
  )
  return data
}

export default fetchDualFarms
