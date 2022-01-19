import React, { createContext, useEffect, useRef, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useMulticallAddress, useNonFungibleApesAddress } from 'hooks/useAddress'
import useGetWalletNfts, { NftMap } from 'hooks/useGetWalletNfts'
import { useBlock } from 'state/block/hooks'

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
  const { currentBlock } = useBlock()
  const { nfts: nftList } = useGetWalletNfts()
  const { isInitialized } = state
  const multicallAddress = useMulticallAddress()
  const nonFungibleApesContract = useNonFungibleApesAddress()

  // Static data
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        setState((prevState) => ({
          ...prevState,
          isInitialized: true,
        }))
      } catch (error) {
        console.warn('an error occured', error)
      }
    }

    fetchContractData()
  }, [isInitialized, setState, multicallAddress])

  // Data from the contract that needs an account
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const balanceOf = await nonFungibleApesContract.balanceOf(account)

        setState((prevState) => ({
          ...prevState,
          isInitialized: true,
          balanceOf,
        }))
      } catch (error) {
        console.warn('an error occured', error)
      }
    }

    if (account) {
      fetchContractData()
    }
  }, [isInitialized, account, setState, multicallAddress, nonFungibleApesContract])

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
