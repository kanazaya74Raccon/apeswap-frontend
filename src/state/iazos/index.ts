/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IazosState, Iazo } from '../types'
import fetchAllIazos from './fetchIazos'
import fetchIazosFromApi from './fetchIazosFromApi'
import { fetchIazoTokenDetails, fetchIazoStatusInfo } from './fetchIazoWeb3'

const initialState: IazosState = {
  isInitialized: false,
  isLoading: true,
  iazoData: null,
  iazoDefaultSettings: null,
}

export const iazosSlice = createSlice({
  name: 'iazos',
  initialState,
  reducers: {
    iazosFetchStart: (state) => {
      state.isLoading = true
    },
    iazosFetchSucceeded: (state, action: PayloadAction<Iazo[]>) => {
      const liveIazosData = action.payload
      state.iazoData = state.iazoData
        ? state.iazoData.map((iazo) => {
            const liveIazoData = liveIazosData.find((entry) => entry.iazoContractAddress === iazo.iazoContractAddress)
            return { ...liveIazoData, ...iazo }
          })
        : liveIazosData
      state.isInitialized = true
      state.isLoading = false
    },
    iazosFetchFailed: (state) => {
      state.isLoading = false
      state.isInitialized = false
    },
    updateIazoWeb3Data: (state, action) => {
      const { value, contractAddress } = action.payload
      const index = state.iazoData.findIndex((p) => p.iazoContractAddress === contractAddress)
      state.iazoData[index] = { ...state.iazoData[index], ...value }
    },
  },
})

// Actions
export const { iazosFetchStart, iazosFetchSucceeded, iazosFetchFailed, updateIazoWeb3Data } = iazosSlice.actions

export const fetchIazos = (chainId: number) => async (dispatch) => {
  try {
    dispatch(iazosFetchStart())
    const iazos = await fetchIazosFromApi()
    dispatch(iazosFetchSucceeded(iazos))
    iazos?.map(async (iazo) => {
      const iazoTokenDetails = await fetchIazoTokenDetails(chainId, iazo.baseToken.address, iazo.iazoToken.address)
      dispatch(updateIazoWeb3Data({ value: iazoTokenDetails, contractAddress: iazo.iazoContractAddress }))
      const iazoStatusInfo = await fetchIazoStatusInfo(chainId, iazo.iazoContractAddress)
      dispatch(updateIazoWeb3Data({ value: iazoStatusInfo, contractAddress: iazo.iazoContractAddress }))
    })
  } catch (error) {
    console.error(error)
    dispatch(iazosFetchFailed())
  }
}

export default iazosSlice.reducer
