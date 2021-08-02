/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAllAuctions } from './fetchAuction'
import { AuctionsOverall, AuctionsState } from '../types'

const initialState: AuctionsState = {
  isInitialized: false,
  isLoading: true,
  data: null,
}

export const auctionsSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    auctionsFetchStart: (state) => {
      state.isLoading = true
    },
    auctionsFetchSucceeded: (state, action: PayloadAction<AuctionsOverall>) => {
      state.isInitialized = true
      state.isLoading = false
      state.data = action.payload
    },
    auctionsFetchFailed: (state) => {
      state.isLoading = false
      state.isInitialized = true
    },
  },
})

// Actions
export const { auctionsFetchStart, auctionsFetchSucceeded, auctionsFetchFailed } = auctionsSlice.actions

export const fetchAuctions = () => async (dispatch) => {
  try {
    dispatch(auctionsFetchStart())
    const auctions = await fetchAllAuctions()
    dispatch(auctionsFetchSucceeded(auctions))
  } catch (error) {
    dispatch(auctionsFetchFailed())
  }
}

export default auctionsSlice.reducer