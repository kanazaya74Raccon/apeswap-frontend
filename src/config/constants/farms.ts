import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'BANANA',
    lpAddresses: {
      97: '0xc987bea2149629ff83c11ffabfd07b45ecb94700', // Banana token
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    tokenSymbol: 'BANANA-SPLIT',
    tokenAddresses: {
      97: '0xc987bea2149629ff83c11ffabfd07b45ecb94700', // Banana Token
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'BANANA-BNB LP',
    lpAddresses: {
      97: '0x9fC2381A8A679DfB64A9125c12450A8556B7F1a8', // BANANA-BNB BananaPair
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0xc987bea2149629ff83c11ffabfd07b45ecb94700', // Banana Token
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x0ff51c683b9eCA60e4c0164Cd4376403fF539D75', // BUSD-BNB BananaPair
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee',
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  /* {
    pid: 3,
    lpSymbol: 'BANANA-BUSD LP',
    lpAddresses: {
      97: '0xe70b7523f4bffa1f2e88d2ba709afd026030f412',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 14,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '0xE66790075ad839978fEBa15D4d8bB2b415556a1D',
      56: '0x70D8929d04b60Af4fb9B58713eBcf18765aDE422',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 15,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '0xE66790075ad839978fEBa15D4d8bB2b415556a1D',
      56: '0x7561EEe90e24F3b348E1087A005F78B4c8453524',
    },
    tokenSymbol: 'BTC',
    tokenAddresses: {
      97: '0x6ce8da28e2f864420840cf74474eff5fd80e65b8', // Binance Peg BTC
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  }, */
]

export default farms
