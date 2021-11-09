import React from 'react'
import { usePriceBnbBusd } from 'state/hooks'
import { SaleHistory } from 'hooks/api'
import styled from 'styled-components'

const SalesContainer = styled.div`
  display: grid;
  grid-template-columns: 125px 90px 140px;
  grid-column-gap: 8px;
  width: 400px;
  height: 35px;
  align-self: center;
`

const SalesItem = styled.div`
  align-self: center;
  justify-self: right;
  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 14px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
  color: ${(props) => props.theme.colors.textSubtle};
  font-family: ${(props) => props.theme.fontFamily.poppins};
`

const NfaSales: React.FC<SaleHistory> = ({ tokenId, value, blockNumber }) => {
  const bnbPrice = usePriceBnbBusd()

  const bigNumber = (num) => {
    return num / 1e18
  }

  const getUsd = (num) => {
    return (bnbPrice.c[0] * bigNumber(num)).toFixed(2)
  }

  return (
    <SalesContainer>
      <SalesItem key={tokenId}>${getUsd(value)} USD</SalesItem>
      <SalesItem key={value}>{bigNumber(value).toFixed(3)} BNB</SalesItem>
      <SalesItem key={blockNumber}>{blockNumber} Block</SalesItem>
    </SalesContainer>
  )
}

export default NfaSales
