import React from 'react'
import styled from 'styled-components'
import { ListViewIcon, CardViewIcon, IconButton } from '@apeswapfinance/uikit'
import { ViewMode } from '../types'

interface ToggleViewProps {
  viewMode: ViewMode
  onToggle: (mode: ViewMode) => void
}

const Container = styled.div`
  margin-left: -8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
  }
`
const StyledIconButton = styled(IconButton)`
 margin-left: 2px;
 margin-right: 2px;
`

const ToggleView: React.FunctionComponent<ToggleViewProps> = ({ viewMode, onToggle }) => {
  const handleToggle = (mode: ViewMode) => {
    if (viewMode !== mode) {
      onToggle(mode)
    }
  }

  return (
    <Container>
      <StyledIconButton variant="text" onClick={() => handleToggle(ViewMode.CARD)}>
        <CardViewIcon color={viewMode === ViewMode.CARD ? 'primary' : 'textDisabled'} />
      </StyledIconButton>
      <StyledIconButton variant="text" onClick={() => handleToggle(ViewMode.TABLE)}>
        <ListViewIcon color={viewMode === ViewMode.TABLE ? 'primary' : 'textDisabled'} />
      </StyledIconButton>
    </Container>
  )
}

export default ToggleView
