/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import bills from 'config/constants/bills'
import {
  fetchBillsAllowance,
  fetchUserBalances,
  fetchUserOwnedBills,
  // fetchUserPendingRewards,
} from './fetchBillsUser'
import { TokenPrices, AppThunk, BillsState, Bills } from '../types'
import fetchBills from './fetchBills'

const initialState: BillsState = { data: [...bills] }

export const billsSlice = createSlice({
  name: 'Bills',
  initialState,
  reducers: {
    setBillsPublicData: (state, action) => {
      const liveBillsData: Bills[] = action.payload
      state.data = state.data.map((bill) => {
        const liveBillData = liveBillsData.find((entry) => entry.index === bill.index)
        return { ...bill, ...liveBillData }
      })
    },
    setBillsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((bill) => {
        const userBillData = userData.find((entry) => entry.index === bill.index)
        return { ...bill, userData: userBillData }
      })
    },
    updateBillsUserData: (state, action) => {
      const { field, value, index } = action.payload
      const i = state.data.findIndex((bill) => bill.index === index)
      state.data[i] = { ...state.data[i], userData: { ...state.data[i].userData, [field]: value } }
    },
  },
})

// Actions
export const { setBillsPublicData, setBillsUserData, updateBillsUserData } = billsSlice.actions

// Thunks
export const fetchBillsPublicDataAsync =
  (chainId: number, tokenPrices: TokenPrices[]): AppThunk =>
  async (dispatch) => {
    try {
      const returnedBills = await fetchBills(chainId, tokenPrices)
      dispatch(setBillsPublicData(returnedBills))
    } catch (error) {
      console.warn(error)
    }
  }

export const fetchBillsUserDataAsync =
  (chainId: number, account): AppThunk =>
  async (dispatch) => {
    try {
      const allowances = await fetchBillsAllowance(chainId, account)
      const stakingTokenBalances = await fetchUserBalances(chainId, account)
      const userOwnedBills = await fetchUserOwnedBills(chainId, account)
      const mapUserOwnedBills = bills.map((bill) =>
        userOwnedBills.filter((b) => b.address === bill.contractAddress[chainId]),
      )
      console.log(mapUserOwnedBills)
      // const stakedBalances = await fetchUserStakeBalances(chainId, account)
      // const pendingRewards = await fetchUserPendingRewards(chainId, account)

      const userData = bills.map((bill) => ({
        index: bill.index,
        allowance: allowances[bill.index],
        stakingTokenBalance: stakingTokenBalances[bill.index],
        bills: mapUserOwnedBills[bill.index],
        // stakedBalance: stakedBalances[bill.index],
        // pendingReward: pendingRewards[bill.index],
      }))
      dispatch(setBillsUserData(userData))
    } catch (error) {
      console.warn(error)
    }
  }

export const updateUserAllowance =
  (chainId: number, index: number, account: string): AppThunk =>
  async (dispatch) => {
    const allowances = await fetchBillsAllowance(chainId, account)
    dispatch(updateBillsUserData({ index, field: 'allowance', value: allowances[index] }))
  }

export const updateUserBalance =
  (chainId: number, sousId: string, account: string): AppThunk =>
  async (dispatch) => {
    const tokenBalances = await fetchUserBalances(chainId, account)
    dispatch(updateBillsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
  }

// export const updateUserStakedBalance =
//   (chainId: number, sousId: string, account: string): AppThunk =>
//   async (dispatch) => {
//     const stakedBalances = await fetchUserStakeBalances(chainId, account)
//     dispatch(updateBillsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
//   }

// export const updateUserPendingReward =
//   (chainId: number, sousId: string, account: string): AppThunk =>
//   async (dispatch) => {
//     const pendingRewards = await fetchUserPendingRewards(chainId, account)
//     dispatch(updateBillsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
//   }

export default billsSlice.reducer
