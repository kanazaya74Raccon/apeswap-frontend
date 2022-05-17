/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import poolsConfig from 'config/constants/pools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchPoolsUser'
import { PoolsState, Pool, TokenPrices, AppThunk } from '../types'
import fetchPools from './fetchPools'
import fetchPoolTagsFromApi from './fetchPoolTags'

const initialState: PoolsState = {
  data: [...poolsConfig],
  tags: null,
}

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData: Pool[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, ...livePoolData }
      })
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, userData: userPoolData }
      })
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
    getPoolTags: (state, action) => {
      state.tags = action.payload
    },
  },
})

// Actions
export const { setPoolsPublicData, setPoolsUserData, updatePoolsUserData, getPoolTags } = PoolsSlice.actions

// Thunks
export const fetchPoolsPublicDataAsync =
  (chainId: number, tokenPrices: TokenPrices[]): AppThunk =>
  async (dispatch) => {
    try {
      const pools = await fetchPools(chainId, tokenPrices)
      dispatch(setPoolsPublicData(pools))
    } catch (error) {
      console.warn(error)
    }
  }

export const fetchPoolsUserDataAsync =
  (chainId: number, account): AppThunk =>
  async (dispatch) => {
    try {
      const allowances = await fetchPoolsAllowance(chainId, account)
      const stakingTokenBalances = await fetchUserBalances(chainId, account)
      const stakedBalances = await fetchUserStakeBalances(chainId, account)
      const pendingRewards = await fetchUserPendingRewards(chainId, account)

      const userData = poolsConfig.map((pool) => ({
        sousId: pool.sousId,
        allowance: allowances[pool.sousId],
        stakingTokenBalance: stakingTokenBalances[pool.sousId],
        stakedBalance: stakedBalances[pool.sousId],
        pendingReward: pendingRewards[pool.sousId],
      }))
      dispatch(setPoolsUserData(userData))
    } catch (error) {
      console.warn(error)
    }
  }

export const updateUserAllowance =
  (chainId: number, sousId: number, account: string): AppThunk =>
  async (dispatch) => {
    const allowances = await fetchPoolsAllowance(chainId, account)
    dispatch(updatePoolsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
  }

export const updateUserBalance =
  (chainId: number, sousId: number, account: string): AppThunk =>
  async (dispatch) => {
    const tokenBalances = await fetchUserBalances(chainId, account)
    dispatch(updatePoolsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
  }

export const updateUserStakedBalance =
  (chainId: number, sousId: number, account: string): AppThunk =>
  async (dispatch) => {
    const stakedBalances = await fetchUserStakeBalances(chainId, account)
    dispatch(updatePoolsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
  }

export const updateUserPendingReward =
  (chainId: number, sousId: number, account: string): AppThunk =>
  async (dispatch) => {
    const pendingRewards = await fetchUserPendingRewards(chainId, account)
    dispatch(updatePoolsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
  }

export const setPoolTagsAsync = (chainId: number) => async (dispatch) => {
  const tags = await fetchPoolTagsFromApi(chainId)
  dispatch(getPoolTags(tags))
}

export default PoolsSlice.reducer
