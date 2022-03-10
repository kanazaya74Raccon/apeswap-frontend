import { MenuEntry } from '@apeswapfinance/uikit'
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
  MORE_INFO,
]

export default maticConfig
