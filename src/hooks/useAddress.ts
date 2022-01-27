import { useEffect, useState } from 'react'
import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'
import { ChainId } from '@apeswapfinance/sdk'
import useActiveWeb3React from './useActiveWeb3React'

export const parseAddress = (currAddress: Address, chainId: ChainId) => {
  return currAddress[chainId]
}

const useAddress = (curAddresses: Address) => {
  const { chainId } = useActiveWeb3React()
  const [address, setAddress] = useState(parseAddress(curAddresses, chainId))
  useEffect(() => {
    setAddress(parseAddress(curAddresses, chainId))
  }, [chainId, curAddresses])
  return address
}

export const useBananaAddress = () => {
  return useAddress(addresses.banana)
}
export const useGoldenBananaAddress = () => {
  return useAddress(addresses.goldenBanana)
}
export const useTreasuryAddress = () => {
  return useAddress(addresses.treasury)
}
export const useSyrupAddress = () => {
  return useAddress(addresses.syrup)
}
export const useMasterChefAddress = () => {
  return useAddress(addresses.masterChef)
}
export const useMulticallAddress = () => {
  return useAddress(addresses.mulltiCall)
}
export const useNativeWrapCurrencyAddress = () => {
  return useAddress(addresses.nativeWrapped)
}
export const useLotteryAddress = () => {
  return useAddress(addresses.lottery)
}
export const useLotteryTicketAddress = () => {
  return useAddress(addresses.lotteryNFT)
}
export const useBananaProfileAddress = () => {
  return useAddress(addresses.bananaProfile)
}
export const useNonFungibleApesAddress = () => {
  return useAddress(addresses.nonFungibleApes)
}
export const useRabbitMintingFarmAddress = () => {
  return useAddress(addresses.rabbitMintingFarm)
}
export const useClaimRefundAddress = () => {
  return useAddress(addresses.claimRefund)
}
export const useAuctionAddress = () => {
  return useAddress(addresses.auction)
}
export const useApePriceGetterAddress = () => {
  return useAddress(addresses.apePriceGetter)
}

export const useVaultApeAddress = () => {
  return useAddress(addresses.vaultApe)
}

export const useMiniChefAddress = () => {
  return useAddress(addresses.miniApeV2)
}

export const useIazoExposerAddress = () => {
  return useAddress(addresses.iazoExposer)
}

export const useIazoSettingsAddress = () => {
  return useAddress(addresses.iazoSettings)
}

export const useIazoFactoryAddress = () => {
  return useAddress(addresses.iazoFactoryProxy)
}
