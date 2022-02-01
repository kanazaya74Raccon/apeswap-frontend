import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useInterval from 'hooks/useInterval'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'

import { setBlock } from '.'
import { State } from '../types'

export const usePollBlockNumber = (refreshTime = 10000) => {
  const dispatch = useAppDispatch()
  const isWindowVisible = useIsWindowVisible()
  const { library } = useActiveWeb3React()

  useInterval(
    () => {
      const fetchBlock = async () => {
        try {
          const blockNumber = await library.getBlockNumber()
          dispatch(setBlock(blockNumber))
        } catch {
          console.error('Could not fetch block number')
        }
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
