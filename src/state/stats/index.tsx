/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Stats, StatsState } from 'state/types'
import getHomepageNews from './getHomepageNews'
import getHomepageStats from './getHomepageStats'
import getHomepageTokenStats from './getHomepageTokenStats'
import { computeStats } from './getStats'

const initialState: StatsState = {
  isInitialized: false,
  isLoading: true,
  HomepageData: null,
  HomepageTokenStats: null,
  HomepageNews: null,
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
    setHomepageStats: (state, action) => {
      state.HomepageData = action.payload
    },
    setHomepageTokenStats: (state, action) => {
      state.HomepageTokenStats = action.payload
    },
    setHomepageNews: (state, action) => {
      state.HomepageNews = action.payload
    },
  },
})

// Actions
export const {
  statsFetchStart,
  statsFetchSucceeded,
  statsFetchFailed,
  setHomepageStats,
  setHomepageTokenStats,
  setHomepageNews,
} = statsSlice.actions

// Thunks
export const fetchStats = (pools, farms, statsOverall, bananaBalance, curBlock) => (dispatch) => {
  try {
    dispatch(statsFetchStart())
    const stats = computeStats(pools, farms, statsOverall, bananaBalance, curBlock)

    dispatch(statsFetchSucceeded(stats))
  } catch (error) {
    dispatch(statsFetchFailed())
  }
}

export const fetchHomepageData = () => async (dispatch) => {
  const homepageStats = await getHomepageStats()
  dispatch(setHomepageStats(homepageStats))
}

export const fetchHomepageTokenData = () => async (dispatch) => {
  const homepageTokenStats = await getHomepageTokenStats()
  dispatch(setHomepageTokenStats(homepageTokenStats))
}

export const fetchHomepageNews = () => async (dispatch) => {
  const homepageNews = await getHomepageNews()
  dispatch(setHomepageNews(homepageNews))
}

export default statsSlice.reducer
