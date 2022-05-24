/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import jungleFarmsConfig from 'config/constants/jungleFarms'
import {
  fetchJungleFarmsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchJungleFarmUser'
import { JungleFarmsState, JungleFarm, TokenPrices, AppThunk } from '../types'
import fetchJungleFarms from './fetchJungleFarms'

const initialState: JungleFarmsState = { data: [...jungleFarmsConfig] }

export const JungleFarmsSlice = createSlice({
  name: 'JungleFarms',
  initialState,
  reducers: {
    setJungleFarmsPublicData: (state, action) => {
      const liveJungleFarmsData: JungleFarm[] = action.payload
      state.data = state.data.map((farm) => {
        const liveFarmData = liveJungleFarmsData.find((entry) => entry.sousId === farm.sousId)
        return { ...farm, ...liveFarmData }
      })
    },
    setJungleFarmsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((farm) => {
        const userFarmData = userData.find((entry) => entry.sousId === farm.sousId)
        return { ...farm, userData: userFarmData }
      })
    },
    updateJungleFarmsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setJungleFarmsPublicData, setJungleFarmsUserData, updateJungleFarmsUserData } = JungleFarmsSlice.actions

// Thunks
export const fetchJungleFarmsPublicDataAsync =
  (chainId: number, tokenPrices: TokenPrices[]): AppThunk =>
  async (dispatch) => {
    try {
      const farms = await fetchJungleFarms(chainId, tokenPrices)
      dispatch(setJungleFarmsPublicData(farms))
    } catch (error) {
      console.warn(error)
    }
  }

export const fetchJungleFarmsUserDataAsync =
  (chainId: number, account): AppThunk =>
  async (dispatch) => {
    try {
      const allowances = await fetchJungleFarmsAllowance(chainId, account)
      const stakingTokenBalances = await fetchUserBalances(chainId, account)
      const stakedBalances = await fetchUserStakeBalances(chainId, account)
      const pendingRewards = await fetchUserPendingRewards(chainId, account)

      const userData = jungleFarmsConfig.map((farm) => ({
        sousId: farm.sousId,
        allowance: allowances[farm.sousId],
        stakingTokenBalance: stakingTokenBalances[farm.sousId],
        stakedBalance: stakedBalances[farm.sousId],
        pendingReward: pendingRewards[farm.sousId],
      }))
      dispatch(setJungleFarmsUserData(userData))
    } catch (error) {
      console.warn(error)
    }
  }

export const updateJungleFarmsUserAllowance =
  (chainId: number, sousId: number, account: string): AppThunk =>
  async (dispatch) => {
    const allowances = await fetchJungleFarmsAllowance(chainId, account)
    dispatch(updateJungleFarmsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
  }

export const updateJungleFarmsUserBalance =
  (chainId: number, sousId: number, account: string): AppThunk =>
  async (dispatch) => {
    const tokenBalances = await fetchUserBalances(chainId, account)
    dispatch(updateJungleFarmsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
  }

export const updateJungleFarmsUserStakedBalance =
  (chainId: number, sousId: number, account: string): AppThunk =>
  async (dispatch) => {
    const stakedBalances = await fetchUserStakeBalances(chainId, account)
    dispatch(updateJungleFarmsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
  }

export const updateJungleFarmsUserPendingReward =
  (chainId: number, sousId: number, account: string): AppThunk =>
  async (dispatch) => {
    const pendingRewards = await fetchUserPendingRewards(chainId, account)
    dispatch(updateJungleFarmsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
  }

export default JungleFarmsSlice.reducer
