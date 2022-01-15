import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Flex,
  Heading,
  IconButton,
  Text,
  useModal,
  ButtonSquare,
  CogIcon,
  ButtonMenu,
  ButtonMenuItem,
  LinkExternal,
} from '@apeswapfinance/uikit'
import GlobalSettings from 'components/Menu/GlobalSettings'
import { useExpertModeManager } from 'state/user/hooks'
import { Link, useLocation } from 'react-router-dom'

interface Props {
  title?: string
  subtitle?: string
  noConfig?: boolean
  isChartDisplayed?: boolean
}

const CurrencyInputContainer = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px 0px 20px;
  width: 100%;
  `

const CurrencyInputHeader: React.FC<Props> = () => {
  const [expertMode] = useExpertModeManager()
  const path = useLocation()
  const swapActive = path.pathname.includes('swap')
  return (
    <CurrencyInputContainer>
      <ButtonMenu activeIndex={swapActive ? 0 : 1} size="sm" variant="yellow">
        <ButtonMenuItem as={Link} to="/swap" fontSize="14px">
          SWAP
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to="/pool" fontSize="14px">
          LIQUIDITY
        </ButtonMenuItem>
      </ButtonMenu>
      <Flex>
        <a href="https://app.multichain.org/" target="_blank" rel="noopener noreferrer">
          <ButtonSquare
            style={{ fontSize: '15px', fontWeight: 700, marginRight: '25px', marginLeft: '15px', padding: 10 }}
          >
            BRIDGE
          </ButtonSquare>
        </a>
        <GlobalSettings />
      </Flex>
    </CurrencyInputContainer>
  )
}

export default CurrencyInputHeader
