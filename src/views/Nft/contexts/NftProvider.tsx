import React, { createContext, useEffect, useRef, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import useBlock from 'hooks/useBlock'
import multicall from 'utils/multicall'
import { useMulticallAddress, useNonFungibleApesAddress, useRabbitMintingFarmAddress } from 'hooks/useAddress'
import useGetWalletNfts, { NftMap } from 'hooks/useGetWalletNfts'
import rabbitmintingfarm from 'config/abi/rabbitmintingfarm.json'

type State = {
  isInitialized: boolean
  hasClaimed: boolean
  endBlockNumber: number
  startBlockNumber: number
  balanceOf: number
}

type Context = {
  nfts: NftMap
  canBurnNft: boolean
  getTokenIds: (bunnyId: number) => number[]
  reInitialize: () => void
} & State

export const NftProviderContext = createContext<Context | null>(null)

const NftProvider: React.FC = ({ children }) => {
  const isMounted = useRef(true)
  const [state, setState] = useState<State>({
    isInitialized: false,
    hasClaimed: false,
    startBlockNumber: 0,
    endBlockNumber: 0,
    balanceOf: 0,
  })
  const { account } = useWeb3React()
  const currentBlock = useBlock()
  const { nfts: nftList } = useGetWalletNfts()
  const { isInitialized } = state
  const multicallAddress = useMulticallAddress()
  const rabbitMintingFarmAddress = useRabbitMintingFarmAddress()
  const nonFungibleApesContract = useNonFungibleApesAddress()

  // Static data
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const [startBlockNumberArr, endBlockNumberArr] = await multicall(multicallAddress, rabbitmintingfarm, [
          { address: rabbitMintingFarmAddress, name: 'startBlockNumber' },
          { address: rabbitMintingFarmAddress, name: 'endBlockNumber' },
        ])

        // TODO: Figure out why these are coming back as arrays
        const [startBlockNumber]: [BigNumber] = startBlockNumberArr
        const [endBlockNumber]: [BigNumber] = endBlockNumberArr

        setState((prevState) => ({
          ...prevState,
          isInitialized: true,
          startBlockNumber: startBlockNumber.toNumber(),
          endBlockNumber: endBlockNumber.toNumber(),
        }))
      } catch (error) {
        console.warn('an error occured', error)
      }
    }

    fetchContractData()
  }, [isInitialized, setState, multicallAddress, rabbitMintingFarmAddress])

  // Data from the contract that needs an account
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const [hasClaimedArr] = await multicall(multicallAddress, rabbitmintingfarm, [
          { address: rabbitMintingFarmAddress, name: 'hasClaimed', params: [account] },
        ])
        const balanceOf = await nonFungibleApesContract.methods.balanceOf(account).call()
        const [hasClaimed]: [boolean] = hasClaimedArr

        setState((prevState) => ({
          ...prevState,
          isInitialized: true,
          hasClaimed,
          balanceOf,
        }))
      } catch (error) {
        console.warn('an error occured', error)
      }
    }

    if (account) {
      fetchContractData()
    }
  }, [isInitialized, account, setState, multicallAddress, rabbitMintingFarmAddress, nonFungibleApesContract])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  const canBurnNft = currentBlock <= state.endBlockNumber
  const getTokenIds = (bunnyId: number) => nftList[bunnyId]?.tokenIds

  /**
   * Allows consumers to re-fetch all data from the contract. Triggers the effects.
   * For example when a transaction has been completed
   */
  const reInitialize = () => {
    // Only attempt to re-initialize if the component is still mounted
    // Transactions can take awhile so it is likely some users will navigate to another page
    // before the transaction is finished
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, isInitialized: false }))
    }
  }

  return (
    <NftProviderContext.Provider value={{ ...state, nfts: nftList, canBurnNft, getTokenIds, reInitialize }}>
      {children}
    </NftProviderContext.Provider>
  )
}

export default NftProvider
