import { useCallback } from 'react'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import { updateUserAllowance, updateNfaStakingUserAllowance } from 'state/actions'
import { approve } from 'utils/callHelpers'
import track from 'utils/track'
import { CHAIN_ID } from 'config/constants'
import { updateFarmUserAllowances } from 'state/farms'
import { updateDualFarmUserAllowances } from 'state/dualFarms'
import { updateVaultUserAllowance } from 'state/vaults'
import useActiveWeb3React from './useActiveWeb3React'
import { useAuctionAddress } from './useAddress'
import {
  useMasterchef,
  useSousChef,
  useNonFungibleApes,
  useVaultApe,
  useMiniChefContract,
  useERC20,
} from './useContract'

// Approve a Farm
export const useApprove = (lpContract, pid: number) => {
  const dispatch = useDispatch()
  const { account, chainId } = useActiveWeb3React()
  const masterChefContract = useMasterchef()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract)
      dispatch(updateFarmUserAllowances(chainId, pid, account))
      track({
        event: 'farm',
        chain: CHAIN_ID,
        data: {
          token: tx.to,
          cat: 'enable',
        },
      })
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, masterChefContract, pid, chainId])

  return { onApprove: handleApprove }
}

// Approve a Pool
export const useSousApprove = (lpContract, sousId) => {
  const dispatch = useDispatch()
  const { account, chainId } = useActiveWeb3React()
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, sousChefContract)
      dispatch(updateUserAllowance(chainId, sousId, account))
      track({
        event: 'pool',
        chain: CHAIN_ID,
        data: {
          token: tx.to,
          id: sousId,
          cat: 'enable',
        },
      })
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, sousChefContract, sousId, chainId])

  return { onApprove: handleApprove }
}

// Approve an IFO
export const useIfoApprove = (tokenAddress: string, spenderAddress: string) => {
  const tokenContract = useERC20(tokenAddress)
  const onApprove = useCallback(async () => {
    try {
      return await tokenContract.approve(spenderAddress, ethers.constants.MaxUint256).then((t) => t.wait())
    } catch {
      return false
    }
  }, [spenderAddress, tokenContract])

  return onApprove
}

// Approve an Auction
export const useAuctionApprove = () => {
  const tokenContract = useNonFungibleApes()
  const spenderAddress = useAuctionAddress()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.setApprovalForAll(spenderAddress, true)
      return tx
    } catch {
      return false
    }
  }, [spenderAddress, tokenContract])

  return { onApprove: handleApprove }
}

// Approve an NFA
export const useNfaStakingApprove = (contractToApprove: string, sousId) => {
  const dispatch = useDispatch()
  const tokenContract = useNonFungibleApes()
  const { account, chainId } = useActiveWeb3React()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.setApprovalForAll(contractToApprove, true)
      dispatch(updateNfaStakingUserAllowance(chainId, sousId, account))
      return tx
    } catch {
      return false
    }
  }, [account, dispatch, contractToApprove, sousId, tokenContract, chainId])

  return { onApprove: handleApprove }
}

// Approve vault
export const useVaultApeApprove = (lpContract, pid) => {
  const { account, chainId } = useActiveWeb3React()
  const vaultApeContract = useVaultApe()
  const dispatch = useDispatch()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, vaultApeContract)
      track({
        event: 'vaults',
        chain: chainId,
        data: {
          token: tx.to,
          cat: 'enable',
        },
      })
      dispatch(updateVaultUserAllowance(account, chainId, pid))
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, vaultApeContract, dispatch, chainId, pid])

  return { onApprove: handleApprove }
}

// Approve a Farm
export const useDualFarmApprove = (lpContract, pid: number) => {
  const dispatch = useDispatch()
  const { account, chainId } = useActiveWeb3React()
  const miniChefContract = useMiniChefContract()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, miniChefContract)
      track({
        event: 'dualFarm',
        chain: chainId,
        data: {
          token: tx.to,
          cat: 'enable',
        },
      })
      dispatch(updateDualFarmUserAllowances(chainId, pid, account))
      return tx
    } catch (e) {
      console.warn(e)
      return false
    }
  }, [account, dispatch, lpContract, miniChefContract, pid, chainId])

  return { onApprove: handleApprove }
}
