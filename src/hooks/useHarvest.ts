import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { updateUserBalance, updateUserPendingReward } from 'state/actions'
import { soushHarvest, soushHarvestBnb, harvest } from 'utils/callHelpers'
import { CHAIN_ID } from 'config/constants'
import track from 'utils/track'
import { fetchFarmUserEarnings } from 'state/farms/fetchFarmUser'
import { useMasterchef, useSousChef } from './useContract'
import { useMasterChefAddress, useMulticallAddress } from './useAddress'

export const useHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()
  const masterChefAddress = useMasterChefAddress()
  const multicallAddress = useMulticallAddress()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account)
    track({
      event: 'farm',
      chain: chainId,
      data: {
        cat: 'harvest',
        pid: farmPid,
      },
    })
    dispatch(fetchFarmUserEarnings(multicallAddress, masterChefAddress, account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract, multicallAddress, masterChefAddress, chainId])

  return { onReward: handleHarvest }
}

export const useAllHarvest = (farmPids: number[]) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterChefContract, pid, account)]
    }, [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, masterChefContract])

  return { onReward: handleHarvest }
}

export const useSousHarvest = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const sousChefContract = useSousChef(sousId)
  const masterChefContract = useMasterchef()
  const multicallAddress = useMulticallAddress()

  const handleHarvest = useCallback(async () => {
    if (sousId === 0) {
      await harvest(masterChefContract, 0, account)
    } else if (isUsingBnb) {
      await soushHarvestBnb(sousChefContract, account)
    } else {
      await soushHarvest(sousChefContract, account)
    }

    track({
      event: 'pool',
      chain: CHAIN_ID,
      data: {
        cat: 'harvest',
        pid: sousId,
      },
    })

    dispatch(updateUserPendingReward(multicallAddress, chainId, masterChefContract, sousId, account))
    dispatch(updateUserBalance(multicallAddress, chainId, sousId, account))
  }, [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId, multicallAddress, chainId])

  return { onReward: handleHarvest }
}
