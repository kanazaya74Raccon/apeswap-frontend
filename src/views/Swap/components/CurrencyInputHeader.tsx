import React from 'react'
import styled from 'styled-components'
import { Flex, ButtonSquare, ButtonMenu, ButtonMenuItem, useMatchBreakpoints } from '@apeswapfinance/uikit'
import GlobalSettings from 'components/Menu/GlobalSettings'
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
  background: ${({ theme }) => theme.colors.navbar};
  margin-bottom: 20px;
`

const StyledFlex = styled(Flex)``

const CurrencyInputHeader: React.FC<Props> = () => {
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs
  const path = useLocation()
  const swapActive = path.pathname.includes('swap')
  return (
    <CurrencyInputContainer>
      <ButtonMenu activeIndex={swapActive ? 0 : 1} size="mds" variant="yellow">
        <ButtonMenuItem as={Link} to="/swap" fontSize="14px" isMobile={isMobile}>
          SWAP
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to="/pool" fontSize="14px" isMobile={isMobile}>
          LIQUIDITY
        </ButtonMenuItem>
      </ButtonMenu>
      <StyledFlex>
        <a href="https://app.multichain.org/" target="_blank" rel="noopener noreferrer">
          <ButtonSquare
            style={{
              fontSize: '15px',
              fontWeight: 700,
              marginRight: isMobile ? '15px ' : '25px',
              marginLeft: '15px',
              padding: 10,
            }}
          >
            BRIDGE
          </ButtonSquare>
        </a>
        <GlobalSettings />
      </StyledFlex>
    </CurrencyInputContainer>
  )
}

export default CurrencyInputHeader
