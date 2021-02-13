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
      97: '0x90fc86a7570063a9ea971ec74f01f89569ad6237', // BANANA-BNB BananaPair
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a', // Banana Token
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'BANANA-BUSD LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BANANA-BUSD BananaPair
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 3,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x7a51d580c5d393e281f133e0af0c7156989ca17e', // BUSD-BNB BananaPair
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
  {
    pid: 4,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '0xba63560dbbd1ba8fcd298a386780319138cedd1e', // BTCB-BNB BananaPair
      56: '0x7561EEe90e24F3b348E1087A005F78B4c8453524',
    },
    tokenSymbol: 'BTC',
    tokenAddresses: {
      97: '0x6ce8da28e2f864420840cf74474eff5fd80e65b8', // Binance Peg BTC
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 5,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '0x66dc37a4efe740d20e13ebc6bf6b238d9655cbbc', // ETH-BNB BananaPair
      56: '0x70D8929d04b60Af4fb9B58713eBcf18765aDE422',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378', // Binance Peg ETH
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
]

export default farms
