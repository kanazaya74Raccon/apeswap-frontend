import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'BANANA',
    image: '',
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
    image: '',
    lpSymbol: 'BANANA-BNB',
    lpAddresses: {
      97: '0x90fc86a7570063a9ea971ec74f01f89569ad6237', // BANANA-BNB BananaPair
      56: '0xF65C1C0478eFDe3c19b49EcBE7ACc57BB6B1D713',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a', // Banana Token
      56: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
    },
    style: 'featured',
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    image: '',
    lpSymbol: 'BANANA-BUSD',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BANANA-BUSD BananaPair
      56: '0x7Bd46f6Da97312AC2DBD1749f82E202764C0B914',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
    },
    style: 'featured',
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 3,
    image: '',
    lpSymbol: 'BUSD-BNB',
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
    pid: 5,
    image: '',
    lpSymbol: 'ETH-BNB',
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
    pid: 37,
    image: '',
    lpSymbol: 'BFT-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x1696A65eA693593Ba771b5A7aFC54C8eaf4C20dE', // BFT-BNB BananaPair
    },
    tokenSymbol: 'BFT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xa4f93159ce0a4b533b443c74b89967c60a5969f8', // BFT Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.bitfresh.win',
  },
  {
    pid: 28,
    image: '',
    lpSymbol: 'NUTS-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x789fd04BFbC64169104466Ee0d48716E0452Bcf6', // NUTS-BNB BananaPair
    },
    tokenSymbol: 'NUTS',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x8893d5fa71389673c5c4b9b3cb4ee1ba71207556', // NUTS Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://squirrel.finance/',
  },
  {
    pid: 41,
    image: 'AUTO.png',
    lpSymbol: 'AUTO-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x649a5ad5135b4bd287e5aca8d41f4d5e1b52af5c', // AUTO-BNB BananaPair
    },
    tokenSymbol: 'AUTO',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xa184088a740c695e156f91f5cc086a06bb78b827', // AUTO Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://autofarm.network/',
  },
  {
    pid: 42,
    image: 'bxBTC.png',
    lpSymbol: 'BXBTC-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xc2feF4BEC915315beF9f6E8a06b2516E64D29D06', // BXBTC-BNB BananaPair
    },
    tokenSymbol: 'BXBTC',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xab111d5948470ba73d98d66bbdf2798fbe093546', // AUTO Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://xbtc.fi/',
  },
  {
    pid: 50,
    image: 'NRV.png',
    lpSymbol: 'NRV-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x876ba49c4f438643ab33f871e14a54cbb897df49', // NRV-BNB BananaPair
    },
    tokenSymbol: 'NRV',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096', // WATCH Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.nerve.fi',
  },
  {
    pid: 43,
    image: '',
    lpSymbol: 'VBSWAP-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xD59b4f88Da3b5cfc70CdF9B61c53Df475d4D4f47', // VBSWAP-BNB BananaPair
    },
    tokenSymbol: 'VBSWAP',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x4f0ed527e8a95ecaa132af214dfd41f30b361600', // VBSWAP Token
    },
    style: 'warning',
    disableApr: true,
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://valuedefi.io/',
  },
  {
    pid: 44,
    image: '',
    lpSymbol: 'WATCH-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xa00A91fBB39051e2a6368424A93895c3f1F2290b', // WATCH-BNB BananaPair
    },
    tokenSymbol: 'WATCH',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x7a9f28eb62c791422aa23ceae1da9c847cbec9b0', // WATCH Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.yieldwatch.net/',
  },
  {
    pid: 30,
    image: 'KEYFI.png',
    lpSymbol: 'KEYFI-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x7A8ACAEAfC4Fa051De4EAbff8D1abdD0388aE08a', // KEYFI-BNB BananaPair
    },
    tokenSymbol: 'KEYFI',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x4b6000f9163de2e3f0a01ec37e06e1469dbbce9d', // KEYFI Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://keyfi.com/',
  },
  {
    pid: 31,
    image: '',
    lpSymbol: 'ONT-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x924D3f2F94618e8Ee837d4C2b8d703F0de12a57e', // ONT-BNB BananaPair
    },
    tokenSymbol: 'ONT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xfd7b3a77848f1c2d67e05e54d78d174a0c850335', // ONT Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://ont.io',
  },
  {
    pid: 27,
    image: '',
    lpSymbol: 'JDI-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xfb6063f29AF6dcd1fc03A8E221c6D91DEabbE764', // JDI-BNB BananaPair
    },
    tokenSymbol: 'JDI',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x0491648c910ad2c1afaab733faf71d30313df7fc', // JDI Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://jdiyield.com',
  },
  {
    pid: 49,
    image: '',
    lpSymbol: 'FTM-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x47A0B7bA18Bb80E4888ca2576c2d34BE290772a6', // FTM-BNB BananaPair
    },
    tokenSymbol: 'FTM',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xad29abb318791d579433d831ed122afeaf29dcfe', // FTM Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://fantom.foundation/',
  },
  {
    pid: 32,
    image: 'XRP.png',
    lpSymbol: 'XRP-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x6f0f18f5fcc1466ec41c8106689e10befe68d1c0', // XRP-BNB BananaPair
    },
    tokenSymbol: 'XRP',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe', // XRP Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://ripple.com/xrp/',
  },
  {
    pid: 52,
    image: 'ZEC.png',
    lpSymbol: 'ZEC-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x2B2C771e44aF4C6f858598308e05FB89b23f11cE', // ZEC-BNB BananaPair
    },
    tokenSymbol: 'ZEC',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x1ba42e5193dfa8b03d15dd1b86a3113bbbef8eeb', // ZEC Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://z.cash/',
  },
  {
    pid: 54,
    image: 'NEAR.png',
    lpSymbol: 'NEAR-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xb75724635a6cda850f08b578f23a568cedba099d', // NEAR-BNB BananaPair
    },
    tokenSymbol: 'NEAR',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x1fa4a73a3f0133f0025378af00236f3abdee5d63', // NEAR Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://near.org/',
  },
  {
    pid: 56,
    image: '',
    lpSymbol: 'SNX-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x8b1f1f28a8ccbaa8a8bc1582921ece97ce99d9e1', // SNX-BNB BananaPair
    },
    tokenSymbol: 'SNX',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x9ac983826058b8a9c7aa1c9171441191232e8404', // SNX Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.synthetix.io/',
  },
  {
    pid: 57,
    image: '',
    lpSymbol: 'BLZ-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x015f807d0186f7e62810d0c597a23cb19ff57e4d', // BLZ-BNB BananaPair
    },
    tokenSymbol: 'BLZ',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x935a544bf5816e3a7c13db2efe3009ffda0acda2', // BLZ Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://bluzelle.com/',
  },
  {
    pid: 58,
    image: '',
    lpSymbol: 'TAPE-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x756d4406169273d99aac8366cf5eaf7865d6a9b9', // TAPE-BNB BananaPair
    },
    tokenSymbol: 'TAPE',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xf63400ee0420ce5b1ebdee0c942d7de1c734a41f', // TAPE Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://apetools.co/',
  },
  {
    pid: 59,
    image: 'CELR.png',
    lpSymbol: 'CELR-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xb7f42e58cf2364ac994f93f7aff3b158cfa3dc76', // CELER-BNB BananaPair
    },
    tokenSymbol: 'CELR',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x1f9f6a696c6fd109cd3956f45dc709d2b3902163', // CELER Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.celer.network/',
  },
  {
    pid: 60,
    image: 'SHIB.png',
    lpSymbol: 'SHIB-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xc0afb6078981629f7eae4f2ae93b6dbea9d7a7e9', // SHIBA-BNB BananaPair
    },
    tokenSymbol: 'SHIB',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x2859e4544c4bb03966803b044a93563bd2d0dd4d', // SHIBA Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://shibatoken.com/',
  },
  {
    pid: 61,
    image: '',
    lpSymbol: 'CRUSH-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x8a10489f1255fb63217be4cc96b8f4cd4d42a469', // CRUSH-BNB BananaPair
    },
    tokenSymbol: 'CRUSH',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x0ef0626736c2d484a792508e99949736d0af807e', // CRUSH Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.bitcrush.com/',
  },
  {
    pid: 62,
    image: 'pCWS.png',
    lpSymbol: 'pCWS-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x334e697022aeabba58385afb3abf3d9347c1b260', // pCWS-BNB BananaPair
    },
    tokenSymbol: 'pCWS',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xbcf39f0edda668c58371e519af37ca705f2bfcbd', // pCWS Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://game.seascape.network/',
  },
  {
    pid: 53,
    image: '',
    lpSymbol: 'COTI-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xacfdcf0486adc2421aac3ffc0923b9c56faebc47', // COTI-BNB BananaPair
    },
    tokenSymbol: 'COTI',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xadbaf88b39d37dc68775ed1541f1bf83a5a45feb', // COTI Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://coti.io/',
  },
  {
    pid: 51,
    image: 'AVAX.png',
    lpSymbol: 'AVAX-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x40afc7cbd0dc2be5860f0035b717d20afb4827b2', // AVAX-BNB BananaPair
    },
    tokenSymbol: 'AVAX',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x1ce0c2827e2ef14d5c4f29a091d735a204794041', // AVAX Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.avalabs.org/',
  },
  {
    pid: 45,
    image: '',
    lpSymbol: 'MATIC-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x29A4A3D77c010CE100A45831BF7e798f0f0B325D', // MATIC-BNB BananaPair
    },
    tokenSymbol: 'MATIC',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xcc42724c6683b7e57334c4e856f4c9965ed682bd', // MATIC Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://polygon.technology/',
  },
  {
    pid: 46,
    image: '',
    lpSymbol: 'AAVE-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xf13e007e181A8F57eD3a4D4CcE0A9ff9E7241CEf', // AAVE-BNB BananaPair
    },
    tokenSymbol: 'AAVE',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xfb6115445bff7b52feb98650c87f44907e58f802', // AAVE Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://aave.com/',
  },
  {
    pid: 47,
    image: '',
    lpSymbol: 'ETC-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xDd6C7A955C72B3FFD546d8dadBf7669528d8F785', // ETC-BNB BananaPair
    },
    tokenSymbol: 'ETC',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x3d6545b08693dae087e957cb1180ee38b9e3c25e', // ETC Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://ethereumclassic.org/',
  },
  {
    pid: 48,
    image: '',
    lpSymbol: 'COMP-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xb4c0c621B2eDfE6C22585ebAC56b0e634907B8A7', // COMP-BNB BananaPair
    },
    tokenSymbol: 'COMP',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x52ce071bd9b1c4b00a0b92d298c512478cad67e8', // COMP Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://compound.finance/',
  },
  {
    pid: 38,
    image: '',
    lpSymbol: 'DOGE-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xfd1ef328a17a8e8eeaf7e4ea1ed8a108e1f2d096', // DOGE-BNB BananaPair
    },
    tokenSymbol: 'DOGE',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xba2ae424d960c26247dd6c32edc70b295c744c43', // DOGE Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://dogecoin.com/',
  },
  {
    pid: 39,
    image: '',
    lpSymbol: 'LTC-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x0f12362c017fe5101c7bba09390f1cb729f5b318', // LTC-BNB BananaPair
    },
    tokenSymbol: 'LTC',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x4338665cbb7b2485a8855a139b75d5e34ab0db94', // LTC Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://litecoin.org/',
  },
  {
    pid: 33,
    image: '',
    lpSymbol: 'DOT-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x21cbb561c5d7d70e9e6cc42136cb22f07552aeef', // DOT-BNB BananaPair
    },
    tokenSymbol: 'DOT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402', // DOT Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://polkadot.network/',
  },
  {
    pid: 35,
    image: '',
    lpSymbol: 'SXP-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xf726b3e81fa7166b9c2cfd7eb7fe8ccbcb6b1355', // SXP-BNB BananaPair
    },
    tokenSymbol: 'SXP',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x47bead2563dcbf3bf2c9407fea4dc236faba485a', // SXP Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://swipe.io/',
  },
  {
    pid: 36,
    image: '',
    lpSymbol: 'LINK-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x092ada3818db7fbb8e0a2124ff218c5125c1cce6', // LINK-BNB BananaPair
    },
    tokenSymbol: 'LINK',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd', // LINK Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://chain.link/',
  },
  {
    pid: 17,
    image: '',
    lpSymbol: 'ADA-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x40d4543887E4170A1A40Cd8dB15A6b297c812Cb1', // ADA-BNB BananaPair
    },
    tokenSymbol: 'ADA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47', // ADA Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://cardano.org/',
  },
  {
    pid: 18,
    image: '',
    lpSymbol: 'ADA-ETH',
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
    projectLink: 'https://cardano.org/',
  },
  {
    pid: 22,
    image: '',
    lpSymbol: 'IOTA-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x0D70924695B6Ae496F0A74A36bf79d47307dD519', // IOTA-BNB BananaPair
    },
    tokenSymbol: 'IOTA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xd944f1d1e9d5f9bb90b62f9d45e447d989580782',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.iota.org/',
  },
  {
    pid: 20,
    image: '',
    lpSymbol: 'BAT-BNB',
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
    projectLink: 'https://basicattentiontoken.org/',
  },
  {
    pid: 21,
    image: '',
    lpSymbol: 'BAT-ETH',
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
    projectLink: 'https://basicattentiontoken.org/',
  },
  {
    pid: 12,
    image: '',
    lpSymbol: 'BANANA-SUSHI',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BANANA-SUSHI BananaPair
      56: '0xdbcdA7B58c2078fcc790dD7C2c7272EdB7EAa2b0',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x947950bcc74888a40ffa2593c5798f11fc9124c4',
    },
    style: 'deprecated',
    quoteTokenSymbol: QuoteToken.BANANA,
    quoteTokenAdresses: contracts.banana,
  },
  {
    pid: 8,
    image: '',
    lpSymbol: 'BUSD-USDC',
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
    pid: 40,
    image: '',
    lpSymbol: 'BUSD-DAI',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BUSD-DAI BananaPair
      56: '0x8b6ecea3e9bd6290c2150a89af6c69887aaf1870',
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', // DAI Token address
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    projectLink: 'https://makerdao.com/en/',
  },
  {
    pid: 34,
    image: '',
    lpSymbol: 'BUSD-USDT',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x2e707261d086687470b515b320478eb1c88d49bb', // BUSD-USDT BananaPair
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x55d398326f99059ff775485246999027b3197955', // USDT Token
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 13,
    image: '',
    lpSymbol: 'SUSHI-BNB',
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
    projectLink: 'https://app.sushi.com/',
  },
  {
    pid: 14,
    image: '',
    lpSymbol: 'SUSHI-ETH',
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
    projectLink: 'https://app.sushi.com/',
  },
  {
    pid: 55,
    image: '',
    lpSymbol: 'MOONLIGHT-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // Placeholder
      56: '0xe6de19ae48969af0a6f78271e41d3ce47580eafb', // MOONLIGHT-BNB ApePair
    },
    tokenSymbol: 'MOONLIGHT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a', // Placeholder
      56: '0xb1ced2e320e3f4c8e3511b1dc59203303493f382', // MOONLIGHT Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://moonlighttoken.com/',
  },
  {
    pid: 24,
    image: 'NAUT.png',
    lpSymbol: 'NAUT-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // Placeholder
      56: '0x288ea5437c7aad045a393cee2f41e548df24d1c8', // NAUT-BNB ApePair
    },
    tokenSymbol: 'NAUT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a', // Placeholder
      56: '0x05b339b0a346bf01f851dde47a5d485c34fe220c', // NAUT Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://astronaut.to',
  },
  {
    pid: 26,
    image: '',
    lpSymbol: 'BAKE-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // Placeholder
      56: '0xc1c7a1d33b34019f82808f64ba07e77512a13d1a', // BAKE-BNB ApePair
    },
    tokenSymbol: 'BAKE',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a', // Placeholder
      56: '0xe02df9e3e622debdd69fb838bb799e3f168902c5', // BAKE Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.bakeryswap.org/',
  },
  {
    pid: 25,
    image: 'CAKE.png',
    lpSymbol: 'CAKE-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // Placeholder
      56: '0x60593abea55e9ea9d31c1b6473191cd2475a720d', // CAKE-BNB ApePair
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a', // Placeholder
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', // CAKE Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://pancakeswap.finance/',
  },
  {
    pid: 4,
    image: '',
    lpSymbol: 'BTCB-BNB',
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
    pid: 16,
    image: 'GFCE.png',
    lpSymbol: 'GFCE-BNB',
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
    projectLink: 'https://jetfuel.finance/',
  },
  {
    pid: 11,
    image: 'BIFI.png',
    lpSymbol: 'BIFI-BNB',
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
    projectLink: 'https://www.beefy.finance/',
  },
  {
    pid: 29,
    image: '',
    lpSymbol: 'SWAMP-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xa3f0f63268df562c71051ac5e81460e857c32c12', // SWAMP-BNB BananaPair
    },
    tokenSymbol: 'SWAMP',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xc5a49b4cbe004b6fd55b30ba1de6ac360ff9765d', // SWAMP Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://swamp.finance',
  },
  {
    pid: 63,
    image: '',
    lpSymbol: 'TYPH-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xfeaf192c2662e5700bda860c58d2686d9cc12ec8',
    },
    tokenSymbol: 'TYPH',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x4090e535f2e251f5f88518998b18b54d26b3b07c',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://typhoon.network/',
  },
  {
    pid: 64,
    image: '',
    lpSymbol: 'bMXX-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xcf2c3af91b5a55e283a8a8c2932b88009b557b4a',
    },
    tokenSymbol: 'bMXX',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x4131b87f74415190425ccd873048c708f8005823',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://multiplier.finance/',
  },
  {
    pid: 69,
    image: '',
    lpSymbol: 'HIFI-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xf093ce6778c4d7d99c23f714297fff15a661d354',
    },
    tokenSymbol: 'HIFI',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x0a38bc18022b0ccb043f7b730b354d554c6230f1',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://hifigamingsociety.com',
  },
  {
    pid: 70,
    image: '',
    lpSymbol: 'GMR-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xb0d759cd87b74f079166283f4f6631f5703cea1a',
    },
    tokenSymbol: 'GMR',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x0523215dcafbf4e4aa92117d13c6985a3bef27d7',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.gmr.finance/',
  },
  {
    pid: 65,
    image: '',
    lpSymbol: 'SPACE-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xd0f82498051067e154d1dcd3d88fa95063949d7e',
    },
    tokenSymbol: 'SPACE',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xe486a69e432fdc29622bf00315f6b34c99b45e80',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://aperocket.finance/',
  },
  {
    pid: 66,
    image: 'FEG.png',
    lpSymbol: 'FEG-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x73cddf4ea34dbd872f89e98c2866c81929aafe50',
    },
    tokenSymbol: 'FEG',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xacfc95585d80ab62f67a14c566c1b7a49fe91167',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://fegtoken.com/',
  },

  {
    pid: 67,
    image: 'ATA.png',
    lpSymbol: 'ATA-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x51da890085da091b84e27c7a8234e371943b0af0',
    },
    tokenSymbol: 'ATA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xa2120b9e674d3fc3875f415a7df52e382f141225', // ATA Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.ata.network/',
  },
  {
    pid: 68,
    image: 'GRAND.png',
    lpSymbol: 'GRAND-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x0c52721790387f97fa77acaf151667c9e9730c76',
    },
    tokenSymbol: 'GRAND',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xee814f5b2bf700d2e843dc56835d28d095161dd9', // ATA Token
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.thegrandbanks.finance/',
  },
  {
    pid: 71,
    image: '',
    lpSymbol: 'HERO-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x051724874952381e4efd22846b2789334d52abdb',
    },
    tokenSymbol: 'HERO',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x9B26e16377ad29A6CCC01770bcfB56DE3A36d8b2',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://farmhero.io/',
  },
  {
    pid: 72,
    image: '',
    lpSymbol: 'TWIN-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x39ca344E2e9AAf125b0002aA37258C8b1Ed30A78',
    },
    tokenSymbol: 'TWIN',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x62907ad5c2d79e2a4f048a90ae2b49d062a773f3',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://twin.finance/',
  },
  {
    pid: 73,
    image: '',
    lpSymbol: 'MBOX-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xe5459c34e13797372f6c95c0aac81a5faf60223e',
    },
    tokenSymbol: 'MBOX',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x3203c9e46ca618c8c1ce5dc67e7e9d75f5da2377',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.mobox.io/',
  },
  {
    pid: 74,
    image: 'FOXY.png',
    lpSymbol: 'FOXY-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xbe3e38918ca1180f0285fa18c3fa154d0dde6853',
    },
    tokenSymbol: 'FOXY',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x4354a4f710182966e55ea30cfa807fa1b821a67b',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://foxynft.org',
  },
  {
    pid: 76,
    image: 'WYVERN.png',
    lpSymbol: 'WYVERN-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xeef751bba57e90b832c96b0e65ef5430868c69a7',
    },
    tokenSymbol: 'WYVERN',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x470862af0cf8d27ebfe0ff77b0649779c29186db',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://wyverntoken.com/',
  },
  {
    pid: 77,
    image: '',
    lpSymbol: 'BOG-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x9d8370c3e6833942b8c38478c84ef74374f28b9f',
    },
    tokenSymbol: 'BOG',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xb09fe1613fe03e7361319d2a43edc17422f36b09',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://bogged.finance/',
  },
  {
    pid: 79,
    image: 'LORY.png',
    lpSymbol: 'LORY-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x3d0c2ee0156675b90bc41e5559970415a20414f5',
    },
    tokenSymbol: 'LORY',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xcd5d75dbe75449a9021b6c570a41959eb571c751',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://yieldparrot.finance',
  },
  {
    pid: 78,
    image: 'SCAM.png',
    lpSymbol: 'SCAM-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xaab7b3c31c8f76e4bfe0d0cd073b1bca6279072c',
    },
    tokenSymbol: 'SCAM',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x00aa85e010204068b7cc2235800b2d8036bdbf2e',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://scamily.io/',
  },
  {
    pid: 80,
    image: '',
    lpSymbol: 'FRUIT-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x0be55fd1fdc7134ff8412e8baac63cbb691b1d64',
    },
    tokenSymbol: 'FRUIT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x4ecfb95896660aa7f54003e967e7b283441a2b0a',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.fruitsadventures.com/',
  },
  {
    pid: 81,
    image: '',
    lpSymbol: 'SKILL-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x0deb588c1ec6f1d9f348126d401f05c4c7b7a80c',
    },
    tokenSymbol: 'SKILL',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x154a9f9cbd3449ad22fdae23044319d6ef2a1fab',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.cryptoblades.io/',
  },
  {
    pid: 82,
    image: '',
    lpSymbol: 'GNT-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xe19c4b62eab3b1b61c93c5ddb27779c992413b0e',
    },
    tokenSymbol: 'GNT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xf750a26eb0acf95556e8529e72ed530f3b60f348',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.greentrusttoken.com/',
  },
  {
    pid: 83,
    image: '',
    lpSymbol: 'SFP-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x6411a2240c8cd1dd48718eee1ae4a10e71123fd3',
    },
    tokenSymbol: 'SFP',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xd41fdb03ba84762dd66a0af1a6c8540ff1ba5dfb',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.safepal.io/',
  },
  {
    pid: 84,
    image: 'TWT.png',
    lpSymbol: 'TWT-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x4c48d692e3de076c7b844b956b28cdd1dd5c0945',
    },
    tokenSymbol: 'TWT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x4b0f1812e5df2a09796481ff14017e6005508003',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://trustwallet.com/',
  },
  {
    pid: 85,
    image: 'EPS.png',
    lpSymbol: 'EPS-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x97c4c531e739e870d958940e8688017894084003',
    },
    tokenSymbol: 'EPS',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xa7f552078dcc247c2684336020c03648500c6d9f',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://ellipsis.finance/',
  },
  {
    pid: 86,
    image: 'XVS.png',
    lpSymbol: 'XVS-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x9e199da6f87e09a290724eba866eedae2e971a0b',
    },
    tokenSymbol: 'XVS',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://venus.io/',
  },
  {
    pid: 87,
    image: '',
    lpSymbol: 'PACOCA-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x0fee6e1e55fa772fae71e6734a7f9e8622900d75',
    },
    tokenSymbol: 'PACOCA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x55671114d774ee99d653d6c12460c780a67f1d18',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://pacoca.io',
  },
  {
    pid: 88,
    image: 'NEWB.png',
    lpSymbol: 'NEWB-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xf0cc208460ba9f55f320a72f6c6b63154a42c8c0',
    },
    tokenSymbol: 'NEWB',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x545f90dc35ca1e6129f1fed354b3e2df12034261',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.newb.farm/',
  },
  {
    pid: 89,
    image: 'BISON.png',
    lpSymbol: 'BISON-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xec1214ee197304c17eb9e427e246a4fd37ba718e',
    },
    tokenSymbol: 'BISON',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x19a6da6e382b85f827088092a3dbe864d9ccba73',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://bishares.finance',
  },
  {
    pid: 90,
    image: '',
    lpSymbol: 'YFI-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xa3421bd2b3b1578ff43ab95c10f667e5a3bbcef7',
    },
    tokenSymbol: 'YFI',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x88f1a5ae2a3bf98aeaf342d26b30a79438c9142e',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://yearn.finance/',
  },
  {
    pid: 91,
    image: '',
    lpSymbol: 'STARS-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xbc8a4cad743d87e8754fd5f704c62e378802cbff',
    },
    tokenSymbol: 'STARS',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xbd83010eb60f12112908774998f65761cf9f6f9a',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.mogulproductions.com/',
  },
  {
    pid: 92,
    image: '',
    lpSymbol: 'SISTA-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x45546310fda2fbdb7ee26ea0a5b6f82d075254bc',
    },
    tokenSymbol: 'SISTA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xca6d25c10dad43ae8be0bc2af4d3cd1114583c08',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://srnartgallery.com',
  },
  {
    pid: 93,
    image: '',
    lpSymbol: 'CAPS-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x6dfbf17ac70ce03388b1f88cb3c97ad79120e7b1',
    },
    tokenSymbol: 'CAPS',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xffba7529ac181c2ee1844548e6d7061c9a597df4',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.ternoa.com/',
  },
  {
    pid: 94,
    image: '',
    lpSymbol: 'BIRB-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x8f53e5940d5adfb07e271d2812dccdb5b6380c62',
    },
    tokenSymbol: 'BIRB',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x82a479264b36104be4fdb91618a59a4fc0f50650',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://birb.com/',
  },
  {
    pid: 95,
    image: 'AXS.png',
    lpSymbol: 'AXS-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x8b85a4228400fa9b2fb5bd47db8f05b7f8bb7f5c',
    },
    tokenSymbol: 'AXS',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x715d400f88c167884bbcc41c5fea407ed4d2f8a0',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://axieinfinity.com/',
  },
  {
    pid: 96,
    image: '',
    lpSymbol: 'DINOP-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x5fcec12f1c7e57789f22289ef75fbdb1c6b4895d',
    },
    tokenSymbol: 'DINOP',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xea90DC6F64d18771Ca1dac8098526a9082265B42',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.dinopark.fun/',
  },
  {
    pid: 97,
    image: 'MARU.png',
    lpSymbol: 'MARU-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x172a5434366795ccDF755ffBf0cc04D4532A7177',
    },
    tokenSymbol: 'MARU',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x215f51990a0ca5aa360a177181f014e2da376e5e',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://riyoku.tv/',
  },
  {
    pid: 98,
    image: 'PERA.png',
    lpSymbol: 'PERA-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xb3940bcf6e37dd612b8dee72ada6cf8df57d8a95',
    },
    tokenSymbol: 'PERA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xb9D8592E16A9c1a3AE6021CDDb324EaC1Cbc70d6',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://pera.finance',
  },
  {
    pid: 99,
    image: 'GUARD.png',
    lpSymbol: 'GUARD-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xDd2B5E024942F9a83255F41144db5648b71f01c4',
    },
    tokenSymbol: 'GUARD',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xf606bd19b1e61574ed625d9ea96c841d4e247a32',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.wolfdencrypto.com/',
  },
  {
    pid: 100,
    image: '',
    lpSymbol: 'LAND-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xB15f34082Baa4E3515A49E05D4d1D40cE933da0b',
    },
    tokenSymbol: 'LAND',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x9d986a3f147212327dd658f712d5264a73a1fdb0',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://landshare.io/',
  },
  {
    pid: 101,
    image: '',
    lpSymbol: 'POTS-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xaa3fcba2cf7c5f8c8f785a7180f5063144fe53c6',
    },
    tokenSymbol: 'POTS',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x3fcca8648651e5b974dd6d3e50f61567779772a8',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://moonpot.com/',
  },
  {
    pid: 102,
    image: '',
    lpSymbol: 'SACT-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x8418e3d34d42ca93faa77a9ff7d0d82b811b4633',
    },
    tokenSymbol: 'SACT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x1ba8c21c623c843cd4c60438d70e7ad50f363fbb',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://srnartgallery.com/',
  },
  {
    pid: 103,
    image: 'BHC.png',
    lpSymbol: 'BHC-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x59b2a38f67e312d312121614d1daa7ad8c5773fc',
    },
    tokenSymbol: 'BHC',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x6fd7c98458a943f469e1cf4ea85b173f5cd342f4',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://billionhappiness.finance/',
  },
  {
    pid: 104,
    image: '',
    lpSymbol: 'CYT-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x5a55fce6f6acb2b1b20514964301db4f37028c81',
    },
    tokenSymbol: 'CYT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xd9025e25bb6cf39f8c926a704039d2dd51088063',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://dragonary.com/',
  },
  {
    pid: 105,
    image: '',
    lpSymbol: 'HOTCROSS-BUSD',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x3b9aa711d1d90a4f8639f66c227881729a3317f2',
    },
    tokenSymbol: 'HOTCROSS',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x4fa7163e153419e0e1064e418dd7a99314ed27b6',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    projectLink: 'https://hotcross.com/',
  },
  {
    pid: 106,
    image: '',
    lpSymbol: 'LMT-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xbac4313d7f908c9a657b58b5b42f0f7713a3990b',
    },
    tokenSymbol: 'LMT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x9617857e191354dbea0b714d78bc59e57c411087',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://lympo.io/lmt/',
  },
  {
    pid: 107,
    image: '',
    lpSymbol: 'FOOT-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x178fc55c4e167ecaeaac450909fa5bc60ec92baf',
    },
    tokenSymbol: 'FOOT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x1c64fd4f55e1a3c1f737dfa47ee5f97eaf413cf0',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://bigfoottoken.finance/',
  },
  {
    pid: 108,
    image: '',
    lpSymbol: 'NABOX-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x7c35e27c6dc847ea720c435abbe30bdd29168581',
    },
    tokenSymbol: 'NABOX',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x755f34709e369d37c6fa52808ae84a32007d1155',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://nabox.io/',
  },
  {
    pid: 109,
    image: '',
    lpSymbol: 'BABI-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x07999087e34fa79e7145c051ac4b1ae9407beff4',
    },
    tokenSymbol: 'BABI',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xec15a508a187e8ddfe572a5423faa82bbdd65120',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://babylons.io/',
  },
  {
    pid: 110,
    image: '',
    lpSymbol: 'REVV-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x7e3d5bb5ec1fba3e780632490b4cf5b14a3cc12e',
    },
    tokenSymbol: 'REVV',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x833f307ac507d47309fd8cdd1f835bef8d702a93',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://revvmotorsport.com/',
  },
  {
    pid: 111,
    image: '',
    lpSymbol: 'WIZARD-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xF258A201EE142C1fdeb0C29a2C9941779fDfCE0E',
    },
    tokenSymbol: 'WIZARD',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://wizard.financial',
  },
  {
    pid: 113,
    image: 'ZIG.png',
    lpSymbol: 'ZIG-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xeAB6A2186C506baf748DA8994f5Aa4acdE573142',
    },
    tokenSymbol: 'ZIG',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x8c907e0a72c3d55627e853f4ec6a96b0c8771145',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://zignaly.com/',
  },
  {
    pid: 114,
    image: '',
    lpSymbol: 'NVT-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x1964c58fe7711936dffb4588e15fc60dc3b7ebf5',
    },
    tokenSymbol: 'NVT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xf0e406c49c63abf358030a299c0e00118c4c6ba5',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://nerve.network/',
  },
  {
    pid: 115,
    image: '',
    lpSymbol: 'MOR-BUSD',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x33526eD690200663EAAbF28e1D8621e58898c5fd',
    },
    tokenSymbol: 'MOR',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x87BAde473ea0513D4aA7085484aEAA6cB6EBE7e3',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    projectLink: 'https://mor.growthdefi.com/',
  },
  {
    pid: 116,
    image: 'POLAR.png',
    lpSymbol: 'POLAR-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xf16ca1bEe548F30818F7D5FFA6c2bb5E5EcbeD32',
    },
    tokenSymbol: 'POLAR',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xc64c9b30c981fc2ee4e13d0ca3f08258e725fd24',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.polarsync.app/',
  },
  {
    pid: 117,
    image: 'CEEK.png',
    lpSymbol: 'CEEK-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x119d6ebe840966c9cf4ff6603e76208d30ba2179',
    },
    tokenSymbol: 'CEEK',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xe0F94Ac5462997D2BC57287Ac3a3aE4C31345D66',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://ceek.com/',
  },
  {
    pid: 118,
    image: 'YDR.png',
    lpSymbol: 'YDR-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xE11E8e81748185d1980b7134e5812b65d1ac4E4f',
    },
    tokenSymbol: 'YDR',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x3757232b55e60da4a8793183ac030cfce4c3865d',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://ydragon.io/',
  },
  {
    pid: 119,
    image: '',
    lpSymbol: 'ONG-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xe569fdbe1ea6b7e49c3fb3ad7fe3758ca701e90f',
    },
    tokenSymbol: 'ONG',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x308bfaeAaC8BDab6e9Fc5Ead8EdCb5f95b0599d9',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://ont.io/',
  },
  {
    pid: 120,
    image: 'DEP.png',
    lpSymbol: 'DEP-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x6518709dC42F70Dbf89934cA382F1d9dB26370e8',
    },
    tokenSymbol: 'DEP',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xcaF5191fc480F43e4DF80106c7695ECA56E48B18',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://dea.sg/',
  },
  {
    pid: 121,
    image: '',
    lpSymbol: 'RSUN-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x6b8e6F32C703e90F23515AE12ad14f6ceA67C766',
    },
    tokenSymbol: 'RSUN',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x917841c010b3d86ED886F36F2C9807E07a2e3093',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://risingsun.finance/',
  },
  {
    pid: 122,
    image: '',
    lpSymbol: 'TXL-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xd2fd92bb7aee4d15ffa68d39ebbfc937f2b3970d',
    },
    tokenSymbol: 'TXL',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x1ffd0b47127fdd4097e54521c9e2c7f0d66aafc5',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://tixl.org/',
  },
  {
    pid: 123,
    image: '',
    lpSymbol: 'SFUND-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xB5eC4777Ac976cf221c5451e62115b790f9B44b7',
    },
    tokenSymbol: 'SFUND',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x477bc8d23c634c154061869478bce96be6045d12',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://seedify.fund/',
  },
  {
    pid: 124,
    image: '',
    lpSymbol: 'PHX-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xd6252ec3a5928d79f4211afdc0dd831a0fc97cdd',
    },
    tokenSymbol: 'PHX',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xac86e5f9ba48d680516df50c72928c2ec50f3025',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.phx.finance/',
  },
  {
    pid: 125,
    image: '',
    lpSymbol: 'FRM-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x9Faa4D36d9d7158b15f408bF7357288d6aD8bc04',
    },
    tokenSymbol: 'FRM',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xa719b8ab7ea7af0ddb4358719a34631bb79d15dc',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://ferrum.network/',
  },
  {
    pid: 126,
    image: '',
    lpSymbol: 'EXP-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xe93855cb88faa221e648c157670a28f0c2449a60',
    },
    tokenSymbol: 'EXP',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x639d4c62f58a4048ad0f69b8ce675db1a3e8e00e',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://gamexchange.app/',
  },
  {
    pid: 127,
    image: '',
    lpSymbol: 'CFi-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xab72c0a3a1174ba0ae4a79083ff6d06dcf4336ed',
    },
    tokenSymbol: 'CFi',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x6a545f9c64d8f7b957d8d2e6410b52095a9e6c29',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://cyberfi.tech/',
  },
  {
    pid: 128,
    image: '',
    lpSymbol: 'SX-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x0ba3bbe401ad1d010927d572fbd7b58fb9fb7b59',
    },
    tokenSymbol: 'SX',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x6f26e8a40c8daae8c4358ce557c10226527cebce',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.sx.technology/',
  },
  {
    pid: 129,
    image: '',
    lpSymbol: 'ROCKI-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x45a3C78A4036E1E4ffF5fa9c0814739B8271A6E1',
    },
    tokenSymbol: 'ROCKI',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xa01000c52b234a92563ba61e5649b7c76e1ba0f3',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.rocki.app/',
  },
  {
    pid: 130,
    image: '',
    lpSymbol: 'GUMMY-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xb355e5b120305c9a2c1b641dde19bc84a8bb8281',
    },
    tokenSymbol: 'GUMMY',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x10d3e0c38c286a04aee44d9b01cac916b56ee05a',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://gummybull.io/',
  },
  {
    pid: 131,
    image: 'DCB.png',
    lpSymbol: 'DCB-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xd094f600964c22ab259c092b0f3a0627c0de4699',
    },
    tokenSymbol: 'DCB',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xeac9873291ddaca754ea5642114151f3035c67a2',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://decubate.com/',
  },
  {
    pid: 132,
    image: 'NFTY.png',
    lpSymbol: 'NFTY-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x884be30e2c95b9cfed614ad2b5edf40af2a144ad',
    },
    tokenSymbol: 'NFTY',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x5774b2fc3e91af89f89141eacf76545e74265982',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://nftynetwork.io/',
  },
  {
    pid: 133,
    image: '',
    lpSymbol: 'SEFI-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xf29baec55254690e71a1beb5cfa5f1098a8df7e3',
    },
    tokenSymbol: 'SEFI',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xcd95350c69f229e72e57a44e8c05c436e65e4beb',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://secretswap.io/',
  },
  {
    pid: 134,
    image: '',
    lpSymbol: 'IHC-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x83ccbe832e5a3b620a435fe0edb89e171c14eccb',
    },
    tokenSymbol: 'IHC',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x86a53fcd199212FEa44FA7e16EB1f28812be911D',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.ihcoin.io/',
  },
  {
    pid: 135,
    image: '',
    lpSymbol: 'PROS-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x8205a8b42ee0bfdab43af3c971d97e150a1e48ae',
    },
    tokenSymbol: 'PROS',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xed8c8aa8299c10f067496bb66f8cc7fb338a3405',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://prosper.so/',
  },
  {
    pid: 136,
    image: '',
    lpSymbol: 'AIRT-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xd515f5153838a197833cb39c3100c72cc8a12204',
    },
    tokenSymbol: 'AIRT',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x016cf83732f1468150d87dcc5bdf67730b3934d3',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.airnfts.com/',
  },
  {
    pid: 137,
    image: 'THG.png',
    lpSymbol: 'THG-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xc2163a4879f4dcbfe28359664d98c7215e9caf2e',
    },
    tokenSymbol: 'THG',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x9fD87aEfe02441B123c3c32466cD9dB4c578618f',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://thetanarena.com/',
  },
  {
    pid: 138,
    image: 'WSG.png',
    lpSymbol: 'WSG-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x7c9391ed34bf49e1fca11e1aedd7e63af64c3663',
    },
    tokenSymbol: 'WSG',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xA58950F05FeA2277d2608748412bf9F802eA4901',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://wsg.gg/',
  },
  {
    pid: 139,
    image: 'OTAKU.png',
    lpSymbol: 'OTAKU-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x958b2ea8ef2798bd7270cd757a8756872a6358a2',
    },
    tokenSymbol: 'OTAKU',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x484215873a674f9af73367a8f94c2c591e997521',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://fomochronicles.com/',
  },
  {
    pid: 140,
    image: 'TNNS.png',
    lpSymbol: 'TNNS-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x114a7ebb03a9a9db0e913ca44cd5f2bb3bdcbfc3',
    },
    tokenSymbol: 'TNNS',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x6C7C87D9868b1dB5a0F62d867bAa90e0AdFA7Cfd',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.tnns.pro/',
  },
  {
    pid: 141,
    image: 'KING.png',
    lpSymbol: 'KING-BNB',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x396a89f9445321f57345439cd405c09d03c3d092',
    },
    tokenSymbol: 'KING',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x0cCD575bf9378c06f6DCa82f8122F570769F00C2',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://cryptobladeskingdoms.io/',
  },
  {
    pid: 142,
    image: '',
    lpSymbol: 'FIL-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xcaec8648dbac41b6504a8e408892931796d67d87',
    },
    tokenSymbol: 'FIL',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x0d8ce2a99bb6e3b7db580ed848240e4a0f9ae153',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://filecoin.io/',
  },
  {
    pid: 143,
    image: 'TUSD.png',
    lpSymbol: 'TUSD-BUSD LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xedba62a5d133fa340e4ef1d58d72f6e773554318',
    },
    tokenSymbol: 'TUSD',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x14016e85a25aeb13065688cafb43044c2ef86784',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    projectLink: 'https://trueusd.com/',
  },
  {
    pid: 144,
    image: '',
    lpSymbol: 'IDEX-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xe9a41aaca6c07743449200d18cd5bf9627b14903',
    },
    tokenSymbol: 'IDEX',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x0856978f7ffff0a2471b4520e3521c4b3343e36f',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://idex.io/',
  },
  {
    pid: 145,
    image: '',
    lpSymbol: 'TOWER-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x1b332e08f0957d43ff8c2760bf49af8d3798959d',
    },
    tokenSymbol: 'TOWER',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xe7c9c6bc87b86f9e5b57072f907ee6460b593924',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.crazydefenseheroes.com/',
  },
  {
    pid: 146,
    image: 'WRX.png',
    lpSymbol: 'WRX-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xdc45d9d98bdab3ff053a12bf068a88d849a59cf1',
    },
    tokenSymbol: 'WRX',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x8e17ed70334c87ece574c9d537bc153d8609e2a3',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://wazirx.com/',
  },
  {
    pid: 147,
    image: '',
    lpSymbol: 'OASIS-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xeF2b0B3e0077106249946c42CDf3F6a29942d44A',
    },
    tokenSymbol: 'OASIS',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xb19289b436b2F7A92891ac391D8f52580d3087e4',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://projectoasis.io/',
  },
  {
    pid: 148,
    image: '',
    lpSymbol: 'HOTCROSS-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x1c4a479ce71f41a68d4c2de26854fc99f310918d',
    },
    tokenSymbol: 'HOTCROSS',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x4FA7163E153419E0E1064e418dd7A99314Ed27b6',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://hotcross.com/ ',
  },
  {
    pid: 149,
    image: '',
    lpSymbol: 'TOON-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xc184fdb2d1107195ae393691c853855798fd626f',
    },
    tokenSymbol: 'TOON',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xaeE433ADeBe0FBB88dAa47eF0C1A513CaA52EF02',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://pontoon.fi/',
  },
  {
    pid: 150,
    image: '',
    lpSymbol: 'WING-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xE0A15A31a78129A3d28138B71724cB2D3A688dD7',
    },
    tokenSymbol: 'WING',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x3cb7378565718c64ab86970802140cc48ef1f969',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://wing.finance/',
  },
  {
    pid: 151,
    image: '',
    lpSymbol: 'GAN-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x8ac70bd286dd7752386cd7d619208426c66c237a',
    },
    tokenSymbol: 'GAN',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x8f1408171eae06aec4549fd0a5808a42cee6dd84',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://galacticarena.io/',
  },
  {
    pid: 152,
    image: '',
    lpSymbol: 'BCPAY-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x16DE6d67F19880afB653C196728e40A2DA245616',
    },
    tokenSymbol: 'BCPAY',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x21f1ce0FCf1E9E39F8e79B7762801E8096d9f6CD',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://bitcashpay.net/',
  },
  {
    pid: 153,
    image: '',
    lpSymbol: 'iBFR-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xd023d87f668838Cb147AF80E67F55cAf04e602f4',
    },
    tokenSymbol: 'iBFR',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xa296ad1c47fe6bdc133f39555c1d1177bd51fbc5',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.buffer.finance/',
  },
  {
    pid: 154,
    image: '',
    lpSymbol: 'SATA-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xBA593C9619301409D506332417236CAEb0453D09',
    },
    tokenSymbol: 'SATA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x6b1c8765c7eff0b60706b0ae489eb9bb9667465a',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://sata.technology/',
  },
  {
    pid: 155,
    image: '',
    lpSymbol: 'LIME-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x2919128aAcC9e608A9E629aaB6b0189BF7932947',
    },
    tokenSymbol: 'LIME',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x7bc75e291e656e8658d66be1cc8154a3769a35dd',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://imem.app/',
  },
  {
    pid: 156,
    image: 'FXS.svg',
    lpSymbol: 'FXS-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x8210D92a8951d50de3D46AC0ee39cb5E2C14e18A',
    },
    tokenSymbol: 'FXS',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xe48a3d7d0bc88d552f730b62c006bc925eadb9ee',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://frax.finance/',
  },
  {
    pid: 157,
    image: 'FRAX.svg',
    lpSymbol: 'FRAX-BUSD LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x5292600758A090490D34367d4864ed6291D254fe',
    },
    tokenSymbol: 'FRAX',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x90c97f71e18723b0cf0dfa30ee176ab653e89f40',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    projectLink: 'https://frax.finance/',
  },
  {
    pid: 158,
    image: 'RELAY.svg',
    lpSymbol: 'RELAY-BUSD LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xab29d19dc9a32fe37275371f0ddfeea3d0c72c25',
    },
    tokenSymbol: 'RELAY',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xE338D4250A4d959F88Ff8789EaaE8c32700BD175',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    projectLink: 'https://www.relaychain.com/',
  },
  {
    pid: 159,
    image: 'QUIDD.svg',
    lpSymbol: 'QUIDD-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x813cf14699a230185eada5266b18403d77593e12',
    },
    tokenSymbol: 'QUIDD',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x7961Ade0a767c0E5B67Dd1a1F78ba44F727642Ed',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://market.onquidd.com/',
  },
  {
    pid: 160,
    image: 'MONI.svg',
    lpSymbol: 'MONI-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xe89dff611f926b86293a8e0e6f1c384c6ae0cb69',
    },
    tokenSymbol: 'MONI',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x9573c88ae3e37508f87649f87c4dd5373c9f31e0',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://monstainfinite.com/',
  },
  {
    pid: 161,
    image: 'INFO.svg',
    lpSymbol: 'INFO-BUSD LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x194613d18f07Cc19f886De6AC63F67Db235b5DEE',
    },
    tokenSymbol: 'INFO',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xdf727040d3997b5d95dee8c661fa96e3c13ee0c9',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    projectLink: 'https://infomatix.io/',
  },
  {
    pid: 163,
    image: 'SHILL.svg',
    lpSymbol: 'SHILL-BUSD LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x77A3B1bBa24D8Cdc28992dc242F05deD6648A8B3',
    },
    tokenSymbol: 'SHILL',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xfb9c339b4bace4fe63ccc1dd9a3c3c531441d5fe',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    projectLink: 'https://projectseed.io/',
  },
  {
    pid: 164,
    image: 'LMN.svg',
    lpSymbol: 'LMN-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x05290964C32722D9E0Ae01cEde50c30Fa6b7ed01',
    },
    tokenSymbol: 'LMN',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x7251C7A2155d8FEDb42a1DC4333aDe589e4d6919',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://lemonn.io/',
  },
  {
    pid: 165,
    image: 'HERA.png',
    lpSymbol: 'HERA-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xA29C9E83b951F5b043EbAC5d4FB4a5d108F156ed',
    },
    tokenSymbol: 'HERA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x49c7295ff86eabf5bf58c6ebc858db4805738c01',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://heroarena.app/',
  },
  {
    pid: 166,
    image: 'GMEE.svg',
    lpSymbol: 'GMEE-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xE2Ab715823f6431714e971E2209e377F2a833f05',
    },
    tokenSymbol: 'GMEE',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x84e9a6F9D240FdD33801f7135908BfA16866939A',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://www.gamee.com/',
  },
  {
    pid: 167,
    image: 'ARV.svg',
    lpSymbol: 'ARV-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x2C7447BF72FFd23e7f2A5Aa04bdFF0Faf5798658',
    },
    tokenSymbol: 'ARV',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x6679eb24f59dfe111864aec72b443d1da666b360',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://ariva.digital/',
  },
  {
    pid: 168,
    image: 'rASKO.svg',
    lpSymbol: 'rASKO-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xC0A9261cbB82923d974A9ba804aF4FC8DDE7BeD2',
    },
    tokenSymbol: 'rASKO',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xd118f42edbc839f7e1e85d5269a25288792c141b',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://asko.finance/rasko',
  },
  {
    pid: 169,
    image: 'PEL.svg',
    lpSymbol: 'PEL-BNB LP',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x63466E1e432d4E684700433CEBF5C69d72cDD6C2',
    },
    tokenSymbol: 'PEL',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xa75e7928d3de682e3f44da60c26f33117c4e6c5c',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    projectLink: 'https://propel.xyz/',
  },
  {
    pid: 7, // NOTE: Inactive Farm
    image: 'BAKE.svg',
    lpSymbol: 'BAKE-BANANA',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BANANA-BAKE BananaPair
      56: '0x51bb531a5253837a23ce8de478a4941a71a4202c',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5', // BAKE Token address
    },
    style: 'deprecated',
    quoteTokenSymbol: QuoteToken.BANANA,
    quoteTokenAdresses: contracts.banana,
  },
  {
    pid: 15, // NOTE: Inactive Farm
    image: 'GFCE.png',
    lpSymbol: 'GFCE-BANANA',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BANANA-GFCE BananaPair
      56: '0x9C87cae57f0962997d9bd66C24f3425d20543e3d',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x94BaBBE728D9411612Ee41b20241a6FA251b26Ce',
    },
    style: 'deprecated',
    quoteTokenSymbol: QuoteToken.BANANA,
    quoteTokenAdresses: contracts.banana,
  },
  {
    pid: 6, // NOTE: Inactive Farm
    image: 'CAKE.png',
    lpSymbol: 'CAKE-BANANA',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663', // BANANA-CAKE BananaPair
      56: '0x9949e1db416a8a05a0cac0ba6ea152ba8729e893',
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    style: 'deprecated',
    quoteTokenSymbol: QuoteToken.BANANA,
    quoteTokenAdresses: contracts.banana,
  },
  {
    pid: 10, // NOTE: Inactive Farm
    image: 'BIFI.png',
    lpSymbol: 'BIFI-BANANA',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x2ce820319047c407cb952060df5f7fb3d9a9a688', // BANANA-BIFI BananaPair
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A', // BIFI Token
    },
    style: 'deprecated',
    quoteTokenSymbol: QuoteToken.BANANA,
    quoteTokenAdresses: contracts.banana,
  },
  {
    pid: 19, // NOTE: Inactive Farm
    image: 'NAUT.png',
    lpSymbol: 'NAUT-BANANA',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0xf579A6196d6CC8c2C40952Ece57345AbbD589c91', // BANANA-NAUT BananaPair
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x05b339b0a346bf01f851dde47a5d485c34fe220c', // NAUT Token
    },
    style: 'deprecated',
    quoteTokenSymbol: QuoteToken.BANANA,
    quoteTokenAdresses: contracts.banana,
  },
  {
    pid: 9, // NOTE: Inactive Farm
    image: 'BREW.svg',
    lpSymbol: 'BREW-BANANA',
    lpAddresses: {
      97: '0xed89477d619c7e73f752d5fc7be60308ceb63663',
      56: '0x5514E0E1DA40A38E19d58e8B6E16226E16e183fA', // BANANA-BREW BananaPair
    },
    tokenSymbol: 'BANANA',
    tokenAddresses: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x790Be81C3cA0e53974bE2688cDb954732C9862e1', // BREW Token
    },
    style: 'deprecated',
    quoteTokenSymbol: QuoteToken.BANANA,
    quoteTokenAdresses: contracts.banana,
  },
]

export default farms
