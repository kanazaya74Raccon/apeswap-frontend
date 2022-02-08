/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import junglePools from 'config/constants/junglePools'
import {
  fetchJunglePoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchJunglePoolsUser'
import { JunglePoolsState, JunglePool, TokenPrices, AppThunk } from '../types'
import fetchJunglePools from './fetchJunglePools'

const initialState: JunglePoolsState = { data: [...junglePools] }

export const JunglePoolsSlice = createSlice({
  name: 'JunglePools',
  initialState,
  reducers: {
    setJunglePoolsPublicData: (state, action) => {
      const livePoolsData: JunglePool[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, ...livePoolData }
      })
    },
    setJunglePoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, userData: userPoolData }
      })
    },
    updateJunglePoolsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setJunglePoolsPublicData, setJunglePoolsUserData, updateJunglePoolsUserData } = JunglePoolsSlice.actions

// Thunks
export const fetchJunglePoolsPublicDataAsync =
  (chainId: number, tokenPrices: TokenPrices[]): AppThunk =>
  async (dispatch) => {
    try {
      const pools = await fetchJunglePools(chainId, tokenPrices)
      dispatch(setJunglePoolsPublicData(pools))
    } catch (error) {
      console.warn(error)
    }
  }

export const fetchJunglePoolsUserDataAsync =
  (chainId: number, account): AppThunk =>
  async (dispatch) => {
    try {
      const allowances = await fetchJunglePoolsAllowance(chainId, account)
      const stakingTokenBalances = await fetchUserBalances(chainId, account)
      const stakedBalances = await fetchUserStakeBalances(chainId, account)
      const pendingRewards = await fetchUserPendingRewards(chainId, account)

      const userData = junglePools.map((pool) => ({
        sousId: pool.sousId,
        allowance: allowances[pool.sousId],
        stakingTokenBalance: stakingTokenBalances[pool.sousId],
        stakedBalance: stakedBalances[pool.sousId],
        pendingReward: pendingRewards[pool.sousId],
      }))
      dispatch(setJunglePoolsUserData(userData))
    } catch (error) {
      console.warn(error)
    }
  }

export const updateUserAllowance =
  (chainId: number, sousId: string, account: string): AppThunk =>
  async (dispatch) => {
    const allowances = await fetchJunglePoolsAllowance(chainId, account)
    dispatch(updateJunglePoolsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
  }

export const updateUserBalance =
  (chainId: number, sousId: string, account: string): AppThunk =>
  async (dispatch) => {
    const tokenBalances = await fetchUserBalances(chainId, account)
    dispatch(updateJunglePoolsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
  }

export const updateUserStakedBalance =
  (chainId: number, sousId: string, account: string): AppThunk =>
  async (dispatch) => {
    const stakedBalances = await fetchUserStakeBalances(chainId, account)
    dispatch(updateJunglePoolsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
  }

export const updateUserPendingReward =
  (chainId: number, sousId: string, account: string): AppThunk =>
  async (dispatch) => {
    const pendingRewards = await fetchUserPendingRewards(chainId, account)
    dispatch(updateJunglePoolsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
  }

export default JunglePoolsSlice.reducer
