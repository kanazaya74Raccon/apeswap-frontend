import BigNumber from 'bignumber.js'
import { BANANA_PER_BLOCK, BLOCKS_PER_YEAR } from 'config'
import { farmsConfig } from 'config/constants'
import { FarmConfig } from 'config/constants/types'
import { LpTokenPrices } from 'state/types'
import { getFarmApr } from 'utils/apr'
import { apyModalRoi, getRoi, tokenEarnedPerThousandDollarsCompounding } from 'utils/compoundApyHelpers'
import Apr from 'views/Vaults/components/VaultTable/Apr'

const cleanFarmData = (farmIds: number[], chunkedFarms: any[], lpPrices: LpTokenPrices[], bananaPrice: BigNumber) => {
  const data = chunkedFarms.map((chunk, index) => {
    const farmConfig = farmsConfig.find((farm) => farm.pid === farmIds[index])
    const filteredLpPrice = lpPrices.find((lp) => lp.address === farmConfig.lpAddresses)
    const [
      tokenBalanceLP,
      quoteTokenBlanceLP,
      lpTokenBalanceMC,
      lpTotalSupply,
      tokenDecimals,
      quoteTokenDecimals,
      info,
      totalAllocPoint,
    ] = chunk

    // Ratio in % a LP tokens that are in staking, vs the total number in circulation
    const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))
    const totalLpStaked = new BigNumber(lpTokenBalanceMC).div(new BigNumber(10).pow(18))

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
    const allocPoint = new BigNumber(info.allocPoint._hex)
    const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
    alloc = poolWeight.toJSON()
    multiplier = `${allocPoint.div(100).toString()}X`
    const totalLpStakedUsd = totalLpStaked.times(filteredLpPrice.price)
    const apr = getFarmApr(poolWeight, bananaPrice, totalLpStakedUsd)
    const amountEarned = tokenEarnedPerThousandDollarsCompounding({
      numberOfDays: 365,
      farmApr: apr,
      tokenPrice: bananaPrice,
    })
    const apy = getRoi({ amountEarned, amountInvested: 1000 / bananaPrice.toNumber() })

    return {
      ...farmConfig,
      tokenAmount: tokenAmount.toJSON(),
      quoteTokenAmount: quoteTokenAmount.toJSON(),
      totalInQuoteToken: totalInQuoteToken.toJSON(),
      lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
      tokenPriceVsQuote: quoteTokenAmount.div(tokenAmount).toJSON(),
      totalLpStakedUsd: totalLpStakedUsd.toFixed(0),
      apr: apr.toFixed(2),
      apy: apy.toFixed(2),
      poolWeight: alloc,
      multiplier,
    }
  })
  return data
}

export default cleanFarmData
