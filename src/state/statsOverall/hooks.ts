import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useBananaAddress } from 'hooks/useAddress'
import useRefresh from 'hooks/useRefresh'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useBlock } from 'state/block/hooks'
import { useFarms } from 'state/farms/hooks'
import { usePools } from 'state/hooks'
import { fetchStats } from 'state/stats'
import { State, StatsOverallState, StatsState } from 'state/types'
import { useTokenBalance } from 'state/wallet/hooks'
import { fetchStatsOverall } from '.'

// Stats Overall- Total Banana Stats

export const useFetchStatsOverall = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    dispatch(fetchStatsOverall())
  }, [dispatch, slowRefresh])
}

export const useStatsOverall = () => {
  const { isInitialized, isLoading, data }: StatsOverallState = useSelector((state: State) => state.statsOverall)
  return { statsOverall: data, hasStats: isInitialized && data !== null, isInitialized, isLoading }
}

// Stats - individual stats
export const useFetchStats = () => {
  const { account } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const { statsOverall } = useStatsOverall()
  const { currentBlock } = useBlock()
  const farms = useFarms(account)
  const pools = usePools(account)
  const { slowRefresh } = useRefresh()
  const bananaBalance = useTokenBalance(useBananaAddress())
  const [render, setRender] = useState(false)

  // Stats was rendering an insane amount so hot fix until its redone
  if (account && farms && pools && statsOverall && render && currentBlock) {
    dispatch(fetchStats(pools, farms, statsOverall, bananaBalance, currentBlock))
    setRender(false)
  }

  useEffect(() => {
    setRender((prev) => !prev)
  }, [slowRefresh])
}

export const useStats = () => {
  const { isInitialized, isLoading, data }: StatsState = useSelector((state: State) => state.stats)
  return { stats: data, hasStats: isInitialized && data !== null, isInitialized, isLoading }
}
