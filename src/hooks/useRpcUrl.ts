import { useWeb3React } from '@web3-react/core'
import { NETWORK_RPC } from 'config/constants/chains'
import random from 'lodash/random'

const useRpcUrl = () => {
  const { chainId } = useWeb3React()
  const nodes = NETWORK_RPC[chainId]
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export default useRpcUrl
