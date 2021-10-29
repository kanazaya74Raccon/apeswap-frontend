import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { updateUserBalance, updateUserPendingReward } from 'state/actions'
import { soushHarvest, soushHarvestBnb, harvest, nfaStakeHarvest, miniChefHarvest } from 'utils/callHelpers'
import { CHAIN_ID } from 'config/constants/chains'
import track from 'utils/track'
import { updateFarmUserEarnings } from 'state/farms'
import { useNetworkChainId } from 'state/hooks'
import { updateDualFarmUserEarnings } from 'state/dualFarms'
import { updateUserNfaStakingPendingReward, updateNfaStakingUserBalance } from 'state/nfaStakingPools'
import { useMasterchef, useMiniChefContract, useMulticallContract, useSousChef } from './useContract'
import { useMasterChefAddress, useMiniChefAddress, useNonFungibleApesAddress } from './useAddress'

export const useHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()
  const masterChefAddress = useMasterChefAddress()
  const multicallContract = useMulticallContract()

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
    dispatch(updateFarmUserEarnings(multicallContract, masterChefAddress, farmPid, account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract, multicallContract, masterChefAddress, chainId])

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
  const multicallContract = useMulticallContract()

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

    dispatch(updateUserPendingReward(multicallContract, chainId, masterChefContract, sousId, account))
    dispatch(updateUserBalance(multicallContract, chainId, sousId, account))
  }, [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId, multicallContract, chainId])

  return { onReward: handleHarvest }
}

export const useNfaStakingHarvest = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const multicallContract = useMulticallContract()
  const chainId = useNetworkChainId()
  const nfaAddress = useNonFungibleApesAddress()
  const nfaStakingChef = useNfaStakingHarvest(sousId)
  const handleHarvest = useCallback(async () => {
    await nfaStakeHarvest(nfaStakingChef, account)
    dispatch(updateUserNfaStakingPendingReward(multicallContract, chainId, sousId, account))
    dispatch(updateNfaStakingUserBalance(multicallContract, nfaAddress, sousId, account))
    track({
      event: 'nfa',
      chain: chainId,
      data: {
        cat: 'harvest',
        pid: sousId,
      },
    })
  }, [account, dispatch, nfaStakingChef, sousId, multicallContract, chainId, nfaAddress])

  return { onReward: handleHarvest }
}

export const useMiniChefHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const miniChefContract = useMiniChefContract()
  const miniChefAddress = useMiniChefAddress()
  const multicallContract = useMulticallContract()

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
    dispatch(updateDualFarmUserEarnings(multicallContract, miniChefAddress, farmPid, account))
    return txHash
  }, [account, dispatch, farmPid, miniChefContract, multicallContract, miniChefAddress, chainId])

  return { onReward: handleHarvest }
}
