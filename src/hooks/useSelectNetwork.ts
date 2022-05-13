import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchChainIdFromUrl, fetchUserNetwork } from 'state/network'
import { TorusConnector } from '@web3-react/torus-connector'
import { CHAIN_PARAMS } from 'config/constants/chains'
import { useToast } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'

const useSwitchNetwork = () => {
  const { chainId, account, library, connector } = useWeb3React()
  const dispatch = useDispatch()
  const { toastError } = useToast()
  const { t } = useTranslation()

  const switchNetwork = useCallback(
    (userChainId: number) => {
      if (connector instanceof TorusConnector) {
        toastError(t('Torus wallet is only available on BSC chain'))
        return
      }
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
    [chainId, account, library, connector, toastError, t, dispatch],
  )
  return { switchNetwork }
}

export default useSwitchNetwork
