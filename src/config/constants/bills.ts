import { CHAIN_ID } from './chains'
import tokens from './tokens'
import { BillsConfig } from './types'

const bills: BillsConfig[] = [
  {
    index: 0,
    contractAddress: {
      [CHAIN_ID.BSC_TESTNET]: '0xB0878C819c4eD242d9780540E728dDE46DAcC42b',
      [CHAIN_ID.BSC]: '0x4925AcdE0E885170801A74DEBcC8fbA91F3aE29b',
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
      [CHAIN_ID.BSC]: '0x8b57Fc5BE65118188D50d42fcD5614e447F7FAbE',
    },
    billType: 'BANANA Bill',
    token: tokens.wbnb,
    quoteToken: tokens.busd,
    lpToken: tokens.bnbBusd,
    earnToken: tokens.banana,
  },
  // {
  //   index: 2,
  //   contractAddress: {
  //     [CHAIN_ID.BSC_TESTNET]: '',
  //     [CHAIN_ID.BSC]: '0xc9dc58b2d1c2e38fe1e7c2c2a5694759d4e298e6',
  //   },
  //   billType: 'BANANA Bill',
  //   token: tokens.wbnb,
  //   quoteToken: tokens.eth,
  //   lpToken: tokens.bnbEth,
  //   earnToken: tokens.banana,
  // },
  // {
  //   index: 3,
  //   contractAddress: {
  //     [CHAIN_ID.BSC_TESTNET]: '',
  //     [CHAIN_ID.BSC]: '0x05d5db0312af48265486cced147a5baf9eebad79',
  //   },
  //   billType: 'BANANA Bill',
  //   token: tokens.wbnb,
  //   quoteToken: tokens.btc,
  //   lpToken: tokens.bnbBtc,
  //   earnToken: tokens.banana,
  // },
  // {
  //   index: 4,
  //   contractAddress: {
  //     [CHAIN_ID.BSC_TESTNET]: '',
  //     [CHAIN_ID.BSC]: '0xe90d5f1e1bf6bb306bcf0eb33ca70ca1e1e5751e',
  //   },
  //   billType: 'BANANA Bill',
  //   token: tokens.usdc,
  //   quoteToken: tokens.busd,
  //   lpToken: tokens.usdcBusd,
  //   earnToken: tokens.banana,
  // }
]

export default bills
