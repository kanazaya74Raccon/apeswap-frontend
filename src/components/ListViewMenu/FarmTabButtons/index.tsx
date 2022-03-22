import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Toggle } from '@apeswapfinance/uikit'

const Wrapper = styled.div`
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const FarmTabButtons: React.FC = () => {
  const { url, isExact } = useRouteMatch()
  const history = useHistory()

  const handleClick = () => {
    if (isExact) {
      history.push(`${url}/history`)
    } else {
      history.push(url)
    }
  }

  return (
    <Wrapper>
      <Toggle labels={['LIVE', 'DONE']} onClick={handleClick} checked={!isExact} />
    </Wrapper>
  )
}

export default React.memo(FarmTabButtons)
