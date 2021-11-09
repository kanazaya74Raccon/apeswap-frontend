/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IazosState, IazoOverall } from '../types'
import fetchAllIazos from './fetchIazos'

const initialState: IazosState = {
  isInitialized: false,
  isLoading: true,
  data: null,
}

export const iazosSlice = createSlice({
  name: 'iazos',
  initialState,
  reducers: {
    iazosFetchStart: (state) => {
      state.isLoading = true
    },
    iazosFetchSucceeded: (state, action: PayloadAction<IazoOverall>) => {
      state.isInitialized = true
      state.isLoading = false
      state.data = action.payload
    },
    iazosFetchFailed: (state) => {
      state.isLoading = false
      state.isInitialized = true
    },
  },
})

// Actions
export const { iazosFetchStart, iazosFetchSucceeded, iazosFetchFailed } = iazosSlice.actions

export const fetchIazos = (chainId: number) => async (dispatch) => {
  try {
    dispatch(iazosFetchStart())
    const iazos = await fetchAllIazos(chainId)
    dispatch(iazosFetchSucceeded(iazos))
  } catch (error) {
    dispatch(iazosFetchFailed())
  }
}

export default iazosSlice.reducer
