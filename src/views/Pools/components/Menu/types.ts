import React from 'react'
import { Bills, Pool } from 'state/types'

export interface ListViewProps {
  onHandleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSetSortOption: (value: string) => void
  onSetTokenOption: (value: string) => void
  onSetStake: (value: boolean) => void
  stakedOnly: boolean
  activeOption?: string
  activeTokenOption?: string
  query: string
  harvestAll?: React.ReactNode
  pools?: Pool[]
}
