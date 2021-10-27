import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BANANA_PER_BLOCK = new BigNumber(10)
export const BLOCKS_PER_YEAR = new BigNumber(10512000)
export const BLOCKS_PER_DAY = new BigNumber(28800)
export const SECONDS_PER_YEAR = new BigNumber(31536000)
export const BANANA_PER_YEAR = BANANA_PER_BLOCK.times(BLOCKS_PER_YEAR)
export const BSC_BLOCK_TIME = 3
export const BANANA_POOL_PID = 1
export const BASE_EXCHANGE_URL = 'https://app.apeswap.finance'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 2
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const VAULT_COMPOUNDS_PER_DAY = 24

export const MATIC_BLOCK_TIME = 2.4
export const MATIC_BLOCKS_PER_YEAR = SECONDS_PER_YEAR.div(MATIC_BLOCK_TIME)
