import { MenuEntry } from '@apeswapfinance/uikit'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { HOME, EXCHANGE, MORE_INFO } from '../constants'
import { ContextApi } from '../../../contexts/Localization/types'

const maticConfig: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  HOME(t),
  // {
  //   label: t('Ape Stats'),
  //   icon: 'StatsIcon',
  //   href: '/stats',
  // },
  EXCHANGE(t),
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Vaults'),
    icon: 'Vaults',
    href: '/vaults',
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
  {
    label: t('Info'),
    icon: 'InfoIcon',
    items: [
      {
        label: t('Overview'),
        href: NETWORK_INFO_LINK[CHAIN_ID.MATIC],
      },
      {
        label: t('Tokens'),
        href: `${NETWORK_INFO_LINK[CHAIN_ID.MATIC]}/tokens`,
      },
      {
        label: t('Pairs'),
        href: `${NETWORK_INFO_LINK[CHAIN_ID.MATIC]}/pairs`,
      },
      {
        label: t('Accounts'),
        href: `${NETWORK_INFO_LINK[CHAIN_ID.MATIC]}/accounts`,
      },
    ],
  },
  MORE_INFO(t),
]

export default maticConfig
