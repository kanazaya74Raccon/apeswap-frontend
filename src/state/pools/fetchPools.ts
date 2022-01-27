import { poolsConfig } from 'config/constants'
import sousChefABI from 'config/abi/sousChef.json'
import bananaABI from 'config/abi/banana.json'
import { TokenPrices } from 'state/types'
import { chunk } from 'lodash'
import multicall from 'utils/multicall'
import fetchPoolCalls from './fetchPoolCalls'
import cleanPoolData from './cleanPoolData'

const fetchPools = async (chainId: number, tokenPrices: TokenPrices[]) => {
  const filterPools = poolsConfig
  const poolIds = []
  const poolCalls = filterPools.flatMap((pool) => {
    poolIds.push(pool.sousId)
    return fetchPoolCalls(pool, chainId)
  })
  // We do not want the block time for the banana earn banana pool so we append two null values to keep the chunks even
  const vals = await multicall(chainId, [...sousChefABI, ...bananaABI], poolCalls)
  const formattedVals = [null, null, ...vals]
  const chunkSize = formattedVals.length / filterPools.length
  const chunkedPools = chunk(formattedVals, chunkSize)

  return cleanPoolData(poolIds, chunkedPools, tokenPrices, chainId)
}

export default fetchPools
