import React from 'react'
import styled from 'styled-components'
import { ListViewIcon, CardViewIcon, Flex } from '@apeswapfinance/uikit'
import { ViewMode } from '../types'

interface ToggleViewProps {
  viewMode: ViewMode
  onToggle: (mode: ViewMode) => void
}

const StyledFlex = styled(Flex)`
  margin-left: -8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
  }
`
const StyledIconButton = styled.div`
  margin-left: 2px;
  margin-right: 2px;
`

const StyledListViewIcon = styled(ListViewIcon)`
 width: 30px;
 margin-right: 26px;
 height: '100%';
`

const StyledCardViewIcon = styled(CardViewIcon)`
 width: 30px;
 height: '100%';
`

const ToggleView: React.FunctionComponent<ToggleViewProps> = ({ viewMode, onToggle }) => {
  const handleToggle = (mode: ViewMode) => {
    if (viewMode !== mode) {
      onToggle(mode)
    }
  }

  return (
    <StyledFlex>
      <StyledIconButton onClick={() => handleToggle(ViewMode.TABLE)}>
        <StyledListViewIcon color={viewMode === ViewMode.TABLE ? 'yellow' : 'textDisabled'} />
      </StyledIconButton>
      <StyledIconButton onClick={() => handleToggle(ViewMode.CARD)}>
        <StyledCardViewIcon color={viewMode === ViewMode.CARD ? 'yellow' : 'textDisabled'} />
      </StyledIconButton>
    </StyledFlex>
  )
}

export default ToggleView
