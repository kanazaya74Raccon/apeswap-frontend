import React from 'react'
import { Bills } from 'state/types'

export interface ListViewProps {
  onHandleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSetSortOption: (value: string) => void
  activeOption?: string
  query: string
  harvestAll?: React.ReactNode
  bills?: Bills[]
}
