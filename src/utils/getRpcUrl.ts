import { CHAIN_ID, NETWORK_RPC } from 'config/constants/chains'
import random from 'lodash/random'

const getNodeUrl = (chainId: number) => {
  if (chainId === CHAIN_ID.MATIC) {
    const randomIndex = random(0, NETWORK_RPC[CHAIN_ID.MATIC].length - 1)
    return NETWORK_RPC[CHAIN_ID.MATIC][randomIndex]
  }
  const randomIndex = random(0, NETWORK_RPC[CHAIN_ID.BSC].length - 1)
  return NETWORK_RPC[CHAIN_ID.BSC][randomIndex]
}

export default getNodeUrl
