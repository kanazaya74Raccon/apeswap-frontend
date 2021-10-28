/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import vaultsConfig from 'config/constants/vaults'
import { CHAIN_ID, NETWORK_LABEL } from 'config/constants/chains'
import { Contract } from 'web3-eth-contract'
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
      console.log('HERE')
      console.log(userData)
      state.data = state.data.map((vault) => {
        console.log(vault)
        const userVaultData = userData.find((entry) => entry.pid === vault.pid)
        console.log(userVaultData)
        return { ...vault, userData: userVaultData }
      })
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
export const fetchVaultsPublicDataAsync =
  (multicallContract: Contract, chainId: number, tokenPrices: TokenPrices[]) => async (dispatch) => {
    try {
      const vaults = await fetchVaultData(multicallContract, chainId, tokenPrices)
      dispatch(setLoadVaultData(vaults))
    } catch (error) {
      console.error(error)
    }
  }

export const fetchVaultUserDataAsync =
  (multicallContract: Contract, vaultApeAddress: string, account: string, chainId: number) => async (dispatch) => {
    try {
      const filteredVaults = vaultsConfig.filter((vault) => vault.network === chainId)
      const userVaultAllowances = await fetchVaultUserAllowances(multicallContract, vaultApeAddress, account, chainId)
      const userVaultTokenBalances = await fetchVaultUserTokenBalances(multicallContract, account, chainId)
      const userVaultBalances = await fetchVaultUserStakedBalances(multicallContract, vaultApeAddress, account, chainId)
      const userVaultEarnings = await fetchVaultUserTokenBalances(multicallContract, account, chainId)
      const userData = filteredVaults.map((vault, index) => {
        return {
          pid: vault.pid,
          allowance: userVaultAllowances[index],
          tokenBalance: userVaultTokenBalances[index],
          stakedBalance: userVaultBalances[index],
          stakedWantBalance: userVaultEarnings[index],
        }
      })
      dispatch(setVaultUserData(userData))
    } catch (error) {
      console.error(error)
    }
  }

export const setFilteredVaults = (chainId: number) => async (dispatch) => {
  const filteredVaults = vaultsConfig.filter((vault) => vault.network === chainId)
  dispatch(setVaults(filteredVaults))
  dispatch(setVaultsLoad(true))
}

// Actions
export const { setLoadVaultData, setVaultUserData, setVaults, setVaultsLoad } = vaultSlice.actions

export default vaultSlice.reducer
