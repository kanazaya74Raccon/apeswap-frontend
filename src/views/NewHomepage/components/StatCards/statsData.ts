import { Tvl, MarketCap, Partners, Trade } from 'components/Icons'
import { StatType } from './types'

export const statsData: StatType[] = [
  {
    logo: Tvl,
    title: 'Total Value Locked',
    value: 300000000,
    id: 'tvl',
  },
  {
    logo: Trade,
    title: 'Total Trade Volume',
    value: 100300000000,
    id: 'totalVolume',
  },
  {
    logo: MarketCap,
    title: 'Market Cap',
    value: 100000000,
    id: 'marketCap',
  },
  {
    logo: Partners,
    title: 'Partners',
    value: 130,
    id: 'partnerCount',
  },
]
