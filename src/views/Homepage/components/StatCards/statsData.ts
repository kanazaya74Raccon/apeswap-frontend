import { Tvl, MarketCap, Partners, Trade } from 'components/Icons'
import { StatType } from './types'
import { ContextApi } from '../../../../contexts/Localization/types'

export const statsData: (t: ContextApi['t']) => StatType[] = (t) => [
  {
    logo: Tvl,
    title: t('Total Value Locked'),
    value: null,
    id: 'tvl',
  },
  {
    logo: Trade,
    title: t('Total Trade Volume'),
    value: null,
    id: 'totalVolume',
  },
  {
    logo: MarketCap,
    title: t('Market Cap'),
    value: null,
    id: 'marketCap',
  },
  {
    logo: Partners,
    title: t('Partners'),
    value: null,
    id: 'partnerCount',
  },
]
