import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Toggle } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'

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

const MenuTabButton: React.FC = () => {
  const { url, isExact } = useRouteMatch()
  const history = useHistory()
  const { t } = useTranslation()

  const handleClick = () => {
    if (isExact) {
      history.push(`${url}/history`)
    } else {
      history.push(url)
    }
  }

  return (
    <Wrapper>
      <Toggle size="md" labels={[t('CURRENT'), t('PAST')]} onClick={handleClick} checked={!isExact} />
    </Wrapper>
  )
}

export default React.memo(MenuTabButton)
