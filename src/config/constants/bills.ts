import { CHAIN_ID } from './chains'
import tokens from './tokens'
import { BillsConfig } from './types'

const bills: BillsConfig[] = [
  {
    index: 0,
    contractAddress: {
      [CHAIN_ID.BSC_TESTNET]: '0xB0878C819c4eD242d9780540E728dDE46DAcC42b',
      [CHAIN_ID.BSC]: '0xdbC91ecCC7245983969616996b45d841Dda35d1b',
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
      [CHAIN_ID.BSC]: '0x80eeb5d04cfc8c1c005a503ffabbae4cee560d70',
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
      [CHAIN_ID.BSC]: '0xc9dc58b2d1c2e38fe1e7c2c2a5694759d4e298e6',
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
      [CHAIN_ID.BSC]: '0x05d5db0312af48265486cced147a5baf9eebad79',
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
      [CHAIN_ID.BSC]: '0xe90d5f1e1bf6bb306bcf0eb33ca70ca1e1e5751e',
    },
    billType: 'BANANA Bill',
    token: tokens.usdc,
    quoteToken: tokens.busd,
    lpToken: tokens.usdcBusd,
    earnToken: tokens.banana,
  },
  {
    index: 5,
    contractAddress: {
      [CHAIN_ID.BSC_TESTNET]: '',
      [CHAIN_ID.BSC]: '0xB1A1388f0847B1F4894502B4a54d1f66BBa77Ba0',
    },
    billType: 'Apeswap Bill',
    token: tokens.nfty,
    quoteToken: tokens.wbnb,
    lpToken: tokens.nftyBnb,
    earnToken: tokens.nfty,
  },
]

export default bills
