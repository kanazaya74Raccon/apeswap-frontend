import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import {
  updateUserStakedBalance,
  updateUserBalance,
  updateNfaStakingUserBalance,
  updateUserNfaStakingStakedBalance,
  updateJungleFarmsUserStakedBalance,
  updateJungleFarmsUserBalance,
} from 'state/actions'
import { stake, sousStake, nfaStake, stakeVault, miniChefStake } from 'utils/callHelpers'
import track from 'utils/track'
import { CHAIN_ID } from 'config/constants'
import { updateVaultUserBalance, updateVaultUserStakedBalance } from 'state/vaults'
import {
  updateDualFarmUserEarnings,
  updateDualFarmUserStakedBalances,
  updateDualFarmUserTokenBalances,
} from 'state/dualFarms'
import { useNetworkChainId } from 'state/hooks'
import { useMasterchef, useMiniChefContract, useNfaStakingChef, useSousChef, useVaultApe } from './useContract'
import useActiveWeb3React from './useActiveWeb3React'

const useStake = (pid: number) => {
  const { chainId } = useActiveWeb3React()
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      const trxHash = await stake(masterChefContract, pid, amount)
      track({
        event: 'farm',
        chain: chainId,
        data: {
          cat: 'stake',
          amount,
          pid,
        },
      })
      return trxHash
    },
    [masterChefContract, pid, chainId],
  )

  return { onStake: handleStake }
}

export const useSousStake = (sousId) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string) => {
      let trxHash
      if (sousId === 0) {
        trxHash = await stake(masterChefContract, 0, amount)
      } else {
        trxHash = await sousStake(sousChefContract, amount)
      }

      track({
        event: 'pool',
        chain: CHAIN_ID,
        data: {
          cat: 'stake',
          amount,
          pid: sousId,
        },
      })

      dispatch(updateUserStakedBalance(chainId, sousId, account))
      dispatch(updateUserBalance(chainId, sousId, account))
      return trxHash
    },
    [account, dispatch, masterChefContract, sousChefContract, sousId, chainId],
  )

  return { onStake: handleStake }
}

export const useJungleFarmStake = (sousId) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string) => {
      let trxHash
      if (sousId === 0) {
        trxHash = await stake(masterChefContract, 0, amount)
      } else {
        trxHash = await sousStake(sousChefContract, amount)
      }

      track({
        event: 'jungle_farm',
        chain: CHAIN_ID,
        data: {
          cat: 'stake',
          amount,
          pid: sousId,
        },
      })

      dispatch(updateJungleFarmsUserStakedBalance(chainId, sousId, account))
      dispatch(updateJungleFarmsUserBalance(chainId, sousId, account))
      return trxHash
    },
    [account, dispatch, masterChefContract, sousChefContract, sousId, chainId],
  )

  return { onStake: handleStake }
}

export const useNfaStake = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const chainId = useNetworkChainId()
  const nfaStakeChefContract = useNfaStakingChef(sousId)

  const handleStake = useCallback(
    async (ids: number[]) => {
      await nfaStake(nfaStakeChefContract, ids)
      dispatch(updateUserNfaStakingStakedBalance(chainId, sousId, account))
      dispatch(updateNfaStakingUserBalance(chainId, sousId, account))
      track({
        event: 'nfa',
        chain: chainId,
        data: {
          cat: 'stake',
          ids,
          pid: sousId,
        },
      })
    },
    [account, dispatch, nfaStakeChefContract, sousId, chainId],
  )

  return { onStake: handleStake }
}

export const useVaultStake = (pid: number) => {
  const { account } = useWeb3React()
  const vaultApeContract = useVaultApe()
  const dispatch = useDispatch()
  const chainId = useNetworkChainId()

  const handleStake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await stakeVault(vaultApeContract, pid, amount)
        track({
          event: 'vault',
          chain: chainId,
          data: {
            cat: 'stake',
            amount,
            pid,
          },
        })
        dispatch(updateVaultUserBalance(account, chainId, pid))
        dispatch(updateVaultUserStakedBalance(account, chainId, pid))
        console.info(txHash)
        return txHash
      } catch (e) {
        console.error(e)
      }
      return null
    },
    [account, vaultApeContract, dispatch, pid, chainId],
  )

  return { onStake: handleStake }
}

export const useDualFarmStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const miniChefContract = useMiniChefContract()
  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await miniChefStake(miniChefContract, pid, amount, account)
      dispatch(updateDualFarmUserStakedBalances(chainId, pid, account))
      dispatch(updateDualFarmUserEarnings(chainId, pid, account))
      dispatch(updateDualFarmUserTokenBalances(chainId, pid, account))
      track({
        event: 'dualFarm',
        chain: chainId,
        data: {
          cat: 'stake',
          amount,
          pid,
        },
      })
      console.info(txHash)
      return txHash
    },
    [account, dispatch, miniChefContract, pid, chainId],
  )

  return { onStake: handleStake }
}

export default useStake
