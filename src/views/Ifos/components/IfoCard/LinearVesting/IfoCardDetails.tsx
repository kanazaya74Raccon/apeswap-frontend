import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

export interface Props {
  stats: Array<{
    label: string
    value: string
  }>
}

const StyledIfoCardDetails = styled.div`
  margin: 32px 0;
  border-radius: 5px;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  padding: 4px 10px;
  background: #7c7c7d0f;

  &:first-child {
    border-radius: 5px 5px 0px 0px;
  }

  &:last-child {
    border-radius: 0px 0px 5px 5px;
  }

  &:nth-child(even) {
    background: #7c7c7d08;
  }
`

const Display = styled(Text)`
  flex: 1;
  font-size: 14px;
  font-family: 'Titan One';
`

const DisplayText = styled(Text)`
  font-family: 'Titan One';
`

const IfoCardDetails: React.FC<Props> = ({ stats }) => {
  return (
    <StyledIfoCardDetails>
      {stats.map((stat) => (
        <Item>
          <Display>{stat.label}</Display>
          <DisplayText fontSize="14px">{stat.value}</DisplayText>
        </Item>
      ))}
    </StyledIfoCardDetails>
  )
}

export default IfoCardDetails
