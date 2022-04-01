import React from 'react'
import BigNumber from 'bignumber.js'
import Buy from './Buy'
import { ActionProps } from './types'
import Approve from './Approve'

const Actions: React.FC<ActionProps> = (props) => {
  const { allowance } = props
  const showApprove = !new BigNumber(allowance).gt(0)
  return showApprove ? <Approve {...props} /> : <Buy {...props} />
}

export default React.memo(Actions)
