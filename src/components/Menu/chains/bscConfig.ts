import { MenuEntry } from '@apeswapfinance/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { EXCHANGE } from '../constants'

const bscConfig: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  EXCHANGE(t),
  {
    label: t('Stake'),
    lightIcon: 'StakeLightImage',
    darkIcon: 'StakeDarkImage',
    items: [
      {
        label: t('BANANA Farms'),
        href: '/farms',
      },
      {
        label: t('Pools'),
        href: '/pools',
      },
      {
        label: t('Jungle Farms'),
        href: '/jungle-farms',
      },
      {
        label: t('Vaults'),
        href: '/vaults',
      },
      {
        label: t('GNANA'),
        href: '/gnana',
      },
    ],
  },
  {
    label: t('Raise'),
    lightIcon: 'OfferingsLightImage',
    darkIcon: 'OfferingsDarkImage',
    items: [
      {
        label: t('Treasury Bills'),
        href: '/treasury-bills',
      },
      {
        label: 'Official IAO',
        href: '/iao',
      },
      {
        label: t('Self-Serve IAO'),
        href: '/ss-iao',
      },
    ],
  },
  {
    label: t('NFTs'),
    lightIcon: 'NfaLightImage',
    darkIcon: 'NfaDarkImage',
    items: [
      {
        label: t('NFA Collection'),
        href: '/nft',
      },
      {
        label: t('NFA Auction'),
        href: '/auction',
      },
      {
        label: t('NFA Staking'),
        href: '/staking',
      },
      {
        label: t('NFA Liquidity'),
        href: 'https://liquidcollectibles.io/collection/0x6afc012783e3a6ef8c5f05f8eee2edef6a052ec4',
      },
      {
        label: t('NFB Collection'),
        href: 'https://nftkey.app/collections/nfbs/',
      },
      {
        label: t('NFB Liquidity'),
        href: 'https://liquidcollectibles.io/collection/0x9f707a412302a3ad64028a9f73f354725c992081',
      },
    ],
  },
  {
    label: t('Lending'),
    href: 'https://lending.apeswap.finance/',
  },
  {
    label: t('More'),
    lightIcon: 'MoreLightImage',
    darkIcon: 'MoreDarkImage',
    items: [
      {
        label: t('Docs'),
        href: 'https://apeswap.gitbook.io/apeswap-finance/',
      },
      {
        label: t('Charts'),
        href: NETWORK_INFO_LINK[CHAIN_ID.BSC],
      },
      {
        label: t('Governance'),
        href: 'https://vote.apeswap.finance',
      },
    ],
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
]

export default bscConfig
