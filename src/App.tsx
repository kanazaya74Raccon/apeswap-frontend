import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useEagerConnect from 'hooks/useEagerConnect'
import { ResetCSS, ChevronUpIcon, ApeSwapTheme } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import MarketingModalCheck from 'components/MarketingModalCheck'
import { CHAIN_ID } from 'config/constants/chains'
import { useFetchTokenPrices, useFetchProfile, useUpdateNetwork } from 'state/hooks'
import { usePollBlockNumber } from 'state/block/hooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import Pool from './views/Pool'

declare module '@emotion/react' {
  export interface Theme extends ApeSwapTheme {}
}

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
// const Home = lazy(() => import('./views/Home'))
const Home = lazy(() => import('./views/Homepage'))
const Farms = lazy(() => import('./views/Farms'))
const Pools = lazy(() => import('./views/Pools'))
const JunglePools = lazy(() => import('./views/JunglePools'))
const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
const DualFarms = lazy(() => import('./views/DualFarms'))
const Nft = lazy(() => import('./views/Nft'))
const Nfa = lazy(() => import('./views/Nft/Nfa'))
const ApeZone = lazy(() => import('./views/ApeZone'))
const Stats = lazy(() => import('./views/Stats'))
const Auction = lazy(() => import('./views/Auction'))
const BurningGames = lazy(() => import('./views/BurningGames'))
const Iazos = lazy(() => import('./views/Iazos'))
const CreateIazo = lazy(() => import('./views/Iazos/components/CreateIazo'))
const IazoPage = lazy(() => import('./views/Iazos/components/IazoPage'))
const AdminPools = lazy(() => import('./views/AdminPools'))
const Vaults = lazy(() => import('./views/Vaults'))
const NfaStaking = lazy(() => import('./views/NfaStaking'))
const Bills = lazy(() => import('./views/Bills'))
const Swap = lazy(() => import('./views/Swap'))
const PoolFinder = lazy(() => import('./views/PoolFinder'))
const AddLiquidity = lazy(() => import('./views/AddLiquidity'))
const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'))
const RedirectOldRemoveLiquidityPathStructure = lazy(() => import('./views/RemoveLiquidity/redirects'))

const redirectSwap = () => import('./views/Swap/redirects')
const RedirectPathToSwapOnly = lazy(async () =>
  redirectSwap().then((r) => ({
    default: r.RedirectPathToSwapOnly,
  })),
)
const RedirectToSwap = lazy(async () =>
  redirectSwap().then((r) => ({
    default: r.RedirectToSwap,
  })),
)

const redirectAddLiquidity = () => import('./views/AddLiquidity/redirects')
const RedirectDuplicateTokenIds = lazy(async () =>
  redirectAddLiquidity().then((r) => ({
    default: r.RedirectDuplicateTokenIds,
  })),
)
const RedirectOldAddLiquidityPathStructure = lazy(async () =>
  redirectAddLiquidity().then((r) => ({
    default: r.RedirectOldAddLiquidityPathStructure,
  })),
)
const RedirectToAddLiquidity = lazy(async () =>
  redirectAddLiquidity().then((r) => ({
    default: r.RedirectToAddLiquidity,
  })),
)

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
  cursor: pointer;
`

const App: React.FC = () => {
  useUpdateNetwork()
  useEagerConnect()
  useFetchTokenPrices()
  usePollBlockNumber()
  useFetchProfile()

  const { account, chainId } = useActiveWeb3React()

  useEffect(() => {
    if (account) dataLayer?.push({ event: 'wallet_connect', user_id: account })
  }, [account])

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const swapRoutes = (
    <>
      <Route path="/swap" component={Swap} />
      <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
      <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
      <Route exact strict path="/find" component={PoolFinder} />
      <Route exact strict path="/pool" component={Pool} />
      <Route exact strict path="/create" component={RedirectToAddLiquidity} />
      <Route exact path="/add" component={AddLiquidity} />
      <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
      <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
      <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
      <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
    </>
  )

  const loadMenu = () => {
    // MATIC routes
    if (chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET) {
      return (
        <Menu>
          <Suspense fallback={<PageLoader />}>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/admin-pools">
                <AdminPools />
              </Route>
              <Route path="/farms">
                <DualFarms />
              </Route>
              <Route path="/swap" component={Swap} />
              <Route path="/vaults">
                <Vaults />
              </Route>
              {/* Redirects */}
              <Route exact path="/nft">
                <Redirect to="/" />
              </Route>
              <Route path="/pools">
                <Redirect to="/" />
              </Route>
              <Route path="/jungle-farms">
                <Redirect to="/" />
              </Route>
              <Route path="/admin-pools">
                <Redirect to="/" />
              </Route>
              <Route path="/iao">
                <Redirect to="/" />
              </Route>
              <Route path="/auction">
                <Redirect to="/" />
              </Route>
              <Route exact path="/nft">
                <Redirect to="/" />
              </Route>
              <Route path="/nft/:id">
                <Redirect to="/" />
              </Route>
              <Route path="/gnana">
                <Redirect to="/" />
              </Route>
              <Route path="/stats">
                <Redirect to="/" />
              </Route>
              <Route exact path="/ss-iao">
                <Redirect to="/" />
              </Route>
              <Route path="/ss-iao/create">
                <Redirect to="/" />
              </Route>
              <Route path="/ss-iao/:id">
                <Redirect to="/" />
              </Route>
              <Suspense fallback={<></>}>{swapRoutes}</Suspense>
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Menu>
      )
    }
    // Default BSC routes
    return (
      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route exact path="/nft">
              <Nft />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/swap" component={Swap} />
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/pools">
              <Pools />
            </Route>
            <Route path="/jungle-farms">
              <JunglePools />
            </Route>
            <Route path="/vaults">
              <Vaults />
            </Route>
            <Route path="/bills">
              <Bills />
            </Route>
            <Route path="/admin-pools">
              <AdminPools />
            </Route>
            <Route path="/iao">
              <Ifos />
            </Route>
            <Route path="/auction">
              <Auction />
            </Route>
            <Route exact path="/ss-iao">
              <Iazos />
            </Route>
            <Route path="/ss-iao/create">
              <CreateIazo />
            </Route>
            <Route path="/ss-iao/:id">
              <IazoPage />
            </Route>
            <Route exact path="/nft">
              <Nft />
            </Route>
            <Route path="/nft/:id">
              <Nfa />
            </Route>
            <Route path="/staking">
              <NfaStaking />
            </Route>
            <Route path="/gnana">
              <ApeZone />
            </Route>
            <Route path="/stats">
              <Stats />
            </Route>
            <Route path="/burn">
              <BurningGames />
            </Route>
            <Route path="/spinner">
              <PageLoader />
            </Route>
            {/* Redirect */}
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route>
            <Suspense fallback={<></>}>{swapRoutes}</Suspense>
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Menu>
    )
  }

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      <MarketingModalCheck />
      {(window.location.pathname === '/farms' ||
        window.location.pathname === '/pools' ||
        window.location.pathname === '/vaults' ||
        window.location.pathname === '/iazos') && <StyledChevronUpIcon onClick={scrollToTop} />}
      {loadMenu()}
      <ToastListener />
    </Router>
  )
}

export default React.memo(App)
