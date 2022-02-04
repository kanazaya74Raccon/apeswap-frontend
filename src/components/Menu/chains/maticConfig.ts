import { MenuEntry } from '@apeswapfinance/uikit'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { HOME, EXCHANGE, MORE_INFO } from '../constants'

const maticConfig: MenuEntry[] = [
  EXCHANGE,
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Vaults',
    icon: 'Vaults',
    href: '/vaults',
  },
  //   {
  //     label: 'Pools',
  //     icon: 'PoolIcon',
  //     href: '/pools',
  //   },
  //   {
  //     label: 'IAO',
  //     icon: 'IfoIcon',
  //     href: '/iao',
  //   },
  //   {
  //     label: 'GNANA',
  //     icon: 'ApeZone',
  //     href: '/gnana',
  //   },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: NETWORK_INFO_LINK[CHAIN_ID.MATIC],
      },
      {
        label: 'Tokens',
        href: `${NETWORK_INFO_LINK[CHAIN_ID.MATIC]}/tokens`,
      },
      {
        label: 'Pairs',
        href: `${NETWORK_INFO_LINK[CHAIN_ID.MATIC]}/pairs`,
      },
      {
        label: 'Accounts',
        href: `${NETWORK_INFO_LINK[CHAIN_ID.MATIC]}/accounts`,
      },
    ],
  },
  MORE_INFO,
]

export default maticConfig
