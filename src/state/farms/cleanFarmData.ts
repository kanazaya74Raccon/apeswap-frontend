import BigNumber from 'bignumber.js'
import { farmsConfig } from 'config/constants'

const cleanFarmData = (farmIds: number[], chunkedFarms: any[]) => {
  const data = chunkedFarms.map((chunk, index) => {
    const farmConfig = farmsConfig.find((farm) => farm.pid === farmIds[index])
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
  })
  return data
}

export default cleanFarmData
