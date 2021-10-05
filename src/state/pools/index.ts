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
export const fetchPoolsPublicDataAsync =
  (multicallAddress: string, nativeWrappedAddress: string, chainId: number, tokenPrices: TokenPrices[]) =>
  async (dispatch) => {
    const blockLimits = await fetchPoolsBlockLimits(multicallAddress, chainId)
    const totalStakings = await fetchPoolsTotalStaking(multicallAddress, nativeWrappedAddress, chainId)
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
  }

export const fetchPoolsUserDataAsync =
  (multicallAddress: string, masterChefContract, chainId: number, account) => async (dispatch) => {
    const allowances = await fetchPoolsAllowance(multicallAddress, chainId, account)
    const stakingTokenBalances = await fetchUserBalances(multicallAddress, chainId, account)
    const stakedBalances = await fetchUserStakeBalances(multicallAddress, masterChefContract, chainId, account)
    const pendingRewards = await fetchUserPendingRewards(multicallAddress, masterChefContract, chainId, account)

    const userData = poolsConfig.map((pool) => ({
      sousId: pool.sousId,
      allowance: allowances[pool.sousId],
      stakingTokenBalance: stakingTokenBalances[pool.sousId],
      stakedBalance: stakedBalances[pool.sousId],
      pendingReward: pendingRewards[pool.sousId],
    }))
    dispatch(setPoolsUserData(userData))
  }

export const updateUserAllowance =
  (multicallAddress: string, chainId: number, sousId: string, account: string) => async (dispatch) => {
    const allowances = await fetchPoolsAllowance(multicallAddress, chainId, account)
    dispatch(updatePoolsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
  }

export const updateUserBalance =
  (multicallAddress: string, chainId: number, sousId: string, account: string) => async (dispatch) => {
    const tokenBalances = await fetchUserBalances(multicallAddress, chainId, account)
    dispatch(updatePoolsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
  }

export const updateUserStakedBalance =
  (multicallAddress: string, chainId: number, masterChefContract, sousId: string, account: string) =>
  async (dispatch) => {
    const stakedBalances = await fetchUserStakeBalances(multicallAddress, masterChefContract, chainId, account)
    dispatch(updatePoolsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
  }

export const updateUserPendingReward =
  (multicallAddress: string, chainId: number, masterChefContract, sousId: string, account: string) =>
  async (dispatch) => {
    const pendingRewards = await fetchUserPendingRewards(multicallAddress, masterChefContract, chainId, account)
    dispatch(updatePoolsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
  }

export default PoolsSlice.reducer
