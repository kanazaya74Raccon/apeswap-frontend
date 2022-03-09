import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { MarketModal, useWalletModal } from '@apeswapfinance/uikit'
import useAuth from 'hooks/useAuth'
import { LendingBodies } from 'components/MarketingModalContent/Lending/'

const MarketingModalCheck = () => {
  const location = useLocation()
  const history = useHistory()
  const { login, logout } = useAuth()

  const { onPresentConnectModal } = useWalletModal(login, logout)
  const lendingRoute = location.search.includes('modal=1')
  const farmsRoute = location.search.includes('modal=2')
  const poolsRoute = location.search.includes('modal=3')

  const { LendingBody1, LendingBody2, LendingBody3, LendingBody4, LendingBody5 } = LendingBodies

  const onDismiss = () => {
    history.push({
      pathname: location.pathname,
    })
  }

  const openFarmsLink = () => {
    return window.open('https://apeswap.finance/farms', '_blank')
  }

  const openLiquidityLink = () => {
    return window.open('https://apeswap.finance/add', '_blank')
  }

  const openConnectModal = () => {
    onPresentConnectModal()
  }

  const lending = [<LendingBody1 />, <LendingBody2 />, <LendingBody3 />, <LendingBody4 />, <LendingBody5 />]
  const farms = [<p>Farms modal</p>, <p>body 2</p>, <p>body 3</p>]
  const pools = [<p>Pools modal</p>, <p>body 2</p>, <p>body 3</p>]

  return lendingRoute ? (
    <MarketModal
      title="Welcome to ApeSwap's Lending Network"
      description="How does it work?"
      onDismiss={onDismiss}
      startEarning={onDismiss}
    >
      {lending}
    </MarketModal>
  ) : farmsRoute ? (
    <MarketModal
      title="Welcome to ApeSwap's Farms"
      description="Start earning passive income with your cryptocurrency!"
      onDismiss={onDismiss}
      startEarning={onDismiss}
    >
      {farms}
    </MarketModal>
  ) : poolsRoute ? (
    <MarketModal
      title="Welcome to ApeSwap's Pools"
      description="Earn tokens by staking BANANA or GNANA"
      onDismiss={onDismiss}
      startEarning={onDismiss}
    >
      {pools}
    </MarketModal>
  ) : null
}

export default React.memo(MarketingModalCheck)
