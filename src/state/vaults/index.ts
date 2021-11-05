/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import vaultsConfig from 'config/constants/vaults'
import fetchVaultData from './fetchVaultData'
import { fetchVaultUserAllowances, fetchVaultUserStakedBalances, fetchVaultUserTokenBalances } from './fetchVaultsUser'
import { VaultsState, TokenPrices, Vault } from '../types'

const initialState: VaultsState = { data: [], loadVaultData: false, userDataLoaded: false }

export const vaultSlice = createSlice({
  name: 'Vaults',
  initialState,
  reducers: {
    setLoadVaultData: (state, action) => {
      const liveVaultsData: Vault[] = action.payload
      state.data = state.data.map((vault) => {
        const liveVaultData = liveVaultsData.find((entry) => entry.pid === vault.pid)
        return { ...vault, ...liveVaultData }
      })
    },
    setVaultUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((vault) => {
        const userVaultData = userData.find((entry) => entry.pid === vault.pid)
        return { ...vault, userData: userVaultData }
      })
    },
    updateVaultsUserData: (state, action) => {
      const { field, value, pid } = action.payload
      const index = state.data.findIndex((v) => v.pid === pid)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
    setVaults: (state, action) => {
      if (!state.loadVaultData) {
        state.data = action.payload
      }
    },
    setVaultsLoad: (state, action) => {
      state.loadVaultData = action.payload
    },
  },
})

// thunks
export const fetchVaultsPublicDataAsync = (chainId: number, tokenPrices: TokenPrices[]) => async (dispatch) => {
  try {
    const vaults = await fetchVaultData(chainId, tokenPrices)
    dispatch(setLoadVaultData(vaults))
  } catch (error) {
    console.warn(error)
  }
}

export const fetchVaultUserDataAsync = (account: string, chainId: number) => async (dispatch) => {
  try {
    const filteredVaults = vaultsConfig.filter((vault) => vault.network === chainId)
    const userVaultAllowances = await fetchVaultUserAllowances(account, chainId)
    const userVaultTokenBalances = await fetchVaultUserTokenBalances(account, chainId)
    const userVaultBalances = await fetchVaultUserStakedBalances(account, chainId)
    const userData = filteredVaults.map((vault, index) => {
      return {
        pid: vault.pid,
        allowance: userVaultAllowances[index],
        tokenBalance: userVaultTokenBalances[index],
        stakedBalance: userVaultBalances[index],
      }
    })
    dispatch(setVaultUserData(userData))
  } catch (error) {
    console.warn(error)
  }
}

export const setFilteredVaults = (chainId: number) => async (dispatch) => {
  const filteredVaults = vaultsConfig.filter((vault) => vault.network === chainId)
  dispatch(setVaults(filteredVaults))
  dispatch(setVaultsLoad(true))
}

export const updateVaultUserAllowance = (account: string, chainId: number, pid: number) => async (dispatch) => {
  const allowances = await fetchVaultUserAllowances(account, chainId)
  const filteredVaults = vaultsConfig.filter((vault) => vault.network === chainId)
  const pidIndex = filteredVaults.findIndex((v) => v.pid === pid)
  dispatch(updateVaultsUserData({ pid, field: 'allowance', value: allowances[pidIndex] }))
}

export const updateVaultUserBalance = (account: string, chainId: number, pid: number) => async (dispatch) => {
  const tokenBalances = await fetchVaultUserTokenBalances(account, chainId)
  const filteredVaults = vaultsConfig.filter((vault) => vault.network === chainId)
  const pidIndex = filteredVaults.findIndex((v) => v.pid === pid)
  dispatch(updateVaultsUserData({ pid, field: 'tokenBalance', value: tokenBalances[pidIndex] }))
}

export const updateVaultUserStakedBalance = (account: string, chainId: number, pid: number) => async (dispatch) => {
  const stakedBalances = await fetchVaultUserStakedBalances(account, chainId)
  const filteredVaults = vaultsConfig.filter((vault) => vault.network === chainId)
  const pidIndex = filteredVaults.findIndex((v) => v.pid === pid)
  dispatch(updateVaultsUserData({ pid, field: 'stakedBalance', value: stakedBalances[pidIndex] }))
}

// Actions
export const { setLoadVaultData, setVaultUserData, setVaults, setVaultsLoad, updateVaultsUserData } = vaultSlice.actions

export default vaultSlice.reducer
