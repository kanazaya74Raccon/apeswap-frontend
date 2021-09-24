/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import nfaStakingPools from 'config/constants/nfaStakingPools'
import { fetchPoolsBlockLimits, fetchPoolsTotalStatking, fetchPoolTokenStatsAndApr } from './fetchNfaStakingPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchNfaStakingPoolsUser'
import { NfaStakingPool, TokenPrices, NfaStakingPoolsState } from '../types'

const initialState: NfaStakingPoolsState = { data: [...nfaStakingPools] }

export const NfaStakingPoolsSlice = createSlice({
  name: 'NfaStakingPools',
  initialState,
  reducers: {
    setNfaStakingPoolsPublicData: (state, action) => {
      const liveNfaStakingPoolsData: NfaStakingPool[] = action.payload
      state.data = state.data.map((nfaStakingPool) => {
        const liveNfaStakingPoolData = liveNfaStakingPoolsData.find((entry) => entry.sousId === nfaStakingPool.sousId)
        return { ...nfaStakingPool, ...liveNfaStakingPoolData }
      })
    },
    setNfaStakingPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((nfaStakingPool) => {
        const userPoolData = userData.find((entry) => entry.sousId === nfaStakingPool.sousId)
        return { ...nfaStakingPool, userData: userPoolData }
      })
    },
    updateNfaStakingPoolsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setNfaStakingPoolsPublicData, setNfaStakingPoolsUserData, updateNfaStakingPoolsUserData } =
  NfaStakingPoolsSlice.actions

// Thunks
export const fetchNfaStakingPoolsPublicDataAsync = (tokenPrices: TokenPrices[]) => async (dispatch) => {
  const blockLimits = await fetchPoolsBlockLimits()
  const totalStakings = await fetchPoolsTotalStatking()
  const tokenStatsAndAprs = await fetchPoolTokenStatsAndApr(tokenPrices, totalStakings)
  const liveData = await Promise.all(
    nfaStakingPools.map(async (nfaStakingPool) => {
      const blockLimit = blockLimits.find((entry) => entry.sousId === nfaStakingPool.sousId)
      const totalStaking = totalStakings.find((entry) => entry.sousId === nfaStakingPool.sousId)
      const tokenStatsAndApr = tokenStatsAndAprs.find((entry) => entry.sousId === nfaStakingPool.sousId)
      // const lpData = nfaStakingPool.lpStaking ? await fetchReserveData(nfaStakingPool.stakingTokenAddress[CHAIN_ID]) : null
      return {
        ...blockLimit,
        ...totalStaking,
        ...tokenStatsAndApr,
      }
    }),
  )
  dispatch(setNfaStakingPoolsPublicData(liveData))
}

export const fetchNfaStakingPoolsUserDataAsync = (account) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  const stakingTokenBalances = await fetchUserBalances(account)
  const stakedBalances = await fetchUserStakeBalances(account)
  const pendingRewards = await fetchUserPendingRewards(account)

  const userData = nfaStakingPools.map((nfaStakingPool) => ({
    sousId: nfaStakingPool.sousId,
    allowance: allowances[nfaStakingPool.sousId],
    stakingTokenBalance: stakingTokenBalances[nfaStakingPool.sousId],
    stakedBalance: stakedBalances[nfaStakingPool.sousId],
    pendingReward: pendingRewards[nfaStakingPool.sousId],
  }))
  dispatch(setNfaStakingPoolsUserData(userData))
}

export const updateUserAllowance = (sousId: string, account: string) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  dispatch(updateNfaStakingPoolsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
}

export const updateUserBalance = (sousId: string, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(account)
  dispatch(updateNfaStakingPoolsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
}

export const updateUserStakedBalance = (sousId: string, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalances(account)
  dispatch(updateNfaStakingPoolsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
}

export const updateUserPendingReward = (sousId: string, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewards(account)
  dispatch(updateNfaStakingPoolsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
}

export default NfaStakingPoolsSlice.reducer
