import { useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import { Contract, ContractOptions } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'
import { poolsConfig } from 'config/constants'
import nfaStakingPools from 'config/constants/nfaStakingPools'
import { PoolCategory } from 'config/constants/types'
import ifo from 'config/abi/ifo.json'
import erc20 from 'config/abi/erc20.json'
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
import apePriceGetter from 'config/abi/apePriceGetter.json'
import multi from 'config/abi/Multicall.json'
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
  useMulticallAddress,
  useNonFungibleApesAddress,
  useRabbitMintingFarmAddress,
  useTreasuryAddress,
} from './useAddress'

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions): Contract => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

const useSafeContract = (abi: AbiItem, address?: string, contractOptions?: ContractOptions): Contract | undefined => {
  const web3 = useWeb3()
  const [contract, setContract] = useState<Contract | undefined>(
    address && new web3.eth.Contract(abi, address, contractOptions),
  )

  useEffect(() => {
    if (address) {
      setContract(new web3.eth.Contract(abi, address, contractOptions))
    } else {
      setContract(undefined)
    }
  }, [abi, address, contractOptions, web3])

  return contract
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */

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
  return useSafeContract(ifoAbi, address)
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

export const useApePriceGetter = () => {
  const abi = apePriceGetter as unknown as AbiItem
  return useContract(abi, useApePriceGetterAddress())
}

export default useContract
