import { MenuEntry } from '@apeswapfinance/uikit'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { HOME, EXCHANGE, MORE_INFO } from '../constants'

const bscConfig: MenuEntry[] = [
  HOME,
  {
    label: 'Ape Stats',
    icon: 'StatsIcon',
    href: '/stats',
  },
  EXCHANGE,
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
    label: 'Vaults',
    icon: 'Vaults',
    href: '/vaults',
  },
  {
    label: 'IAO',
    icon: 'IfoIcon',
    items: [
      {
        label: 'Official',
        href: '/iao',
      },
      {
        label: 'Self-Serve',
        href: '/ss-iao',
      },
    ],
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
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: NETWORK_INFO_LINK[CHAIN_ID.BSC],
      },
      {
        label: 'Tokens',
        href: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/tokens`,
      },
      {
        label: 'Pairs',
        href: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/pairs`,
      },
      {
        label: 'Accounts',
        href: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/accounts`,
      },
    ],
  },
  MORE_INFO,
]

export default bscConfig
