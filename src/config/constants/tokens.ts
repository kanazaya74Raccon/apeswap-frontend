const tokens = {
  // BANANA should always be first token for GNANA calculation
  banana: {
    symbol: 'BANANA',
    address: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
      137: '0x5d47baba0d66083c52009271faf3f50dcc01023c',
      1: '0x92df60c51c710a1b1c20e42d85e221f3a1bfc7f2',
    },
    decimals: 18,
  },
  MockERC20: {
    symbol: 'MockERC20',
    address: {
      97: '0x68D24FA18c00B5Df32e91C1dDDfa6419083606F9',
      56: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
    },
    decimals: 18,
  },
  gnana: {
    symbol: 'GNANA',
    address: {
      97: '0xf693bDA9D3C56D5F9165c8633d9098e3C4Ae495A',
      56: '0xdDb3Bd8645775F59496c821E4F55A7eA6A6dc299',
    },
    decimals: 18,
  },
  wbnb: {
    symbol: 'BNB',
    address: {
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      137: '0xa649325aa7c5093d12d6f98eb4378deae68ce23f',
    },
    decimals: 18,
  },
  wmatic: {
    symbol: 'MATIC',
    address: {
      56: '0xcc42724c6683b7e57334c4e856f4c9965ed682bd',
      137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    },
    decimals: 18,
  },
  busd: {
    symbol: 'BUSD',
    address: {
      // Swapped to base token for now
      97: '0x68d24fa18c00b5df32e91c1dddfa6419083606f9',
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    decimals: 18,
  },
  eth: {
    symbol: 'ETH',
    address: {
      97: '0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
      137: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    },
    decimals: 18,
  },
  btc: {
    symbol: 'BTC',
    address: {
      97: '0x6ce8da28e2f864420840cf74474eff5fd80e65b8',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
      137: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
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
      137: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
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
    symbol: 'SX',
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
  aur: {
    symbol: 'AUR',
    address: {
      56: '0x1dEb45C74E0192D9272ADF54e9a7519C48C2bd81',
    },
    decimals: 18,
  },
  sefi: {
    symbol: 'SEFI',
    address: {
      56: '0xcd95350c69F229E72e57A44e8C05C436E65E4bEb',
    },
    decimals: 6,
  },
  kala: {
    symbol: 'KALA',
    address: {
      56: '0x32299c93960bB583A43c2220Dc89152391A610c5',
    },
    decimals: 18,
  },
  ihc: {
    symbol: 'IHC',
    address: {
      56: '0x86a53fcd199212FEa44FA7e16EB1f28812be911D',
    },
    decimals: 18,
  },
  airt: {
    symbol: 'AIRT',
    address: {
      56: '0x016CF83732f1468150D87dCC5BdF67730B3934D3',
    },
    decimals: 18,
  },
  pros: {
    symbol: 'PROS',
    address: {
      56: '0xed8c8aa8299c10f067496bb66f8cc7fb338a3405',
    },
    decimals: 18,
  },
  thg: {
    symbol: 'THG',
    address: {
      56: '0x9fD87aEfe02441B123c3c32466cD9dB4c578618f',
    },
    decimals: 18,
  },
  crystl: {
    symbol: 'CRYSTL',
    address: {
      137: '0x76bF0C28e604CC3fE9967c83b3C3F31c213cfE64',
    },
    decimals: 18,
  },
  dai: {
    symbol: 'DAI',
    address: {
      137: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
    },
    decimals: 18,
  },
  usdt: {
    symbol: 'USDT',
    address: {
      137: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
      56: '0x55d398326f99059ff775485246999027b3197955',
    },
    decimals: 18,
  },
  wsg: {
    symbol: 'WSG',
    address: {
      56: '0xA58950F05FeA2277d2608748412bf9F802eA4901',
    },
    decimals: 18,
  },
  otaku: {
    symbol: 'OTAKU',
    address: {
      56: '0x484215873a674f9af73367a8f94c2c591e997521',
    },
    decimals: 18,
  },
  tnns: {
    symbol: 'TNNS',
    address: {
      56: '0x6C7C87D9868b1dB5a0F62d867bAa90e0AdFA7Cfd',
    },
    decimals: 18,
  },
  king: {
    symbol: 'KING',
    address: {
      56: '0x0cCD575bf9378c06f6DCa82f8122F570769F00C2',
    },
    decimals: 18,
  },
  mbird: {
    symbol: 'MBIRD',
    address: {
      56: '0x3b23a0FFbc53198d86fa5927E8ee32F7EF699A14',
    },
    decimals: 18,
  },
  tako: {
    symbol: 'TAKO',
    address: {
      56: '0x2F3391AeBE27393aBa0a790aa5E1577fEA0361c2',
    },
    decimals: 18,
  },
  hair: {
    symbol: 'HAIR',
    address: {
      137: '0x100A947f51fA3F1dcdF97f3aE507A72603cAE63C',
    },
    decimals: 18,
  },
  sing: {
    symbol: 'SING',
    address: {
      137: '0xcb898b0efb084df14dd8e018da37b4d0f06ab26d',
      56: '0x23894c0ce2d79b79ea33a4d02e67ae843ef6e563',
    },
    decimals: 18,
  },
  inku: {
    symbol: 'INKU',
    address: {
      56: '0xb37cad62441ef8b866f3e36f12fd42062b6c0f33',
    },
    decimals: 18,
  },
  bbq: {
    symbol: 'BBQ',
    address: {
      56: '0xd9a88f9b7101046786490baf433f0f6ab3d753e2',
    },
    decimals: 18,
  },
  nalis: {
    symbol: 'NALIS',
    address: {
      56: '0xb2ebaa0ad65e9c888008bf10646016f7fcdd73c3',
    },
    decimals: 18,
  },
  bbnana: {
    symbol: 'BBNANA',
    address: {
      56: '0xa3be3b30fa5302dad5c9874cdb50e220eaadf092',
    },
    decimals: 18,
  },
  tower: {
    symbol: 'TOWER',
    address: {
      56: '0xe7c9C6bc87B86f9E5b57072F907EE6460B593924',
    },
    decimals: 18,
  },
  oasis: {
    symbol: 'OASIS',
    address: {
      56: '0xb19289b436b2F7A92891ac391D8f52580d3087e4',
    },
    decimals: 18,
  },
  toon: {
    symbol: 'TOON',
    address: {
      56: '0xaeE433ADeBe0FBB88dAa47eF0C1A513CaA52EF02',
    },
    decimals: 18,
  },
  abr: {
    symbol: 'ABR',
    address: {
      137: '0x04429fbb948bbd09327763214b45e505a5293346',
    },
    decimals: 18,
  },
  wing: {
    symbol: 'WING',
    address: {
      56: '0x3cb7378565718c64ab86970802140cc48ef1f969',
    },
    decimals: 9,
  },
  gan: {
    symbol: 'GAN',
    address: {
      56: '0x8F1408171EAe06AEC4549fD0a5808A42cee6DD84',
    },
    decimals: 18,
  },
  bcpay: {
    symbol: 'BCPAY',
    address: {
      56: '0x21f1ce0FCf1E9E39F8e79B7762801E8096d9f6CD',
    },
    decimals: 8,
  },
  ibfr: {
    symbol: 'iBFR',
    address: {
      56: '0xa296aD1C47FE6bDC133f39555C1D1177BD51fBc5',
    },
    decimals: 18,
  },
  sata: {
    symbol: 'SATA',
    address: {
      56: '0x6b1C8765C7EFf0b60706b0ae489EB9bb9667465A',
    },
    decimals: 18,
  },
  lico: {
    symbol: 'LICO',
    address: {
      56: '0x4F3266a56589357B4f8082918b14B923693e57f0',
    },
    decimals: 18,
  },
  lime: {
    symbol: 'LIME',
    address: {
      56: '0x7bC75e291E656E8658D66Be1cc8154A3769A35Dd',
    },
    decimals: 18,
  },
  fxs: {
    symbol: 'FXS',
    address: {
      56: '0xe48A3d7d0Bc88d552f730B62c006bC925eadB9eE',
    },
    decimals: 18,
  },
  relay: {
    symbol: 'RELAY',
    address: {
      56: '0xE338D4250A4d959F88Ff8789EaaE8c32700BD175',
    },
    decimals: 18,
  },
  quidd: {
    symbol: 'QUIDD',
    address: {
      56: '0x7961Ade0a767c0E5B67Dd1a1F78ba44F727642Ed',
    },
    decimals: 18,
  },
  moni: {
    symbol: 'MONI',
    address: {
      56: '0x9573c88ae3e37508f87649f87c4dd5373c9f31e0',
    },
    decimals: 18,
  },
  info: {
    symbol: 'INFO',
    address: {
      56: '0xdF727040d3997b5D95deE8c661fA96E3c13eE0C9',
    },
    decimals: 18,
  },
  shill: {
    symbol: 'SHILL',
    address: {
      56: '0xfb9C339b4BacE4Fe63ccc1dd9a3c3C531441D5fE',
    },
    decimals: 18,
  },
  lmn: {
    symbol: 'LMN',
    address: {
      56: '0x7251C7A2155d8FEDb42a1DC4333aDe589e4d6919',
    },
    decimals: 18,
  },
  hera: {
    symbol: 'HERA',
    address: {
      56: '0x49C7295ff86EaBf5bf58C6eBC858DB4805738c01',
    },
    decimals: 18,
  },
  gmee: {
    symbol: 'GMEE',
    address: {
      56: '0x84e9a6F9D240FdD33801f7135908BfA16866939A',
    },
    decimals: 18,
  },
  arv: {
    symbol: 'ARV',
    address: {
      56: '0x6679eB24F59dFe111864AEc72B443d1Da666B360',
    },
    decimals: 8,
  },
  rasko: {
    symbol: 'rASKO',
    address: {
      56: '0xd118f42eDbc839F7e1E85d5269A25288792c141B',
    },
    decimals: 18,
  },
  pel: {
    symbol: 'PEL',
    address: {
      56: '0xA75E7928d3de682e3F44dA60C26F33117c4E6C5c',
    },
    decimals: 18,
  },
  stz: {
    symbol: 'STZ',
    address: {
      56: '0x7FE378c5e0B5C32AF2ecc8829beDF02245A0E4eF',
    },
    decimals: 18,
  },
  qa: {
    symbol: 'QA',
    address: {
      56: '0x4ef29F3B804C316bA8bA464A765C601Fc092a2e9',
    },
    decimals: 18,
  },
  loa: {
    symbol: 'LOA',
    address: {
      56: '0x94b69263FCA20119Ae817b6f783Fc0F13B02ad50',
    },
    decimals: 18,
  },
  ads: {
    symbol: 'ADS',
    address: {
      56: '0xcfcEcFe2bD2FED07A9145222E8a7ad9Cf1Ccd22A',
    },
    decimals: 11,
  },
  kai: {
    symbol: 'KAI',
    address: {
      56: '0x39Ae8EEFB05138f418Bb27659c21632Dc1DDAb10',
    },
    decimals: 18,
  },
  dose: {
    symbol: 'DOSE',
    address: {
      56: '0x7837fd820bA38f95c54D6dAC4ca3751b81511357',
    },
    decimals: 18,
  },
  ore: {
    symbol: 'ORE',
    address: {
      56: '0x91F006ee672F8f39C6E63cA75B1cA14067b3c366',
    },
    decimals: 8,
  },
  myra: {
    symbol: 'MYRA',
    address: {
      56: '0x6ef238E9E8CD2A96740897761C18894Fc086B9d0',
    },
    decimals: 18,
  },
  godz: {
    symbol: 'GODZ',
    address: {
      56: '0xF0A8EcBCE8caADB7A07d1FcD0f87Ae1Bd688dF43',
    },
    decimals: 18,
  },
  mnft: {
    symbol: 'MNFT',
    address: {
      56: '0x36953b5ec00a13edceceb3af258d034913d2a79d',
    },
    decimals: 18,
  },
  gmr: {
    symbol: 'GMR',
    address: {
      56: '0xADCa52302e0a6c2d5D68EDCdB4Ac75DeB5466884',
    },
    decimals: 18,
  },
  moonlight: {
    symbol: 'MOONLIGHT',
    address: {
      56: '0xB1CeD2e320E3f4C8e3511B1DC59203303493F382',
    },
    decimals: 9,
  },
  space: {
    symbol: 'SPACE',
    address: {
      56: '0xe486a69E432Fdc29622bF00315f6b34C99b45e80',
    },
    decimals: 18,
  },
  bcmc: {
    symbol: 'BCMC',
    address: {
      56: '0xc10358f062663448a3489fC258139944534592ac',
    },
    decimals: 18,
  },
  ari: {
    symbol: 'ARI',
    address: {
      56: '0xc80A0A55CAF6a7bfB4Ee22f9380C4077312c4a35',
    },
    decimals: 18,
  },
  nfty2: {
    symbol: 'NFTY ',
    address: {
      56: '0x8623e66Bea0DCe41B6d47f9C44e806A115baBae0',
      137: '0x8623e66bea0dce41b6d47f9c44e806a115babae0',
    },
    decimals: 18,
  },
  kom: {
    symbol: 'KOM',
    address: {
      137: '0xC004e2318722EA2b15499D6375905d75Ee5390B8',
    },
    decimals: 8,
  },
  lunr: {
    symbol: 'LUNR',
    address: {
      56: '0x37807D4fbEB84124347B8899Dd99616090D3e304',
    },
    decimals: 4,
  },
  trustnft: {
    symbol: 'TRUSTNFT',
    address: {
      56: '0x08F725D2809FdA409Bc23493F3615a4c85a22d7d',
    },
    decimals: 18,
  },
  wgict: {
    symbol: 'WGICT',
    address: {
      56: '0x27B2D695eF01d10EE96582a23db201B0Aa338639',
    },
    decimals: 8,
  },
  buzz: {
    symbol: 'BUZZ',
    address: {
      56: '0xa73C15620bfA79646E9A11d0D638d66588456462',
    },
    decimals: 18,
  },
  ranker: {
    symbol: 'RANKER',
    address: {
      56: '0xdE4512Db1a7a7519818dA38DB86eC1363d70A711',
    },
    decimals: 18,
  },
  nft11: {
    symbol: 'NFT11',
    address: {
      56: '0x73F67AE7f934FF15beaBf55A28C2Da1eEb9B56Ec',
    },
    decimals: 18,
  },
  front: {
    symbol: 'FRONT',
    address: {
      56: '0x928e55daB735aa8260AF3cEDadA18B5f70C72f1b',
    },
    decimals: 18,
  },
  ruby: {
    symbol: 'RUBY',
    address: {
      56: '0xf7722aa0714096f1fb5ef83e6041cebb4d58a08e',
    },
    decimals: 18,
  },
  anml: {
    symbol: 'ANML',
    address: {
      56: '0x06fda0758c17416726f77cb11305eac94c074ec0',
    },
    decimals: 18,
  },
  drf: {
    symbol: 'DRF',
    address: {
      56: '0x89C1Af791d7B4cf046Dca8Fa10a41Dd2298A6a3F',
    },
    decimals: 18,
  },
  bountie: {
    symbol: 'BOUNTIE',
    address: {
      56: '0x00f80a8f39bb4D04a3038C497E3642bf1B0A304e',
    },
    decimals: 18,
  },
  ankr: {
    symbol: 'ANKR',
    address: {
      56: '0xf307910A4c7bbc79691fD374889b36d8531B08e3',
    },
    decimals: 18,
  },
  kte: {
    symbol: 'KTE',
    address: {
      56: '0x61fA01129aC0bB124D1C60Dc9f735C6C579A858B',
    },
    decimals: 18,
  },
  gq: {
    symbol: 'GQ',
    address: {
      56: '0xF700D4c708C2be1463E355F337603183D20E0808',
    },
    decimals: 18,
  },
  aspo: {
    symbol: 'ASPO',
    address: {
      56: '0x1a9b49E9f075c37Fe5f86C916bac9DEb33556D7E',
    },
    decimals: 18,
  },
  bico: {
    symbol: 'BICO',
    address: {
      56: '0x06250a4962558F0F3E69FC07F4c67BB9c9eAc739',
    },
    decimals: 18,
  },
  cpo: {
    symbol: 'CPO',
    address: {
      56: '0xea395DFaFEd39924988b475f2Ca7f4C72655203A',
    },
    decimals: 18,
  },
  coc: {
    symbol: 'COC',
    address: {
      56: '0xbDC3b3639f7AA19e623A4d603A3Fb7Ab20115A91',
    },
    decimals: 18,
  },
  froyo: {
    symbol: 'FROYO',
    address: {
      56: '0xe369fec23380f9F14ffD07a1DC4b7c1a9fdD81c9',
    },
    decimals: 18,
  },
  primate: {
    symbol: 'PRIMATE',
    address: {
      56: '0xA19863E302FD1B41276fCe5A48D9C511DBeEf34c',
    },
    decimals: 18,
  },
  lc: {
    symbol: 'LC',
    address: {
      56: '0x6012C3a742f92103d238F1c8306cF8fbcDEca8B3',
    },
    decimals: 18,
  },
  grvs: {
    symbol: 'GRVS',
    address: {
      56: '0x190CEC0657a02E9eAB1C1DF5d59f9139131cf539',
    },
    decimals: 18,
  },
  lgx: {
    symbol: 'LGX',
    address: {
      56: '0x9096B4309224d751FCB43d7eB178dcFFc122aD15',
    },
    decimals: 18,
  },
  roobee: {
    symbol: 'ROOBEE',
    address: {
      56: '0xF77351D8f4eE853135961A936BB8d2e4fFa75f9D',
    },
    decimals: 18,
  },
  vtg: {
    symbol: 'VTG',
    address: {
      56: '0x8de5aA37a7C40A53062EAD382b8EEAD3B08a7A46',
    },
    decimals: 18,
  },
  tlos: {
    symbol: 'TLOS',
    address: {
      56: '0xb6C53431608E626AC81a9776ac3e999c5556717c',
    },
    decimals: 18,
  },
  bones: {
    symbol: 'BONES',
    address: {
      56: '0x08426874d46f90e5E527604fA5E3e30486770Eb3',
    },
    decimals: 18,
  },
  genv3: {
    symbol: 'GENv3',
    address: {
      56: '0x98a61CA1504b92Ae768eF20b85aa97030b7a1Edf',
    },
    decimals: 18,
  },

  // LP Tokens
  bananaBnb: {
    symbol: 'BANANA-BNB',
    address: {
      56: '0xf65c1c0478efde3c19b49ecbe7acc57bb6b1d713',
      97: '0x90Fc86A7570063a9eA971ec74f01F89569Ad6237',
    },
    decimals: 18,
    lpToken: true,
  },
  bnbBusd: {
    symbol: 'BUSD-BNB',
    address: {
      56: '0x51e6D27FA57373d8d4C256231241053a70Cb1d93',
    },
    decimals: 18,
    lpToken: true,
  },
  bnbEth: {
    symbol: 'ETH-BNB',
    address: {
      56: '0xA0C3Ef24414ED9C9B456740128d8E63D016A9e11',
    },
    decimals: 18,
    lpToken: true,
  },
  bnbBtc: {
    symbol: 'BTC-BNB',
    address: {
      56: '0x1E1aFE9D9c5f290d8F6996dDB190bd111908A43D',
    },
    decimals: 18,
    lpToken: true,
  },
  usdcBusd: {
    symbol: 'BUSD-USDC',
    address: {
      56: '0xC087C78AbaC4A0E900a327444193dBF9BA69058E',
    },
    decimals: 18,
    lpToken: true,
  },
  wgictUsdt: {
    symbol: 'WGICT-USDT',
    address: {
      56: '0x4c64c44a6ed5f1fdce5263d9b512c2465ffe8256',
    },
    decimals: 18,
    lpToken: true,
  },
  nft11Busd: {
    symbol: 'NFT11-BUSD',
    address: {
      56: '0xEf0A90fb728195F63C911f52ab4bde331089319f',
    },
    decimals: 18,
    lpToken: true,
  },
  bnbjdi: {
    symbol: 'BNB-JDI',
    address: {
      97: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a',
      56: '0xfb6063f29af6dcd1fc03a8e221c6d91deabbe764',
    },
  },
  rubyBnb: {
    symbol: 'RUBY-BNB',
    address: {
      56: '0xec9f5a5e4690fa14025971f0d2dd91f5600e24c7',
    },
    decimals: 18,
    lpToken: true,
  },
  nftyBnb: {
    symbol: 'NFTY-BNB',
    address: {
      56: '0x884BE30e2c95b9cFed614aD2B5Edf40AF2A144ad',
    },
    decimals: 18,
    lpToken: true,
  },
  drfBusd: {
    symbol: 'DRF-BUSD',
    address: {
      56: '0x5FFc5b392Fcc33357c6a8240bda1C9374A55E6B8',
    },
    decimals: 18,
    lpToken: true,
  },
  cocBnb: {
    symbol: 'COC-BNB',
    address: {
      56: '0x5467dD00ca4d91010Ab2A3aEF8a0162DC218801A',
    },
    decimals: 18,
    lpToken: true,
  },
  lcBnb: {
    symbol: 'LC-BNB',
    address: {
      56: '0xc5a69133432eF17CD15C501CAa5f9cF28C22aA00',
    },
    decimals: 18,
    lpToken: true,
  },
  lgxBusd: {
    symbol: 'LGX-BUSD',
    address: {
      56: '0x004F72D474eE262701205E3637B4367594eFb11D',
    },
    decimals: 18,
    lpToken: true,
  },
  bonesBnb: {
    symbol: 'BONES-BNB',
    address: {
      56: '0xe0900Db57d81DE4E6a13e90eb836Fa91Be50515A',
    },
    decimals: 18,
    lpToken: true,
  },
  genv3Bnb: {
    symbol: 'GENv3-BNB',
    address: {
      56: '0xCfa1d8afFA4da8e6CaBE6fde66DDf4eDA89f0e42',
    },
    decimals: 18,
    lpToken: true,
  },
}

export default tokens
