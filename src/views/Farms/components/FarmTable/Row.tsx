import React, { useState } from 'react'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { useMatchBreakpoints, Flex } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { communityFarms } from 'config/constants'
import { CommunityTag, CoreTag } from 'components/Tags'
import BigNumber from 'bignumber.js'
import Apr, { AprProps } from './Apr'
import Farm, { FarmProps } from './Farm'
import Earned, { EarnedProps } from './Earned'
import Details from './Details'
import Multiplier, { MultiplierProps } from './Multiplier'
import Liquidity, { LiquidityProps } from './Liquidity'

import ActionPanel from './Actions/ActionPanel'
import CellLayout from './CellLayout'
import { DesktopColumnSchema, MobileColumnSchema } from '../types'

import HarvestAction from '../FarmCard/HarvestAction'

export interface RowProps {
  apr: AprProps
  farm: FarmProps
  earned: EarnedProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
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
  width: 100%;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 0px;
  }
`

const CellInnerFarm = styled.div`
  padding: 24px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 32px;
  }
`

const StyledTr = styled.div`
  cursor: pointer;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => (theme.isDark ? '#27262c' : '#faf9fa')};
`

const StyledTrBlank = styled.div`
  height: 10px;
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

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
  }
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
  left: 401px;
  top: 19px;
`

const LiquidtyContainer = styled.div`
  position: absolute;
  left: 587px;
`

const EarnedContainer = styled.div`
  position: absolute;
  left: 803px;
  top: 19px;
`

const StyledFlex = styled(Flex)`
  width: 100%;
  position: relative;
`

const ArrowContainer = styled(Flex)`
  position: absolute;
  right: 23px;
`

const Row: React.FunctionComponent<RowProps> = (props) => {
  const { details } = props
  const [actionPanelToggled, setActionPanelToggled] = useState(false)
  const TranslateString = useI18n()

  const toggleActionPanel = () => {
    setActionPanelToggled(!actionPanelToggled)
  }

  const { isXl, isXs } = useMatchBreakpoints()

  const isMobile = !isXl
  const tableSchema = isMobile ? MobileColumnSchema : DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const isCommunityFarm = communityFarms.includes(details.lpSymbol)

  const handleRenderRow = () => {

    if (!isXs) {
      return (
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
                      <HarvestAction {...props.earned} {...props.farm} />
                      <CellInner>
                        <CellLayout>
                          <Details actionPanelToggled={actionPanelToggled} />
                        </CellLayout>
                      </CellInner>
                    </ArrowContainer>
                  )
                case 'apr':
                  return (
                    <APRContainer key={key}>
                      <Apr {...props.apr} hideButton={isMobile} />
                    </APRContainer>
                  )
                case 'liquidity':
                  return (
                    <LiquidtyContainer key={key}>
                      {React.createElement(cells[key], { ...props[key] })}
                    </LiquidtyContainer>
                  )
                case 'earned':
                  return (
                    <EarnedContainer key={key}>{React.createElement(cells[key], { ...props[key] })}</EarnedContainer>
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
          {actionPanelToggled && details && <ActionPanel {...props} />}
        </StyledTr>
      )
    }

    return (
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
              <Apr {...props.apr} hideButton />
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
    )
  }

  return handleRenderRow()
}

export default Row
