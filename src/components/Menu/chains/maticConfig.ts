import { MenuEntry } from '@apeswapfinance/uikit'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { EXCHANGE } from '../constants'
import { ContextApi } from '../../../contexts/Localization/types'

const maticConfig: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  EXCHANGE(t),
  {
    label: t('Farms'),
    href: '/farms',
  },
  {
    label: t('Vaults'),
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
        label: 'Governance',
        href: 'https://vote.apeswap.finance',
      },
    ],
  },
  //   {
  //     label: t('Pools'),
  //     icon: 'PoolIcon',
  //     href: '/pools',
  //   },
  //   {
  //     label: t('IAO'),
  //     icon: 'IfoIcon',
  //     href: '/iao',
  //   },
  //   {
  //     label: t('GNANA'),
  //     icon: 'ApeZone',
  //     href: '/gnana',
  //   },
]

export default maticConfig
