import React, { useState } from 'react'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { useMatchBreakpoints, Flex, Text } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { useNetworkChainId } from 'state/hooks'
import Tooltip from 'components/Tooltip/Tooltip'

import Apr, { AprProps } from './Apr'
import Farm, { FarmProps } from './Farm'
import Earned, { EarnedProps } from './Earned'
import Details from './Details'
import Multiplier, { MultiplierProps } from './Multiplier'
import Liquidity, { LiquidityProps } from './Liquidity'

import ActionPanel from './Actions/ActionPanel'
import CellLayout from './CellLayout'
import { DesktopColumnSchema, MobileColumnSchema } from '../types'

import { LpTokenPrices } from '../../../../state/types'

export interface RowProps {
  apr: AprProps
  farm: FarmProps
  earned: EarnedProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
  farmsPrices?: LpTokenPrices[]
}

const cells = {
  apr: Apr,
  farm: Farm,
  earned: Earned,
  details: Details,
  multiplier: Multiplier,
  liquidity: Liquidity,
}

const CellInner = styled.div`
  padding: 0px 0px;
  display: flex;
  width: auto;
  align-items: center;
  border: 1px solid red;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 0px;
  }
`

export const Caption = styled(Text)`
  opacity: 0.5;
  font-weight: 500;
  font-size: 12px;
  margin-bottom: -2px;
`

const StyledTr = styled.div`
  display: flex;
  cursor: pointer;
  border: 1px solid yellow;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  height: 86px;
  width: 1099px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => (theme.isDark ? '#27262c' : '#faf9fa')};
`

const EarnedMobileCell = styled.div`
  padding: 16px 0 24px 16px;
`

const AprMobileCell = styled.div`
  padding-top: 16px;
  padding-bottom: 24px;
`

const FarmMobileCell = styled.div`
  padding-top: 24px;
`

const StyledTd1 = styled.div`
  border-radius: 20px 0 0 20px;
  -moz-border-radius: 20px 0 0 20px;
`

const StyledTd2 = styled.div`
  border-right: #faf9fa;
  border-right-style: solid;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
`

const APRContainer = styled.div`
  position: absolute;
  left: 340px;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: 401px;
  }
`

const LiquidtyContainer = styled.div`
  position: absolute;
  left: 480px;
  font-weight: 800;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: 587px;
  }
`

const EarnedContainer = styled.div`
  position: absolute;
  left: 660px;
  font-weight: 800;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: 803px;
  }
`

const StyledFlex = styled(Flex)`
  width: 100%;
  position: relative;
`

const ArrowContainer = styled(Flex)`
  position: absolute;
  right: 23px;
`

export const ContentContainer = styled.div`
  display: flex;
  border: 1px solid green;
  & ${StyledTr}:first-child {
    border: 1px solid blue;
  }
`

const Row: React.FunctionComponent<RowProps> = (props) => {
  const { details, liquidity, farmsPrices } = props
  const [actionPanelToggled, setActionPanelToggled] = useState(false)
  const TranslateString = useI18n()
  const chainId = useNetworkChainId()

  const toggleActionPanel = (e) => {
    if (e.target?.classList.contains('noClick')) return
    setActionPanelToggled(!actionPanelToggled)
  }

  const { isXl, isXs } = useMatchBreakpoints()

  const { account } = useWeb3React()

  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses } = details
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAdresses,
    quoteTokenSymbol,
    tokenAddresses,
    chainId,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const isMobile = !isXl
  const tableSchema = isMobile ? MobileColumnSchema : DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const handleRenderRow = () => {
    if (!isXs) {
      return (
        <ContentContainer>
          <StyledTr onClick={toggleActionPanel}>
            <StyledFlex alignItems="center">
              {Object.keys(props).map((key) => {
                const columnIndex = columnNames.indexOf(key)
                if (columnIndex === -1) {
                  return null
                }

                switch (key) {
                  case 'details':
                    return (
                      <ArrowContainer justifyContent="center" alignItems="center" key={key}>
                        <CellInner>
                          <CellLayout>
                            <Details actionPanelToggled={actionPanelToggled} />
                            {/* <Tooltip content="Burns at least 50% of every harvest in the form of $BANANA">🔥</Tooltip> */}
                          </CellLayout>
                        </CellInner>
                      </ArrowContainer>
                    )
                  case 'apr':
                    return (
                      <APRContainer key={key}>
                        <Caption>APR</Caption>
                        <Apr {...props.apr} hideButton={isMobile} addLiquidityUrl={addLiquidityUrl} />
                      </APRContainer>
                    )
                  case 'liquidity':
                    return (
                      <LiquidtyContainer key={key}>
                        <Caption>Liquidity</Caption>
                        {React.createElement(cells[key], { ...props[key] })}
                      </LiquidtyContainer>
                    )
                  case 'earned':
                    return (
                      <EarnedContainer key={key}>
                        <Caption>Earned</Caption>
                        {React.createElement(cells[key], { ...props[key] })}
                      </EarnedContainer>
                    )
                  default:
                    return (
                      <CellInner key={key}>
                        <CellLayout>{React.createElement(cells[key], { ...props[key] })}</CellLayout>
                      </CellInner>
                    )
                }
              })}
            </StyledFlex>
            {actionPanelToggled && details && (
              <ActionPanel
                {...props}
                account={account}
                addLiquidityUrl={addLiquidityUrl}
                liquidity={liquidity}
                farmsPrices={farmsPrices}
              />
            )}
          </StyledTr>
        </ContentContainer>
      )
    }

    return (
      <ContentContainer>
        <StyledTr onClick={toggleActionPanel}>
          <StyledTd1>
            <FarmMobileCell>
              <CellLayout>
                <Farm {...props.farm} />
              </CellLayout>
            </FarmMobileCell>
            <EarnedMobileCell>
              <CellLayout label={TranslateString(1072, 'Earned')}>
                <Earned {...props.earned} />
              </CellLayout>
            </EarnedMobileCell>
            <AprMobileCell>
              <CellLayout label={TranslateString(736, 'APR')}>
                <Apr {...props.apr} hideButton addLiquidityUrl={addLiquidityUrl} />
              </CellLayout>
            </AprMobileCell>
          </StyledTd1>
          <StyledTd2>
            <CellInner>
              <CellLayout>
                <Details actionPanelToggled={actionPanelToggled} />
              </CellLayout>
            </CellInner>
          </StyledTd2>
        </StyledTr>
      </ContentContainer>
    )
  }

  return handleRenderRow()
}

export default Row
