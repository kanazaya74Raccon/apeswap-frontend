import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { Heading, BaseLayout, useMatchBreakpoints } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import useRefresh from 'hooks/useRefresh'
import useTheme from 'hooks/useTheme'
import { fetchFarmUserDataAsync } from 'state/actions'
import useI18n from 'hooks/useI18n'
import useFetchBurningGames from 'state/strapi/useFetchBurningGames'
import CardBurningGame from './CardBurningGame'

const HeadingContainer = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

const Header = styled.div<{ banner: string }>`
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${(props) =>
    props.banner ? `url(/images/burning-games/${props.banner})` : 'url(/images/burning-games/burning.png)'};
  background-repeat: no-repeat;
  background-size: cover;
  height: 400px;
  background-position: center;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 24px;
    padding-right: 24px;
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
  margin-bottom: 20px;

  ${({ theme }) => theme.mediaQueries.xs} {
    padding-left: 10px;
    padding-right: 10px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 16px;
    padding-right: 16px;
  }
`

const BottomPage = styled.div`
  margin-bottom: 20px;
`

const CardFull = styled(BaseLayout)`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  .column-full {
    height: 225px;
    .container-general {
      height: 193px;
    }
    .container-resumen-info {
      width: 75%;
      padding-top: 20px;
    }
  }
`
const Cards = styled(BaseLayout)`
  & > div {
    ${({ theme }) => theme.mediaQueries.md} {
      grid-column: span 6;
    }

    grid-column: span 12;
  }

  .column-full {
    height: 225px;
    margin-bottom: 0px;
    .container-general {
      height: 193px;
    }
    .container-resumen-info {
      width: 75%;
      padding-top: 20px;
    }
  }
  & > * {
    width: 100%;
    margin-bottom: 32px;
  }
`
const BurningGames: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const { data } = useFetchBurningGames()

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  const { isXl: isDesktop } = useMatchBreakpoints()
  const { isDark } = useTheme()

  let banner = ''

  if (!isDark && isDesktop) banner = 'burning.png'
  if (isDark && isDesktop) banner = 'burning-night.png'
  if (!isDark && !isDesktop) banner = 'burning-mobile.png'
  if (isDark && !isDesktop) banner = 'burning-night-mobile.png'

  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  return (
    <>
      <Header banner={banner}>
        <HeadingContainer>
          <StyledHeading as="h1" mb="12px" mt={0} color="white">
            {TranslateString(999, 'Burning Games Partners')}
          </StyledHeading>
        </HeadingContainer>
      </Header>

      <StyledPage width="1130px">
          {data.length !== 0 && (
            <CardFull>
              <CardBurningGame game={data[0]} />
            </CardFull>
          )}
          <Cards>{data.map((i, index) => index > 0 && <CardBurningGame game={i} />)}</Cards>
      </StyledPage>
    </>
  )
}

export default BurningGames
