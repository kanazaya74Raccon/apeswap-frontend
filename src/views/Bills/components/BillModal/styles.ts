import { Flex, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const ModalBodyContainer = styled(Flex)`
  maxwidth: 1000px;
  width: auto;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

export const BillsImage = styled.div<{ image?: string }>`
  width: 300px;
  align-self: center;
  height: 210px;
  background-image: url(/images/bills-nft.svg);
  background-repeat: no-repeat;
  background-size: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 606px;
    height: 423px;
    align-self: auto;
  }
`

export const BillDescriptionContainer = styled(Flex)`
  position: relative;
  width: 270px;
  height: 400px;
  flex-direction: column;
  margin-left: 20px;
  justify-content: space-around;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 370px;
    height: auto;
    justify-content: space-between;
  }
`

export const TopDescriptionText = styled(Text)`
  opacity: 0.6;
  font-size: 12px;
  align-text: flex-start;
  margin-bottom: 5px;
  width: 100%;
`

export const BillTitleContainer = styled(Flex)`
  flex-direction: column;
`

export const GridTextValContainer = styled(Flex)`
  justify-content: space-between;
  width: 100%;
  margin: 2px 0px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 5px 0px;
  }
`
