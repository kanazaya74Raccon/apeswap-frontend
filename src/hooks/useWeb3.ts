import { useEffect, useState, useRef } from 'react'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { useWeb3React } from '@web3-react/core'
import { random } from 'lodash'
import { NETWORK_RPC } from 'config/constants/chains'
import { useSelector } from 'react-redux'
import { State } from 'state/types'

/**
 * Provides a web3 instance using the provider provided by useWallet
 * Recreate web3 instance only if the ethereum provider change
 */

const useWeb3 = () => {
  const { library } = useWeb3React()
  // Using selector to avoid circlular dependecies
  const chainId = useSelector((state: State) => state.network.data.chainId)
  const nodes = NETWORK_RPC[chainId]
  const backupNode = nodes[random(0, nodes.length - 1)]
  const httpProvider = new Web3.providers.HttpProvider(backupNode, { timeout: 10000 } as HttpProviderOptions)
  const refEth = useRef(library)
  const [web3, setweb3] = useState(new Web3(library || httpProvider))

  useEffect(() => {
    const newNodes = NETWORK_RPC[chainId]
    const newBackupNode = newNodes[random(0, newNodes.length - 1)]
    const newHttpProvider = new Web3.providers.HttpProvider(newBackupNode, { timeout: 10000 } as HttpProviderOptions)
    if (library !== refEth.current) {
      setweb3(new Web3(library))
      refEth.current = library
    }
    if (library === undefined) {
      setweb3(new Web3(newHttpProvider))
    }
  }, [library, chainId])

  return web3
}

export default useWeb3
