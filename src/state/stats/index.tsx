/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Stats, StatsState } from 'state/types'
import { computeStats } from './getStats'

const initialState: StatsState = {
  isInitialized: false,
  isLoading: true,
  data: null,
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    statsFetchStart: (state) => {
      state.isLoading = true
    },
    statsFetchSucceeded: (state, action: PayloadAction<Stats>) => {
      state.isInitialized = true
      state.isLoading = false
      state.data = action.payload
    },
    statsFetchFailed: (state) => {
      state.isLoading = false
      state.isInitialized = true
    },
  },
})

// Actions
export const { statsFetchStart, statsFetchSucceeded, statsFetchFailed } = statsSlice.actions

// Thunks
export const fetchStats = (pools, farms, statsOverall, bananaBalance) => (dispatch) => {
  try {
    dispatch(statsFetchStart())
    const stats = computeStats(pools, farms, statsOverall, bananaBalance)

    dispatch(statsFetchSucceeded(stats))
  } catch (error) {
    dispatch(statsFetchFailed())
  }
}

export default statsSlice.reducer
