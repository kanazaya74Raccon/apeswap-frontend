import { ReactNode, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { kebabCase } from 'lodash'
import { useWeb3React } from '@web3-react/core'
import { Toast, toastTypes } from '@apeswapfinance/uikit'
import { useSelector } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { useLiquidityData } from 'hooks/api'
import useTokenBalance, { useAccountTokenBalance } from 'hooks/useTokenBalance'
import { CHAIN_ID } from 'config/constants/chains'
import { useBananaAddress, useTreasuryAddress } from 'hooks/useAddress'
import useBlock from 'hooks/useBlock'
import { useAppDispatch } from 'state'
import useSwitchNetwork from 'hooks/useSelectNetwork'
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
  Vault,
  VaultsState,
  TokenPricesState,
  IazosState,
  Iazo,
  NfaStakingPool,
  DualFarm,
  HomepageData,
} from './types'
import { fetchNfaStakingPoolsPublicDataAsync, fetchNfaStakingPoolsUserDataAsync } from './nfaStakingPools'
import { fetchProfile } from './profile'
import { fetchHomepageData, fetchStats } from './stats'
import { fetchStatsOverall } from './statsOverall'
import { fetchAuctions } from './auction'
import { fetchVaultsPublicDataAsync, fetchVaultUserDataAsync, setFilteredVaults, setVaultsLoad } from './vaults'
import { fetchTokenPrices } from './tokenPrices'
import { fetchIazo, fetchIazos, fetchSettings } from './iazos'
import { fetchFarmUserDataAsync } from './farms'
import { fetchUserNetwork } from './network'
import { fetchDualFarmsPublicDataAsync, fetchDualFarmUserDataAsync } from './dualFarms'

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
  const { chainId, account } = useWeb3React()
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

export const useFetchPublicData = () => {
  const chainId = useNetworkChainId()
  const { tokenPrices } = useTokenPrices()
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    if (chainId === CHAIN_ID.BSC) {
      dispatch(fetchFarmsPublicDataAsync(chainId))
      dispatch(fetchPoolsPublicDataAsync(chainId, tokenPrices))
    }
  }, [dispatch, slowRefresh, tokenPrices, chainId])
}

// Vault data
export const usePollVaultsData = (includeArchive = false) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()
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

// Dual Farms

export const usePollDualFarms = () => {
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const { tokenPrices } = useTokenPrices()
  const chainId = useNetworkChainId()
  useEffect(() => {
    dispatch(fetchDualFarmsPublicDataAsync(tokenPrices, chainId))
    if (account) {
      dispatch(fetchDualFarmUserDataAsync(chainId, account))
    }
  }, [account, dispatch, chainId, tokenPrices, slowRefresh])
}

export const useDualFarms = (): DualFarm[] => {
  const dualFarms = useSelector((state: State) => state.dualFarms.data)
  return dualFarms
}

export const useDualFarmsFromPid = (pid): DualFarm => {
  const farm = useSelector((state: State) => state.dualFarms.data.find((f) => f.pid === pid))
  return farm
}

// Farms

export const useFarms = (account): Farm[] => {
  const { slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  const { chainId } = useWeb3React()
  useEffect(() => {
    if (account && (chainId === CHAIN_ID.BSC || chainId === CHAIN_ID.BSC_TESTNET)) {
      dispatch(fetchFarmUserDataAsync(chainId, account))
    }
  }, [account, dispatch, slowRefresh, chainId])
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
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  const { chainId } = useWeb3React()
  useEffect(() => {
    if (account && (chainId === CHAIN_ID.BSC || chainId === CHAIN_ID.BSC_TESTNET)) {
      dispatch(fetchPoolsUserDataAsync(chainId, account))
    }
  }, [account, dispatch, fastRefresh, chainId])

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
  const { account } = useWeb3React()
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

export const usePriceBnbBusd = (): BigNumber => {
  const pid = 3 // BUSD-BNB LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(1).div(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceBananaBusd = (): BigNumber => {
  const tokenPrices = useTokenPrices()
  const price = new BigNumber(tokenPrices?.tokenPrices?.find((token) => token.symbol === 'BANANA')?.price)
  return price || ZERO
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
  const dispatch = useAppDispatch()
  const helpers = useMemo(() => {
    const push = (toast: Toast) => dispatch(pushToast(toast))

    return {
      toastError: (title: string, description?: ReactNode) => {
        return push({ id: kebabCase(title), type: toastTypes.DANGER, title, description })
      },
      toastInfo: (title: string, description?: ReactNode) => {
        return push({ id: kebabCase(title), type: toastTypes.INFO, title, description })
      },
      toastSuccess: (title: string, description?: ReactNode) => {
        return push({ id: kebabCase(title), type: toastTypes.SUCCESS, title, description })
      },
      toastWarning: (title: string, description?: ReactNode) => {
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
  const dispatch = useAppDispatch()
  const chainId = CHAIN_ID.BSC
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    dispatch(fetchProfile(chainId, account))
  }, [account, dispatch, slowRefresh, chainId])
}

export const useProfile = () => {
  const { isInitialized, isLoading, data }: ProfileState = useSelector((state: State) => state.profile)
  return { profile: data, hasProfile: isInitialized && data !== null, isInitialized, isLoading }
}

// Stats - individual stats
export const useFetchStats = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const { statsOverall } = useStatsOverall()
  const block = useBlock()
  const farms = useFarms(account)
  const pools = usePools(account)
  const { slowRefresh } = useRefresh()
  const bananaBalance = useTokenBalance(useBananaAddress())
  const [render, setRender] = useState(false)

  // Stats was rendering an insane amount so hot fix until its redone
  if (account && farms && pools && statsOverall && render && block) {
    dispatch(fetchStats(pools, farms, statsOverall, bananaBalance, block))
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

export const useFetchHomepageStats = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    dispatch(fetchHomepageData())
  }, [slowRefresh, dispatch])
}

export const useHomepageStats = (): HomepageData => {
  const homepageStats = useSelector((state: State) => state.stats.HomepageData)
  return homepageStats
}

export const useFetchAuctions = () => {
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  const chainId = useNetworkChainId()

  useEffect(() => {
    if (chainId === CHAIN_ID.BSC || chainId === CHAIN_ID.BSC_TESTNET) {
      dispatch(fetchAuctions(chainId))
    }
  }, [dispatch, fastRefresh, chainId])
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
  const chainId = useNetworkChainId()
  useEffect(() => {
    dispatch(fetchTokenPrices(chainId))
  }, [dispatch, slowRefresh, chainId])
}

export const useTokenPrices = () => {
  const { isInitialized, isLoading, data }: TokenPricesState = useSelector((state: State) => state.tokenPrices)
  return { tokenPrices: data, isInitialized, isLoading }
}

export const useTokenPriceFromSymbol = (symbol: string) => {
  const tokenPrice = useSelector((state: State) =>
    state.tokenPrices.data.find((token) => token.symbol === symbol),
  ).price
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

export const useGetPoolStats = (pid) => {
  let poolStats = {} as FarmOverall
  const { isInitialized, isLoading, data }: StatsOverallState = useSelector((state: State) => state.statsOverall)
  if (isInitialized) {
    if (pid === 0) poolStats = data?.pools[0]
    else poolStats = data?.incentivizedPools.find((pool) => pool.id === pid)
  }
  return { poolStats, hasStats: isInitialized && data !== null, isInitialized, isLoading }
}
