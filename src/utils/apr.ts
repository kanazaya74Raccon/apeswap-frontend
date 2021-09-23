import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR, BANANA_PER_YEAR } from 'config'

export const getPoolApr = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: string,
): number => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

export const getFarmApr = (poolWeight: BigNumber, bananaPriceUsd: BigNumber, poolLiquidityUsd: BigNumber): number => {
  const yearlyBananaRewardAllocation = BANANA_PER_YEAR.times(poolWeight)
  const apr = yearlyBananaRewardAllocation.times(bananaPriceUsd).div(poolLiquidityUsd).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

export default null
