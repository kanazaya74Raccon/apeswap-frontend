import { MenuEntry } from '@apeswapfinance/uikit'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { HOME, EXCHANGE, MORE_INFO } from '../constants'

const bscConfig: MenuEntry[] = [
  EXCHANGE,
  {
    label: 'Stake',
    icon: 'FarmIcon',
    items: [
      {
        label: 'Farms',
        href: '/farms',
      },
      {
        label: 'Pools',
        href: '/pools',
      },
      {
        label: 'Vaults',
        href: '/vaults',
      },
      {
        label: 'GNANA',
        href: '/gnana',
      },
    ],
  },
  {
    label: 'Offerings',
    icon: 'FarmIcon',
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
    label: 'Lending',
    icon: 'lending',
    href: 'https://app.ola.finance/apeswap/markets',
  },
  // {
  //   label: 'Burn',
  //   icon: 'GameBurnIcon',
  //   href: '/burn',
  // },
  // {
  //   label: 'Info',
  //   icon: 'InfoIcon',
  //   items: [
  //     {
  //       label: 'Overview',
  //       href: NETWORK_INFO_LINK[CHAIN_ID.BSC],
  //     },
  //     {
  //       label: 'Tokens',
  //       href: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/tokens`,
  //     },
  //     {
  //       label: 'Pairs',
  //       href: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/pairs`,
  //     },
  //     {
  //       label: 'Accounts',
  //       href: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/accounts`,
  //     },
  //   ],
  // },
  MORE_INFO,
]

export default bscConfig
