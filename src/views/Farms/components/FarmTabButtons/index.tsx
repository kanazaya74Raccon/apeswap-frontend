import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

const FarmTabButtons = () => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ButtonMenu activeIndex={!isExact ? 1 : 0} size="sm" variant="yellow">
        <ButtonMenuItem as={Link} to={`${url}`} fontFamily="poppins" fontSize="12px">
          {TranslateString(999, 'Active')}
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/history`} fontFamily="poppins" fontSize="12px">
          {TranslateString(999, 'Inactive')}
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  margin-left: 15px;
  margin-right: 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 84px;
    margin-right: 74px;
  }
`
