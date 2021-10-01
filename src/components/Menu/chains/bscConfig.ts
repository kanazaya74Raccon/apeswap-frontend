import { MenuEntry } from '@apeswapfinance/uikit'
import { BASE_EXCHANGE_URL } from 'config'
import { HOME, EXCHANGE, INFO, MORE_INFO } from '../constants'

const bscConfig: MenuEntry[] = [
  HOME,
  {
    label: 'Ape Stats',
    icon: 'StatsIcon',
    href: '/stats',
  },
  EXCHANGE,
  {
    label: 'Vaults',
    icon: 'Vaults',
    href: `${BASE_EXCHANGE_URL}/vaults`,
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'IAO',
    icon: 'IfoIcon',
    href: '/iao',
  },
  {
    label: 'NFA',
    icon: 'apeNFTIcon',
    items: [
      {
        label: 'List',
        href: '/nft',
      },
      {
        label: 'Auction',
        href: '/auction',
      },
    ],
  },
  {
    label: 'GNANA',
    icon: 'ApeZone',
    href: '/gnana',
  },
  INFO,
  MORE_INFO,
]

export default bscConfig