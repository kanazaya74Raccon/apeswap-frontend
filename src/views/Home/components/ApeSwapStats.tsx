import React from 'react'
import { Card, CardBody, Heading, Text, Skeleton } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { usePriceBananaBusd, useStatsOverall, useTvl } from 'state/hooks'
import { useCountUp } from 'react-countup'
import useI18n from 'hooks/useI18n'
import { getBananaAddress } from 'utils/addressHelpers'
import { BANANA_PER_BLOCK } from 'config'
import CardValue from './CardValue'

const StyledBananaStats = styled(Card)`
  width: 336px;
  height: 203px;
  margin-top: 40px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    margin-top: 40px;
  }
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  padding-bottom: 4px;
  padding-top: 1px;
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
  padding-top: 12px;
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

const TotalValueLocked = styled(Text)`
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
`

const TotalValueLockedNumber = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 30px;
`

const ApeSwapStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const newTvl = useTvl()
  const totalTvl = newTvl.toNumber()
  const bananaPriceUsd = usePriceBananaBusd()
  const burnedBalance = useBurnedBalance(getBananaAddress())
  const bananaSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0
  const bananaPerBlock = BANANA_PER_BLOCK.toNumber()
  const marketCap = bananaPriceUsd.toNumber() * bananaSupply

  return (
    <StyledBananaStats>
      <StyledCardBody>
        <Heading size="lg" mb="8px" textAlign="center">
          {TranslateString(534, 'ApeSwap Stats')}
        </Heading>
        <GreyRow>
          <StyledText fontSize="14px" fontFamily="poppins">
            {TranslateString(536, 'BANANA IN CIRCULATION')}
          </StyledText>
          {bananaSupply && <CardValue fontSize="14px" value={bananaSupply} text="poppins" fontWeight={700} />}
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
            {TranslateString(538, 'TOTAL BANANA BURNED')}
          </StyledText>
          <CardValue
            fontSize="14px"
            decimals={0}
            value={getBalanceNumber(burnedBalance)}
            text="poppins"
            fontWeight={700}
          />
        </GreyRow>
        <Row>
          <StyledText fontSize="14px" fontFamily="poppins">
            {TranslateString(540, 'DISTRIBUTED BANANA/BLOCK')}
          </StyledText>
          <CardValue fontSize="14px" decimals={0} value={bananaPerBlock} text="poppins" fontWeight={900} />
        </Row>
        <TotalValueLocked>TOTAL VALUE LOCKED (TVL)</TotalValueLocked>
        {totalTvl ? (
          <TotalValueLockedNumber>
            <CardValue fontSize="26px" prefix="$" decimals={0} value={totalTvl} text="poppins" fontWeight={700} />
          </TotalValueLockedNumber>
        ) : (
          <>
            <Skeleton height={33} />
          </>
        )}
      </StyledCardBody>
    </StyledBananaStats>
  )
}

export default ApeSwapStats
