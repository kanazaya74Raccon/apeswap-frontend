import farms from './farms'

const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID)

const communityFarms = farms.filter((farm) => farm.isCommunity).map((farm) => farm.tokenSymbol)
const farmsConfig = CHAIN_ID !== 56 ? farms.filter((farm) => farm.pid <= 5) : farms

export { farmsConfig, communityFarms }
export { default as poolsConfig } from './pools'
export { default as ifosConfig } from './ifo'
