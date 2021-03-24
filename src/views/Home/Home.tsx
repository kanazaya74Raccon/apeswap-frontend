import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import BananaStats from 'views/Home/components/BananaStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import PromoCard from './components/PromoCard'

const Hero = styled.div`
  align-items: center;
  background-image: url('/images/pan-bg2.svg');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/pan-bg2.svg'), url('/images/pan-bg.svg');
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
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
      grid-column: span 6;
    }
  }
`
const Card = styled.div`
  margin-bottom: 32px;
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
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

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="secondary">
          {TranslateString(576, 'Welcome all Apes!')}
        </Heading>
        <Text>{TranslateString(578, 'Why be a human, when you can be an ape?')}</Text>
      </Hero>
      <div>
        {/* <Card>
          <PromoCard />
        </Card> */}
        <Cards>
          <FarmStakingCard />
          <BananaStats />
        </Cards>
        <Cards>
          <EarnAPYCard />
          {/* <EarnAssetCard /> */}
          <TotalValueLockedCard />
        </Cards>
        {/* <LotteryCard /> */}
      </div>
    </Page>
  )
}

export default Home
