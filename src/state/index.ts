import { configureStore } from '@reduxjs/toolkit'
import farmsReducer from './farms'
import toastsReducer from './toasts'
import poolsReducer from './pools'
import profileReducer from './profile'
import statsReducer from './stats'
import statsOverallReducer from './statsOverall'
import auctionReducer from './auction'
import tokenPricesReducer from './tokenPrices'
import networkReducer from './network'
import nfaStakingPoolsReducer from './nfaStakingPools'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    farms: farmsReducer,
    toasts: toastsReducer,
    pools: poolsReducer,
    profile: profileReducer,
    stats: statsReducer,
    statsOverall: statsOverallReducer,
    auctions: auctionReducer,
    tokenPrices: tokenPricesReducer,
    network: networkReducer,
    nfaStakingPools: nfaStakingPoolsReducer,
  },
})
