import { Tvl, MarketCap, Partners, Trade } from 'components/Icons'
import { StatType } from './types'

export const statsData: StatType[] = [
  {
    logo: Tvl,
    title: 'Total Value Locked',
    value: null,
    id: 'tvl',
  },
  {
    logo: Trade,
    title: 'Total Trade Volume',
    value: null,
    id: 'totalVolume',
  },
  {
    logo: MarketCap,
    title: 'Market Cap',
    value: null,
    id: 'marketCap',
  },
  {
    logo: Partners,
    title: 'Partners',
    value: null,
    id: 'partnerCount',
  },
]
