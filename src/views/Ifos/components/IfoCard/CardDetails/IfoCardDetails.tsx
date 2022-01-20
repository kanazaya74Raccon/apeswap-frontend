import React from 'react'
import { Text } from '@apeswapfinance/uikit'

import { Item, Display, StyledIfoCardDetails } from './styles'

export interface Props {
  stats: Array<{
    label: string
    value: string
  }>
}

const IfoCardDetails: React.FC<Props> = ({ stats }) => {
  return (
    <StyledIfoCardDetails>
      {stats.map((stat) => (
        <Item key={stat.label}>
          <Display>{stat.label}</Display>
          <Text fontSize="14px" fontWeight={700}>
            {stat.value}
          </Text>
        </Item>
      ))}
    </StyledIfoCardDetails>
  )
}

export default IfoCardDetails
