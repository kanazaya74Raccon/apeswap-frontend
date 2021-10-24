/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { Contract } from 'web3-eth-contract'
import { dualFarmsConfig } from 'config/constants'
import fetchDualFarms from './fetchDualFarms'
import {
  fetchDualFarmUserEarnings,
  fetchDualFarmUserAllowances,
  fetchDualFarmUserTokenBalances,
  fetchDualFarmUserStakedBalances,
} from './fetchDualFarmUser'
import { TokenPrices, DualFarm, DualFarmsState } from '../types'

const initialState: DualFarmsState = { data: [...dualFarmsConfig], loadVaultData: false, userDataLoaded: false }

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
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setDualFarmsPublicData, setDualFarmUserData } = dualFarmsSlice.actions

// Thunks
export const fetchDualFarmsPublicDataAsync =
  (multicallContract: Contract, miniChefAddress: string, tokenPrices: TokenPrices[], chainId: number) =>
  async (dispatch) => {
    try {
      const dualFarms = await fetchDualFarms(multicallContract, miniChefAddress, tokenPrices, chainId)
      dispatch(setDualFarmsPublicData(dualFarms))
    } catch (error) {
      console.error(error)
    }
  }
export const fetchDualFarmUserDataAsync =
  (multicallContract: Contract, miniChefAddress: string, account: string) => async (dispatch) => {
    try {
      const userFarmAllowances = await fetchDualFarmUserAllowances(multicallContract, miniChefAddress, account)
      const userFarmTokenBalances = await fetchDualFarmUserTokenBalances(multicallContract, account)
      const userStakedBalances = await fetchDualFarmUserStakedBalances(multicallContract, miniChefAddress, account)
      const userFarmEarnings = await fetchDualFarmUserEarnings(multicallContract, miniChefAddress, account)
      const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
        return {
          index,
          allowance: userFarmAllowances[index],
          tokenBalance: userFarmTokenBalances[index],
          stakedBalance: userStakedBalances[index],
          earnings: userFarmEarnings[index],
        }
      })
      dispatch(setDualFarmUserData({ arrayOfUserDataObjects }))
    } catch (error) {
      console.error(error)
    }
  }

export default dualFarmsSlice.reducer
