import { MenuEntry } from '@apeswapfinance/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { HOME, EXCHANGE, MORE_INFO } from '../constants'

const bscConfig: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  HOME(t),
  EXCHANGE(t),
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    items: [
      {
        label: t('BANANA'),
        href: '/farms',
      },
      {
        label: t('Jungle'),
        href: '/jungle-farms',
      },
    ],
  },
  {
    label: t('Pools'),
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: t('Vaults'),
    icon: 'Vaults',
    href: '/vaults',
  },
  {
    label: t('IAO'),
    icon: 'IfoIcon',
    items: [
      {
        label: t('Official'),
        href: '/iao',
      },
      {
        label: t('Self-Serve'),
        href: '/ss-iao',
      },
    ],
  },
  {
    label: t('NFA'),
    icon: 'apeNFTIcon',
    items: [
      {
        label: t('Collection'),
        href: '/nft',
      },
      {
        label: t('Auction'),
        href: '/auction',
      },
      {
        label: t('Staking'),
        href: '/staking',
      },
    ],
  },
  {
    label: t('GNANA'),
    icon: 'ApeZone',
    href: '/gnana',
  },
  {
    label: t('Lending'),
    icon: 'LendingIcon',
    href: 'https://lending.apeswap.finance/markets',
  },
  {
    label: t('Info'),
    icon: 'InfoIcon',
    items: [
      {
        label: t('Overview'),
        href: NETWORK_INFO_LINK[CHAIN_ID.BSC],
      },
      {
        label: t('Tokens'),
        href: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/tokens`,
      },
      {
        label: t('Pairs'),
        href: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/pairs`,
      },
      {
        label: t('Accounts'),
        href: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/accounts`,
      },
    ],
  },
  MORE_INFO(t),
]

export default bscConfig
