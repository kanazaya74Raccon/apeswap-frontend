import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { updateUserStakedBalance, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { unstake, sousUnstake, sousEmegencyWithdraw } from 'utils/callHelpers'
import { fetchFarmUserEarnings, fetchFarmUserStakedBalances } from 'state/farms/fetchFarmUser'
import { useMasterchef, useSousChef } from './useContract'
import { useMasterChefAddress, useMulticallAddress } from './useAddress'

const useUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const masterChefAddress = useMasterChefAddress()
  const multicallAddress = useMulticallAddress()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserStakedBalances(multicallAddress, masterChefAddress, account))
      dispatch(fetchFarmUserEarnings(multicallAddress, masterChefAddress, account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid, masterChefAddress, multicallAddress],
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
  const multicallAddress = useMulticallAddress()

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
      dispatch(updateUserStakedBalance(multicallAddress, chainId, masterChefContract, sousId, account))
      dispatch(updateUserBalance(multicallAddress, chainId, sousId, account))
      dispatch(updateUserPendingReward(multicallAddress, chainId, masterChefContract, sousId, account))
    },
    [account, dispatch, isOldSyrup, masterChefContract, sousChefContract, sousId, multicallAddress, chainId],
  )

  return { onUnstake: handleUnstake }
}

export const useSousEmergencyWithdraw = (sousId) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)
  const multicallAddress = useMulticallAddress()
  const handleEmergencyWithdraw = useCallback(async () => {
    const txHash = await sousEmegencyWithdraw(sousChefContract, account)
    console.info(txHash)
    dispatch(updateUserStakedBalance(multicallAddress, chainId, masterChefContract, sousId, account))
    dispatch(updateUserBalance(multicallAddress, chainId, sousId, account))
    dispatch(updateUserPendingReward(multicallAddress, chainId, masterChefContract, sousId, account))
  }, [account, dispatch, masterChefContract, sousChefContract, sousId, multicallAddress, chainId])
  return { onEmergencyWithdraw: handleEmergencyWithdraw }
}

export default useUnstake
