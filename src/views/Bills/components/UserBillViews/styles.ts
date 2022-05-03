import { Card, Flex } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  min-width: 270px;
  max-height: 307px;
  height: 307px;
  align-items: center;
  margin-left: 16px;
`

export const BillsImage = styled.div<{ image?: string }>`
  width: 270px;
  height: 150px;
  background-image: ${({ image }) => `url(${image});`}
  overflow: hidden;
  border-radius: 10px 10px 0px 0px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 8px;
`

export const BillCardsContainer = styled(Flex)`
  width: 100%;
  height: 307px;
  flex-direction: row;
  overflow: hidden;
  margin-bottom: 20px;
  & :nth-child(1) {
    margin-left: 0px;
  }
`

export const FirstTimeCardContainer = styled(Flex)`
  max-width: 500px;
  height: auto;
  background: ${({ theme }) => theme.colors.white2};
  border-radius: 10px;
  padding: 10px 20px;
  flex-direction: column;
  align-self: center;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    height: 410px;
    max-width: 100%;
    align-self: auto;
  }
`

export const BillGifContainer = styled(Flex)`
  width: 100%;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 620px;
    width: 100%;
  }
`

export const DescriptionContainer = styled(Flex)`
  flex-direction: column;
  padding-left: 20px;
  padding: 13px 0px 20px 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 530px;
  }
`

export const BillGifImage = styled.div<{ image?: string }>`
  width: 270px;
  height: 150px;
  background-image: url(/images/bills-gif.gif);
  background-repeat: no-repeat;
  background-size: contain;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 606px;
    max-height: 341px;
    height: 100%;
    width: 100%;
  }
`

export const BillDiagramContainer = styled(Flex)`
  margin-top: 10px;
`

export const HeadingContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 2fr 1fr;
  grid-template-areas: 'back expired' 'all-bills all-bills';
  flex-wrap: wrap;
  max-width: 500px;
  order: 0;
  width: 100%;
  align-self: center;
  justify-content: space-between;
  margin: 15px 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;
    grid-template-areas: 'back all-bills expired';
    align-self: auto;
    max-width: 100%;
    width: auto;
  }
`
