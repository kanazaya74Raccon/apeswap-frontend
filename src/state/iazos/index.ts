/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { IazosState } from '../types'
import fetchIazosFromApi, { fetchIazoFromApi } from './fetchIazosFromApi'
import fetchIazoDefaultSettings, {
  fetchIazoTokenDetails,
  fetchIazoStatusInfo,
  isRegisteredIazoCheck,
} from './fetchIazoWeb3'

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
    iazosFetchSucceeded: (state, action) => {
      const { liveIazosData, singleFlag } = action.payload
      if (singleFlag) {
        state.iazoData = state.iazoData
          ? state.iazoData.map((iazo) => {
              const liveIazoData = state.iazoData.find(
                (entry) => entry.iazoContractAddress === iazo.iazoContractAddress,
              )
              return { ...liveIazoData, ...iazo }
            })
          : liveIazosData
      } else {
        state.iazoData = state.iazoData
          ? liveIazosData.map((iazo) => {
              const liveIazoData = state.iazoData.find(
                (entry) => entry.iazoContractAddress === iazo.iazoContractAddress,
              )
              return { ...iazo, ...liveIazoData }
            })
          : liveIazosData
      }
      state.isInitialized = true
      state.isLoading = false
    },
    iazoDefaultSettings: (state, action) => {
      const settings = action.payload
      state.iazoDefaultSettings = settings
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
export const { iazosFetchStart, iazosFetchSucceeded, iazosFetchFailed, updateIazoWeb3Data, iazoDefaultSettings } =
  iazosSlice.actions

export const fetchIazos = (chainId: number) => async (dispatch) => {
  try {
    dispatch(iazosFetchStart())
    const iazos = await fetchIazosFromApi(chainId)
    dispatch(iazosFetchSucceeded({ liveIazosData: iazos, singleFlag: false }))
    iazos?.map(async (iazo) => {
      const isRegestered = await isRegisteredIazoCheck(chainId, iazo.iazoContractAddress)
      dispatch(updateIazoWeb3Data({ value: isRegestered, contractAddress: iazo.iazoContractAddress }))
      if (isRegestered?.isRegistered) {
        const iazoTokenDetails = await fetchIazoTokenDetails(chainId, iazo.baseToken.address, iazo.iazoToken.address)
        dispatch(
          updateIazoWeb3Data({
            value: iazoTokenDetails,
            contractAddress: iazo.iazoContractAddress,
            iazoState: iazo.iazoState,
          }),
        )
        const iazoStatusInfo = await fetchIazoStatusInfo(chainId, iazo.iazoContractAddress)
        dispatch(updateIazoWeb3Data({ value: iazoStatusInfo, contractAddress: iazo.iazoContractAddress }))
      }
    })
  } catch (error) {
    console.error(error)
    dispatch(iazosFetchFailed())
  }
}

export const fetchIazo = (chainId: number, address: string) => async (dispatch) => {
  try {
    dispatch(iazosFetchStart())
    const iazos = await fetchIazoFromApi(chainId, address)
    dispatch(iazosFetchSucceeded({ liveIazosData: iazos, singleFlag: true }))
    iazos?.map(async (iazo) => {
      const isRegestered = await isRegisteredIazoCheck(chainId, iazo.iazoContractAddress)
      dispatch(updateIazoWeb3Data({ value: isRegestered, contractAddress: iazo.iazoContractAddress }))
      if (isRegestered?.isRegistered) {
        const iazoTokenDetails = await fetchIazoTokenDetails(chainId, iazo.baseToken.address, iazo.iazoToken.address)
        dispatch(
          updateIazoWeb3Data({
            value: iazoTokenDetails,
            contractAddress: iazo.iazoContractAddress,
            iazoState: iazo.iazoState,
          }),
        )
        const iazoStatusInfo = await fetchIazoStatusInfo(chainId, iazo.iazoContractAddress)
        dispatch(updateIazoWeb3Data({ value: iazoStatusInfo, contractAddress: iazo.iazoContractAddress }))
      }
    })
  } catch (error) {
    console.error(error)
    dispatch(iazosFetchFailed())
  }
}

export const fetchSettings = (chainId: number) => async (dispatch) => {
  try {
    const settings = await fetchIazoDefaultSettings(chainId)
    dispatch(iazoDefaultSettings(settings))
  } catch (error) {
    console.error(error)
    dispatch(iazosFetchFailed())
  }
}

export default iazosSlice.reducer
