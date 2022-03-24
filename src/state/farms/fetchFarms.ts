import { farmsConfig } from 'config/constants'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import BigNumber from 'bignumber.js'
import { FarmLpAprsType, LpTokenPrices } from 'state/types'
import { chunk } from 'lodash'
import multicall from 'utils/multicall'
import fetchFarmCalls from './fetchFarmCalls'
import cleanFarmData from './cleanFarmData'

const fetchFarms = async (
  chainId: number,
  lpPrices: LpTokenPrices[],
  bananaPrice: BigNumber,
  farmLpAprs: FarmLpAprsType,
) => {
  const farmIds = []
  const farmCalls = farmsConfig.flatMap((farm) => {
    farmIds.push(farm.pid)
    return fetchFarmCalls(farm, chainId)
  })
  const vals = await multicall(chainId, [...masterchefABI, ...erc20], farmCalls)
  const chunkSize = farmCalls.length / farmsConfig.length
  const chunkedFarms = chunk(vals, chunkSize)
  return cleanFarmData(farmIds, chunkedFarms, lpPrices, bananaPrice, farmLpAprs)
}

export default fetchFarms
