import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchChainIdFromUrl, fetchUserNetwork } from 'state/network'
import { CHAIN_PARAMS } from 'config/constants/chains'

const useSwitchNetwork = () => {
  const { chainId, account, library } = useWeb3React()
  const dispatch = useDispatch()
  const switchNetwork = useCallback(
    (userChainId: number) => {
      if (account && userChainId !== chainId) {
        try {
          library?.send('wallet_addEthereumChain', [CHAIN_PARAMS[userChainId], account])
          dispatch(fetchChainIdFromUrl(false))
        } catch (error) {
          console.warn(error)
        }
      } else {
        dispatch(fetchUserNetwork(chainId, account, userChainId))
      }
    },
    [chainId, account, library, dispatch],
  )
  return { switchNetwork }
}

export default useSwitchNetwork
