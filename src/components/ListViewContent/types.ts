export interface ListViewContentProps {
  title: string
  value: string
  value2?: string
  value2Secondary?: boolean
  valueIcon?: React.ReactNode
  value2Icon?: React.ReactNode
  mb?: number
  ml?: number
  width?: number
  height?: number
  lineHeight?: number
  toolTip?: string
  aprCalculator?: React.ReactNode
  justifyContent?: string
  toolTipPlacement?: 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'
  toolTipTransform?: string
  valueColor?: string
}
