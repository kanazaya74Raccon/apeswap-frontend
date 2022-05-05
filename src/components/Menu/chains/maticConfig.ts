import { MenuEntry } from '@apeswapfinance/uikit'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { EXCHANGE } from '../constants'

const maticConfig: MenuEntry[] = [
  EXCHANGE,
  {
    label: 'Farms',
    href: '/farms',
  },
  {
    label: 'More',
    lightIcon: 'MoreLightImage',
    darkIcon: 'MoreDarkImage',
    items: [
      {
        label: 'Docs',
        href: 'https://apeswap.gitbook.io/apeswap-finance/',
      },
      {
        label: 'Charts',
        href: NETWORK_INFO_LINK[CHAIN_ID.MATIC],
      },
      {
        label: 'Governance',
        href: 'https://vote.apeswap.finance',
      },
      {
        label: 'Education',
        href: 'https://www.apelabs.education/',
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
