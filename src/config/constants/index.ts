import ApeZone from './apezone'
import farms from './farms'

export const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID)

const communityFarms = farms.filter((farm) => farm.isCommunity).map((farm) => farm.tokenSymbol)
const farmsConfig = farms

const zoneIfo = ApeZone.ifos
export { zoneIfo }

export { farmsConfig, communityFarms }
export { default as poolsConfig } from './pools'
export { default as vaultsConfig } from './vaults'
export { default as ifosConfig } from './ifo'
export { default as dualFarmsConfig } from './dualFarms'
