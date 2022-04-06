import React from 'react'
import styled from 'styled-components'
import { Flex, Button, useMatchBreakpoints, Tabs, Tab } from '@apeswapfinance/uikit'
import GlobalSettings from 'components/Menu/GlobalSettings'
import { useLocation, useHistory } from 'react-router-dom'

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
`

const CurrencyInputHeader: React.FC<Props> = () => {
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const history = useHistory()
  const isMobile = isMd || isSm || isXs
  const path = useLocation()
  const swapActive = path.pathname.includes('swap')
  return (
    <CurrencyInputContainer>
      <Tabs activeTab={swapActive ? 0 : 1} size="md">
        <Tab
          index={0}
          label="SWAP"
          onClick={() => history.push('/swap')}
          size={isMobile ? 'xsm' : 'md'}
          variant="centered"
          activeTab={swapActive ? 0 : 1}
        />
        <Tab
          index={1}
          label="LIQUIDITY"
          onClick={() => history.push('/pool')}
          size={isMobile ? 'xsm' : 'md'}
          variant="centered"
          activeTab={swapActive ? 0 : 1}
        />
      </Tabs>
      <Flex>
        <a href="https://app.multichain.org/" target="_blank" rel="noopener noreferrer">
          <Button
            style={{
              fontSize: '15px',
              fontWeight: 700,
              marginRight: isMobile ? '15px ' : '25px',
              marginLeft: '15px',
              padding: 10,
              height: isMobile ? '36px ' : '40px',
            }}
          >
            BRIDGE
          </Button>
        </a>
        <GlobalSettings />
      </Flex>
    </CurrencyInputContainer>
  )
}

export default CurrencyInputHeader
