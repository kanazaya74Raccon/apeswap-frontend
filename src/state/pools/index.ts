/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import poolsConfig from 'config/constants/pools'
import { Contract } from 'web3-eth-contract'
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
  (multicallContract: Contract, nativeWrappedAddress: string, chainId: number, tokenPrices: TokenPrices[]) =>
  async (dispatch) => {
    try {
      const blockLimits = await fetchPoolsBlockLimits(multicallContract, chainId)
      const totalStakings = await fetchPoolsTotalStaking(multicallContract, nativeWrappedAddress, chainId)
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

export const fetchPoolsUserDataAsync =
  (multicallContract: Contract, masterChefContract, chainId: number, account) => async (dispatch) => {
    try {
      const allowances = await fetchPoolsAllowance(multicallContract, chainId, account)
      const stakingTokenBalances = await fetchUserBalances(multicallContract, chainId, account)
      const stakedBalances = await fetchUserStakeBalances(multicallContract, masterChefContract, chainId, account)
      const pendingRewards = await fetchUserPendingRewards(multicallContract, masterChefContract, chainId, account)

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

export const updateUserAllowance =
  (multicallContract: Contract, chainId: number, sousId: string, account: string) => async (dispatch) => {
    const allowances = await fetchPoolsAllowance(multicallContract, chainId, account)
    dispatch(updatePoolsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
  }

export const updateUserBalance =
  (multicallContract: Contract, chainId: number, sousId: string, account: string) => async (dispatch) => {
    const tokenBalances = await fetchUserBalances(multicallContract, chainId, account)
    dispatch(updatePoolsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
  }

export const updateUserStakedBalance =
  (multicallContract: Contract, chainId: number, masterChefContract, sousId: string, account: string) =>
  async (dispatch) => {
    const stakedBalances = await fetchUserStakeBalances(multicallContract, masterChefContract, chainId, account)
    dispatch(updatePoolsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
  }

export const updateUserPendingReward =
  (multicallContract: Contract, chainId: number, masterChefContract, sousId: string, account: string) =>
  async (dispatch) => {
    const pendingRewards = await fetchUserPendingRewards(multicallContract, masterChefContract, chainId, account)
    dispatch(updatePoolsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
  }

export default PoolsSlice.reducer
