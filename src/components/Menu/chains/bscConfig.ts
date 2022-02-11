import { MenuEntry } from '@apeswapfinance/uikit'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { HOME, EXCHANGE, MORE_INFO } from '../constants'

const bscConfig: MenuEntry[] = [
  HOME,
  EXCHANGE,
  {
    label: 'Farms',
    icon: 'FarmIcon',
    items: [
      {
        label: 'BANANA',
        href: '/farms',
      },
      {
        label: 'Jungle',
        href: '/jungle-farms',
      },
    ],
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
        label: 'Collection',
        href: '/nft',
      },
      {
        label: 'Auction',
        href: '/auction',
      },
      {
        label: 'Staking',
        href: '/staking',
      },
    ],
  },
  {
    label: 'GNANA',
    icon: 'ApeZone',
    href: '/gnana',
  },
  {
    label: 'Lending',
    icon: 'LendingIcon',
    href: 'https://lending.apeswap.finance/markets',
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
