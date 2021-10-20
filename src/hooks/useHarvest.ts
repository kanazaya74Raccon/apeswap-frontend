import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import track from 'utils/track'
import { CHAIN_ID } from 'config/constants'
import { fetchFarmUserDataAsync, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { soushHarvest, soushHarvestBnb, harvest, nfaStakeHarvest } from 'utils/callHelpers'
import { updateUserNfaStakingPendingReward, updateNfaStakingUserBalance } from 'state/nfaStakingPools'
import { useMasterchef, useNfaStakingChef, useSousChef } from './useContract'

export const useHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account)
    track({
      event: 'farm',
      chain: CHAIN_ID,
      data: {
        cat: 'harvest',
        pid: farmPid,
      },
    })
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract])

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
  const { account } = useWeb3React()
  const sousChefContract = useSousChef(sousId)
  const masterChefContract = useMasterchef()

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

    dispatch(updateUserPendingReward(sousId, account))
    dispatch(updateUserBalance(sousId, account))
  }, [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId])

  return { onReward: handleHarvest }
}

export const useNfaStakingHarvest = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const nfaStakingChef = useNfaStakingChef(sousId)
  const handleHarvest = useCallback(async () => {
    await nfaStakeHarvest(nfaStakingChef, account)
    dispatch(updateUserNfaStakingPendingReward(sousId, account))
    dispatch(updateNfaStakingUserBalance(sousId, account))
    track({
      event: 'nfa',
      chain: CHAIN_ID,
      data: {
        cat: 'harvest',
        pid: sousId,
      },
    })
  }, [account, dispatch, nfaStakingChef, sousId])

  return { onReward: handleHarvest }
}
