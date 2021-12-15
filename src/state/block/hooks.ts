import useInterval from 'hooks/useInterval'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useNetworkChainId } from 'state/hooks'
import getProvider from 'utils/getProvider'

import { setBlock } from '.'
import { State } from '../types'

export const usePollBlockNumber = (refreshTime = 6000) => {
  const dispatch = useAppDispatch()
  const isWindowVisible = useIsWindowVisible()
  const chainId = useNetworkChainId()
  const provider = getProvider(chainId)

  useInterval(
    () => {
      const fetchBlock = async () => {
        const blockNumber = await provider.getBlockNumber()
        console.log(blockNumber)
        dispatch(setBlock(blockNumber))
      }

      fetchBlock()
    },
    refreshTime,
    isWindowVisible,
  )
}

export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}
