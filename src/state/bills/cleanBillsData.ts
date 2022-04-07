import BigNumber from 'bignumber.js'
import { poolsConfig } from 'config/constants'
import bills from 'config/constants/bills'
import { PoolConfig } from 'config/constants/types'
import { TokenPrices } from 'state/types'
import { getPoolApr } from 'utils/apr'
import { getBalanceNumber } from 'utils/formatBalance'

const cleanBillsData = (billIds: number[], chunkedBills: any[], tokenPrices: TokenPrices[], chainId: number) => {
  const data = chunkedBills.map((chunk, index) => {
    const billConfig = bills.find((bill) => bill.index === billIds[index])
    const lpPrice = tokenPrices?.find((token) => token.address[chainId] === billConfig.lpToken.address[chainId])?.price
    const earnTokenPrice = tokenPrices?.find(
      (token) => token.address[chainId] === billConfig.earnToken.address[chainId],
    )?.price
    const [
      trueBillPrice,
      currentDebt,
      currentFee,
      debtDecay,
      debtRatio,
      totalDebt,
      totalPayoutGiven,
      totalPrincipalBilled,
      billNft,
      terms,
    ] = chunk
    const [controlVariable, vestingTerm, minimumPrice, maxPayout, maxDebt] = terms
    const priceUsd = getBalanceNumber(trueBillPrice) * lpPrice
    const discount = ((earnTokenPrice - priceUsd) / earnTokenPrice) * 100
    return {
      ...billConfig,
      price: trueBillPrice.toString(),
      priceUsd: priceUsd?.toFixed(3),
      vestingTime: vestingTerm.toString(),
      discount: discount.toFixed(2),
      trueBillPrice: trueBillPrice.toString(),
      currentDebt: currentDebt.toString(),
      currentFee: currentFee.toString(),
      debtDecay: debtDecay.toString(),
      debtRatio: debtRatio.toString(),
      totalDebt: totalDebt.toString(),
      totalPayoutGiven: totalPayoutGiven.toString(),
      totalPrincipalBilled: totalPrincipalBilled.toString(),
      controlVariable: controlVariable.toString(),
      minimumPrice: minimumPrice.toString(),
      maxPayout: maxPayout.toString(),
      maxDebt: maxDebt.toString(),
      billNftAddress: billNft.toString(),
      earnTokenPrice,
      lpPrice,
    }
  })
  return data
}

// const fetchPoolTokenStatsAndApr = (pool: PoolConfig, tokenPrices: TokenPrices[], totalStaked, chainId: number) => {
//   // Get values needed to calculate apr
//   const curPool = pool
//   const rewardToken = tokenPrices
//     ? tokenPrices.find((token) => pool?.rewardToken && token?.address[chainId] === pool?.rewardToken.address[chainId])
//     : pool.rewardToken
//   const stakingToken = tokenPrices
//     ? tokenPrices.find((token) => token?.address[chainId] === pool?.stakingToken.address[chainId])
//     : pool.stakingToken
//   // Calculate apr
//   const apr = getPoolApr(stakingToken?.price, rewardToken?.price, getBalanceNumber(totalStaked), curPool?.tokenPerBlock)
//   return [stakingToken, rewardToken, apr]
// }

export default cleanBillsData
