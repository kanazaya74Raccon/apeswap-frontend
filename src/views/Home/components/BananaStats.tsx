import React from 'react'
import { Card, CardBody, Heading, Text } from '@apeswapfinance/uikit'
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
  background: rgb(196, 196, 196, .2);
`

const BananaStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const bananaPriceUsd = usePriceBananaBusd()
  const burnedBalance = useBurnedBalance(getBananaAddress())
  const bananaSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0
  const bananaPerBlock = BANANA_PER_BLOCK.toNumber()
  const marketCap = bananaPriceUsd.toNumber() * bananaSupply

  const StyledHeading = styled(Heading)`
    text-align: center;
  `


  return (
    <StyledBananaStats>
      <CardBody>
        <StyledHeading size="xl" mb="24px">
          {TranslateString(534, 'Banana Stats')}
        </StyledHeading>
        <GreyRow>
          <Text fontSize="14px">{TranslateString(536, 'Total BANANA Supply')}</Text>
          {bananaSupply && <CardValue fontSize="14px" value={bananaSupply} />}
        </GreyRow>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'USD Market Cap')}</Text>
          {marketCap && <CardValue fontSize="14px" value={marketCap} decimals={0} prefix="$" />}
        </Row>
        <GreyRow>
          <Text fontSize="14px">{TranslateString(538, 'Total BANANA Burned')}</Text>
          <CardValue fontSize="14px" decimals={0} value={getBalanceNumber(burnedBalance)} />
        </GreyRow>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New BANANA/block')}</Text>
          <CardValue fontSize="14px" decimals={0} value={bananaPerBlock} />
        </Row>
      </CardBody>
    </StyledBananaStats>
  )
}

export default BananaStats
