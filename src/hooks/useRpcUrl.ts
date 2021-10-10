import { useWeb3React } from '@web3-react/core'
import { NETWORK_RPC } from 'config/constants/chains'
import random from 'lodash/random'

// Array of available nodes to connect to
export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3]

const useRpcUrl = () => {
  const { chainId } = useWeb3React()
  const nodes = NETWORK_RPC[chainId]
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export default useRpcUrl
