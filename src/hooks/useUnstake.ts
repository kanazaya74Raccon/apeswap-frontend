import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import {
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
  updateUserNfaStakingStakedBalance,
  updateNfaStakingUserBalance,
  updateUserNfaStakingPendingReward,
} from 'state/actions'
import {
  unstake,
  sousUnstake,
  sousEmegencyWithdraw,
  nfaUnstake,
  vaultUnstake,
  vaultUnstakeAll,
  miniChefUnstake,
} from 'utils/callHelpers'
import { fetchFarmUserEarnings, fetchFarmUserStakedBalances } from 'state/farms/fetchFarmUser'
import {
  updateDualFarmUserEarnings,
  updateDualFarmUserStakedBalances,
  updateDualFarmUserTokenBalances,
} from 'state/dualFarms'
import { useNetworkChainId } from 'state/hooks'
import {
  useMasterchef,
  useMiniChefContract,
  useMulticallContract,
  useNfaStakingChef,
  useSousChef,
  useVaultApe,
} from './useContract'
import { useMasterChefAddress, useMiniChefAddress, useNonFungibleApesAddress } from './useAddress'

const useUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const masterChefAddress = useMasterChefAddress()
  const multicallContract = useMulticallContract()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserStakedBalances(multicallContract, masterChefAddress, account))
      dispatch(fetchFarmUserEarnings(multicallContract, masterChefAddress, account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid, masterChefAddress, multicallContract],
  )

  return { onUnstake: handleUnstake }
}

// TODO remove legacy code we don't need to support
const SYRUPIDS = []

export const useSousUnstake = (sousId) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)
  const isOldSyrup = SYRUPIDS.includes(sousId)
  const multicallContract = useMulticallContract()

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        const txHash = await unstake(masterChefContract, 0, amount, account)
        console.info(txHash)
      } else if (isOldSyrup) {
        const txHash = await sousEmegencyWithdraw(sousChefContract, account)
        console.info(txHash)
      } else {
        const txHash = await sousUnstake(sousChefContract, amount, account)
        console.info(txHash)
      }
      dispatch(updateUserStakedBalance(multicallContract, chainId, masterChefContract, sousId, account))
      dispatch(updateUserBalance(multicallContract, chainId, sousId, account))
      dispatch(updateUserPendingReward(multicallContract, chainId, masterChefContract, sousId, account))
    },
    [account, dispatch, isOldSyrup, masterChefContract, sousChefContract, sousId, multicallContract, chainId],
  )

  return { onUnstake: handleUnstake }
}

export const useSousEmergencyWithdraw = (sousId) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)
  const multicallContract = useMulticallContract()
  const handleEmergencyWithdraw = useCallback(async () => {
    const txHash = await sousEmegencyWithdraw(sousChefContract, account)
    console.info(txHash)
    dispatch(updateUserStakedBalance(multicallContract, chainId, masterChefContract, sousId, account))
    dispatch(updateUserBalance(multicallContract, chainId, sousId, account))
    dispatch(updateUserPendingReward(multicallContract, chainId, masterChefContract, sousId, account))
  }, [account, dispatch, masterChefContract, sousChefContract, sousId, multicallContract, chainId])
  return { onEmergencyWithdraw: handleEmergencyWithdraw }
}

export const useNfaUnstake = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const multicallContract = useMulticallContract()
  const chainId = useNetworkChainId()
  const nfaAddress = useNonFungibleApesAddress()
  const nfaStakeChefContract = useNfaStakingChef(sousId)

  const handleUnstake = useCallback(
    async (ids: number[]) => {
      await nfaUnstake(nfaStakeChefContract, ids, account)
      dispatch(updateUserNfaStakingStakedBalance(multicallContract, chainId, sousId, account))
      dispatch(updateNfaStakingUserBalance(multicallContract, nfaAddress, sousId, account))
      dispatch(updateUserNfaStakingPendingReward(multicallContract, chainId, sousId, account))
    },
    [account, dispatch, nfaStakeChefContract, sousId, nfaAddress, chainId, multicallContract],
  )

  return { onUnstake: handleUnstake }
}

export const useVaultUnstake = (pid: number) => {
  const { account } = useWeb3React()
  const vaultApeContrct = useVaultApe()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await vaultUnstake(vaultApeContrct, pid, amount, account)
      console.info(txHash)
    },
    [account, vaultApeContrct, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useVaultUnstakeAll = (pid: number) => {
  const { account } = useWeb3React()
  const vaultApeContrct = useVaultApe()

  const handleUnstake = useCallback(async () => {
    const txHash = await vaultUnstakeAll(vaultApeContrct, pid, account)
    console.info(txHash)
  }, [account, vaultApeContrct, pid])

  return { onUnstakeAll: handleUnstake }
}

export const useMiniChefUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const miniChefContract = useMiniChefContract()
  const miniChefAddress = useMiniChefAddress()
  const multicallContract = useMulticallContract()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await miniChefUnstake(miniChefContract, pid, amount, account)
      dispatch(updateDualFarmUserEarnings(multicallContract, miniChefAddress, pid, account))
      dispatch(updateDualFarmUserStakedBalances(multicallContract, miniChefAddress, pid, account))
      dispatch(updateDualFarmUserTokenBalances(multicallContract, pid, account))
      console.info(txHash)
    },
    [account, dispatch, miniChefContract, pid, miniChefAddress, multicallContract],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
