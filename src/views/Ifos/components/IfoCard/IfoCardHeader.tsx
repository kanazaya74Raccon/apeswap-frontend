import React from 'react'
import styled from 'styled-components'
import { Text, Flex } from '@apeswapfinance/uikit'

interface IfoCardHeaderProps {
  ifoId: string
  name: string
  subTitle: string
}

const StyledIfoCardHeader = styled(Flex)`
  & > div {
    flex: 1;
  }
`

const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  text-align: left;
  padding: 36px;
  font-family: 'Titan One';
`

const IfoCardHeader: React.FC<IfoCardHeaderProps> = ({ ifoId, subTitle }) => {
  return (
    <StyledIfoCardHeader mb="24px" alignItems="center">
      <img src={`/images/ifos/${ifoId}.svg`} alt={ifoId} width="64px" height="64px" />
      <div>
        {/* <Name>{name}</Name> */}
        <Description>{subTitle}</Description>
      </div>
    </StyledIfoCardHeader>
  )
}

export default IfoCardHeader
