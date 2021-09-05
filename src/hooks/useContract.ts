import { useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import { Contract, ContractOptions } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'
import {
  getMasterChefAddress,
  getBananaAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getRabbitMintingFarmAddress,
  getBananaProfileAddress,
  getGoldenBananaAddress,
  getTreasuryAddress,
  getNonFungibleApesAddress,
  getAuctionAddress,
  getVaultApeAddress,
} from 'utils/addressHelpers'
import { poolsConfig } from 'config/constants'
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
import sousChefBnb from 'config/abi/sousChefBnb.json'
import profile from 'config/abi/bananaProfile.json'
import auction from 'config/abi/auction.json'
import vaultApe from 'config/abi/vaultApe.json'

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
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

export const useIfoContract = (address: string) => {
  const ifoAbi = (ifo as unknown) as AbiItem
  return useContract(ifoAbi, address)
}

export const useSafeIfoContract = (address?: string): Contract | undefined => {
  const ifoAbi = (ifo as unknown) as AbiItem
  return useSafeContract(ifoAbi, address)
}

export const useERC20 = (address: string) => {
  const erc20Abi = (erc20 as unknown) as AbiItem
  return useContract(erc20Abi, address)
}

export const useBanana = () => {
  return useERC20(getBananaAddress())
}

export const useGoldenBanana = () => {
  return useERC20(getGoldenBananaAddress())
}

export const useTreasury = () => {
  const treasury = (treasuryAbi as unknown) as AbiItem
  return useContract(treasury, getTreasuryAddress())
}

export const useRabbitMintingFarm = () => {
  const rabbitMintingFarmAbi = (rabbitmintingfarm as unknown) as AbiItem
  return useContract(rabbitMintingFarmAbi, getRabbitMintingFarmAddress())
}

export const useNonFungibleApes = () => {
  const nonFungibleApesAbi = (nonFungibleApes as unknown) as AbiItem
  return useContract(nonFungibleApesAbi, getNonFungibleApesAddress())
}

export const useProfile = () => {
  const profileABIAbi = (profile as unknown) as AbiItem
  return useContract(profileABIAbi, getBananaProfileAddress())
}

export const useLottery = () => {
  const abi = (lottery as unknown) as AbiItem
  return useContract(abi, getLotteryAddress())
}

export const useLotteryTicket = () => {
  const abi = (lotteryTicket as unknown) as AbiItem
  return useContract(abi, getLotteryTicketAddress())
}

export const useMasterchef = () => {
  const abi = (masterChef as unknown) as AbiItem
  return useContract(abi, getMasterChefAddress())
}

export const useSousChef = (id) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const rawAbi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  const abi = (rawAbi as unknown) as AbiItem
  return useContract(abi, config.contractAddress[process.env.REACT_APP_CHAIN_ID])
}

export const useAuction = () => {
  const abi = (auction as unknown) as AbiItem
  return useContract(abi, getAuctionAddress())
}

export const useVaultApe = () => {
  const abi = (vaultApe as unknown) as AbiItem
  return useContract(abi, getVaultApeAddress())
}

export default useContract
