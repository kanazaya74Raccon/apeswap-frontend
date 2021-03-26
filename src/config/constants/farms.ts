import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'BANANA',
    lpAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a', // Banana token
      56: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
    },
    tokenSymbol: 'BANANA-SPLIT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a', // Banana Token
      56: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'BANANA-BNB LP',
    lpAddresses: {
      97: '0x90fc86a7570063a9ea971ec74f01f89569ad6237', // BANANA-BNB BananaPair
      56: '0xF65C1C0478eFDe3c19b49EcBE7ACc57BB6B1D713',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a', // Banana Token
      56: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'BANANA-BUSD LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BANANA-BUSD BananaPair
      56: '0x7Bd46f6Da97312AC2DBD1749f82E202764C0B914',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 7,
    lpSymbol: 'BANANA-BAKE LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BANANA-BAKE BananaPair
      56: '0x51bb531a5253837a23ce8de478a4941a71a4202c',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5', // BAKE Token address
    },
    quoteTokenSymbol: QuoteToken.BANANA,
    quoteTokenAdresses: contracts.banana,
  },
  {
    pid: 15,
    lpSymbol: 'BANANA-GFCE LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BANANA-GFCE BananaPair
      56: '0x9C87cae57f0962997d9bd66C24f3425d20543e3d',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x94BaBBE728D9411612Ee41b20241a6FA251b26Ce',
    },
    quoteTokenSymbol: QuoteToken.BANANA,
    quoteTokenAdresses: contracts.banana,
  },
  {
    pid: 6,
    lpSymbol: 'BANANA-CAKE LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BANANA-CAKE BananaPair
      56: '0x9949e1db416a8a05a0cac0ba6ea152ba8729e893',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BANANA,
    quoteTokenAdresses: contracts.banana,
  },
  {
    pid: 10,
    lpSymbol: 'BANANA-BIFI LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x2ce820319047c407cb952060df5f7fb3d9a9a688', // BANANA-BIFI BananaPair
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A', // BIFI Token
    },
    quoteTokenSymbol: QuoteToken.BANANA,
    quoteTokenAdresses: contracts.banana,
  },
  {
    pid: 19,
    lpSymbol: 'BANANA-NAUT LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xf579A6196d6CC8c2C40952Ece57345AbbD589c91', // BANANA-NAUT BananaPair
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x05b339b0a346bf01f851dde47a5d485c34fe220c', // NAUT Token
    },
    quoteTokenSymbol: QuoteToken.BANANA,
    quoteTokenAdresses: contracts.banana,
  },
  {
    pid: 9,
    lpSymbol: 'BANANA-BREW LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x5514E0E1DA40A38E19d58e8B6E16226E16e183fA', // BANANA-BREW BananaPair
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x790Be81C3cA0e53974bE2688cDb954732C9862e1', // BREW Token
    },
    quoteTokenSymbol: QuoteToken.BANANA,
    quoteTokenAdresses: contracts.banana,
  },
  {
    pid: 17,
    lpSymbol: 'ADA-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x40d4543887E4170A1A40Cd8dB15A6b297c812Cb1', // ADA-BNB BananaPair
    },
    tokenSymbol: 'ADA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47', // BREW Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 18,
    lpSymbol: 'ADA-ETH LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // ADA-ETH BananaPair
      56: '0x61FE209E404166a53Cc627d0ae30A65606315dA7',
    },
    tokenSymbol: 'ADA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
    },
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAdresses: contracts.eth,
  },
  {
    pid: 20,
    lpSymbol: 'BAT-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BAT-ETH BananaPair
      56: '0x6e425B4fc4Efd070Dc0deF1654a17946C7e6b3C4',
    },
    tokenSymbol: 'BAT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x101d82428437127bf1608f699cd651e6abf9766e',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 21,
    lpSymbol: 'BAT-ETH LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // ADA-ETH BananaPair
      56: '0x85D87C038917eC8949f12B06262bB9d7a1290DB6',
    },
    tokenSymbol: 'BAT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x101d82428437127bf1608f699cd651e6abf9766e',
    },
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAdresses: contracts.eth,
  },
  {
    pid: 12,
    lpSymbol: 'BANANA-SUSHI LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BANANA-SUSHI BananaPair
      56: '0xdbcdA7B58c2078fcc790dD7C2c7272EdB7EAa2b0',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x947950bcc74888a40ffa2593c5798f11fc9124c4',
    },
    quoteTokenSymbol: QuoteToken.BANANA,
    quoteTokenAdresses: contracts.banana,
  },
  {
    pid: 13,
    lpSymbol: 'SUSHI-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BNB-SUSHI BananaPair
      56: '0x1D0C3044eBf055986c52D38b19B5369374E6Bc6A',
    },
    tokenSymbol: 'SUSHI',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x947950bcc74888a40ffa2593c5798f11fc9124c4',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 14,
    lpSymbol: 'SUSHI-ETH LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // ETH-SUSHI BananaPair
      56: '0x044F2b275A344D4edfc3d98e1cb7c02B30e6484e',
    },
    tokenSymbol: 'SUSHI',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x947950bcc74888a40ffa2593c5798f11fc9124c4',
    },
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAdresses: contracts.eth,
  },
  {
    pid: 3,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x7a51d580c5d393e281f133e0af0c7156989ca17e', // BUSD-BNB BananaPair
      56: '0x51e6d27fa57373d8d4c256231241053a70cb1d93',
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
    pid: 8,
    lpSymbol: 'BUSD-USDC LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BUSD-USDC BananaPair
      56: '0xC087C78AbaC4A0E900a327444193dBF9BA69058E',
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', // USDC Token address
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 4,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '0xba63560dbbd1ba8fcd298a386780319138cedd1e', // BTCB-BNB BananaPair
      56: '0x1E1aFE9D9c5f290d8F6996dDB190bd111908A43D',
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
      56: '0xA0C3Ef24414ED9C9B456740128d8E63D016A9e11',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378', // Binance Peg ETH
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 16,
    lpSymbol: 'GFCE-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BANANA-GFCE BananaPair
      56: '0xD7903933B10504a7C67f191285a6A7E5A233fD3B',
    },
    tokenSymbol: 'GFCE',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x94BaBBE728D9411612Ee41b20241a6FA251b26Ce',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 11,
    lpSymbol: 'BIFI-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xddd3f9d5bd347c55d18752c0c2075698ec657750', // BIFI-BNB BananaPair
    },
    tokenSymbol: 'BIFI',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A', // BIFI Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
]

export default farms
