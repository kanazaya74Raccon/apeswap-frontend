import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchChainIdFromUrl, fetchUserNetwork } from 'state/network'
import { CHAIN_PARAMS } from 'config/constants/chains'
import { hexStripZeros } from '@autonomylabs/limit-stop-orders/node_modules/@ethersproject/bytes'
import { BigNumber } from 'ethers'

const useSwitchNetwork = () => {
  const { chainId, account, library } = useWeb3React()
  const provider = library?.provider
  const dispatch = useDispatch()
  const switchNetwork = useCallback(
    async (userChainId: number) => {
      if (account && userChainId !== chainId) {
        const formattedChainId = hexStripZeros(BigNumber.from(userChainId).toHexString())
        try {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: formattedChainId }],
          })
          dispatch(fetchChainIdFromUrl(false))
        } catch {
          // If the user doesn't have the chain add it
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [CHAIN_PARAMS[userChainId]],
          })
          dispatch(fetchChainIdFromUrl(false))
          try {
            // Prompt the user to switch after adding the chain
            await provider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: formattedChainId }],
            })
            dispatch(fetchChainIdFromUrl(false))
          } catch (error) {
            console.warn(error)
          }
        }
      } else {
        dispatch(fetchUserNetwork(chainId, account, userChainId))
      }
    },
    [chainId, account, provider, dispatch],
  )
  return { switchNetwork }
}

export default useSwitchNetwork
