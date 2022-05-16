import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Toast, toastTypes } from '@apeswapfinance/uikit'
import { useSelector } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { useLiquidityData } from 'hooks/api'
import { useAccountTokenBalance } from 'hooks/useTokenBalance'
import { CHAIN_ID } from 'config/constants/chains'
import { useBananaAddress, useTreasuryAddress } from 'hooks/useAddress'
import { useAppDispatch } from 'state'
import useSwitchNetwork from 'hooks/useSelectNetwork'
import {
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  push as pushToast,
  remove as removeToast,
  clear as clearToast,
} from './actions'
import {
  State,
  Pool,
  ProfileState,
  StatsState,
  StatsOverallState,
  FarmOverall,
  AuctionsState,
  Vault,
  VaultsState,
  TokenPricesState,
  IazosState,
  Iazo,
  NfaStakingPool,
  HomepageData,
  LpTokenPricesState,
  NfaState,
  HomepageTokenStats,
  NewsCardType,
  LaunchCalendarCard,
  ServiceData,
  FarmLpAprsType,
  PoolsState,
} from './types'
import { fetchNfaStakingPoolsPublicDataAsync, fetchNfaStakingPoolsUserDataAsync } from './nfaStakingPools'
import { fetchProfile } from './profile'
import {
  fetchFarmLpAprs,
  fetchHomepageData,
  fetchHomepageLaunchCalendar,
  fetchHomepageNews,
  fetchHomepageService,
  fetchHomepageTokenData,
  fetchLiveIfoStatus,
} from './stats'
import { fetchAuctions } from './auction'
import { fetchVaultsPublicDataAsync, fetchVaultUserDataAsync, setFilteredVaults, setVaultsLoad } from './vaults'
import { fetchTokenPrices } from './tokenPrices'
import { fetchIazo, fetchIazos, fetchSettings } from './iazos'
import { fetchUserNetwork } from './network'
import { fetchLpTokenPrices } from './lpPrices'
import { fetchAllNfas } from './nfas'

const ZERO = new BigNumber(0)

// Network

export const useNetworkChainId = (): number => {
  const chainId = useSelector((state: State) => state.network.data.chainId)
  return chainId
}

export const useNetworkChainIdFromUrl = (): boolean => {
  const chainIdFromUrl = useSelector((state: State) => state.network.data.chainIdFromUrl)
  return chainIdFromUrl
}

export const useUpdateNetwork = () => {
  const dispatch = useAppDispatch()
  const { chainId, account } = useActiveWeb3React()
  const appChainId = useNetworkChainId()
  const chainIdFromUrl = useNetworkChainIdFromUrl()
  const { switchNetwork } = useSwitchNetwork()
  useEffect(() => {
    if (chainIdFromUrl) {
      switchNetwork(appChainId)
    } else {
      dispatch(fetchUserNetwork(chainId, account, appChainId))
    }
    // Load initial vault state in update netowrk to stop mount re-render
    dispatch(setVaultsLoad(false))
  }, [chainId, account, appChainId, chainIdFromUrl, switchNetwork, dispatch])
}

// Fetch public pool and farm data

export const usePollPools = () => {
  const chainId = useNetworkChainId()
  const { tokenPrices } = useTokenPrices()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (chainId === CHAIN_ID.BSC) {
      dispatch(fetchPoolsPublicDataAsync(chainId, tokenPrices))
    }
  }, [dispatch, tokenPrices, chainId])
}

// Vault data
export const usePollVaultsData = (includeArchive = false) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useActiveWeb3React()
  const chainId = useNetworkChainId()
  const { tokenPrices } = useTokenPrices()
  useEffect(() => {
    dispatch(setFilteredVaults(chainId))
    dispatch(fetchVaultsPublicDataAsync(chainId, tokenPrices))
    if (account) {
      dispatch(fetchVaultUserDataAsync(account, chainId))
    }
  }, [includeArchive, dispatch, slowRefresh, account, chainId, tokenPrices])
}

