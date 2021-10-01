const tokens = {
  // BANANA should always be first token for GNANA calculation
  banana: {
    symbol: 'BANANA',
    address: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
      137: '0x5d47baba0d66083c52009271faf3f50dcc01023c',
    },
    decimals: 18,
  },
  gnana: {
    symbol: 'GNANA',
    address: {
      97: '0x4fb99590ca95fc3255d9fa66a1ca46c43c34b09a',
      56: '0xdDb3Bd8645775F59496c821E4F55A7eA6A6dc299',
    },
    decimals: 18,
  },
  wbnb: {
    symbol: 'WBNB',
    address: {
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    decimals: 18,
  },
  busd: {
    symbol: 'BUSD',
    address: {
      97: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee',
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    decimals: 18,
  },
  eth: {
    symbol: 'ETH',
    address: {
      97: '0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    decimals: 18,
  },
  btc: {
    symbol: 'BTC',
    address: {
      97: '0x6ce8da28e2f864420840cf74474eff5fd80e65b8',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    decimals: 18,
  },
  cake: {
    symbol: 'CAKE',
    address: {
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    decimals: 18,
  },
  bake: {
    symbol: 'BAKE',
    address: {
      56: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
  },
  soul: {
    symbol: 'SOUL',
    address: {
      56: '0x67d012F731c23F0313CEA1186d0121779c77fcFE',
    },
    decimals: 8,
  },
  usdc: {
    symbol: 'USDC',
    address: {
      56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    },
    decimals: 18,
  },
  brew: {
    symbol: 'BREW',
    address: {
      56: '0x790be81c3ca0e53974be2688cdb954732c9862e1',
    },
    decimals: 18,
  },
  bifi: {
    symbol: 'BIFI',
    address: {
      56: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A',
    },
    decimals: 18,
  },
  swamp: {
    symbol: 'SWAMP',
    address: {
      56: '0xc5a49b4cbe004b6fd55b30ba1de6ac360ff9765d',
    },
    decimals: 18,
  },
  alloy: {
    symbol: 'ALLOY',
    address: {
      56: '0x5ef5994fa33ff4eb6c82d51ee1dc145c546065bd',
    },
    decimals: 18,
  },
  naut: {
    symbol: 'NAUT',
    address: {
      56: '0x05b339b0a346bf01f851dde47a5d485c34fe220c',
    },
    decimals: 18,
  },
  jdi: {
    symbol: 'JDI',
    address: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x0491648c910ad2c1afaab733faf71d30313df7fc',
      137: '0x340fe1d898eccaad394e2ba0fc1f93d27c7b717a',
    },
    decimals: 18,
  },
  foxy: {
    symbol: 'FOXY',
    address: {
      56: '0x4354a4f710182966e55ea30cfa807fa1b821a67b',
    },
    decimals: 9,
  },
  lyptus: {
    symbol: 'LYPTUS',
    address: {
      56: '0xba26397cdff25f0d26e815d218ef3c77609ae7f1',
    },
    decimals: 18,
  },
  ont: {
    symbol: 'ONT',
    address: {
      56: '0xfd7b3a77848f1c2d67e05e54d78d174a0c850335',
    },
    decimals: 18,
  },
  bft: {
    symbol: 'BFT',
    address: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xa4f93159ce0a4b533b443c74b89967c60a5969f8',
    },
    decimals: 18,
  },
  sfp: {
    symbol: 'SFP',
    address: {
      56: '0xd41fdb03ba84762dd66a0af1a6c8540ff1ba5dfb',
    },
    decimals: 18,
  },
  gen: {
    symbol: 'GEN',
    address: {
      56: '0xb0f2939a1c0e43683e5954c9fe142f7df9f8d967',
    },
    decimals: 18,
  },
  watch: {
    symbol: 'WATCH',
    address: {
      56: '0x7a9f28eb62c791422aa23ceae1da9c847cbec9b0',
      137: '0x09211dc67f9fe98fb7bbb91be0ef05f4a12fa2b2',
    },
    decimals: 18,
  },
  bison: {
    symbol: 'BISON',
    address: {
      56: '0x19a6da6e382b85f827088092a3dbe864d9ccba73',
    },
    decimals: 18,
  },
  cyt: {
    symbol: 'CYT',
    address: {
      56: '0xd9025e25bb6cf39f8c926a704039d2dd51088063',
    },
    decimals: 18,
  },
  hotcross: {
    symbol: 'HOTCROSS',
    address: {
      56: '0x4fa7163e153419e0e1064e418dd7a99314ed27b6',
    },
    decimals: 18,
  },
  lmt: {
    symbol: 'LMT',
    address: {
      56: '0x9617857e191354dbea0b714d78bc59e57c411087',
    },
    decimals: 18,
  },
  revv: {
    symbol: 'REVV',
    address: {
      56: '0x833f307ac507d47309fd8cdd1f835bef8d702a93',
    },
    decimals: 18,
  },
  wizard: {
    symbol: 'WIZARD',
    address: {
      56: '0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18',
    },
    decimals: 18,
  },
  gnt: {
    symbol: 'GNT',
    address: {
      56: '0xf750a26eb0acf95556e8529e72ed530f3b60f348',
    },
    decimals: 18,
  },
  cla: {
    symbol: 'CLA',
    address: {
      56: '0xf6663f46ecd7ae8ee8b6cc54681a42eba0ef52b4',
    },
    decimals: 18,
  },
  zig: {
    symbol: 'ZIG',
    address: {
      56: '0x8C907e0a72C3d55627E853f4ec6a96b0C8771145',
    },
    decimals: 18,
  },
  nvt: {
    symbol: 'NVT',
    address: {
      56: '0xf0e406c49c63abf358030a299c0e00118c4c6ba5',
    },
    decimals: 8,
  },
  polar: {
    symbol: 'POLAR',
    address: {
      56: '0xc64c9b30c981fc2ee4e13d0ca3f08258e725fd24',
    },
    decimals: 18,
  },
  gro: {
    symbol: 'GRO',
    address: {
      56: '0x336ed56d8615271b38ecee6f4786b55d0ee91b96',
    },
    decimals: 18,
  },
  crude: {
    symbol: 'CRUDE',
    address: {
      56: '0x8db702D9d561921C45Be8DF38830A653e4BC0299',
    },
    decimals: 18,
  },
  ceek: {
    symbol: 'CEEK',
    address: {
      56: '0xe0f94ac5462997d2bc57287ac3a3ae4c31345d66',
    },
    decimals: 18,
  },
  krw: {
    symbol: 'KRW',
    address: {
      56: '0x1446f3CEdf4d86a9399E49f7937766E6De2A3AAB',
    },
    decimals: 18,
  },
  lory: {
    symbol: 'LORY',
    address: {
      56: '0xcd5d75dbe75449a9021b6c570a41959eb571c751',
    },
    decimals: 18,
  },
  sista: {
    symbol: 'SISTA',
    address: {
      56: '0xca6d25c10dad43ae8be0bc2af4d3cd1114583c08',
    },
    decimals: 18,
  },
  dinop: {
    symbol: 'DINOP',
    address: {
      56: '0xea90DC6F64d18771Ca1dac8098526a9082265B42',
    },
    decimals: 9,
  },
  guard: {
    symbol: 'GUARD',
    address: {
      56: '0xf606bd19b1e61574ed625d9ea96c841d4e247a32',
    },
    decimals: 18,
  },
  land: {
    symbol: 'LAND',
    address: {
      56: '0x9d986a3f147212327dd658f712d5264a73a1fdb0',
    },
    decimals: 18,
  },
  bhc: {
    symbol: 'BHC',
    address: {
      56: '0x6fd7c98458a943f469e1cf4ea85b173f5cd342f4',
    },
    decimals: 18,
  },
  crush: {
    symbol: 'CRUSH',
    address: {
      56: '0x0Ef0626736c2d484A792508e99949736D0AF807e',
    },
    decimals: 18,
  },
  pear: {
    symbol: 'PEAR',
    address: {
      56: '0xdf7C18ED59EA738070E665Ac3F5c258dcc2FBad8',
      137: '0xc8bcb58caEf1bE972C0B638B1dD8B0748Fdc8A44',
    },
    decimals: 18,
  },
  bnbjdi: {
    symbol: 'BNB-JDI',
    address: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xfb6063f29af6dcd1fc03a8e221c6d91deabbe764',
    },
    decimals: 18,
    lpToken: true,
  },
  obie: {
    symbol: 'OBIE',
    address: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xa18509d20fd01b4990734fd04ba53bad02922787',
    },
    decimals: 18,
  },
  ong: {
    symbol: 'ONG',
    address: {
      56: '0x308bfaeAaC8BDab6e9Fc5Ead8EdCb5f95b0599d9',
    },
    decimals: 18,
  },
  ydr: {
    symbol: 'YDR',
    address: {
      56: '0x3757232B55E60da4A8793183aC030CfCE4c3865d',
    },
    decimals: 18,
  },
  copycat: {
    symbol: 'COPYCAT',
    address: {
      56: '0xd635B32688F36ee4a7FE117b4C91DD811277ACB6',
    },
    decimals: 18,
  },
  bfg: {
    symbol: 'BFG',
    address: {
      56: '0xBb46693eBbEa1aC2070E59B4D043b47e2e095f86',
    },
    decimals: 18,
  },
  dep: {
    symbol: 'DEP',
    address: {
      56: '0xcaF5191fc480F43e4DF80106c7695ECA56E48B18',
    },
    decimals: 18,
  },
  rsun: {
    symbol: 'RSUN',
    address: {
      56: '0x917841c010b3d86ed886f36f2c9807e07a2e3093',
    },
    decimals: 9,
  },
  txl: {
    symbol: 'TXL',
    address: {
      56: '0x1ffd0b47127fdd4097e54521c9e2c7f0d66aafc5',
    },
    decimals: 18,
  },
  sfund: {
    symbol: 'SFUND',
    address: {
      56: '0x477bc8d23c634c154061869478bce96be6045d12',
    },
    decimals: 18,
  },
  phx: {
    symbol: 'PHX',
    address: {
      56: '0xac86e5f9bA48d680516df50C72928c2ec50F3025',
    },
    decimals: 18,
  },
  pots: {
    symbol: 'POTS',
    address: {
      56: '0x3Fcca8648651E5b974DD6d3e50F61567779772A8',
    },
    decimals: 18,
  },
  frmx: {
    symbol: 'FRMx',
    address: {
      56: '0x8523518001ad5d24b2a04e8729743c0643a316c0',
    },
    decimals: 18,
  },
  exp: {
    symbol: 'EXP',
    address: {
      56: '0x639d4C62F58a4048AD0F69B8CE675dB1A3e8e00e',
    },
    decimals: 18,
  },
  cfi: {
    symbol: 'CFi',
    address: {
      56: '0x6a545f9c64d8f7b957d8d2e6410b52095a9e6c29',
    },
    decimals: 18,
  },
  sx: {
    symbol: 'sx',
    address: {
      56: '0x6f26e8a40c8daae8c4358ce557c10226527cebce',
    },
    decimals: 18,
  },
  rocks: {
    symbol: 'ROCKS',
    address: {
      56: '0xA01000C52b234a92563BA61e5649b7C76E1ba0f3',
    },
    decimals: 18,
  },
  gummy: {
    symbol: 'GUMMY',
    address: {
      56: '0x10d3e0c38c286a04aee44d9b01cac916b56ee05a',
    },
    decimals: 18,
  },
  dcb: {
    symbol: 'DCB',
    address: {
      56: '0xEAc9873291dDAcA754EA5642114151f3035c67A2',
    },
    decimals: 18,
  },
  nfty: {
    symbol: 'NFTY',
    address: {
      56: '0x5774b2fc3e91af89f89141eacf76545e74265982',
    },
    decimals: 18,
  },
}

export default tokens
