/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Nfa, NfaState } from '../types'
import fetchNfas from './fetchNfas'

const initialState: NfaState = {
  isInitialized: false,
  isLoading: true,
  data: null,
}

export const lpTokenPricesSlice = createSlice({
  name: 'nfas',
  initialState,
  reducers: {
    nfasFetchStart: (state) => {
      state.isLoading = true
    },
    nfasFetchSucceeded: (state, action: PayloadAction<Nfa[]>) => {
      state.isInitialized = true
      state.isLoading = false
      state.data = action.payload
    },
    nfasFetchFailed: (state) => {
      state.isLoading = false
      state.isInitialized = true
    },
  },
})

// Actions
export const { nfasFetchStart, nfasFetchSucceeded, nfasFetchFailed } = lpTokenPricesSlice.actions

export const fetchAllNfas = () => async (dispatch) => {
  try {
    dispatch(nfasFetchStart())
    const nfas = await fetchNfas()
    dispatch(nfasFetchSucceeded(nfas))
  } catch (error) {
    dispatch(nfasFetchFailed())
  }
}
export default lpTokenPricesSlice.reducer
