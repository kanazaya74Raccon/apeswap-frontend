import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { updateUserBalance, updateUserPendingReward } from 'state/actions'
import { soushHarvest, soushHarvestBnb, harvest, nfaStakeHarvest, miniChefHarvest } from 'utils/callHelpers'
import { CHAIN_ID } from 'config/constants/chains'
import track from 'utils/track'
import { updateFarmUserEarnings } from 'state/farms'
import { useNetworkChainId } from 'state/hooks'
import { updateDualFarmRewarderEarnings, updateDualFarmUserEarnings } from 'state/dualFarms'
import { updateUserNfaStakingPendingReward, updateNfaStakingUserBalance } from 'state/nfaStakingPools'
import { useMasterchef, useMiniChefContract, useSousChef, useNfaStakingChef } from './useContract'

export const useHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()

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
    dispatch(updateFarmUserEarnings(chainId, farmPid, account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract, chainId])

  return { onReward: handleHarvest }
}

export const useAllHarvest = (farmPids: number[], chainId: number) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const miniChefContract = useMiniChefContract()

  const handleHarvest = useCallback(async () => {
    if (chainId === CHAIN_ID.MATIC) {
      const harvestPromises = farmPids.reduce((accum, pid) => {
        return [...accum, miniChefHarvest(miniChefContract, pid, account)]
      }, [])
      return Promise.all(harvestPromises)
    }
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterChefContract, pid, account)]
    }, [])
    return Promise.all(harvestPromises)
  }, [account, farmPids, masterChefContract, miniChefContract, chainId])
  return { onReward: handleHarvest }
}

export const useSousHarvest = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
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
      chain: chainId,
      data: {
        cat: 'harvest',
        pid: sousId,
      },
    })

    dispatch(updateUserPendingReward(chainId, sousId, account))
    dispatch(updateUserBalance(chainId, sousId, account))
  }, [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId, chainId])

  return { onReward: handleHarvest }
}

export const useNfaStakingHarvest = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const chainId = useNetworkChainId()
  const nfaStakingChef = useNfaStakingChef(sousId)
  const handleHarvest = useCallback(async () => {
    await nfaStakeHarvest(nfaStakingChef, account)
    dispatch(updateUserNfaStakingPendingReward(chainId, sousId, account))
    dispatch(updateNfaStakingUserBalance(chainId, sousId, account))
    track({
      event: 'nfa',
      chain: chainId,
      data: {
        cat: 'harvest',
        pid: sousId,
      },
    })
  }, [account, dispatch, nfaStakingChef, sousId, chainId])

  return { onReward: handleHarvest }
}

export const useMiniChefHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const miniChefContract = useMiniChefContract()

  const handleHarvest = useCallback(async () => {
    const txHash = await miniChefHarvest(miniChefContract, farmPid, account)
    track({
      event: 'dualFarm',
      chain: chainId,
      data: {
        cat: 'harvest',
        pid: farmPid,
      },
    })
    dispatch(updateDualFarmUserEarnings(chainId, farmPid, account))
    dispatch(updateDualFarmRewarderEarnings(chainId, farmPid, account))
    return txHash
  }, [account, dispatch, farmPid, miniChefContract, chainId])

  return { onReward: handleHarvest }
}
