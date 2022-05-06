// Network chain ids

export const CHAIN_ID = {
  BSC: 56,
  BSC_TESTNET: 97,
  MATIC: 137,
  MATIC_TESTNET: 80001,
  ETH: 1,
}

// Network labels

export const NETWORK_LABEL = {
  [CHAIN_ID.BSC]: 'BSC',
  [CHAIN_ID.BSC_TESTNET]: 'BSC Testnet',
  [CHAIN_ID.MATIC]: 'Polygon',
  [CHAIN_ID.MATIC_TESTNET]: 'Polygon Testnet',
  [CHAIN_ID.ETH]: 'Ethereum',
}

// Network icons

export const NETWORK_ICON = {
  [CHAIN_ID.BSC]: '',
  [CHAIN_ID.BSC_TESTNET]: '',
  [CHAIN_ID.MATIC]: '',
  [CHAIN_ID.MATIC_TESTNET]: '',
  [CHAIN_ID.ETH]: '',
}

export const NETWORK_INFO_LINK = {
  [CHAIN_ID.BSC]: 'https://info.apeswap.finance',
  [CHAIN_ID.BSC_TESTNET]: 'https://info.apeswap.finance',
  [CHAIN_ID.MATIC]: 'https://polygon.info.apeswap.finance/',
  [CHAIN_ID.MATIC_TESTNET]: 'https://polygon.info.apeswap.finance/',
  [CHAIN_ID.ETH]: 'https://info.apeswap.finance',
}

// Network RPC nodes
export const NETWORK_RPC = {
  [CHAIN_ID.BSC]: [
    'https://bsc-dataseed1.ninicoin.io',
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io',
  ],
  [CHAIN_ID.BSC_TESTNET]: ['https://data-seed-prebsc-2-s3.binance.org:8545/'],
  [CHAIN_ID.MATIC]: ['https://polygon-rpc.com/'],
  [CHAIN_ID.MATIC_TESTNET]: ['https://matic-mumbai.chainstacklabs.com'],
  [CHAIN_ID.ETH]: ['https://mainnet.infura.io/v3/'],
}

// Network block explorers

export const BLOCK_EXPLORER = {
  [CHAIN_ID.BSC]: 'https://bscscan.com',
  [CHAIN_ID.BSC_TESTNET]: 'https://testnet.bscscan.com/',
  [CHAIN_ID.MATIC]: 'https://polygonscan.com',
  [CHAIN_ID.MATIC_TESTNET]: 'https://mumbai.polygonscan.com/',
  [CHAIN_ID.ETH]: 'https://etherscan.io/',
}

export const CHAIN_PARAMS = {
  [CHAIN_ID.BSC]: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'bnb',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.BSC],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.BSC]],
  },
  [CHAIN_ID.BSC_TESTNET]: {
    chainId: '0x61',
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'bnb',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.BSC_TESTNET],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.BSC_TESTNET]],
  },
  [CHAIN_ID.MATIC]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.MATIC],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.MATIC]],
  },
  [CHAIN_ID.MATIC_TESTNET]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.MATIC_TESTNET],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.MATIC_TESTNET]],
  },
  [CHAIN_ID.ETH]: {
    chainId: '0x1',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.ETH],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.ETH]],
  },
}

// Wallchain Configs
export const WALLCHAIN_PARAMS = {
  [CHAIN_ID.BSC]: {
    apiUrl: 'https://bsc.wallchain.xyz/upgrade_txn/',
    apiKey: '85c578a5-ecb0-445c-8a95-4c0eba2f33b6',
  },
  [CHAIN_ID.MATIC]: {
    apiUrl: 'https://matic.wallchain.xyz/upgrade_txn/',
    apiKey: '5cf2b177-5fa5-477a-8cea-f2b54859af2a',
  },
}
