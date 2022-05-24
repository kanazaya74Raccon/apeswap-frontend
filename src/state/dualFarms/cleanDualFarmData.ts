import BigNumber from 'bignumber.js'
import { dualFarmsConfig } from 'config/constants'
import { FarmLpAprsType, TokenPrices } from 'state/types'
import { getDualFarmApr } from 'utils/apr'
import { getRoi, tokenEarnedPerThousandDollarsCompounding } from 'utils/compoundApyHelpers'
import { getBalanceNumber } from '../../utils/formatBalance'

const cleanDualFarmData = (
  farmIds: number[],
  chunkedFarms: any[],
  tokenPrices: TokenPrices[],
  bananaPrice: BigNumber,
  farmLpAprs: FarmLpAprsType,
  chainId: number,
) => {
  const data = chunkedFarms.map((chunk, index) => {
    const dualFarmConfig = dualFarmsConfig?.find((farm) => farm.pid === farmIds[index])
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
    const lpApr = farmLpAprs?.lpAprs?.find((lp) => lp.pid === dualFarmConfig.pid)?.lpApr * 100

    const [
      quoteTokenBalanceLP,
      tokenBalanceLP,
      lpTokenBalanceMC,
      lpTotalSupply,
      info,
      totalAllocPoint,
      miniChefRewardsPerSecond,
      rewarderInfo,
      rewardsPerSecond,
      rewarderTotalAlloc,
    ] = chunk

    // Ratio in % a LP tokens that are in staking, vs the total number in circulation
    const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

    // Total value in staking in quote token value
    const lpTotalInQuoteToken = new BigNumber(quoteTokenBalanceLP)
      .div(new BigNumber(10).pow(18))
      .times(new BigNumber(2))
      .times(lpTokenRatio)

    // Total value in pool in quote token value
    const totalInQuoteToken = new BigNumber(quoteTokenBalanceLP)
      .div(new BigNumber(10).pow(quoteToken?.decimals))
      .times(new BigNumber(2))

    // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
    const tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(token1?.decimals)).times(lpTokenRatio)
    const quoteTokenAmount = new BigNumber(quoteTokenBalanceLP)
      .div(new BigNumber(10).pow(quoteToken?.decimals))
      .times(lpTokenRatio)

    let alloc = null
    let multiplier = 'unset'
    let miniChefPoolRewardPerSecond = null

    const allocPoint = new BigNumber(info.allocPoint._hex)
    const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
    miniChefPoolRewardPerSecond = getBalanceNumber(
      poolWeight.times(miniChefRewardsPerSecond),
      miniChefRewarderToken?.decimals,
    )
    alloc = poolWeight.toJSON()
    multiplier = `${allocPoint.div(100).toString()}X`

    const totalStaked = quoteTokenAmount.times(new BigNumber(2)).times(quoteToken?.price)
    const totalValueInLp = new BigNumber(quoteTokenBalanceLP)
      .div(new BigNumber(10).pow(quoteToken?.decimals))
      .times(new BigNumber(2))
      .times(quoteToken?.price)
    const stakeTokenPrice = totalValueInLp.div(new BigNumber(getBalanceNumber(lpTotalSupply))).toNumber()

    const rewarderAllocPoint = new BigNumber(rewarderInfo?.allocPoint?._hex)
    let rewarderPoolWeight = null

    if (dualFarmConfig.rewarderAddress === '0x1F234B1b83e21Cb5e2b99b4E498fe70Ef2d6e3bf') {
      rewarderPoolWeight = rewarderAllocPoint.div(new BigNumber(10000))
    } else {
      rewarderPoolWeight = rewarderAllocPoint.div(new BigNumber(rewarderTotalAlloc))
    }
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

    const amountEarned = tokenEarnedPerThousandDollarsCompounding({
      numberOfDays: 365,
      farmApr: lpApr ? apr + lpApr : apr,
      tokenPrice: bananaPrice,
    })

    const apy = getRoi({ amountEarned, amountInvested: 1000 / bananaPrice?.toNumber() }).toFixed(2)

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
      lpApr,
      poolWeight: alloc,
      // TODO Remove - HIDE MATIC/CRYTL farm with 1 alloc point while SINGULAR Vault withdraws
      multiplier,
      apr,
      apy,
    }
  })
  return data
}

export default cleanDualFarmData
