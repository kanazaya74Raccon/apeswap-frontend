import { ContextApi } from '../../../contexts/Localization/types'
import { Ifo } from '../../../config/constants/types'

export type TableProps = {
  data?: TableDataTypes[]
  selectedFilters?: string
  sortBy?: string
  sortDir?: string
  onSort?: (value: string) => void
}

export type ColumnsDefTypes = {
  id: number
  label: string
  name: string
  translationId: number
  sortable: boolean
}

export type ScrollBarProps = {
  ref: string
  width: number
}

export type TableDataTypes = {
  FARM: string
  APY: string
  EARNED: string
  STAKED: string
  DETAILS: string
  LINKS: string
}

export const MobileColumnSchema: (t: ContextApi['t']) => ColumnsDefTypes[] = (t) => [
  {
    id: 1,
    name: 'farm',
    translationId: 999,
    sortable: true,
    label: t(''),
  },
  {
    id: 2,
    name: 'earned',
    translationId: 1072,
    sortable: true,
    label: t('Earned'),
  },
  {
    id: 3,
    name: 'apr',
    translationId: 736,
    sortable: true,
    label: t('APR'),
  },
  {
    id: 6,
    name: 'details',
    translationId: 999,
    sortable: true,
    label: t(''),
  },
]

export const DesktopColumnSchema: (t: ContextApi['t']) => ColumnsDefTypes[] = (t) => [
  {
    id: 1,
    name: 'farm',
    translationId: 999,
    sortable: true,
    label: t(''),
  },
  {
    id: 2,
    name: 'apr',
    translationId: 736,
    sortable: true,
    label: t('APR'),
  },
  {
    id: 3,
    name: 'liquidity',
    translationId: 999,
    sortable: true,
    label: t('Liquidity'),
  },
  {
    id: 4,
    name: 'earned',
    translationId: 1072,
    sortable: true,
    label: t('Earned'),
  },
  {
    id: 5,
    name: 'details',
    translationId: 999,
    sortable: true,
    label: t(''),
  },
]

export enum ViewMode {
  'TABLE' = 'TABLE',
  'CARD' = 'CARD',
}
