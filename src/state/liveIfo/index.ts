/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LiveIfo } from 'config/constants/types'
import { LiveIfoState } from 'state/types'
import fetchIfoStatus from './fetchIfoStatus'

const initialState: LiveIfoState = {
  isInitialized: false,
  isLoading: true,
  data: null,
}

export const liveIfoStatus = createSlice({
  name: 'liveIfos',
  initialState,
  reducers: {
    fetchLiveIfoStart: (state) => {
      state.isLoading = true
    },
    fetchLiveIfoSuccess: (state, action: PayloadAction<LiveIfo[]>) => {
      state.isInitialized = true
      state.isLoading = false
      state.data = action.payload
    },
    fetchLiveIfoFailure: (state) => {
      state.isLoading = false
      state.isInitialized = true
    },
  },
})

export const { fetchLiveIfoStart, fetchLiveIfoSuccess, fetchLiveIfoFailure } = liveIfoStatus.actions

export const fetchLiveIfoStatus = () => async (dispatch) => {
  try {
    dispatch(fetchLiveIfoStart())
    const liveStatus = await fetchIfoStatus()
    dispatch(fetchLiveIfoSuccess(liveStatus))
  } catch (error) {
    dispatch(fetchLiveIfoFailure())
  }
}

export default liveIfoStatus.reducer
