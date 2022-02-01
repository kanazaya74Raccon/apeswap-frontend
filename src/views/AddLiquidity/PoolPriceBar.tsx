import React from 'react'
import { Currency, Percent, Price } from '@apeswapfinance/sdk'
import styled from 'styled-components'
import { Text, Card, useMatchBreakpoints } from '@apeswapfinance/uikit'
import { AutoColumn } from '../../components/layout/Column'
import { AutoRow } from '../../components/layout/Row'
import { ONE_BIPS } from '../../config/constants'
import { Field } from '../../state/mint/actions'

function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
  chainId,
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
  chainId?: number
}) {
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs

  return (
    <>
      {isMobile ? (
        <div style={{ marginTop: '10px' }}>
          <OddRow justify="space-around" style={{ borderRadius: '5px 5px 0px 0px' }}>
            <Text pt={1}>
              {`${currencies[Field.CURRENCY_B]?.getSymbol(chainId) ?? ''} per ${
                currencies[Field.CURRENCY_A]?.getSymbol(chainId) ?? ''
              }`}
            </Text>
            <Text>{price?.toSignificant(6) ?? '-'}</Text>
          </OddRow>
          <EvenRow justify="space-around">
            <Text pt={1} textAlign="flex-start">
              {`${currencies[Field.CURRENCY_A]?.getSymbol(chainId) ?? ''} per ${
                currencies[Field.CURRENCY_B]?.getSymbol(chainId) ?? ''
              }`}
            </Text>
            <Text>{price?.invert()?.toSignificant(6) ?? '-'}</Text>
          </EvenRow>
          <OddRow justify="space-around" style={{ borderRadius: '0px 0px 5px 5px' }}>
            <Text pt={1}>Share of Pool</Text>
            <Text>
              {noLiquidity && price
                ? '100'
                : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
              %
            </Text>
          </OddRow>
        </div>
      ) : (
        <AutoColumn gap="lg">
          <AutoRow justify="space-around">
            <StyledCard>
              <AutoColumn justify="center">
                <Text bold fontSize="17px" pt={1}>
                  {`${currencies[Field.CURRENCY_B]?.getSymbol(chainId) ?? ''} per ${
                    currencies[Field.CURRENCY_A]?.getSymbol(chainId) ?? ''
                  }`}
                </Text>
                <Text>{price?.toSignificant(6) ?? '-'}</Text>
              </AutoColumn>
            </StyledCard>
            <StyledCard>
              <AutoColumn justify="center">
                <Text bold fontSize="17px" pt={1}>
                  Share of Pool
                </Text>
                <Text>
                  {noLiquidity && price
                    ? '100'
                    : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
                  %
                </Text>
              </AutoColumn>
            </StyledCard>
            <StyledCard>
              <AutoColumn justify="center">
                <Text bold fontSize="17px" pt={1}>
                  {`${currencies[Field.CURRENCY_A]?.getSymbol(chainId) ?? ''} per ${
                    currencies[Field.CURRENCY_B]?.getSymbol(chainId) ?? ''
                  }`}
                </Text>
                <Text>{price?.invert()?.toSignificant(6) ?? '-'}</Text>
              </AutoColumn>
            </StyledCard>
          </AutoRow>
        </AutoColumn>
      )}
    </>
  )
}
const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => (theme.isDark ? '#383838' : '#F0F0F0')};
  height: 110px;
  width: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const EvenRow = styled(AutoRow)`
  background-color: rgba(124, 124, 125, 0.08);
  justify-content: space-between;
  padding: 2.5px 15px 2.5px 15px;
`

const OddRow = styled(AutoRow)`
  background-color: rgba(124, 124, 125, 0.15);
  justify-content: space-between;
  padding: 2.5px 15px 2.5px 15px;
`

export default PoolPriceBar
