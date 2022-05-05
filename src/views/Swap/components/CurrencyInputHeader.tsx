import React from 'react'
import styled from 'styled-components'
import { Flex, Button, useMatchBreakpoints, Tabs, Tab, RunFiatButton } from '@apeswapfinance/uikit'
import GlobalSettings from 'components/Menu/GlobalSettings'
import { CHAIN_ID } from 'config/constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useLocation, useHistory } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'

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

  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: column-reverse !important;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: column-reverse !important;
  }
`

export const StyledDiv = styled.div`
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: 16px;
  }
`

const CurrencyInputHeader: React.FC<Props> = () => {
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const { chainId } = useActiveWeb3React()
  const history = useHistory()
  const isMobile = isMd || isSm || isXs
  const path = useLocation()
  const { t } = useTranslation()
  const getActiveTab = () => {
    const { pathname } = path
    if (pathname.includes('swap')) return 0
    if (pathname.includes('orders')) return 1
    return 2
  }

  return (
    <CurrencyInputContainer>
      <StyledDiv>
        <Tabs activeTab={getActiveTab()} size="md">
          <Tab
            index={0}
            label={t('SWAP')}
            onClick={() => history.push('/swap')}
            size={isMobile ? 'xsm' : 'md'}
            variant="centered"
            activeTab={getActiveTab()}
          />
          {chainId === CHAIN_ID.BSC ? (
            <Tab
              index={1}
              label={t('ORDERS')}
              onClick={() => history.push('/orders')}
              size={isMobile ? 'xsm' : 'md'}
              variant="centered"
              activeTab={getActiveTab()}
            />
          ) : (
            <></>
          )}
          <Tab
            index={2}
            label={t('LIQUIDITY')}
            onClick={() => history.push('/pool')}
            size={isMobile ? 'xsm' : 'md'}
            variant="centered"
            activeTab={getActiveTab()}
          />
        </Tabs>
      </StyledDiv>
      <Flex>
        <div style={{ marginRight: '25px' }}>
          <RunFiatButton runFiat={() => console.log('runFiat Clicked!!!')} />
        </div>
        <a href="https://app.multichain.org/" target="_blank" rel="noopener noreferrer">
          <Button
            style={{
              fontSize: '15px',
              fontWeight: 700,
              marginRight: '25px',
              padding: 10,
              display: isMobile ? 'none' : 'block',
              height: isMobile ? '36px ' : '40px',
            }}
          >
            {t('BRIDGE')}
          </Button>
        </a>
        <GlobalSettings />
      </Flex>
    </CurrencyInputContainer>
  )
}

export default CurrencyInputHeader
