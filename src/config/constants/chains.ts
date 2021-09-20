// Network chain ids

export const CHAIN_ID = {
  BSC: 56,
  BSC_TESTNET: 96,
  MATIC: 137,
  MATIC_TESTNET: 80001,
}

// Network labels

export const NETWORK_LABEL = {
  [CHAIN_ID.BSC]: 'BSC',
  [CHAIN_ID.BSC_TESTNET]: 'BSC Testnet',
  [CHAIN_ID.MATIC]: 'Polygon',
  [CHAIN_ID.MATIC_TESTNET]: 'Polygon Testnet',
}

// Network icons

export const NETWORK_ICON = {
  [CHAIN_ID.BSC]: '',
  [CHAIN_ID.BSC_TESTNET]: '',
  [CHAIN_ID.MATIC]: '',
  [CHAIN_ID.MATIC_TESTNET]: '',
}

// Network RPC nodes

export const NETWORK_RPC = {
  [CHAIN_ID.BSC]: [
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io/',
    'https://bsc-dataseed1.ninicoin.io/',
  ],
  [CHAIN_ID.BSC_TESTNET]: [
    'https://data-seed-prebsc-1-s1.binance.org:8545/',
    'https://data-seed-prebsc-2-s1.binance.org:8545/',
    'https://data-seed-prebsc-1-s2.binance.org:8545/',
  ],
  [CHAIN_ID.MATIC]: [
    'https://matic-mainnet.chainstacklabs.com/',
    'https://rpc-mainnet.matic.quiknode.pro',
    'https://rpc-mainnet.maticvigil.com',
    'https://rpc-mainnet.matic.network',
    'https://matic-mainnet.chainstacklabs.com',
    'https://matic-mainnet-full-rpc.bwarelabs.com',
    'https://matic-mainnet-archive-rpc.bwarelabs.com',
  ],
  [CHAIN_ID.MATIC_TESTNET]: ['https://matic-mumbai.chainstacklabs.com'],
}

// Network block explorers

export const BLOCK_EXPLORER = {
  [CHAIN_ID.BSC]: 'https://bscscan.com',
  [CHAIN_ID.BSC_TESTNET]: 'https://testnet.bscscan.com/',
  [CHAIN_ID.MATIC]: 'https://polygonscan.com',
  [CHAIN_ID.MATIC_TESTNET]: 'https://mumbai.polygonscan.com/',
}
