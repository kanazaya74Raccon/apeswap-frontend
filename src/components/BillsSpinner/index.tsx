import React from 'react'
import { Spinner } from '@apeswapfinance/uikit'
import useWindowSize from 'hooks/useDimensions'

const BillsSpinner: React.FC = () => {
  const { width } = useWindowSize()
  const size = width > 1180 ? 300 : 100
  return <Spinner size={size} />
}

export default BillsSpinner
