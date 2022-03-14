import { CHAIN_ID } from './chains'
import tokens from './tokens'
import { BillsConfig } from './types'

const bills: BillsConfig[] = [
  {
    index: 0,
    contractAddress: {
      [CHAIN_ID.BSC_TESTNET]: '0xB0878C819c4eD242d9780540E728dDE46DAcC42b',
      [CHAIN_ID.BSC]: '0xef31524f2cae8c24d254626a52be3a3e0a9f5f8c',
    },
    billType: 'BANANA Bill',
    token: tokens.banana,
    quoteToken: tokens.wbnb,
    lpToken: tokens.bananaBnb,
    earnToken: tokens.banana,
  },
  {
    index: 1,
    contractAddress: {
      [CHAIN_ID.BSC_TESTNET]: '',
      [CHAIN_ID.BSC]: '0xc22d96b84685a0a5c9ca6e0e8ef1bc1488d4c898',
    },
    billType: 'BANANA Bill',
    token: tokens.wbnb,
    quoteToken: tokens.busd,
    lpToken: tokens.bnbBusd,
    earnToken: tokens.banana,
  },
  {
    index: 2,
    contractAddress: {
      [CHAIN_ID.BSC_TESTNET]: '',
      [CHAIN_ID.BSC]: '0xb83e75e332c1dc812a3429b6dc7fa93ea2b0cd80',
    },
    billType: 'BANANA Bill',
    token: tokens.wbnb,
    quoteToken: tokens.eth,
    lpToken: tokens.bnbEth,
    earnToken: tokens.banana,
  },
  {
    index: 3,
    contractAddress: {
      [CHAIN_ID.BSC_TESTNET]: '',
      [CHAIN_ID.BSC]: '0xe6b15a88a057ec10278deb3e6aa3525cb343a22b',
    },
    billType: 'BANANA Bill',
    token: tokens.wbnb,
    quoteToken: tokens.btc,
    lpToken: tokens.bnbBtc,
    earnToken: tokens.banana,
  },
  {
    index: 4,
    contractAddress: {
      [CHAIN_ID.BSC_TESTNET]: '',
      [CHAIN_ID.BSC]: '0x0d22a9e1447c9b9e2793df2a1b86f635ebd8d8d5',
    },
    billType: 'BANANA Bill',
    token: tokens.usdc,
    quoteToken: tokens.busd,
    lpToken: tokens.usdcBusd,
    earnToken: tokens.banana,
  },
]

export default bills
