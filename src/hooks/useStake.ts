import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import {
  updateUserStakedBalance,
  updateUserBalance,
  updateNfaStakingUserBalance,
  updateUserNfaStakingStakedBalance,
} from 'state/actions'
import { stake, sousStake, sousStakeBnb, nfaStake } from 'utils/callHelpers'
import track from 'utils/track'
import { CHAIN_ID } from 'config/constants'
import { fetchFarmUserStakedBalances } from 'state/farms/fetchFarmUser'
import { useMasterchef, useNfaStakingChef, useSousChef } from './useContract'
import { useMasterChefAddress, useMulticallAddress } from './useAddress'

const useStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()
  const masterChefAddress = useMasterChefAddress()
  const multicallAddress = useMulticallAddress()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserStakedBalances(multicallAddress, masterChefAddress, account))
      track({
        event: 'farm',
        chain: chainId,
        data: {
          cat: 'stake',
          amount,
          pid,
        },
      })
    },
    [account, dispatch, masterChefContract, pid, chainId, masterChefAddress, multicallAddress],
  )

  return { onStake: handleStake }
}

export const useSousStake = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)
  const multicallAddress = useMulticallAddress()

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

      dispatch(updateUserStakedBalance(multicallAddress, chainId, masterChefContract, sousId, account))
      dispatch(updateUserBalance(multicallAddress, chainId, sousId, account))
    },
    [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId, multicallAddress, chainId],
  )

  return { onStake: handleStake }
}

export const useNfaStake = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const nfaStakeChefContract = useNfaStakingChef(sousId)

  const handleStake = useCallback(
    async (ids: number[]) => {
      await nfaStake(nfaStakeChefContract, ids, account)
      dispatch(updateUserNfaStakingStakedBalance(sousId, account))
      dispatch(updateNfaStakingUserBalance(sousId, account))
    },
    [account, dispatch, nfaStakeChefContract, sousId],
  )

  return { onStake: handleStake }
}

export default useStake
