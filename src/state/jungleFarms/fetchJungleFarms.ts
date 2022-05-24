import { jungleFarmsConfig } from 'config/constants'
import sousChefABI from 'config/abi/sousChef.json'
import bananaABI from 'config/abi/banana.json'
import { FarmLpAprsType, TokenPrices } from 'state/types'
import { chunk } from 'lodash'
import multicall from 'utils/multicall'
import fetchJungleFarmCalls from './fetchJungleFarmCalls'
import cleanJungleFarmData from './cleanJungleFarmData'

const fetchJungleFarms = async (chainId: number, tokenPrices: TokenPrices[]) => {
  const farmIds = []
  const farmCalls = jungleFarmsConfig.flatMap((farm) => {
    farmIds.push(farm.sousId)
    return fetchJungleFarmCalls(farm, chainId)
  })

  const vals = await multicall(chainId, [...sousChefABI, ...bananaABI], farmCalls)
  const chunkSize = vals.length / jungleFarmsConfig.length
  const chunkedFarms = chunk(vals, chunkSize)

  return cleanJungleFarmData(farmIds, chunkedFarms, tokenPrices, chainId)
}

export default fetchJungleFarms
