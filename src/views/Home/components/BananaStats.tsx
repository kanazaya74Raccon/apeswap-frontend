import React from 'react'
import { Card, CardBody, Heading, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { usePriceBananaBusd, useStatsOverall } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { getBananaAddress } from 'utils/addressHelpers'
import { BANANA_PER_BLOCK } from 'config'
import CardValue from './CardValue'

const StyledBananaStats = styled(Card)`
  width: 100%;
  min-height: 376px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  padding-bottom: 4px;
  padding-top: 4px;
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
const GreyRow = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  padding-bottom: 4px;
  padding-top: 4px;
  background: rgb(196, 196, 196, 0.2);
  border-radius: 10px;
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
const StyledHeading = styled(Heading)`
  text-align: center;
`

const StyledCardBody = styled(CardBody)`
  padding-left: 20px;
  padding-right: 20px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 10px;
    padding-right: 10px;
  }
`

const StyledText = styled(Text)`
  font-weight: 400;
  margin-right: 10px;
`

const StyledNavLink = styled.a`
  background: #ffb300;
  border-radius: 10px;
  border: 0px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  box-shadow: inset 0px -1px 0px rgb(14 14 44 / 40%);
  text-align: center;
  width: 220px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BananaStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const { statsOverall } = useStatsOverall()
  const bananaPriceUsd = usePriceBananaBusd()
  const burnedBalance = useBurnedBalance(getBananaAddress())
  const bananaSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0
  const bananaPerBlock = BANANA_PER_BLOCK.toNumber()
  const marketCap = bananaPriceUsd.toNumber() * bananaSupply

  return (
    <StyledBananaStats>
      <StyledCardBody>
        <StyledHeading size="lg" mb="24px">
          {TranslateString(534, 'Banana Stats')}
        </StyledHeading>
        <GreyRow>
          <StyledText fontSize="14px" fontFamily="poppins">
            {TranslateString(536, 'USD MARKET CAP')}
          </StyledText>
          {marketCap && (
            <CardValue fontSize="14px" value={marketCap} decimals={0} prefix="$" text="poppins" fontWeight={700} />
          )}
        </GreyRow>
        <Row>
          <StyledText fontSize="14px" fontFamily="poppins">
            {TranslateString(536, 'BANANA IN CIRCULATION')}
          </StyledText>
          {bananaSupply && (
            <CardValue fontSize="14px" value={bananaSupply} text="poppins" fontWeight={700} />
          )}
        </Row>
        <GreyRow>
          <StyledText fontSize="14px" fontFamily="poppins">
            {TranslateString(538, 'BANANA BURNED')}
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
            {TranslateString(536, 'DEX LIQUIDITY')}
          </StyledText>
          {statsOverall?.totalLiquidity && (
            <CardValue
              fontSize="14px"
              value={statsOverall.totalLiquidity}
              decimals={0}
              prefix="$"
              text="poppins"
              fontWeight={700}
            />
          )}
        </Row>
        <GreyRow>
          <StyledText fontSize="14px" fontFamily="poppins">
            {TranslateString(540, 'DISTRIBUTED BANANA/BLOCK')}
          </StyledText>
          <CardValue fontSize="14px" decimals={0} value={bananaPerBlock} text="poppins" fontWeight={700} />
        </GreyRow>
      </StyledCardBody>
      <StyledNavLink href="https://info.apeswap.finance" target="_blank">
        LEARN MORE
      </StyledNavLink>
    </StyledBananaStats>
  )
}

export default BananaStats
