import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { poolsConfig } from 'config/constants'
import nfaStakingPools from 'config/constants/nfaStakingPools'
import { CHAIN_ID } from 'config/constants/chains'
import ifo from 'config/abi/ifo.json'
import ifoLinear from 'config/abi/ifoLinear.json'
import erc20 from 'config/abi/erc20.json'
import erc20Bytes from 'config/abi/erc20_bytes32.json'
import nonFungibleApes from 'config/abi/nonFungibleApes.json'
import treasuryAbi from 'config/abi/treasury.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import nfaStakingAbi from 'config/abi/nfaStaking.json'
import profile from 'config/abi/bananaProfile.json'
import auction from 'config/abi/auction.json'
import vaultApe from 'config/abi/vaultApe.json'
import apePriceGetter from 'config/abi/apePriceGetter.json'
import miniChef from 'config/abi/miniApeV2.json'
import multi from 'config/abi/Multicall.json'
import ensPublicResolver from 'config/abi/ens-public-resolver.json'
import ens from 'config/abi/ens-registrar.json'
import weth from 'config/abi/weth.json'
import { getContract } from 'utils'
import iazoExposerAbi from 'config/abi/iazoExposer.json'
import iazoSettingsAbi from 'config/abi/iazoSettings.json'
import iazoFactoryAbi from 'config/abi/iazoFactory.json'
import iazoAbi from 'config/abi/iazo.json'
import { useSelector } from 'react-redux'
import { State } from 'state/types'
import {
  VaultApe,
  Treasury,
  IazoExposer,
  IazoFactory,
  IazoSettings,
  Iazo,
  EnsPublicResolver,
  EnsRegistrar,
  Multicall,
  ApePriceGetter,
  SousChef,
  Weth,
  BananaProfile,
  Masterchef,
  Erc20,
  Erc20Bytes32,
  MiniApeV2,
  Auction,
  NfaStaking,
  NonFungibleApes,
  IfoLinear,
  Ifo,
} from 'config/abi/types'
import {
  useApePriceGetterAddress,
  useAuctionAddress,
  useBananaAddress,
  useBananaProfileAddress,
  useGoldenBananaAddress,
  useIazoExposerAddress,
  useIazoFactoryAddress,
  useIazoSettingsAddress,
  useMasterChefAddress,
  useMiniChefAddress,
  useMulticallAddress,
  useNativeWrapCurrencyAddress,
  useNonFungibleApesAddress,
  useTreasuryAddress,
  useVaultApeAddress,
} from './useAddress'
import useActiveWeb3React from './useActiveWeb3React'

export function useContract(abi: any, address: string | undefined, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || address === '0x0000000000000000000000000000000000000000' || !abi || !library) return null
    try {
      return getContract(address, abi, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, abi, library, withSignerIfPossible, account])
}

export const useMulticallContract = () => {
  return useContract(multi, useMulticallAddress(), false) as Multicall
}

export const useIfoContract = (address: string, isLinear?: boolean) => {
  return useContract(isLinear ? ifoLinear : ifo, address) as IfoLinear | Ifo
}

export const useSafeIfoContract = (address?: string, isLinear?: boolean): Contract | undefined => {
  return useContract(isLinear ? ifoLinear : ifo, address) as IfoLinear | Ifo
}

export const useERC20 = (address: string) => {
  return useContract(erc20, address) as Erc20
}

export const useBanana = () => {
  return useERC20(useBananaAddress()) as Erc20
}

export const useGoldenBanana = () => {
  return useERC20(useGoldenBananaAddress()) as Erc20
}

export const useTreasury = () => {
  return useContract(treasuryAbi, useTreasuryAddress()) as Treasury
}

export const useNonFungibleApes = () => {
  return useContract(nonFungibleApes, useNonFungibleApesAddress()) as NonFungibleApes
}

export const useProfile = () => {
  return useContract(profile, useBananaProfileAddress()) as BananaProfile
}

export const useMasterchef = () => {
  return useContract(masterChef, useMasterChefAddress()) as Masterchef
}

export const useSousChef = (id) => {
  // Using selector to avoid circular dependecies
  const chainId = useSelector((state: State) => state.network.data.chainId)
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return useContract(sousChef, config.contractAddress[chainId]) as SousChef
}

export const useNfaStakingChef = (id) => {
  const config = nfaStakingPools.find((pool) => pool.sousId === id)
  const rawAbi = nfaStakingAbi
  return useContract(rawAbi, config.contractAddress[process.env.REACT_APP_CHAIN_ID]) as NfaStaking
}

export const useAuction = () => {
  return useContract(auction, useAuctionAddress()) as Auction
}

export const useVaultApe = () => {
  return useContract(vaultApe, useVaultApeAddress()) as VaultApe
}

export const useApePriceGetter = () => {
  return useContract(apePriceGetter, useApePriceGetterAddress()) as ApePriceGetter
}

export const useMiniChefContract = () => {
  return useContract(miniChef, useMiniChefAddress()) as MiniApeV2
}

export const useIazoExposerContract = () => {
  return useContract(iazoExposerAbi, useIazoExposerAddress()) as IazoExposer
}
export const useIazoSettingsContract = () => {
  return useContract(iazoSettingsAbi, useIazoSettingsAddress()) as IazoSettings
}
export const useIazoFactoryContract = () => {
  return useContract(iazoFactoryAbi, useIazoFactoryAddress()) as IazoFactory
}

export const useIazoContract = (address: string) => {
  return useContract(iazoAbi, address) as Iazo
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
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
  return useContract(ens, address, withSignerIfPossible) as EnsRegistrar
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(ensPublicResolver, address, withSignerIfPossible) as EnsPublicResolver
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(erc20, tokenAddress, withSignerIfPossible) as Erc20
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(erc20Bytes, tokenAddress, withSignerIfPossible) as Erc20Bytes32
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  return useContract(weth, useNativeWrapCurrencyAddress(), withSignerIfPossible) as Weth
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(IUniswapV2PairABI, pairAddress, withSignerIfPossible)
}

export default useContract
