/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import poolsConfig from 'config/constants/pools'
import { fetchPoolsBlockLimits, fetchPoolsTotalStaking, fetchPoolTokenStatsAndApr } from './fetchPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchPoolsUser'
import { PoolsState, Pool, TokenPrices } from '../types'

const initialState: PoolsState = { data: [...poolsConfig] }

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
  },
})

// Actions
export const { setPoolsPublicData, setPoolsUserData, updatePoolsUserData } = PoolsSlice.actions

// Thunks
export const fetchPoolsPublicDataAsync = (chainId: number, tokenPrices: TokenPrices[]) => async (dispatch) => {
  try {
    const blockLimits = await fetchPoolsBlockLimits(chainId)
    const totalStakings = await fetchPoolsTotalStaking(chainId)
    const tokenStatsAndAprs = await fetchPoolTokenStatsAndApr(tokenPrices, totalStakings, chainId)
    const liveData = await Promise.all(
      poolsConfig.map(async (pool) => {
        const blockLimit = blockLimits.find((entry) => entry.sousId === pool.sousId)
        const totalStaking = totalStakings.find((entry) => entry.sousId === pool.sousId)
        const tokenStatsAndApr = tokenStatsAndAprs.find((entry) => entry.sousId === pool.sousId)
        // const lpData = pool.lpStaking ? await fetchReserveData(pool.stakingTokenAddress[CHAIN_ID]) : null
        return {
          ...blockLimit,
          ...totalStaking,
          ...tokenStatsAndApr,
        }
      }),
    )
    dispatch(setPoolsPublicData(liveData))
  } catch (error) {
    console.warn(error)
  }
}

export const fetchPoolsUserDataAsync = (chainId: number, account) => async (dispatch) => {
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

export const updateUserAllowance = (chainId: number, sousId: string, account: string) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(chainId, account)
  dispatch(updatePoolsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
}

export const updateUserBalance = (chainId: number, sousId: string, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(chainId, account)
  dispatch(updatePoolsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
}

export const updateUserStakedBalance = (chainId: number, sousId: string, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalances(chainId, account)
  dispatch(updatePoolsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
}

export const updateUserPendingReward = (chainId: number, sousId: string, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewards(chainId, account)
  dispatch(updatePoolsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
}

export default PoolsSlice.reducer
