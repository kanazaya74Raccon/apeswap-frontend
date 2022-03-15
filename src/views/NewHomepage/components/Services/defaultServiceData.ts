import { DefaultServiceData } from './types'

export const defaultServiceData: DefaultServiceData[] = [
  {
    id: 'poolDetails',
    title: 'Staking Pools',
    description: 'Stake BANANA or GNANA',
    backgroundImg: 'images/pool-background-day.svg',
    link: '/pools',
    stats: [],
  },
  {
    id: 'farmDetails',
    title: 'Yield Farms',
    description: 'Stake LP earn BANANA',
    backgroundImg: 'images/homepage-farms.svg',
    link: '/farms',
    stats: [],
  },
  {
    id: '',
    title: 'Lending',
    description: 'Get paid to burrow, or Earn while you HODL',
    backgroundImg: 'images/homepage-lending.svg',
    link: 'https://lending.apeswap.finance/markets',
    stats: [],
  },
  {
    id: '',
    title: 'Coming Soon',
    description: '',
    backgroundImg: 'images/homepage-coming-soon.svg',
    link: '',
    stats: [],
  },
]
