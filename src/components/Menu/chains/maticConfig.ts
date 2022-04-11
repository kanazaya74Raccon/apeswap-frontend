import { MenuEntry } from '@apeswapfinance/uikit'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { EXCHANGE } from '../constants'

const maticConfig: MenuEntry[] = [
  EXCHANGE,
  {
    label: 'Farms',
    href: '/farms',
    isNew: false,
    isLive: false,
  },
  {
    label: 'Vaults',
    href: '/vaults',
    isNew: false,
    isLive: false,
  },
  {
    label: 'More',
    lightIcon: 'MoreLightImage',
    darkIcon: 'MoreDarkImage',
    items: [
      {
        label: 'Docs',
        href: 'https://apeswap.gitbook.io/apeswap-finance/',
        isNew: false,
        isLive: false,
      },
      {
        label: 'Charts',
        href: NETWORK_INFO_LINK[CHAIN_ID.MATIC],
        isNew: false,
        isLive: false,
      },
      {
        label: 'Governance',
        href: 'https://vote.apeswap.finance',
        isNew: false,
        isLive: false,
      },
    ],
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
]

export default maticConfig
