import React from 'react'
import styled from 'styled-components'
import { ArrowDropDownIcon } from '@apeswapfinance/uikit'

interface DetailsProps {
  actionPanelToggled: boolean
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-left: 41px;
  color: ${({ theme }) => theme.colors.primary};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`

const ArrowIcon = styled(ArrowDropDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  width: 12px;
  height: 14px;
`

const Details: React.FC<DetailsProps> = ({ actionPanelToggled }) => {
  return (
    <Container>
      <ArrowIcon color="primary" toggled={actionPanelToggled} />
    </Container>
  )
}

export default Details
