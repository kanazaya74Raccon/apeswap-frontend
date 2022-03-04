import { Card, Flex, Heading } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 307px;
  align-items: center;
`

export const BillsImage = styled.div<{ image?: string }>`
  width: 260px;
  height: 170px;
  background-image: url(/images/bills-nft.svg);
  background-repeat: no-repeat;
  background-size: cover;
`

export const BillCardsContainer = styled(Flex)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 10px;
  margin-bottom: 20px;
`
