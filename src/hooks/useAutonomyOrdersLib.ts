import { useMemo } from 'react'
import { AutonomyLimitStopOrders } from '@autonomylabs/limit-stop-orders'
import useActiveWeb3React from './useActiveWeb3React'

export default function useAutonomyOrdersLib(): AutonomyLimitStopOrders | undefined {
  const { chainId, library } = useActiveWeb3React()

  return useMemo(() => {
    try {
      return chainId && library
        ? new AutonomyLimitStopOrders(
            chainId,
            library?.getSigner(),
            '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
            '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
          )
        : undefined
    } catch (error: any) {
      console.error(`Could not instantiate AutonomyLimitStopOrders: ${error.message}`)
      return undefined
    }
  }, [chainId, library])
}
