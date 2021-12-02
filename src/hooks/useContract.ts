import { useEffect, useMemo, useState } from 'react'
import { AbiItem } from 'web3-utils'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { poolsConfig } from 'config/constants'
import nfaStakingPools from 'config/constants/nfaStakingPools'
import { PoolCategory } from 'config/constants/types'
import { CHAIN_ID } from 'config/constants/chains'
import ifo from 'config/abi/ifo.json'
import erc20 from 'config/abi/erc20.json'
import erc20Bytes from 'config/abi/erc20_bytes32.json'
import rabbitmintingfarm from 'config/abi/rabbitmintingfarm.json'
import nonFungibleApes from 'config/abi/nonFungibleApes.json'
import lottery from 'config/abi/lottery.json'
import treasuryAbi from 'config/abi/treasury.json'
import lotteryTicket from 'config/abi/lotteryNft.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import nfaStakingAbi from 'config/abi/nfaStaking.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import profile from 'config/abi/bananaProfile.json'
import auction from 'config/abi/auction.json'
import vaultApe from 'config/abi/vaultApe.json'
import apePriceGetter from 'config/abi/apePriceGetter.json'
import miniChef from 'config/abi/miniApeV2.json'
import multi from 'config/abi/Multicall.json'
import ensPublicResolver from 'config/abi/ens-public-resolver.json'
import ens from 'config/abi/ens-registrar.json'
import { getContract } from 'utils'
import { useSelector } from 'react-redux'
import { State } from 'state/types'
import {
  useApePriceGetterAddress,
  useAuctionAddress,
  useBananaAddress,
  useBananaProfileAddress,
  useGoldenBananaAddress,
  useLotteryAddress,
  useLotteryTicketAddress,
  useMasterChefAddress,
  useMiniChefAddress,
  useMulticallAddress,
  useNonFungibleApesAddress,
  useRabbitMintingFarmAddress,
  useTreasuryAddress,
  useVaultApeAddress,
} from './useAddress'
import useActiveWeb3React from './useActiveWeb3React'

export function useContract(ABI: AbiItem, address: string | undefined, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export const useMulticallContract = () => {
  const multiAbi = multi as unknown as AbiItem
  return useContract(multiAbi, useMulticallAddress())
}

export const useIfoContract = (address: string) => {
  const ifoAbi = ifo as unknown as AbiItem
  return useContract(ifoAbi, address)
}

export const useSafeIfoContract = (address?: string): Contract | undefined => {
  const ifoAbi = ifo as unknown as AbiItem
  return useContract(ifoAbi, address)
}

export const useERC20 = (address: string) => {
  const erc20Abi = erc20 as unknown as AbiItem
  return useContract(erc20Abi, address)
}

export const useBanana = () => {
  return useERC20(useBananaAddress())
}

export const useGoldenBanana = () => {
  return useERC20(useGoldenBananaAddress())
}

export const useTreasury = () => {
  const treasury = treasuryAbi as unknown as AbiItem
  return useContract(treasury, useTreasuryAddress())
}

export const useRabbitMintingFarm = () => {
  const rabbitMintingFarmAbi = rabbitmintingfarm as unknown as AbiItem
  return useContract(rabbitMintingFarmAbi, useRabbitMintingFarmAddress())
}

export const useNonFungibleApes = () => {
  const nonFungibleApesAbi = nonFungibleApes as unknown as AbiItem
  return useContract(nonFungibleApesAbi, useNonFungibleApesAddress())
}

export const useProfile = () => {
  const profileABIAbi = profile as unknown as AbiItem
  return useContract(profileABIAbi, useBananaProfileAddress())
}

export const useLottery = () => {
  const abi = lottery as unknown as AbiItem
  return useContract(abi, useLotteryAddress())
}

export const useLotteryTicket = () => {
  const abi = lotteryTicket as unknown as AbiItem
  return useContract(abi, useLotteryTicketAddress())
}

export const useMasterchef = () => {
  const abi = masterChef as unknown as AbiItem
  return useContract(abi, useMasterChefAddress())
}

export const useSousChef = (id) => {
  // Using selector to avoid circular dependecies
  const chainId = useSelector((state: State) => state.network.data.chainId)
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const rawAbi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  const abi = rawAbi as unknown as AbiItem
  return useContract(abi, config.contractAddress[chainId])
}

export const useNfaStakingChef = (id) => {
  const config = nfaStakingPools.find((pool) => pool.sousId === id)
  const rawAbi = nfaStakingAbi
  const abi = rawAbi as unknown as AbiItem
  return useContract(abi, config.contractAddress[process.env.REACT_APP_CHAIN_ID])
}

export const useAuction = () => {
  const abi = auction as unknown as AbiItem
  return useContract(abi, useAuctionAddress())
}

export const useVaultApe = () => {
  const abi = vaultApe as unknown as AbiItem
  return useContract(abi, useVaultApeAddress())
}

export const useApePriceGetter = () => {
  const abi = apePriceGetter as unknown as AbiItem
  return useContract(abi, useApePriceGetterAddress())
}

export const useMiniChefContract = () => {
  const abi = miniChef as unknown as AbiItem
  return useContract(abi, useMiniChefAddress())
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const abi = ens as unknown as AbiItem
  const { chainId } = useWeb3React()
  let address: string | undefined
  if (chainId) {
    // eslint-disable-next-line default-case
    switch (chainId) {
      case CHAIN_ID.BSC:
      case CHAIN_ID.BSC_TESTNET:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
        break
    }
  }
  return useContract(abi, address, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  const abi = ensPublicResolver as unknown as AbiItem
  return useContract(abi, address, withSignerIfPossible)
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  const abi = erc20 as unknown as AbiItem
  return useContract(abi, tokenAddress, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  const abi = erc20Bytes as unknown as AbiItem
  return useContract(abi, tokenAddress, withSignerIfPossible)
}

export default useContract
