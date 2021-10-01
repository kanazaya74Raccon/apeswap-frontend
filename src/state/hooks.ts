import { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { kebabCase } from 'lodash'
import { useWeb3React } from '@web3-react/core'
import { Toast, toastTypes } from '@apeswapfinance/uikit'
import { useSelector, useDispatch } from 'react-redux'
import { Team } from 'config/constants/types'
import useRefresh from 'hooks/useRefresh'
import { useLiquidityData } from 'hooks/api'
import useTokenBalance, { useAccountTokenBalance } from 'hooks/useTokenBalance'
import { useApePriceGetterAddress, useBananaAddress, useMulticallAddress, useTreasuryAddress } from 'hooks/useAddress'
import useBlock from 'hooks/useBlock'
import {
  fetchFarmsPublicDataAsync,
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  push as pushToast,
  remove as removeToast,
  clear as clearToast,
} from './actions'
import {
  State,
  Farm,
  Pool,
  ProfileState,
  StatsState,
  StatsOverallState,
  FarmOverall,
  AuctionsState,
  TokenPricesState,
} from './types'
import { fetchProfile } from './profile'
import { fetchStats } from './stats'
import { fetchStatsOverall } from './statsOverall'
import { fetchAuctions } from './auction'
import { fetchTokenPrices } from './tokenPrices'

const ZERO = new BigNumber(0)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  const { tokenPrices } = useTokenPrices()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync(tokenPrices))
  }, [dispatch, slowRefresh, tokenPrices])
}

// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm?.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm?.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm?.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm?.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}

// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

export const useGnanaPools = (account): Pool[] => {
  const pools = usePools(account).filter((pool) => pool.stakingToken.symbol === 'GNANA')
  return pools
}

export const useAllPools = (): Pool[] => {
  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

// TVL
export const useTvl = (): BigNumber => {
  const pools = useAllPools()
  const bananaPriceBUSD = usePriceBananaBusd()
  const liquidity = useLiquidityData()
  const bananaAtTreasoury = useAccountTokenBalance(useTreasuryAddress(), useBananaAddress())
  let valueLocked = new BigNumber(0)

  valueLocked = valueLocked.plus(new BigNumber(bananaAtTreasoury).div(new BigNumber(10).pow(18)).times(bananaPriceBUSD))

  // eslint-disable-next-line no-restricted-syntax
  for (const pool of pools) {
    if (pool.stakingToken.symbol === 'BANANA') {
      valueLocked = valueLocked.plus(
        new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18)).times(bananaPriceBUSD),
      )
    }
  }
  return valueLocked.plus(liquidity)

  // eslint-disable-next-line no-restricted-syntax
  /* for (const farm of farms) {
    const totalInQuoteToken = new BigNumber(farm.totalInQuoteToken)
    if (farm.quoteTokenSymbol === 'BNB') valueLocked = valueLocked.plus(totalInQuoteToken.times(bnbPriceUSD))
    else if (farm.quoteTokenSymbol === 'BUSD') valueLocked = valueLocked.plus(totalInQuoteToken)
    else if (farm.quoteTokenSymbol === 'BANANA')
      valueLocked = valueLocked.plus(totalInQuoteToken.times(bananaPriceBUSD))
  }
  return valueLocked
  */
}

// Prices

export const usePriceBnbBusd = (): BigNumber => {
  const pid = 3 // BUSD-BNB LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(1).div(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceBananaBusd = (): BigNumber => {
  const pid = 2 // BANANA-BUSD LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

/*
  // TODO Revisit this 
  const pid = BANANA_POOL_PID // BANANA-BNB LP
  const bnbPriceUSD = usePriceBnbBusd()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  */

export const usePriceEthBusd = (): BigNumber => {
  const pid = 5 // ETH-BNB LP
  const bnbPriceUSD = usePriceBnbBusd()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

// Toasts
export const useToast = () => {
  const dispatch = useDispatch()
  const helpers = useMemo(() => {
    const push = (toast: Toast) => dispatch(pushToast(toast))

    return {
      toastError: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.DANGER, title, description })
      },
      toastInfo: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.INFO, title, description })
      },
      toastSuccess: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.SUCCESS, title, description })
      },
      toastWarning: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.WARNING, title, description })
      },
      push,
      remove: (id: string) => dispatch(removeToast(id)),
      clear: () => dispatch(clearToast()),
    }
  }, [dispatch])

  return helpers
}

