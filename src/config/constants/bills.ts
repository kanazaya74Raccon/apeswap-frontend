import { CHAIN_ID } from './chains'
import tokens from './tokens'
import { BillsConfig } from './types'

const bills: BillsConfig[] = [
  {
    index: 0,
    contractAddress: {
      [CHAIN_ID.BSC_TESTNET]: '0xB0878C819c4eD242d9780540E728dDE46DAcC42b',
      [CHAIN_ID.BSC]: '0x8b57Fc5BE65118188D50d42fcD5614e447F7FAbE',
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
      [CHAIN_ID.BSC]: '0x4925AcdE0E885170801A74DEBcC8fbA91F3aE29b',
    },
    billType: 'BANANA Bill',
    token: tokens.busd,
    quoteToken: tokens.wbnb,
    lpToken: tokens.bnbBusd,
    earnToken: tokens.banana,
  },
  {
    index: 2,
    contractAddress: {
      [CHAIN_ID.BSC_TESTNET]: '',
      [CHAIN_ID.BSC]: '0xca1612f66292398a5df0ecadd98bb81dc264349d',
    },
    billType: 'BANANA Bill',
    token: tokens.busd,
    quoteToken: tokens.usdc,
    lpToken: tokens.usdcBusd,
    earnToken: tokens.banana,
  },
  {
    index: 3,
    contractAddress: {
      [CHAIN_ID.BSC_TESTNET]: '',
      [CHAIN_ID.BSC]: '0xb2d516086BFc978950e40D2739c72125415441a8',
    },
    billType: 'BANANA Bill',
    token: tokens.eth,
    quoteToken: tokens.wbnb,
    lpToken: tokens.bnbEth,
    earnToken: tokens.banana,
  },
  {
    index: 4,
    contractAddress: {
      [CHAIN_ID.BSC_TESTNET]: '',
      [CHAIN_ID.BSC]: '0xBD9959320cbbC69b2eF7d07fb3f9870cceaeB44f',
    },
    billType: 'BANANA Bill',
    token: tokens.btc,
    quoteToken: tokens.wbnb,
    lpToken: tokens.bnbBtc,
    earnToken: tokens.banana,
  },
]

export default bills
