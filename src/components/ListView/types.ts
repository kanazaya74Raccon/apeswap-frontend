export interface ListViewProps {
  tag?: string
  title: React.ReactNode
  infoContent?: React.ReactNode
  infoContentPosition?: string
  open?: boolean
  cardContent: React.ReactNode
  expandedContent?: React.ReactNode
  expandedContentSize?: number
  billArrow?: boolean
  stakeLp?: boolean
}

export interface ListCardProps extends ListViewProps {
  serviceTokenDisplay: React.ReactNode
}

export interface ExtendedListViewProps extends ListViewProps {
  tokens: { token1: string; token2: string; token3?: string; token4?: string }
  viewType: string
  id: string | number
}
