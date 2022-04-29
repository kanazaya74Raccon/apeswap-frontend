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
import {
  updateDualFarmUserEarnings,
  updateDualFarmUserStakedBalances,
  updateDualFarmUserTokenBalances,
} from 'state/dualFarms'
import { useNetworkChainId } from 'state/hooks'
import { useMasterchef, useMiniChefContract, useNfaStakingChef, useSousChef, useVaultApe } from './useContract'
import useActiveWeb3React from './useActiveWeb3React'

const useUnstake = (pid: number) => {
  const { chainId } = useActiveWeb3React()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const trxHash = await unstake(masterChefContract, pid, amount)
      track({
        event: 'farm',
        chain: chainId,
        data: {
          cat: 'unstake',
          amount,
          pid,
        },
      })
      return trxHash
    },
    [masterChefContract, pid, chainId],
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
      let trxHash
      if (sousId === 0) {
        trxHash = await unstake(masterChefContract, 0, amount)
      } else if (isOldSyrup) {
        trxHash = await sousEmegencyWithdraw(sousChefContract)
      } else {
        trxHash = await sousUnstake(sousChefContract, amount)
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
      return trxHash
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
    const txHash = await sousEmegencyWithdraw(sousChefContract)
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
      await nfaUnstake(nfaStakeChefContract, ids)
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
      try {
        const txHash = await vaultUnstake(vaultApeContract, pid, amount)
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
      } catch (e) {
        console.error(e)
      }
    },
    [account, vaultApeContract, dispatch, pid, chainId],
  )
  return { onUnstake: handleUnstake }
}

export const useVaultUnstakeAll = (pid: number) => {
  const { account, chainId } = useWeb3React()
  const vaultApeContract = useVaultApe()
  const dispatch = useDispatch()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await vaultUnstakeAll(vaultApeContract, pid)
      track({
        event: 'vault',
        chain: chainId,
        data: {
          cat: 'unstakeAll',
          amount,
          pid,
        },
      })
      dispatch(updateVaultUserBalance(account, chainId, pid))
      dispatch(updateVaultUserStakedBalance(account, chainId, pid))
      console.info(txHash)
    },
    [account, vaultApeContract, chainId, dispatch, pid],
  )

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
