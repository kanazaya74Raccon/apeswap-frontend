/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatsOverall, StatsOverallState } from 'state/types'
import getStatsOverall from './getStatsOverall'

const initialState: StatsOverallState = {
  isInitialized: false,
  isLoading: true,
  data: null,
}

export const statsOverallSlice = createSlice({
  name: 'statsOverall',
  initialState,
  reducers: {
    statsOverallFetchStart: (state) => {
      state.isLoading = true
    },
    statsOverallFetchSucceeded: (state, action: PayloadAction<StatsOverall>) => {
      state.isInitialized = true
      state.isLoading = false
      state.data = action.payload
    },
    statsOverallFetchFailed: (state) => {
      state.isLoading = false
      state.isInitialized = true
    },
  },
})

// Actions
export const { statsOverallFetchStart, statsOverallFetchSucceeded, statsOverallFetchFailed } = statsOverallSlice.actions

// Thunks
export const fetchStatsOverall = () => async (dispatch) => {
  try {
    dispatch(statsOverallFetchStart())
    const stats = await getStatsOverall()
    dispatch(statsOverallFetchSucceeded(stats))
  } catch (error) {
    dispatch(statsOverallFetchFailed())
  }
}

export default statsOverallSlice.reducer
