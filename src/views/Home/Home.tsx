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
import WelcomeCard from './components/WelcomeCard'

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
      <div>
        <Cards>
          <WelcomeCard />
          <PromoCard />
        </Cards>
        <Cards>
          <FarmStakingCard />
          <BananaStats />
        </Cards>
        <Cards>
          <EarnAPYCard />
          <TotalValueLockedCard />
        </Cards>
        {/* <EarnAssetCard /> */}
        {/* <LotteryCard /> */}
      </div>
    </Page>
  )
}

export default Home
