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
import { VaultsState, Vault, TokenPrices } from '../types'

const noAccountVaultConfig = vaultsConfig.map((vault) => ({
  ...vault,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: '0',
    stakedWantBalance: '0',
  },
}))

const initialState: VaultsState = { data: [], loadVaultData: false, userDataLoaded: false }

// Async thunks
export const fetchVaultsPublicDataAsync = createAsyncThunk<
  Vault[],
  { multicallContract; chainId: number; tokenPrices: TokenPrices[] }
>('vaults/fetchVaultsPublicDataAsync', async ({ multicallContract, chainId, tokenPrices }) => {
  const vaults = await fetchVaults(multicallContract, chainId, vaultsConfig, tokenPrices)
  return vaults
})

interface VaultUserDataResponse {
  pid: number
  allowance: string
  tokenBalance: string
  stakedBalance: string
  stakedWantBalance: string
}

export const fetchVaultUserDataAsync = createAsyncThunk<
  VaultUserDataResponse[],
  { multicallContract; vaultApeAddress: string; account: string; chainId: number }
>('vaults/fetchVaultUserDataAsync', async ({ multicallContract, vaultApeAddress, account, chainId }) => {
  const filteredVaults = vaultsConfig.filter((vault) => vault.network === chainId)
  const userVaultAllowances = await fetchVaultUserAllowances(multicallContract, vaultApeAddress, account, chainId)
  const userVaultTokenBalances = await fetchVaultUserEarnings(multicallContract, vaultApeAddress, account, chainId)
  const userVaultdBalances = await fetchVaultUserStakedBalances(multicallContract, vaultApeAddress, account, chainId)
  const userVaultEarnings = await fetchVaultUserTokenBalances(multicallContract, account, chainId)
  return userVaultAllowances.map((temp, index) => {
    return {
      pid: filteredVaults[index].pid,
      allowance: userVaultAllowances[index],
      tokenBalance: userVaultTokenBalances[index],
      stakedBalance: userVaultdBalances[index],
      stakedWantBalance: userVaultEarnings[index],
    }
  })
})

export const vaultSlice = createSlice({
  name: 'vaults',
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
      state.data = action.payload
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