// Vaults

export const useVaults = () => {
  const { loadVaultData, userDataLoaded, data }: VaultsState = useSelector((state: State) => state.vaults)
  return { vaults: data, loadVaultData, userDataLoaded }
}

export const useVaultFromPid = (pid): Vault => {
  const vault = useSelector((state: State) => state.vaults.data.find((v) => v.pid === pid))
  return vault
}

export const useVaultUser = (pid) => {
  const vault = useVaultFromPid(pid)

  return {
    allowance: vault.userData ? new BigNumber(vault.userData.allowance) : new BigNumber(0),
    tokenBalance: vault.userData ? new BigNumber(vault.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: vault.userData ? new BigNumber(vault.userData.stakedBalance) : new BigNumber(0),
    stakedWantBalance: vault.userData ? new BigNumber(vault.userData.stakedWantBalance) : new BigNumber(0),
  }
}

// Pools

export const usePools = (account): Pool[] => {
  const { slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  const { chainId } = useActiveWeb3React()
  useEffect(() => {
    if (account && (chainId === CHAIN_ID.BSC || chainId === CHAIN_ID.BSC_TESTNET)) {
      dispatch(fetchPoolsUserDataAsync(chainId, account))
    }
  }, [account, dispatch, slowRefresh, chainId])

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

// NfaStakingPools

export const usePollNfaStakingData = () => {
  const { slowRefresh } = useRefresh()
  const { account } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const chainId = useNetworkChainId()
  const { tokenPrices } = useTokenPrices()
  useEffect(() => {
    dispatch(fetchNfaStakingPoolsPublicDataAsync(chainId, tokenPrices))
    if (account) {
      dispatch(fetchNfaStakingPoolsUserDataAsync(chainId, account))
    }
  }, [account, dispatch, chainId, tokenPrices, slowRefresh])
}

export const useNfaStakingPools = (): NfaStakingPool[] => {
  const nfaStakingPools = useSelector((state: State) => state.nfaStakingPools.data)
  return nfaStakingPools
}

export const useNfaStakingPoolFromPid = (sousId): NfaStakingPool => {
  const nfaStakingPool = useSelector((state: State) => state.nfaStakingPools.data.find((p) => p.sousId === sousId))
  return nfaStakingPool
}

export const useAllNfaStakingPools = (): NfaStakingPool[] => {
  const nfaStakingPools = useSelector((state: State) => state.nfaStakingPools.data)
  return nfaStakingPools
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
    if (pool?.stakingToken?.symbol === 'BANANA') {
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

export const usePriceBananaBusd = (): BigNumber => {
  const tokenPrices = useTokenPrices()
  const price = new BigNumber(tokenPrices?.tokenPrices?.find((token) => token.symbol === 'BANANA')?.price)
  return price || ZERO
}

export const usePriceBnbBusd = (): BigNumber => {
  const tokenPrices = useTokenPrices()
  const price = new BigNumber(tokenPrices?.tokenPrices?.find((token) => token.symbol === 'BNB')?.price)
  return price || ZERO
}

export const usePriceGnanaBusd = (): BigNumber => {
  const bananaPrice = usePriceBananaBusd()
  return bananaPrice.times(1.3889)
}

/*
  // TODO Revisit this 
  const pid = BANANA_POOL_PID // BANANA-BNB LP
  const bnbPriceUSD = usePriceBnbBusd()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  */

// Toasts
export const useToast = () => {
  const dispatch = useAppDispatch()
  const helpers = useMemo(() => {
    const push = (toast: Toast) => dispatch(pushToast(toast))

    return {
      toastError: (description: string, action?: any) => {
        return push({
          id: description,
          title: description,
          description,
          action,
          type: toastTypes.ERROR,
        })
      },
      toastInfo: (description: string, action?: any) => {
        return push({
          id: description,
          title: description,
          description,
          action,
          type: toastTypes.INFO,
        })
      },
      toastSuccess: (description: string, action?: any) => {
        return push({
          id: description,
          title: description,
          description,
          action,
          type: toastTypes.SUCCESS,
        })
      },
      toastWarning: (description: string, action?: any) => {
        return push({
          id: description,
          title: description,
          description,
          action,
          type: toastTypes.DANGER,
        })
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
  const { account } = useActiveWeb3React()
  const getNfas = !!account
  useFetchNfas(getNfas)
  const dispatch = useAppDispatch()
  const chainId = CHAIN_ID.BSC
  const { slowRefresh } = useRefresh()
  const { nfas } = useNfas()

  useEffect(() => {
    if (account) {
      dispatch(fetchProfile(nfas, chainId, account))
    }
  }, [account, dispatch, nfas, slowRefresh, chainId])
}

export const useProfile = () => {
  const { isInitialized, isLoading, data }: ProfileState = useSelector((state: State) => state.profile)
  return { profile: data, hasProfile: isInitialized && data !== null, isInitialized, isLoading }
}

export const useFetchHomepageStats = (isFetching: boolean) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    if (isFetching) {
      dispatch(fetchHomepageData())
    }
  }, [slowRefresh, isFetching, dispatch])
}

export const useHomepageStats = (): HomepageData => {
  const homepageStats = useSelector((state: State) => state.stats.HomepageData)
  return homepageStats
}

export const useFetchHomepageServiceStats = (isFetching: boolean) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    if (isFetching) {
      dispatch(fetchHomepageService())
    }
  }, [slowRefresh, isFetching, dispatch])
}

export const useHomepageServiceStats = (): ServiceData[] => {
  const homepageServiceStats = useSelector((state: State) => state.stats.HomepageServiceStats)
  return homepageServiceStats
}

export const useFetchHomepageTokenStats = (isFetching: boolean, category: string) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    if (isFetching) {
      dispatch(fetchHomepageTokenData(category))
    }
  }, [slowRefresh, isFetching, category, dispatch])
}

