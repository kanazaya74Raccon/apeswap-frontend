import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import { updateUserAllowance, updateNfaStakingUserAllowance } from 'state/actions'
import { approve } from 'utils/callHelpers'
import track from 'utils/track'
import { CHAIN_ID } from 'config/constants'
import { fetchFarmUserAllowances } from 'state/farms/fetchFarmUser'
import { fetchDualFarmUserAllowances } from 'state/dualFarms/fetchDualFarmUser'
import { useNetworkChainId } from 'state/hooks'
import { updateVaultUserAllowance } from 'state/vaults'
import {
  useMasterChefAddress,
  useAuctionAddress,
  useNonFungibleApesAddress,
  useMiniChefAddress,
  useVaultApeAddress,
} from './useAddress'
import {
  useMasterchef,
  useBanana,
  useSousChef,
  useLottery,
  useNonFungibleApes,
  useMulticallContract,
  useVaultApe,
  useMiniChefContract,
} from './useContract'

// Approve a Farm
export const useApprove = (lpContract: Contract) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const masterChefContract = useMasterchef()
  const masterChefAddress = useMasterChefAddress()
  const multicallContract = useMulticallContract()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      dispatch(fetchFarmUserAllowances(multicallContract, masterChefAddress, chainId, account))
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
  }, [account, dispatch, lpContract, masterChefContract, multicallContract, masterChefAddress, chainId])

  return { onApprove: handleApprove }
}

// Approve a Pool
export const useSousApprove = (lpContract: Contract, sousId) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const sousChefContract = useSousChef(sousId)
  const multicallContract = useMulticallContract()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, sousChefContract, account)
      dispatch(updateUserAllowance(multicallContract, chainId, sousId, account))
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
  }, [account, dispatch, lpContract, sousChefContract, sousId, multicallContract, chainId])

  return { onApprove: handleApprove }
}

// Approve the lottery
export const useLotteryApprove = () => {
  const { account } = useWeb3React()
  const bananaContract = useBanana()
  const lotteryContract = useLottery()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(bananaContract, lotteryContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, bananaContract, lotteryContract])

  return { onApprove: handleApprove }
}

// Approve an IFO
export const useIfoApprove = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWeb3React()
  const onApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.methods
        .approve(spenderAddress, ethers.constants.MaxUint256)
        .send({ from: account })
      return tx
    } catch {
      return false
    }
  }, [account, spenderAddress, tokenContract])

  return onApprove
}

// Approve an Auction
export const useAuctionApprove = () => {
  const tokenContract = useNonFungibleApes()
  const spenderAddress = useAuctionAddress()
  const { account } = useWeb3React()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.methods.setApprovalForAll(spenderAddress, true).send({ from: account })
      return tx
    } catch {
      return false
    }
  }, [account, spenderAddress, tokenContract])

  return { onApprove: handleApprove }
}

// Approve an NFA
export const useNfaStakingApprove = (contractToApprove: string, sousId) => {
  const dispatch = useDispatch()
  const tokenContract = useNonFungibleApes()
  const multicallContract = useMulticallContract()
  const nfaAddress = useNonFungibleApesAddress()
  const { account, chainId } = useWeb3React()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.methods.setApprovalForAll(contractToApprove, true).send({ from: account })
      dispatch(updateNfaStakingUserAllowance(multicallContract, nfaAddress, chainId, sousId, account))
      return tx
    } catch {
      return false
    }
  }, [account, dispatch, contractToApprove, sousId, tokenContract, multicallContract, nfaAddress, chainId])

  return { onApprove: handleApprove }
}

// Approve vault
export const useVaultApeApprove = (lpContract: Contract, pid) => {
  const { account, chainId } = useWeb3React()
  const vaultApeContract = useVaultApe()
  const dispatch = useDispatch()
  const multicallContract = useMulticallContract()
  const vaultApeAddress = useVaultApeAddress()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, vaultApeContract, account)
      track({
        event: 'vaults',
        chain: chainId,
        data: {
          token: tx.to,
          cat: 'enable',
        },
      })
      dispatch(updateVaultUserAllowance(multicallContract, vaultApeAddress, account, chainId, pid))
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, vaultApeContract, multicallContract, vaultApeAddress, dispatch, chainId, pid])

  return { onApprove: handleApprove }
}

// Approve a Farm
export const useDualFarmApprove = (lpContract: Contract) => {
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const miniChefContract = useMiniChefContract()
  const miniChefAddress = useMiniChefAddress()
  const multicallContract = useMulticallContract()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, miniChefContract, account)
      dispatch(fetchDualFarmUserAllowances(multicallContract, miniChefAddress, account))
      track({
        event: 'dualFarm',
        chain: chainId,
        data: {
          token: tx.to,
          cat: 'enable',
        },
      })
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, dispatch, lpContract, miniChefContract, multicallContract, miniChefAddress, chainId])

  return { onApprove: handleApprove }
}
