import { useWeb3React } from '@web3-react/core'
import { useEffect, useReducer } from 'react'
import { useNonFungibleApes } from './useContract'

export type NftMap = {
  [key: number]: {
    tokenUri: string
    tokenIds: number[]
  }
}

type Action = { type: 'set_nfts'; data: NftMap } | { type: 'reset' }

type State = {
  isLoading: boolean
  nfts: NftMap
}

const initialState: State = {
  isLoading: true,
  nfts: {},
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_nfts':
      return {
        ...initialState,
        isLoading: false,
        nfts: action.data,
      }
    case 'reset':
      return {
        ...initialState,
        isLoading: false,
      }
    default:
      return state
  }
}

const useGetWalletNfts = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account } = useWeb3React()
  const nonFungibleApesContract = useNonFungibleApes()

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const balanceOf = await nonFungibleApesContract.balanceOf(account)

        if (balanceOf > 0) {
          let nfts: NftMap = {}

          const tokenIdPromises = []

          const tokenIdsOwnedByWallet = await Promise.all(tokenIdPromises)

          nfts = tokenIdsOwnedByWallet.reduce((accum, association) => {
            if (!association) {
              return accum
            }

            const [bunnyId, tokenId, tokenUri] = association

            return {
              ...accum,
              [bunnyId]: {
                tokenUri,
                tokenIds: accum[bunnyId] ? [...accum[bunnyId].tokenIds, tokenId] : [tokenId],
              },
            }
          }, {})

          dispatch({ type: 'set_nfts', data: nfts })
        } else {
          // Reset it in case of wallet change
          dispatch({ type: 'reset' })
        }
      } catch (error) {
        dispatch({ type: 'reset' })
      }
    }

    if (account) {
      fetchNfts()
    }
  }, [account, dispatch, nonFungibleApesContract])

  return state
}

export default useGetWalletNfts
