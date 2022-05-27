/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Stats, StatsState } from 'state/types'
import getFarmLpAprs from './getFarmLpAprs'
import getHomepageLaunchCalendar from './getHomepageLaunchCalendar'
import getHomepageNews from './getHomepageNews'
import getHomepageServiceStats from './getHomepageService'
import getHomepageStats from './getHomepageStats'
import getHomepageTokenStats from './getHomepageTokenStats'
import { computeStats } from './getStats'
import fetchIfoStatus from './fetchIfoStatus'
import fetchTagsFromApi from './fetchTagsFromApi'

const initialState: StatsState = {
  isInitialized: false,
  isLoading: true,
  HomepageData: null,
  HomepageTokenStats: null,
  HomepageNews: null,
  HomepageLaunchCalendar: null,
  HomepageServiceStats: null,
  FarmLpAprs: null,
  Tags: null,
  LiveIfo: null,
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
    setHomepageLaunchCalendar: (state, action) => {
      state.HomepageLaunchCalendar = action.payload
    },
    setHomepageServiceStats: (state, action) => {
      state.HomepageServiceStats = action.payload
    },
    setFarmLpAprs: (state, action) => {
      state.FarmLpAprs = action.payload
    },
    fetchLiveIfoStart: (state) => {
      state.isLoading = true
    },
    fetchLiveIfoSuccess: (state, action) => {
      state.isInitialized = true
      state.isLoading = false
      state.LiveIfo = action.payload
    },
    fetchLiveIfoFailure: (state) => {
      state.isLoading = false
      state.isInitialized = true
    },
    fetchTags: (state, action) => {
      state.Tags = action.payload
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
  setHomepageLaunchCalendar,
  setHomepageServiceStats,
  setFarmLpAprs,
  fetchLiveIfoFailure,
  fetchLiveIfoStart,
  fetchLiveIfoSuccess,
  fetchTags,
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

export const fetchHomepageTokenData = (category: string) => async (dispatch) => {
  const homepageTokenStats = await getHomepageTokenStats(category)
  dispatch(setHomepageTokenStats(homepageTokenStats))
}

export const fetchHomepageNews = () => async (dispatch) => {
  const homepageNews = await getHomepageNews()
  dispatch(setHomepageNews(homepageNews))
}

export const fetchHomepageLaunchCalendar = () => async (dispatch) => {
  const homepageLaunchCalendar = await getHomepageLaunchCalendar()
  dispatch(setHomepageLaunchCalendar(homepageLaunchCalendar))
}

export const fetchHomepageService = () => async (dispatch) => {
  const homepageServiceStats = await getHomepageServiceStats()
  dispatch(setHomepageServiceStats(homepageServiceStats))
}

export const fetchFarmLpAprs = (chainId) => async (dispatch) => {
  const farmLpAprs = await getFarmLpAprs(chainId)
  dispatch(setFarmLpAprs(farmLpAprs))
}

export const fetchLiveIfoStatus = () => async (dispatch) => {
  try {
    dispatch(fetchLiveIfoStart())
    const liveStatus = await fetchIfoStatus()
    dispatch(fetchLiveIfoSuccess(liveStatus))
  } catch (error) {
    dispatch(fetchLiveIfoFailure())
  }
}

export const fetchLiveTags = () => async (dispatch) => {
  const tags = await fetchTagsFromApi()
  dispatch(fetchTags(tags))
}

export default statsSlice.reducer
