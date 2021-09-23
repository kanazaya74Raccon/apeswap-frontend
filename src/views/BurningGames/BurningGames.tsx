import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { Heading, Card, BaseLayout, CardBody, Text, Button } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import useRefresh from 'hooks/useRefresh'
import useTheme from 'hooks/useTheme'
import { fetchFarmUserDataAsync } from 'state/actions'
import useI18n from 'hooks/useI18n'
import useFetchBurningGames from 'state/strapi/useFetchBurningGames'

const ControlContainer = styled(Card)`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: center;
  flex-direction: column;
  overflow: visible;
  padding-bottom: 10px;
  transform: translateY(-85px);

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    height: 59px;
    padding: 0px;
    justify-content: flex-start;
    padding-left: 50px;
    transform: translateY(-60px);
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: flex-start;
  display: flex;
  align-items: flex-end;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: center;
    align-items: center;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const HeadingContainer = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

const Header = styled.div`
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${({ theme }) => (theme.isDark ? 'url(/images/farm-night.svg)' : 'url(/images/farm-day.svg)')};
  background-repeat: no-repeat;
  background-size: cover;
  height: 400px;
  background-position: center;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const StyledImage = styled.img`
  height: 187px;
  width: 134px;
  position: absolute;
  right: 0px;
  bottom: 51px;

  @media screen and (min-width: 340px) {
    right: 20px;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    bottom: 51px;
    right: 0px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    bottom: 0px;
    right: 0px;
  }
`

const StyledHeading = styled(Heading)`
  font-size: 32px;
  max-width: 176px !important;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 36px;
    max-width: 240px !important;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 44px;
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
    max-width: 600px !important;
  }
`

const StyledPage = styled(Page)`
  padding-left: 5px;
  padding-right: 5px;
  width: 100vw;

  ${({ theme }) => theme.mediaQueries.xs} {
    padding-left: 10px;
    padding-right: 10px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 16px;
    padding-right: 16px;
  }
`

const Column = styled(Card)`
  border-radius: 5px;
  width: 250px;
  text-align: center;
`
const CardImage = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: 100%;
  border-radius: 20px;
  img {
    position: absolute;
    width: 100%;
    top: 0px;
    left: 0px;
    transition: opacity 1s linear 0s;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`
const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  text-align: left;
  padding: 36px;
`
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
const PlayButton = styled(Button)`
  width: 120px;
  height: 60px;
  background-color: secondary;
  margin: 10px;
  flex-shrink: 0;
  background: #ffb300;
  padding: 0;
  :focus {
    outline: none !important;
    box-shadow: none !important;
    background: #ffb300;
  }
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 140px;
  }
`
const PlayText = styled(Text)`
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 20px;
  }
`
const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`
const BurningGames: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const { data } = useFetchBurningGames()

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const { isDark } = useTheme()

  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1" mb="12px" mt={0}>
            {TranslateString(999, 'Burning Games Partners')}
          </StyledHeading>
        </HeadingContainer>
      </Header>

      <StyledPage width="1130px">
        <ControlContainer>
          <ViewControls>
            {isDark ? (
              <StyledImage src="/images/farm-night-farmer.svg" alt="night-monkey" />
            ) : (
              <StyledImage src="/images/farm-day-farmer.svg" alt="day-monkey" />
            )}
          </ViewControls>
        </ControlContainer>
        <div>
          <Cards>
            {data.map((i) => (
              <Column>
                <CardBody>
                  <CardImage>
                    <img src={`${i.image?.url}`} alt={i.id} />
                  </CardImage>
                  <Description>{i.name}</Description>
                  <ButtonWrapper>
                    <PlayButton>
                      <PlayText color="white">Play</PlayText>
                    </PlayButton>
                  </ButtonWrapper>
                </CardBody>
              </Column>
            ))}
          </Cards>
        </div>
      </StyledPage>
    </>
  )
}

export default BurningGames
