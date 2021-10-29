import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Heading, BaseLayout, Image } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import BananaStats from 'views/Stats/components/BananaStats'
import { useStats } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/farms'
import CardStats from './components/CardStats'
import PageLoader from '../../components/PageLoader'

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  padding: 24px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
  img {
    // height: auto;
    // max-width: 100%;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
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

const Stats: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const yourStats = useStats()
  const stats = yourStats?.stats

  return (
    <Page>
      <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
            {TranslateString(282, 'Your Ape Stats')}
          </Heading>
          <ul>
            <li>{TranslateString(580, 'Keep track of your pools and farms.')}</li>
          </ul>
        </div>
        <Image src="/images/monkey-graphics.svg" alt="ApeSwap stats" width={470} height={300} responsive />
      </Hero>
      {!account ? (
        <UnlockButton fullWidth />
      ) : (
        <div>
          {stats !== null ? (
            <div>
              <Cards>
                <BananaStats stats={stats} />
                {stats?.pools[0] && <CardStats data={stats.pools[0]} type="pool" forceDetails />}
              </Cards>
              <Cards>
                {[...stats.incentivizedPools]
                  .sort((poolA, poolB) => poolB.stakedTvl - poolA.stakedTvl)
                  .map((pool) => {
                    return <CardStats data={pool} type="pool" />
                  })}
                {[...stats.farms]
                  .sort((poolA, poolB) => poolB.stakedTvl - poolA.stakedTvl)
                  .map((farm) => {
                    return <CardStats data={farm} type="farm" />
                  })}
              </Cards>
            </div>
          ) : (
            <PageLoader />
          )}
        </div>
      )}
    </Page>
  )
}

export default Stats
