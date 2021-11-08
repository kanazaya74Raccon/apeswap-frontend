import React from 'react'
import { Heading, BaseLayout, useMatchBreakpoints } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import useTheme from 'hooks/useTheme'
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
  background-size: auto;
  height: 300px;
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

const CardFull = styled(BaseLayout)<{ isMobile: boolean }>`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  .column-full {
    height: ${(props) => (props.isMobile ? '160px' : '225px')};
    .container-general {
      height: ${(props) => (props.isMobile ? '130px' : '193px')};
    }
    .container-resumen-info {
      width: 65%;
      padding-top: 20px;
    }
    border: ${(props) => props.isMobile && '2px solid #ffb300'};
  }
`
const Cards = styled(BaseLayout)<{ isMobile: boolean }>`
  & > div {
    ${({ theme }) => theme.mediaQueries.md} {
      grid-column: span 6;
    }

    grid-column: span 12;
  }

  .column-full {
    height: ${(props) => (props.isMobile ? '160px' : '225px')};
    margin-bottom: 0px;
    .container-general {
      height: ${(props) => (props.isMobile ? '130px' : '193px')};
    }
    .container-resumen-info {
      width: 65%;
      padding-top: 20px;
    }
  }
  & > * {
    width: 100%;
    margin-bottom: 32px;
  }
`
const ContainerPrincipal = styled.div<{ isDark: boolean }>`
  background-color: ${(props) => props.isDark && 'rgb(238,238,238)'};
`
const BurningGames: React.FC = () => {
  const TranslateString = useI18n()
  const { data } = useFetchBurningGames()

  const { isXl: isDesktop } = useMatchBreakpoints()
  const { isDark } = useTheme()

  let banner = ''

  if (!isDark && isDesktop) banner = 'burning.png'
  if (isDark && isDesktop) banner = 'burning-night.png'
  if (!isDark && !isDesktop) banner = 'burning-mobile.png'
  if (isDark && !isDesktop) banner = 'burning-night-mobile.png'

  return (
    <ContainerPrincipal isDark={!isDark}>
      <Header banner={banner}>
        <HeadingContainer>
          <StyledHeading as="h1" mb="12px" mt={0} color="white">
            {TranslateString(999, 'Burning Games Partners')}
          </StyledHeading>
        </HeadingContainer>
      </Header>

      <StyledPage width="1130px">
        {data.length !== 0 && (
          <CardFull isMobile={!isDesktop}>
            <CardBurningGame game={data[0]} />
          </CardFull>
        )}
        <Cards isMobile={!isDesktop}>{data.map((i, index) => index > 0 && <CardBurningGame game={i} />)}</Cards>
      </StyledPage>
    </ContainerPrincipal>
  )
}

export default BurningGames
