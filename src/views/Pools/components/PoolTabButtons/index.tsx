import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

export interface PoolTabButtonProps {
  justifyContent?: string
}

const PoolTabButtons: React.FC<PoolTabButtonProps> = ({ justifyContent }) => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Wrapper justifyContent={justifyContent}>
      <ButtonMenu activeIndex={!isExact ? 1 : 0} size="sm" variant="subtle">
        <ButtonMenuItem as={Link} to={`${url}`}>
          {TranslateString(999, 'Active')}
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/history`}>
          {TranslateString(999, 'Inactive')}
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default PoolTabButtons

const Wrapper = styled.div<PoolTabButtonProps>`
  display: flex;
  justify-content: center;
  justify-content: ${({ justifyContent }) => (justifyContent !== undefined ? justifyContent : 'center')};
  margin-bottom: 32px;
`
