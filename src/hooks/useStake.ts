import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import {
  updateUserStakedBalance,
  updateUserBalance,
  updateNfaStakingUserBalance,
  updateUserNfaStakingStakedBalance,
} from 'state/actions'
import { stake, sousStake, sousStakeBnb, nfaStake, stakeVault, miniChefStake } from 'utils/callHelpers'
import track from 'utils/track'
import { CHAIN_ID } from 'config/constants'
import { updateFarmUserStakedBalances, updateFarmUserTokenBalances, updateFarmUserEarnings } from 'state/farms'
import { updateVaultUserBalance, updateVaultUserStakedBalance } from 'state/vaults'
import {
  updateDualFarmUserEarnings,
  updateDualFarmUserStakedBalances,
  updateDualFarmUserTokenBalances,
} from 'state/dualFarms'
import { useNetworkChainId } from 'state/hooks'
import { useMasterchef, useMiniChefContract, useNfaStakingChef, useSousChef, useVaultApe } from './useContract'

const useStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      dispatch(updateFarmUserStakedBalances(chainId, pid, account))
      dispatch(updateFarmUserTokenBalances(chainId, pid, account))
      dispatch(updateFarmUserEarnings(chainId, pid, account))
      track({
        event: 'farm',
        chain: chainId,
        data: {
          cat: 'stake',
          amount,
          pid,
        },
      })
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid, chainId],
  )

  return { onStake: handleStake }
}

export const useSousStake = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        await stake(masterChefContract, 0, amount, account)
      } else if (isUsingBnb) {
        await sousStakeBnb(sousChefContract, amount, account)
      } else {
        await sousStake(sousChefContract, amount, account)
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
    },
    [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId, chainId],
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
      await nfaStake(nfaStakeChefContract, ids, account)
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
      const txHash = await stakeVault(vaultApeContract, pid, amount, account)
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
    },
    [account, dispatch, miniChefContract, pid, chainId],
  )

  return { onStake: handleStake }
}

export default useStake
