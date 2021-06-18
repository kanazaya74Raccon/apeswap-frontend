import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Card, CardBody } from '@apeswapfinance/uikit'
import { useWinningNumbers, useMatchingRewardLength } from 'hooks/useTickets'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { apiBaseUrl } from 'hooks/api'

const WinningNumbers: React.FC = () => {
  const { account } = useWeb3React()
  const winNumbers = useWinningNumbers()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const MatchedNumber4 = useMatchingRewardLength(4)
  const MatchedNumber3 = useMatchingRewardLength(3)
  const MatchedNumber2 = useMatchingRewardLength(2)
  const TranslateString = useI18n()

  return (
    <CardWrapper>
      <Card>
        <CardBody>
          <StyledCardContentInner>
            <StyledCardHeader>
              <Title>
                {account && lotteryHasDrawn
                  ? `🥳${TranslateString(570, 'Winning Numbers This Round')}🥳`
                  : TranslateString(572, 'Latest Winning Numbers')}
              </Title>
              <br />
            </StyledCardHeader>
            <WinnerImage>
              <WinnerRow>
                {winNumbers.map((number, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TicketNumberBox key={index}>
                    <CenteredText>{number}</CenteredText>
                  </TicketNumberBox>
                ))}
              </WinnerRow>
              <WinnerImageContainer>
                <WinnerImg src="/images/lottery-winner2.svg" />
              </WinnerImageContainer>
            </WinnerImage>
            <Column>
              <RowNoPadding>
                <CenteredTextWithPadding>{TranslateString(442, 'Tickets matching 4 numbers:')}</CenteredTextWithPadding>
                <CenteredTextWithPadding>
                  <strong>{MatchedNumber4}</strong>
                </CenteredTextWithPadding>
              </RowNoPadding>
              <RowNoPadding>
                <CenteredTextWithPadding>{TranslateString(444, 'Tickets matching 3 numbers:')}</CenteredTextWithPadding>
                <CenteredTextWithPadding>
                  <strong>{MatchedNumber3}</strong>
                </CenteredTextWithPadding>
              </RowNoPadding>
              <RowNoPadding>
                <CenteredTextWithPadding>{TranslateString(446, 'Tickets matching 2 numbers:')}</CenteredTextWithPadding>
                <CenteredTextWithPadding>
                  <strong>{MatchedNumber2}</strong>
                </CenteredTextWithPadding>
              </RowNoPadding>
            </Column>
            <Link href={`${apiBaseUrl}/lottery?page=0&pageSize=25`} target="_blank">
              {TranslateString(448, 'Export recent winning numbers')}
            </Link>
          </StyledCardContentInner>
        </CardBody>
      </Card>
    </CardWrapper>
  )
}
const Link = styled.a`
  margin-top: 1em;
  text-decoration: none;
  color: #25beca;
`

const Row = styled.div`
  margin-top: 1em;
  align-items: center;
  display: flex;
  flex-direction: row;
`

const WinnerImage = styled.div`
  position: relative;
  width: 100%;
`
const WinnerRow = styled(Row)`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
`

const WinnerImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const WinnerImg = styled.img`
  width: 100%;
  max-width: 530px;
  height: auto;
  position: inherit;
`

const RowNoPadding = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  margin-top: 1em;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const CenteredText = styled.div`
  text-align: center;
  align-items: center;
`

const CenteredTextWithPadding = styled.div`
  text-align: center;
  align-items: center;
  padding-left: 2px;
  padding-right: 2px;
`

const TicketNumberBox = styled.div`
  padding: 10px;
  border-radius: 12px;
  background: linear-gradient(rgb(246 240 216) 0%, rgb(254 255 177) 76.22%);
  color: #a06451;
  font-size: 30px;
  font-weight: 900;
  margin: 10px;
  margin-bottom: 7px;
  width: 50px;

  @media (min-width: 600px) {
    font-size: 40px;
    margin: 20px;
    width: 60px;
  }
`

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const CardWrapper = styled.div``

const Title = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 24px;
  width: 50vw;
  text-align: center;
  font-weight: 1000;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default WinningNumbers
