/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import lpTokens from "../../config/constants/lpTokens";
import fetchPrices from '../tokenPrices/fetchPrices'
import {LpTokenPricesState, LpTokenPrices} from '../types'

const initialState: LpTokenPricesState = {
    isInitialized: false,
    isLoading: true,
    data: null,
}

export const lpTokenPricesSlice = createSlice({
    name: 'lpTokenPrices',
    initialState,
    reducers: {
        lpTokenPricesFetchStart: (state) => {
            state.isLoading = true
        },
        lpTokenPricesFetchSucceeded: (state, action: PayloadAction<LpTokenPrices[]>) => {
            state.isInitialized = true
            state.isLoading = false
            state.data = action.payload
        },
        lpTokenPricesFetchFailed: (state) => {
            state.isLoading = false
            state.isInitialized = true
        },
    },
})

// Actions
export const { lpTokenPricesFetchStart, lpTokenPricesFetchSucceeded, lpTokenPricesFetchFailed } = lpTokenPricesSlice.actions

export const fetchLpTokenPrices = (chainId) => async (dispatch) => {
    try {
        dispatch(lpTokenPricesFetchStart())
        const tokenPrices = await fetchPrices(chainId, lpTokens)
        dispatch(lpTokenPricesFetchSucceeded(tokenPrices))
    } catch (error) {
        dispatch(lpTokenPricesFetchFailed())
    }
}
export default lpTokenPricesSlice.reducer
