import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS, ChevronUpIcon } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useFetchProfile, useFetchStats, useFetchPublicData, useFetchStatsOverall, useStatsOverall } from 'state/hooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import Pools from './views/Pools'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Lottery = lazy(() => import('./views/Lottery'))
const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
const Nft = lazy(() => import('./views/Nft'))
const Teams = lazy(() => import('./views/Teams'))
const Team = lazy(() => import('./views/Teams/Team'))
const Profile = lazy(() => import('./views/Profile'))
const Chart = lazy(() => import('./views/Chart'))
const ApeZone = lazy(() => import('./views/ApeZone'))
const Stats = lazy(() => import('./views/Stats'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const StyledChevronUpIcon = styled(ChevronUpIcon)`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  background-color: rgb(255, 179, 0, 0.7);
  border: 1px solid #ffb300;
  border-radius: 50%;
  z-index: 10;
`

const App: React.FC = () => {
  const { account, connect } = useWallet()

  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
    if (account) dataLayer?.push({ event: 'wallet_connect', user_id: account })
  }, [account, connect])

  useFetchPublicData()
  useFetchProfile()
  useFetchStats()
  useFetchStatsOverall()

  const { statsOverall } = useStatsOverall()
  
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      { window.location.pathname==="/farms" && <StyledChevronUpIcon onClick={scrollToTop}/>}
      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">{statsOverall && <Farms />}</Route>
            <Route path="/pools">
              <Pools />
            </Route>
            <Route path="/lottery">
              <Lottery />
            </Route>
            <Route path="/iao">
              <Ifos />
            </Route>
            <Route path="/nft">
              <Nft />
            </Route>
            <Route path="/chart">
              <Chart />
            </Route>
            <Route path="/apezone">
              <ApeZone />
            </Route>
            <Route exact path="/teams">
              <Teams />
            </Route>
            <Route path="/teams/:id">
              <Team />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/stats">
              <Stats />
            </Route>
            {/* Redirect */}
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route>
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Menu>
      <ToastListener />
    </Router>
  )
}

export default React.memo(App)
