/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import fetchPrices from './fetchPrices'
import { TokenPricesState, TokenPrices } from '../types'

const initialState: TokenPricesState = {
  isInitialized: false,
  isLoading: true,
  data: null,
}

export const tokenPricesSlice = createSlice({
  name: 'tokenPrices',
  initialState,
  reducers: {
    tokenPricesFetchStart: (state) => {
      state.isLoading = true
    },
    tokenPricesFetchSucceeded: (state, action: PayloadAction<TokenPrices[]>) => {
      state.isInitialized = true
      state.isLoading = false
      state.data = action.payload
    },
    tokenPricesFetchFailed: (state) => {
      state.isLoading = false
      state.isInitialized = true
    },
  },
})

// Actions
export const { tokenPricesFetchStart, tokenPricesFetchSucceeded, tokenPricesFetchFailed } = tokenPricesSlice.actions

export const fetchTokenPrices = (chainId) => async (dispatch) => {
  try {
    dispatch(tokenPricesFetchStart())
    const tokenPrices = await fetchPrices(chainId)
    dispatch(tokenPricesFetchSucceeded(tokenPrices))
  } catch (error) {
    dispatch(tokenPricesFetchFailed())
  }
}

export default tokenPricesSlice.reducer
