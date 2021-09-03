import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { Heading, Card, BaseLayout } from '@apeswapfinance/uikit'
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

const Column = styled.div`
  border: 1px solid;
  border-radius: 5px;
  width: 250px;
  height: 200px;
  color: ${(props) => props.theme.colors.text};
  padding: 16px;
  text-align: center;
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
  const { data, loading } = useFetchBurningGames()

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
                <div>
                  <img src={`${i.image?.url}`} alt={i.id} style={{ width: '170px', maxHeight: '100px' }} />
                </div>
                <div>{i.name}</div>
                <div>{i.published_at}</div>
              </Column>
            ))}
          </Cards>
        </div>
      </StyledPage>
    </>
  )
}

export default BurningGames
