import React from 'react'

export interface ListViewProps {
  onHandleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSetSortOption: (value: string) => void
  onSetStake: (flag: boolean) => void
  stakedOnly: boolean
  query: string
  showMonkeyImage?: boolean
  harvestAll?: React.ReactNode
  activeOption?: string
  isJungle?: boolean
}
