import { useEffect, useState, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
// eslint-disable-next-line import/no-unresolved
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { useSelector } from 'react-redux'
import getProvider from 'utils/getProvider'
import { State } from 'state/types'

const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
  const { account, library, chainId, ...web3React } = useWeb3React()
  const appChainId = useSelector((state: State) => state.network.data.chainId)
  const appProvider = getProvider(appChainId)

  const refEth = useRef(library)
  const [provider, setProvider] = useState(library || appProvider)

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || appProvider)
      refEth.current = library
    }
  }, [library, appProvider])

  return { library: provider, chainId: chainId || appChainId, account, ...web3React }
}

export default useActiveWeb3React