export const useHomepageTokenStats = (): HomepageTokenStats[] => {
  const homepageTokenStats = useSelector((state: State) => state.stats.HomepageTokenStats)
  return homepageTokenStats
}

export const useFetchFarmLpAprs = (chainId) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    dispatch(fetchFarmLpAprs(chainId))
  }, [slowRefresh, chainId, dispatch])
}

export const useFarmLpAprs = (): FarmLpAprsType => {
  const farmLpAprs = useSelector((state: State) => state.stats.FarmLpAprs)
  return farmLpAprs
}

export const useFetchHomepageNews = (isFetching: boolean) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    if (isFetching) {
      dispatch(fetchHomepageNews())
    }
  }, [slowRefresh, isFetching, dispatch])
}

export const useHomepageLaunchCalendar = (): LaunchCalendarCard[] => {
  const homepageLaunchCalendar = useSelector((state: State) => state.stats.HomepageLaunchCalendar)
  return homepageLaunchCalendar
}

export const useFetchHomepageLaunchCalendar = (isFetching: boolean) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    if (isFetching) {
      dispatch(fetchHomepageLaunchCalendar())
    }
  }, [slowRefresh, isFetching, dispatch])
}

export const useHomepageNews = (): NewsCardType[] => {
  const homepageNews = useSelector((state: State) => state.stats.HomepageNews)
  return homepageNews
}

export const useFetchAuctions = () => {
  useFetchNfas()
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  const chainId = useNetworkChainId()
  const { nfas } = useNfas()

  useEffect(() => {
    if (chainId === CHAIN_ID.BSC || chainId === CHAIN_ID.BSC_TESTNET) {
      dispatch(fetchAuctions(nfas, chainId))
    }
  }, [dispatch, fastRefresh, nfas, chainId])
}

export const useAuctions = () => {
  const { isInitialized, isLoading, data }: AuctionsState = useSelector((state: State) => state.auctions)
  return { auctions: data, isInitialized, isLoading }
}

