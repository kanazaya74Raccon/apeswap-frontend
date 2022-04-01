import React from 'react'

export interface ListViewProps {
  onHandleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSetSortOption: (value: string) => void
  activeOption?: string
  query: string
  harvestAll?: React.ReactNode
}
