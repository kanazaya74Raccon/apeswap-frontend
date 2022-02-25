/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import { farmsConfig } from 'config/constants'
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from './fetchFarmUser'
import { FarmsState, Farm, LpTokenPrices } from '../types'
import fetchFarms from './fetchFarms'

const initialState: FarmsState = { data: [...farmsConfig] }

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setFarmsPublicData: (state, action) => {
      const liveFarmsData: Farm[] = action.payload
      state.data = state.data.map((farm) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === farm.pid)
        return { ...farm, ...liveFarmData }
      })
    },
    setFarmUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
    updateFarmUserData: (state, action) => {
      const { field, value, pid } = action.payload
      const index = state.data.findIndex((p) => p.pid === pid)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setFarmsPublicData, setFarmUserData, updateFarmUserData } = farmsSlice.actions

// Thunks
export const fetchFarmsPublicDataAsync =
  (chainId: number, lpPrices: LpTokenPrices[], bananaPrice: BigNumber) => async (dispatch) => {
    try {
      const farms = await fetchFarms(chainId, lpPrices, bananaPrice)
      dispatch(setFarmsPublicData(farms))
    } catch (error) {
      console.warn(error)
    }
  }
export const fetchFarmUserDataAsync = (chainId: number, account: string) => async (dispatch) => {
  try {
    const userFarmAllowances = await fetchFarmUserAllowances(chainId, account)
    const userFarmTokenBalances = await fetchFarmUserTokenBalances(chainId, account)
    const userStakedBalances = await fetchFarmUserStakedBalances(chainId, account)
    const userFarmEarnings = await fetchFarmUserEarnings(chainId, account)

    const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
      return {
        index,
        allowance: userFarmAllowances[index],
        tokenBalance: userFarmTokenBalances[index],
        stakedBalance: userStakedBalances[index],
        earnings: userFarmEarnings[index],
      }
    })
    dispatch(setFarmUserData({ arrayOfUserDataObjects }))
  } catch (error) {
    console.warn(error)
  }
}

export const updateFarmUserAllowances = (chainId: number, pid, account: string) => async (dispatch) => {
  const allowances = await fetchFarmUserAllowances(chainId, account)
  dispatch(updateFarmUserData({ pid, field: 'allowance', value: allowances[pid] }))
}

export const updateFarmUserTokenBalances = (chainId: number, pid, account: string) => async (dispatch) => {
  const tokenBalances = await fetchFarmUserTokenBalances(chainId, account)
  dispatch(updateFarmUserData({ pid, field: 'tokenBalance', value: tokenBalances[pid] }))
}

export const updateFarmUserStakedBalances = (chainId: number, pid, account: string) => async (dispatch) => {
  const stakedBalances = await fetchFarmUserStakedBalances(chainId, account)
  console.log('staked balance', stakedBalances[pid].toString())
  dispatch(updateFarmUserData({ pid, field: 'stakedBalance', value: stakedBalances[pid] }))
}

export const updateFarmUserEarnings = (chainId: number, pid, account: string) => async (dispatch) => {
  const pendingRewards = await fetchFarmUserEarnings(chainId, account)
  dispatch(updateFarmUserData({ pid, field: 'earnings', value: pendingRewards[pid] }))
}

export default farmsSlice.reducer
