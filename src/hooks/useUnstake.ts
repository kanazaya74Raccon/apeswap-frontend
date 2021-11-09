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
import { updateVaultUserBalance, updateVaultUserStakedBalance } from 'state/vaults'
import track from 'utils/track'
import {
  unstake,
  sousUnstake,
  sousEmegencyWithdraw,
  nfaUnstake,
  vaultUnstake,
  vaultUnstakeAll,
  miniChefUnstake,
} from 'utils/callHelpers'
import { updateFarmUserStakedBalances, updateFarmUserTokenBalances, updateFarmUserEarnings } from 'state/farms'
import {
  updateDualFarmUserEarnings,
  updateDualFarmUserStakedBalances,
  updateDualFarmUserTokenBalances,
} from 'state/dualFarms'
import { useNetworkChainId } from 'state/hooks'
import { useMasterchef, useMiniChefContract, useNfaStakingChef, useSousChef, useVaultApe } from './useContract'

const useUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(updateFarmUserStakedBalances(chainId, pid, account))
      dispatch(updateFarmUserTokenBalances(chainId, pid, account))
      dispatch(updateFarmUserEarnings(chainId, pid, account))
      track({
        event: 'farm',
        chain: chainId,
        data: {
          cat: 'unstake',
          amount,
          pid,
        },
      })
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid, chainId],
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
      dispatch(updateUserStakedBalance(chainId, sousId, account))
      dispatch(updateUserBalance(chainId, sousId, account))
      dispatch(updateUserPendingReward(chainId, sousId, account))
      track({
        event: 'pool',
        chain: chainId,
        data: {
          cat: 'unstake',
          amount,
          sousId,
        },
      })
    },
    [account, dispatch, isOldSyrup, masterChefContract, sousChefContract, sousId, chainId],
  )

  return { onUnstake: handleUnstake }
}

export const useSousEmergencyWithdraw = (sousId) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const sousChefContract = useSousChef(sousId)
  const handleEmergencyWithdraw = useCallback(async () => {
    const txHash = await sousEmegencyWithdraw(sousChefContract, account)
    dispatch(updateUserStakedBalance(chainId, sousId, account))
    dispatch(updateUserBalance(chainId, sousId, account))
    dispatch(updateUserPendingReward(chainId, sousId, account))
    console.info(txHash)
  }, [account, dispatch, sousChefContract, sousId, chainId])
  return { onEmergencyWithdraw: handleEmergencyWithdraw }
}

export const useNfaUnstake = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const chainId = useNetworkChainId()
  const nfaStakeChefContract = useNfaStakingChef(sousId)

  const handleUnstake = useCallback(
    async (ids: number[]) => {
      await nfaUnstake(nfaStakeChefContract, ids, account)
      dispatch(updateUserNfaStakingStakedBalance(chainId, sousId, account))
      dispatch(updateNfaStakingUserBalance(chainId, sousId, account))
      dispatch(updateUserNfaStakingPendingReward(chainId, sousId, account))
      track({
        event: 'nfa',
        chain: chainId,
        data: {
          cat: 'unstake',
          ids,
        },
      })
    },
    [account, dispatch, nfaStakeChefContract, sousId, chainId],
  )

  return { onUnstake: handleUnstake }
}

export const useVaultUnstake = (pid: number) => {
  const { account, chainId } = useWeb3React()
  const vaultApeContract = useVaultApe()
  const dispatch = useDispatch()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await vaultUnstake(vaultApeContract, pid, amount, account)
      track({
        event: 'vault',
        chain: chainId,
        data: {
          cat: 'unstake',
          amount,
          pid,
        },
      })
      dispatch(updateVaultUserBalance(account, chainId, pid))
      dispatch(updateVaultUserStakedBalance(account, chainId, pid))
      console.info(txHash)
    },
    [account, vaultApeContract, dispatch, pid, chainId],
  )
  return { onUnstake: handleUnstake }
}

export const useVaultUnstakeAll = (pid: number) => {
  const { account, chainId } = useWeb3React()
  const vaultApeContract = useVaultApe()
  const dispatch = useDispatch()

  const handleUnstake = useCallback(async () => {
    const txHash = await vaultUnstakeAll(vaultApeContract, pid, account)
    track({
      event: 'vault',
      chain: chainId,
      data: {
        cat: 'unstakeAll',
        pid,
      },
    })
    dispatch(updateVaultUserBalance(account, chainId, pid))
    dispatch(updateVaultUserStakedBalance(account, chainId, pid))
    console.info(txHash)
  }, [account, vaultApeContract, chainId, dispatch, pid])

  return { onUnstakeAll: handleUnstake }
}

export const useMiniChefUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const miniChefContract = useMiniChefContract()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await miniChefUnstake(miniChefContract, pid, amount, account)
      dispatch(updateDualFarmUserEarnings(chainId, pid, account))
      dispatch(updateDualFarmUserStakedBalances(chainId, pid, account))
      dispatch(updateDualFarmUserTokenBalances(chainId, pid, account))
      console.info(txHash)
    },
    [account, dispatch, miniChefContract, pid, chainId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
