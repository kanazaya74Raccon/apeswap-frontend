import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Card, CardBody, Heading, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { usePriceBananaBusd } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { getBananaAddress } from 'utils/addressHelpers'
import { BANANA_PER_BLOCK } from 'config'
import CardValue from './CardValue'

const StyledBananaStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  max-width: 427px;
  min-height: 376px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  padding-bottom: 4px;
  padding-top: 4px;
`
const GreyRow = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  padding-bottom: 4px;
  padding-top: 4px;
  background: rgb(196, 196, 196, 0.2);
`
const StyledHeading = styled(Heading)`
  text-align: center;
`

const StyledText = styled(Text)`
  font-weight: 400;
`

const StyledNavLink = styled(NavLink)`
  padding: 15px 40px;
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
`

const BananaStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const bananaPriceUsd = usePriceBananaBusd()
  const burnedBalance = useBurnedBalance(getBananaAddress())
  const bananaSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0
  const bananaPerBlock = BANANA_PER_BLOCK.toNumber()
  const marketCap = bananaPriceUsd.toNumber() * bananaSupply

  return (
    <StyledBananaStats>
      <CardBody>
        <StyledHeading size="xl" mb="24px">
          {TranslateString(534, 'Banana Stats')}
        </StyledHeading>
        <GreyRow>
          <StyledText fontSize="14px" fontFamily="poppins">
            {TranslateString(536, 'TOTAL BANANA SUPPLY')}
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
            {TranslateString(540, 'NEW BANANA/BLOCK')}
          </StyledText>
          <CardValue fontSize="14px" decimals={0} value={bananaPerBlock} text="poppins" fontWeight={700} />
        </Row>
      </CardBody>
      <StyledNavLink to="/stats">LEARN MORE</StyledNavLink>
    </StyledBananaStats>
  )
}

export default BananaStats
