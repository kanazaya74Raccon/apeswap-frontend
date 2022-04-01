import { Card, Flex, Heading } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  min-width: 270px;
  min-height: 307px;
  align-items: center;
  margin-left: 16px;
`

export const BillsImage = styled.div<{ image?: string }>`
  width: 270px;
  height: 159px;
  background-image: url(/images/bills-nft.svg);
  background-repeat: no-repeat;
  background-size: cover;
`

export const BillCardsContainer = styled(Flex)`
  width: 100%;
  flex-direction: row;
  margin-bottom: 20px;
  & :nth-child(1) {
    margin-left: 0px;
  }
`

export const FirstTimeCardContainer = styled(Flex)`
  width: 100%;
  height: 400px;
  background: ${({ theme }) => theme.colors.white2};
  border-radius: 10px;
  padding: 20px;
`

export const BillGifContainer = styled(Flex)`
  width: 620px;
  justify-content: center;
  align-items: center;
`

export const DescriptionContainer = styled(Flex)`
  flex-direction: column;
  padding-left: 20px;
  padding: 20px 0px 20px 20px;
`

export const BillGifImage = styled.div<{ image?: string }>`
  width: 300px;
  align-self: center;
  height: 210px;
  background-image: url(/images/test-bill.png);
  background-repeat: no-repeat;
  background-size: cover;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 606px;
    height: 341px;
    align-self: auto;
  }
`
