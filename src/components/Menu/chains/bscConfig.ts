import { MenuEntry } from '@ape.swap/uikit'
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
        isNew: false,
      },
      {
        label: t('Staking Pools'),
        href: '/pools',
        isNew: false,
      },
      {
        label: t('Jungle Farms'),
        href: '/jungle-farms',
        isNew: true,
      },
      {
        label: t('Vaults'),
        href: '/vaults',
        isNew: false,
      },
      {
        label: t('GNANA'),
        href: '/gnana',
        isNew: false,
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
        isNew: false,
      },
      {
        label: t('Official IAO'),
        href: '/iao',
        isNew: false,
      },
      {
        label: t('Self-Serve IAO'),
        href: '/ss-iao',
        isNew: false,
      },
    ],
  },
  {
    label: t('Collect'),
    lightIcon: 'NfaLightImage',
    darkIcon: 'NfaDarkImage',
    items: [
      {
        label: t('NFA Collection'),
        href: '/nft',
        isNew: false,
      },
      {
        label: t('NFA Auction'),
        href: '/auction',
        isNew: false,
      },
      {
        label: t('NFA Staking'),
        href: '/staking',
        isNew: false,
      },
      {
        label: t('NFA Liquidity'),
        href: 'https://liquidcollectibles.io/collection/0x6afc012783e3a6ef8c5f05f8eee2edef6a052ec4',
        isNew: false,
      },
      {
        label: t('NFB Collection'),
        href: 'https://nftkey.app/collections/nfbs/',
        isNew: false,
      },
      {
        label: t('NFB Liquidity'),
        href: 'https://liquidcollectibles.io/collection/0x9f707a412302a3ad64028a9f73f354725c992081',
        isNew: false,
      },
    ],
  },
  {
    label: t('Lend'),
    href: 'https://lending.apeswap.finance/',
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
        href: NETWORK_INFO_LINK[CHAIN_ID.BSC],
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
        isNew: false,
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
