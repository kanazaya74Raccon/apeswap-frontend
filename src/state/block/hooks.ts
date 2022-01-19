import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useInterval from 'hooks/useInterval'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'

import { setBlock } from '.'
import { State } from '../types'

export const usePollBlockNumber = (refreshTime = 6000) => {
  const dispatch = useAppDispatch()
  const isWindowVisible = useIsWindowVisible()
  const { library } = useActiveWeb3React()

  useInterval(
    () => {
      const fetchBlock = async () => {
        const blockNumber = await library.getBlockNumber()
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
