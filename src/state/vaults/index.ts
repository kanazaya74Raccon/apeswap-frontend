/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import vaultsConfig from 'config/constants/vaults'
import fetchVaults from './fetchVaults'
import {
  fetchVaultUserAllowances,
  fetchVaultUserEarnings,
  fetchVaultUserStakedBalances,
  fetchVaultUserTokenBalances,
} from './fetchVaultsUser'
import { VaultsState, Vault } from '../types'

const noAccountVaultConfig = vaultsConfig.map((vault) => ({
  ...vault,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: '0',
    stakedWantBalance: '0',
  },
}))

const initialState: VaultsState = { data: noAccountVaultConfig, loadVaultData: false, userDataLoaded: false }

// Async thunks
export const fetchVaultsPublicDataAsync = createAsyncThunk<Vault[]>('vaults/fetchVaultsPublicDataAsync', async () => {
  const vaults = await fetchVaults(vaultsConfig)
  return vaults
})

interface VaultUserDataResponse {
  pid: number
  allowance: string
  tokenBalance: string
  stakedBalance: string
  stakedWantBalance: string
}

export const fetchVaultUserDataAsync = createAsyncThunk<VaultUserDataResponse[], { account: string }>(
  'farms/fetchVaultUserDataAsync',
  async ({ account }) => {
    const userVaultAllowances = await fetchVaultUserAllowances(account)
    const userVaultTokenBalances = await fetchVaultUserEarnings(account)
    const userVaultdBalances = await fetchVaultUserStakedBalances(account)
    const userVaultEarnings = await fetchVaultUserTokenBalances(account)
    return userVaultAllowances.map((temp, index) => {
      return {
        pid: vaultsConfig[index].pid,
        allowance: userVaultAllowances[index],
        tokenBalance: userVaultTokenBalances[index],
        stakedBalance: userVaultdBalances[index],
        stakedWantBalance: userVaultEarnings[index],
      }
    })
  },
)

export const vaultSlice = createSlice({
  name: 'Vaults',
  initialState,
  reducers: {
    setLoadVaultData: (state, action) => {
      const loadVaults = action.payload
      state.loadVaultData = loadVaults
    },
  },
  extraReducers: (builder) => {
    // Update vaults with live data
    builder.addCase(fetchVaultsPublicDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((vault) => {
        const liveVaultData = action.payload.find((vaultData) => vaultData.pid === vault.pid)
        return { ...vault, ...liveVaultData }
      })
    })

    // Update vaults with user data
    builder.addCase(fetchVaultUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl
        const index = state.data.findIndex((vault) => vault.pid === pid)
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
      state.userDataLoaded = true
    })
  },
})

// Actions
export const { setLoadVaultData } = vaultSlice.actions

export default vaultSlice.reducer
