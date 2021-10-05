/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { farmsConfig } from 'config/constants'
import fetchFarms from './fetchFarms'
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from './fetchFarmUser'
import { FarmsState, Farm } from '../types'

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
  },
})

// Actions
export const { setFarmsPublicData, setFarmUserData } = farmsSlice.actions

// Thunks
export const fetchFarmsPublicDataAsync =
  (multicallAddress: string, masterChefAddress: string, chainId: number) => async (dispatch) => {
    const farms = await fetchFarms(multicallAddress, masterChefAddress, chainId)
    dispatch(setFarmsPublicData(farms))
  }
export const fetchFarmUserDataAsync =
  (multicallAddress: string, masterChefAddress: string, chainId: number, account: string) => async (dispatch) => {
    const userFarmAllowances = await fetchFarmUserAllowances(multicallAddress, masterChefAddress, chainId, account)
    const userFarmTokenBalances = await fetchFarmUserTokenBalances(multicallAddress, chainId, account)
    const userStakedBalances = await fetchFarmUserStakedBalances(multicallAddress, masterChefAddress, account)
    const userFarmEarnings = await fetchFarmUserEarnings(multicallAddress, masterChefAddress, account)

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
  }

export default farmsSlice.reducer
