import React from 'react'
import styled from 'styled-components'
import { ArrowDropDownIcon, ArrowDropUpIcon } from '@apeswapfinance/uikit'

export interface ExpandableSectionButtonProps {
  onClick?: () => void
  expanded?: boolean
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 5px;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 10px;
  }

  svg {
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const ExpandableSectionButton: React.FC<ExpandableSectionButtonProps> = ({ expanded }) => {
  return (
    <Wrapper aria-label="Hide or show expandable content" role="button">
      {expanded ? <ArrowDropUpIcon width="10px" /> : <ArrowDropDownIcon width="10px" />}
    </Wrapper>
  )
}

ExpandableSectionButton.defaultProps = {
  expanded: false,
}

export default ExpandableSectionButton