// Profile

export const useFetchProfile = () => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    dispatch(fetchProfile(account))
  }, [account, dispatch, fastRefresh])
}

export const useProfile = () => {
  const { isInitialized, isLoading, data }: ProfileState = useSelector((state: State) => state.profile)
  return { profile: data, hasProfile: isInitialized && data !== null, isInitialized, isLoading }
}

// Stats - individual stats
export const useFetchStats = () => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()
  const { statsOverall } = useStatsOverall()
  const { slowRefresh } = useRefresh()
  const [slow, setSlow] = useState(-1)
  const farms = useFarms()
  const pools = usePools(account)
  const curBlock = useBlock()
  const bananaBalance = useTokenBalance(useBananaAddress())

  useEffect(() => {
    if (account && farms && pools && statsOverall && (slowRefresh !== slow || slowRefresh === 0)) {
      dispatch(fetchStats(pools, farms, statsOverall, bananaBalance, curBlock))
      setSlow(slowRefresh)
    }
  }, [account, pools, farms, statsOverall, bananaBalance, dispatch, slow, slowRefresh, curBlock])
}

export const useStats = () => {
  const { isInitialized, isLoading, data }: StatsState = useSelector((state: State) => state.stats)
  return { stats: data, hasStats: isInitialized && data !== null, isInitialized, isLoading }
}

export const useFetchAuctions = () => {
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchAuctions())
  }, [dispatch, fastRefresh])
}

export const useAuctions = () => {
  const { isInitialized, isLoading, data }: AuctionsState = useSelector((state: State) => state.auctions)
  return { auctions: data, isInitialized, isLoading }
}

export const useFetchTokenPrices = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  const { chainId } = useWeb3React()
  const apePriceGetterAddress = useApePriceGetterAddress()
  const multicallAddress = useMulticallAddress()
  useEffect(() => {
    if (chainId) {
      console.log('here')
      dispatch(fetchTokenPrices(chainId, multicallAddress, apePriceGetterAddress))
    }
  }, [dispatch, slowRefresh, chainId, multicallAddress, apePriceGetterAddress])
}

export const useTokenPrices = () => {
  const { isInitialized, isLoading, data }: TokenPricesState = useSelector((state: State) => state.tokenPrices)
  return { tokenPrices: data, isInitialized, isLoading }
}

export const usePendingUsd = () => {
  const { isInitialized, isLoading, data }: StatsState = useSelector((state: State) => state.stats)
  return { pending: data?.pendingRewardUsd || 0, hasStats: isInitialized && data !== null, isInitialized, isLoading }
}

export const usePersonalTvl = () => {
  const { isInitialized, isLoading, data }: StatsState = useSelector((state: State) => state.stats)
  return { tvl: data?.tvl || 0, hasStats: isInitialized && data !== null, isInitialized, isLoading }
}

// Stats Overall- Total Banana Stats

export const useFetchStatsOverall = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    dispatch(fetchStatsOverall())
  }, [dispatch, slowRefresh])
}

export const useStatsOverall = () => {
  const { isInitialized, isLoading, data }: StatsOverallState = useSelector((state: State) => state.statsOverall)
  return { statsOverall: data, hasStats: isInitialized && data !== null, isInitialized, isLoading }
}

export const useGetPoolStats = (pid) => {
  let poolStats = {} as FarmOverall
  const { isInitialized, isLoading, data }: StatsOverallState = useSelector((state: State) => state.statsOverall)
  if (isInitialized) {
    if (pid === 0) poolStats = data?.pools[0]
    else poolStats = data?.incentivizedPools.find((pool) => pool.id === pid)
  }
  return { poolStats, hasStats: isInitialized && data !== null, isInitialized, isLoading }
}
