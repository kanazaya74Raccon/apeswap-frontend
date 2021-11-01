import React from 'react'
import { Card, CardBody, Heading, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { useStatsOverall } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { BANANA_PER_BLOCK } from 'config'
import CardValue from './CardValue'

const StyledBananaStats = styled(Card)`
  width: 336px;
  height: 203px;
  margin-top: 40px;
  @media screen and (max-width: 350px) {
    width: 320px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0px;
  }
  @media screen and (min-width: 1375px) {
    margin-top: 40px;
  }
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  padding-bottom: 4px;
  padding-top: 0.5px;
  padding-left: 12px;
  padding-right: 10px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 12px;
    padding-right: 10px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 6px;
    padding-right: 6px;
  }
`
const GreyRow = styled(Row)`
  background: rgb(196, 196, 196, 0.2);
`

const StyledCardBody = styled(CardBody)`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;
  padding-bottom: 15px;
  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 10px;
    padding-right: 10px;
  }
`

const StyledText = styled(Text)`
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  text-align: left;
  font-weight: 400;
  margin-right: 10px;
  margin-top: 3px;
`

const ApeSwapStats = () => {
  const TranslateString = useI18n()
  const bananaPerBlock = BANANA_PER_BLOCK.toNumber()
  const stats = useStatsOverall()
  const { burntAmount, circulatingSupply, marketCap, totalLiquidity } = stats?.isInitialized && stats?.statsOverall

  return (
    <StyledBananaStats>
      <StyledCardBody>
        <Heading size="lg" mb="8px" textAlign="center">
          {TranslateString(534, 'ApeSwap Stats')}
        </Heading>
        <GreyRow>
          <StyledText fontSize="14px" fontFamily="poppins">
            {TranslateString(536, 'TOTAL VALUE LOCKED')}
          </StyledText>
          {totalLiquidity && (
            <CardValue fontSize="14px" value={totalLiquidity} prefix="$" text="poppins" fontWeight={700} />
          )}
        </GreyRow>
        <Row>
          <StyledText fontSize="14px" fontFamily="poppins">
            {TranslateString(536, 'USD MARKET CAP')}
          </StyledText>
          {marketCap && (
            <CardValue fontSize="14px" value={marketCap} decimals={0} prefix="$" text="poppins" fontWeight={700} />
          )}
        </Row>
        <GreyRow>
          <StyledText fontSize="14px" fontFamily="poppins">
            {TranslateString(536, 'BANANA IN CIRCULATION')}
          </StyledText>
          {circulatingSupply && <CardValue fontSize="14px" value={circulatingSupply} text="poppins" fontWeight={700} />}
        </GreyRow>
        <Row>
          <StyledText fontSize="14px" fontFamily="poppins">
            {TranslateString(536, 'GNANA IN CIRCULATION')}
          </StyledText>
          {circulatingSupply && <CardValue fontSize="14px" value={0} decimals={0} text="poppins" fontWeight={700} />}
        </Row>
        <GreyRow>
          <StyledText fontSize="14px" fontFamily="poppins">
            {TranslateString(538, 'TOTAL BANANA BURNED')}
          </StyledText>
          <CardValue fontSize="14px" decimals={0} value={burntAmount} text="poppins" fontWeight={700} />
        </GreyRow>
        <Row>
          <StyledText fontSize="14px" fontFamily="poppins">
            {TranslateString(540, 'DISTRIBUTED BANANA/BLOCK')}
          </StyledText>
          <CardValue fontSize="14px" decimals={0} value={bananaPerBlock} text="poppins" fontWeight={900} />
        </Row>
      </StyledCardBody>
    </StyledBananaStats>
  )
}

export default ApeSwapStats
