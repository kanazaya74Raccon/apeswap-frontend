/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CHAIN_ID } from 'config/constants/chains'
import { Network, NetworkState } from 'state/types'
import fetchAndUpdateNetwork from './fetchNetwork'

const initialState: NetworkState = {
  isInitialized: false,
  isLoading: true,
  data: { chainId: parseInt(window.localStorage.getItem('chainIdStatus')) || CHAIN_ID.BSC },
}

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    networkFetchStart: (state) => {
      state.isLoading = true
    },
    networkFetchSucceeded: (state, action: PayloadAction<Network>) => {
      state.isInitialized = true
      state.isLoading = false
      state.data = action.payload
    },
    networkFetchFailed: (state) => {
      state.isLoading = false
      state.isInitialized = true
    },
  },
})

// Actions
export const { networkFetchStart, networkFetchSucceeded, networkFetchFailed } = networkSlice.actions

// thunks
export const fetchUserNetwork = (web3ChainId: number, account: string, chainId: number, library) => (dispatch) => {
  try {
    dispatch(networkFetchStart())
    const network = fetchAndUpdateNetwork(web3ChainId, account, chainId, library)
    dispatch(networkFetchSucceeded(network))
    localStorage.setItem(`chainIdStatus`, JSON.stringify(network.chainId))
  } catch (error) {
    dispatch(networkFetchFailed())
  }
}

export default networkSlice.reducer
