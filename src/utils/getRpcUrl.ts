import { NETWORK_RPC } from 'config/constants/chains'
import random from 'lodash/random'

const getNodeUrl = (chainId: number) => {
  const randomIndex = random(0, NETWORK_RPC[chainId].length - 1)
  return NETWORK_RPC[chainId][randomIndex]
}

export default getNodeUrl
