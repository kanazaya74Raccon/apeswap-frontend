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
import { fetchFarmUserStakedBalances } from 'state/farms/fetchFarmUser'
import { updateVaultUserBalance, updateVaultUserStakedBalance } from 'state/vaults'
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
import { useMasterChefAddress, useMiniChefAddress, useNonFungibleApesAddress, useVaultApeAddress } from './useAddress'

const useStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()
  const masterChefAddress = useMasterChefAddress()
  const multicallContract = useMulticallContract()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserStakedBalances(multicallContract, masterChefAddress, account))
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
    [account, dispatch, masterChefContract, pid, chainId, masterChefAddress, multicallContract],
  )

  return { onStake: handleStake }
}

export const useSousStake = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)
  const multicallContract = useMulticallContract()

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

      dispatch(updateUserStakedBalance(multicallContract, chainId, masterChefContract, sousId, account))
      dispatch(updateUserBalance(multicallContract, chainId, sousId, account))
    },
    [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId, multicallContract, chainId],
  )

  return { onStake: handleStake }
}

export const useNfaStake = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const multicallContract = useMulticallContract()
  const chainId = useNetworkChainId()
  const nfaAddress = useNonFungibleApesAddress()
  const nfaStakeChefContract = useNfaStakingChef(sousId)

  const handleStake = useCallback(
    async (ids: number[]) => {
      await nfaStake(nfaStakeChefContract, ids, account)
      dispatch(updateUserNfaStakingStakedBalance(multicallContract, chainId, sousId, account))
      dispatch(updateNfaStakingUserBalance(multicallContract, nfaAddress, sousId, account))
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
    [account, dispatch, nfaStakeChefContract, sousId, nfaAddress, chainId, multicallContract],
  )

  return { onStake: handleStake }
}

export const useVaultStake = (pid: number) => {
  const { account } = useWeb3React()
  const vaultApeContract = useVaultApe()
  const dispatch = useDispatch()
  const multicallContract = useMulticallContract()
  const chainId = useNetworkChainId()
  const vaultApeAddress = useVaultApeAddress()

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
      dispatch(updateVaultUserBalance(multicallContract, account, chainId, pid))
      dispatch(updateVaultUserStakedBalance(multicallContract, vaultApeAddress, account, chainId, pid))
      console.info(txHash)
    },
    [account, vaultApeContract, dispatch, pid, chainId, multicallContract, vaultApeAddress],
  )

  return { onStake: handleStake }
}

export const useDualFarmStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const miniChefContract = useMiniChefContract()
  const miniChefAddress = useMiniChefAddress()
  const multicallContract = useMulticallContract()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await miniChefStake(miniChefContract, pid, amount, account)
      track({
        event: 'dualFarm',
        chain: chainId,
        data: {
          cat: 'stake',
          amount,
          pid,
        },
      })
      dispatch(updateDualFarmUserStakedBalances(multicallContract, miniChefAddress, pid, account))
      dispatch(updateDualFarmUserEarnings(multicallContract, miniChefAddress, pid, account))
      dispatch(updateDualFarmUserTokenBalances(multicallContract, pid, account))
      console.info(txHash)
    },
    [account, dispatch, miniChefContract, pid, chainId, miniChefAddress, multicallContract],
  )

  return { onStake: handleStake }
}

export default useStake
