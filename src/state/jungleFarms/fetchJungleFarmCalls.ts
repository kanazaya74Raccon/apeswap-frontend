import { JungleFarmConfig } from 'config/constants/types'
import { Call } from 'utils/multicall'

const fetchJungleFarmCalls = (farm: JungleFarmConfig, chainId: number): Call[] => {
  const standardCalls = [
    {
      address: farm.contractAddress[chainId],
      name: 'startBlock',
    },
    // Get end block
    {
      address: farm.contractAddress[chainId],
      name: 'bonusEndBlock',
    },
    {
      address: farm.contractAddress[chainId],
      name: 'totalStaked',
    },
  ]

  return [...standardCalls]
}

export default fetchJungleFarmCalls
