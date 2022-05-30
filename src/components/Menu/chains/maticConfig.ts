import { MenuEntry } from '@ape.swap/uikit'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { EXCHANGE } from '../constants'
import { ContextApi } from '../../../contexts/Localization/types'

const maticConfig: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  EXCHANGE(t),
  {
    label: t('Farms'),
    href: '/farms',
    isNew: false,
  },
  {
    label: t('More'),
    lightIcon: 'MoreLightImage',
    darkIcon: 'MoreDarkImage',
    items: [
      {
        label: t('Documentation'),
        href: 'https://apeswap.gitbook.io/apeswap-finance/',
        isNew: false,
      },
      {
        label: t('Charts'),
        href: NETWORK_INFO_LINK[CHAIN_ID.MATIC],
        isNew: false,
      },
      {
        label: t('Governance'),
        href: 'https://vote.apeswap.finance',
        isNew: false,
      },
      {
        label: t('Education'),
        href: 'https://www.apelabs.education/',
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
