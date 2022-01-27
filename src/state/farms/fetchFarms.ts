import { farmsConfig } from 'config/constants'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import { chunk } from 'lodash'
import multicall from 'utils/multicall'
import fetchFarmCalls from './fetchFarmCalls'
import cleanFarmData from './cleanFarmData'

const fetchFarms = async (chainId: number) => {
  const farmIds = []
  const farmCalls = farmsConfig.flatMap((farm) => {
    farmIds.push(farm.pid)
    return fetchFarmCalls(farm, chainId)
  })
  const vals = await multicall(chainId, [...masterchefABI, ...erc20], farmCalls)
  const chunkSize = farmCalls.length / farmsConfig.length
  const chunkedFarms = chunk(vals, chunkSize)
  return cleanFarmData(farmIds, chunkedFarms)
}

export default fetchFarms
