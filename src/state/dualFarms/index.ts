/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { dualFarmsConfig } from 'config/constants'
import fetchDualFarms from './fetchDualFarms'
import {
  fetchDualMiniChefEarnings,
  fetchDualFarmUserAllowances,
  fetchDualFarmUserTokenBalances,
  fetchDualFarmUserStakedBalances,
  fetchDualFarmRewarderEarnings,
} from './fetchDualFarmUser'
import { TokenPrices, DualFarm, DualFarmsState } from '../types'

const initialState: DualFarmsState = { data: [...dualFarmsConfig] }

export const dualFarmsSlice = createSlice({
  name: 'dualFarms',
  initialState,
  reducers: {
    setDualFarmsPublicData: (state, action) => {
      const liveFarmsData: DualFarm[] = action.payload
      state.data = state.data.map((farm) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === farm.pid)
        return { ...farm, ...liveFarmData }
      })
    },
    setDualFarmUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((dualFarm) => {
        const userDualFarmData = userData.find((entry) => entry.pid === dualFarm.pid)
        return { ...dualFarm, userData: userDualFarmData }
      })
    },
    updateDualFarmUserData: (state, action) => {
      const { field, value, pid } = action.payload
      const index = state.data.findIndex((p) => p.pid === pid)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setDualFarmsPublicData, setDualFarmUserData, updateDualFarmUserData } = dualFarmsSlice.actions

// Thunks
export const fetchDualFarmsPublicDataAsync = (tokenPrices: TokenPrices[], chainId: number) => async (dispatch) => {
  try {
    const dualFarms = await fetchDualFarms(tokenPrices, chainId)
    dispatch(setDualFarmsPublicData(dualFarms))
  } catch (error) {
    console.warn(error)
  }
}
export const fetchDualFarmUserDataAsync = (chainId: number, account: string) => async (dispatch) => {
  try {
    const userFarmAllowances = await fetchDualFarmUserAllowances(chainId, account)
    const userFarmTokenBalances = await fetchDualFarmUserTokenBalances(chainId, account)
    const userStakedBalances = await fetchDualFarmUserStakedBalances(chainId, account)
    const miniChefEarnings = await fetchDualMiniChefEarnings(chainId, account)
    const rewarderEarnings = await fetchDualFarmRewarderEarnings(chainId, account)
    const arrayOfUserDataObjects = dualFarmsConfig.map((dualFarm) => {
      return {
        pid: dualFarm.pid,
        allowance: userFarmAllowances[dualFarm.pid],
        tokenBalance: userFarmTokenBalances[dualFarm.pid],
        stakedBalance: userStakedBalances[dualFarm.pid],
        miniChefEarnings: miniChefEarnings[dualFarm.pid],
        rewarderEarnings: rewarderEarnings[dualFarm.pid],
      }
    })
    dispatch(setDualFarmUserData(arrayOfUserDataObjects))
  } catch (error) {
    console.warn(error)
  }
}

export const updateDualFarmUserAllowances = (chainId: number, pid, account: string) => async (dispatch) => {
  const allowances = await fetchDualFarmUserAllowances(chainId, account)
  const pidIndex = dualFarmsConfig.findIndex((f) => f.pid === pid)
  dispatch(updateDualFarmUserData({ pid, field: 'allowance', value: allowances[pidIndex] }))
}

export const updateDualFarmUserTokenBalances = (chainId: number, pid, account: string) => async (dispatch) => {
  const tokenBalances = await fetchDualFarmUserTokenBalances(chainId, account)
  const pidIndex = dualFarmsConfig.findIndex((f) => f.pid === pid)
  dispatch(updateDualFarmUserData({ pid, field: 'tokenBalance', value: tokenBalances[pidIndex] }))
}

export const updateDualFarmUserStakedBalances = (chainId: number, pid, account: string) => async (dispatch) => {
  const stakedBalances = await fetchDualFarmUserStakedBalances(chainId, account)
  const pidIndex = dualFarmsConfig.findIndex((f) => f.pid === pid)
  dispatch(updateDualFarmUserData({ pid, field: 'stakedBalance', value: stakedBalances[pidIndex] }))
}

export const updateDualFarmUserEarnings = (chainId: number, pid, account: string) => async (dispatch) => {
  const pendingRewards = await fetchDualMiniChefEarnings(chainId, account)
  const pidIndex = dualFarmsConfig.findIndex((f) => f.pid === pid)
  dispatch(updateDualFarmUserData({ pid, field: 'miniChefEarnings', value: pendingRewards[pidIndex] }))
}

export const updateDualFarmRewarderEarnings = (chainId: number, pid, account: string) => async (dispatch) => {
  const rewarderEarnings = await fetchDualFarmRewarderEarnings(chainId, account)
  const pidIndex = dualFarmsConfig.findIndex((f) => f.pid === pid)
  dispatch(updateDualFarmUserData({ pid, field: 'rewarderEarnings', value: rewarderEarnings[pidIndex] }))
}

export default dualFarmsSlice.reducer
