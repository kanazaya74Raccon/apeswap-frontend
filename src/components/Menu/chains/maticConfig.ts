import { MenuEntry } from '@apeswapfinance/uikit'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { EXCHANGE, MORE_INFO } from '../constants'

const maticConfig: MenuEntry[] = [
  EXCHANGE,
  {
    label: 'Farms',
    href: '/farms',
  },
  {
    label: 'Vaults',
    href: '/vaults',
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
        label: 'Leverage Trading',
        href: 'https://apemex.exchange/margin',
      },
      {
        label: 'Governance',
        href: 'https://vote.apeswap.finance',
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