export const useFetchIazoSettings = () => {
  const dispatch = useAppDispatch()
  const chainId = useNetworkChainId()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchSettings(chainId))
  }, [dispatch, slowRefresh, chainId])
}

export const useFetchIazos = () => {
  const dispatch = useAppDispatch()
  const chainId = useNetworkChainId()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchIazos(chainId))
  }, [dispatch, slowRefresh, chainId])
}

export const useFetchIazo = (address: string) => {
  const dispatch = useAppDispatch()
  const chainId = useNetworkChainId()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchIazo(chainId, address))
  }, [dispatch, fastRefresh, chainId, address])
}

export const useIazos = () => {
  const { isInitialized, isLoading, iazoData }: IazosState = useSelector((state: State) => state.iazos)
  return { iazos: iazoData, isInitialized, isLoading }
}

export const useIazoSettings = () => {
  const { iazoDefaultSettings }: IazosState = useSelector((state: State) => state.iazos)
  return iazoDefaultSettings
}

export const useIazoFromAddress = (address): Iazo => {
  const iazo: Iazo = useSelector((state: State) => state.iazos.iazoData.find((i) => i.iazoContractAddress === address))
  return iazo
}

export const useFetchTokenPrices = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const { chainId } = useActiveWeb3React()
  useEffect(() => {
    dispatch(fetchTokenPrices(chainId))
  }, [dispatch, slowRefresh, chainId])
}

export const useTokenPrices = () => {
  const { isInitialized, isLoading, data }: TokenPricesState = useSelector((state: State) => state.tokenPrices)
  return { tokenPrices: data, isInitialized, isLoading }
}

export const useFetchNfas = (nafFlag = true) => {
  const dispatch = useAppDispatch()
  const chainId = useNetworkChainId()
  useEffect(() => {
    if (nafFlag) {
      dispatch(fetchAllNfas())
    }
  }, [dispatch, nafFlag, chainId])
}

export const useNfas = () => {
  const { isInitialized, isLoading, data }: NfaState = useSelector((state: State) => state.nfas)
  return { nfas: data, isInitialized, isLoading }
}

export const useFetchLpTokenPrices = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const { chainId } = useActiveWeb3React()
  useEffect(() => {
    dispatch(fetchLpTokenPrices(chainId))
  }, [dispatch, slowRefresh, chainId])
}

export const useLpTokenPrices = () => {
  const { isInitialized, isLoading, data }: LpTokenPricesState = useSelector((state: State) => state.lpTokenPrices)
  return { lpTokenPrices: data, isInitialized, isLoading }
}

export const useTokenPriceFromSymbol = (symbol: string) => {
  const tokenPrice = useSelector((state: State) =>
    state.tokenPrices.data?.find((token) => token.symbol === symbol),
  )?.price
  return tokenPrice
}

export const useTokenPriceFromAddress = (address: string) => {
  const chainId = useNetworkChainId()
  const tokenPrice = useSelector((state: State) =>
    state?.tokenPrices?.data?.find((token) => token.address[chainId].toLowerCase() === address.toLowerCase()),
  )?.price
  return tokenPrice
}

export const usePendingUsd = () => {
  const { isInitialized, isLoading, data }: StatsState = useSelector((state: State) => state.stats)
  return { pending: data?.pendingRewardUsd || 0, hasStats: isInitialized && data !== null, isInitialized, isLoading }
}

export const usePersonalTvl = () => {
  const { isInitialized, isLoading, data }: StatsState = useSelector((state: State) => state.stats)
  return { tvl: data?.tvl || 0, hasStats: isInitialized && data !== null, isInitialized, isLoading }
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

export const usePoolTags = () => {
  const { tags }: PoolsState = useSelector((state: State) => state.pools)
  return { poolTags: tags }
}

export const useFetchLiveIfoStatus = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchLiveIfoStatus())
  }, [dispatch, slowRefresh])
}

export const useLiveIfoStatus = () => {
  const { LiveIfo }: StatsState = useSelector((state: State) => state.stats)

  return { liveIfos: LiveIfo }
}
