import React from 'react'
import styled from 'styled-components'
import { ListViewIcon, CardViewIcon, Flex } from '@apeswapfinance/uikit'
import { ViewMode } from '../types'

interface ToggleViewProps {
  viewMode: ViewMode
  onToggle: (mode: ViewMode) => void
}

const StyledFlex = styled(Flex)`
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 3px;
  cursor: pointer;

  @media screen and (min-width: 450px) {
    margin-right: 20px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 30px;
    margin-right: 30px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 20px;
  }

  @media screen and (min-width: 900px) {
    margin-right: 30px;
  }
`
const StyledIconButton = styled.div`
  margin-left: 2px;
  margin-right: 2px;
`

const StyledListViewIcon = styled(ListViewIcon)`
  width: 30px;
  margin-right: 5px;
  height: '100%';

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 10px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    margin-right: 15px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-right: 26px;
  }
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
