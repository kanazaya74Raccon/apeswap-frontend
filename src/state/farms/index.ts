/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { farmsConfig } from 'config/constants'
import { Contract } from 'web3-eth-contract'
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
  (multicallContract: Contract, masterChefAddress: string, chainId: number) => async (dispatch) => {
    try {
      const farms = await fetchFarms(multicallContract, masterChefAddress, chainId)
      dispatch(setFarmsPublicData(farms))
    } catch (error) {
      console.error(error)
    }
  }
export const fetchFarmUserDataAsync =
  (multicallContract: Contract, masterChefAddress: string, chainId: number, account: string) => async (dispatch) => {
    try {
      const userFarmAllowances = await fetchFarmUserAllowances(multicallContract, masterChefAddress, chainId, account)
      const userFarmTokenBalances = await fetchFarmUserTokenBalances(multicallContract, chainId, account)
      const userStakedBalances = await fetchFarmUserStakedBalances(multicallContract, masterChefAddress, account)
      const userFarmEarnings = await fetchFarmUserEarnings(multicallContract, masterChefAddress, account)

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
      console.error(error)
    }
  }

export default farmsSlice.reducer
