import BigNumber from 'bignumber.js'
import { jungleFarmsConfig } from 'config/constants'
import { JungleFarmConfig } from 'config/constants/types'
import { FarmLpAprsType, TokenPrices } from 'state/types'
import { getPoolApr } from 'utils/apr'
import { getBalanceNumber } from 'utils/formatBalance'

const cleanJungleFarmData = (farmIds: number[], chunkedFarms: any[], tokenPrices: TokenPrices[], chainId: number) => {
  const data = chunkedFarms.map((chunk, index) => {
    const farmConfig = jungleFarmsConfig.find((farm) => farm.jungleId === farmIds[index])
    const [startBlock, endBlock, totalStaked] = chunk

    const totalStakedFormatted = new BigNumber(totalStaked).toJSON()
    const [stakingToken, rewardToken, apr] = fetchJungleFarmTokenStatsAndApr(
      farmConfig,
      tokenPrices,
      totalStakedFormatted,
      chainId,
    )

    return {
      jungleId: farmIds[index],
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: farmConfig.bonusEndBlock || new BigNumber(endBlock).toJSON(),
      totalStaked: totalStakedFormatted,
      stakingToken,
      rewardToken,
      apr,
    }
  })
  return data
}

const fetchJungleFarmTokenStatsAndApr = (
  farm: JungleFarmConfig,
  tokenPrices: TokenPrices[],
  totalStaked,
  chainId: number,
) => {
  // Get values needed to calculate apr
  const curFarm = farm
  const rewardToken = tokenPrices
    ? tokenPrices.find((token) => farm?.rewardToken && token?.address[chainId] === farm?.rewardToken.address[chainId])
    : farm.rewardToken
  const stakingToken = tokenPrices
    ? tokenPrices.find((token) => token?.address[chainId] === farm?.stakingToken.address[chainId])
    : farm.stakingToken
  // Calculate apr
  const apr = getPoolApr(stakingToken?.price, rewardToken?.price, getBalanceNumber(totalStaked), curFarm?.tokenPerBlock)

  return [stakingToken, rewardToken, apr]
}

export default cleanJungleFarmData
