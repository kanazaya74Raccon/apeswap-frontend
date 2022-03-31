import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { MarketingModal } from '@apeswapfinance/uikit'
import { LendingBodies } from 'components/MarketingModalContent/Lending/'
import { FarmsBodies } from 'components/MarketingModalContent/Farms/'
import { PoolsBodies } from 'components/MarketingModalContent/Pools/'
import { BillsBodies } from 'components/MarketingModalContent/Bills/'

const MarketingModalCheck = () => {
  const location = useLocation()
  const history = useHistory()

  const farmsRoute = location.search.includes('modal=1')
  const poolsRoute = location.search.includes('modal=2')
  const lendingRoute = location.search.includes('modal=3')
  const billsRoute = location.search.includes('modal=bills')

  const { LendingBody1, LendingBody2, LendingBody3, LendingBody4, LendingBody5 } = LendingBodies
  const { FarmsBody1, FarmsBody2, FarmsBody3, FarmsBody4 } = FarmsBodies
  const { PoolsBody1, PoolsBody2, PoolsBody3, PoolsBody4 } = PoolsBodies
  const { BillsBody1 } = BillsBodies

  const onDismiss = () => {
    history.push({
      pathname: location.pathname,
    })
  }

  const lending = [<LendingBody1 />, <LendingBody2 />, <LendingBody3 />, <LendingBody4 />, <LendingBody5 />]
  const farms = [<FarmsBody1 />, <FarmsBody2 />, <FarmsBody3 />, <FarmsBody4 />]
  const pools = [<PoolsBody1 />, <PoolsBody2 />, <PoolsBody3 />, <PoolsBody4 />]
  const bills = [<BillsBody1 />]

  return lendingRoute ? (
    <MarketingModal
      title="Welcome to ApeSwap's Lending Network"
      description="How does it work?"
      onDismiss={onDismiss}
      startEarning={onDismiss}
    >
      {lending}
    </MarketingModal>
  ) : farmsRoute ? (
    <MarketingModal
      title="Welcome to ApeSwap's Farms"
      description="Start earning passive income with your cryptocurrency!"
      onDismiss={onDismiss}
      startEarning={onDismiss}
    >
      {farms}
    </MarketingModal>
  ) : poolsRoute ? (
    <MarketingModal
      title="Welcome to ApeSwap's Pools"
      description="Earn tokens by staking BANANA or GNANA"
      onDismiss={onDismiss}
      startEarning={onDismiss}
    >
      {pools}
    </MarketingModal>
  ) : billsRoute ? (
    <MarketingModal title="Welcome to ApeSwap Treasury Bills" onDismiss={onDismiss} startEarning={onDismiss}>
      {bills}
    </MarketingModal>
  ) : null
}

export default React.memo(MarketingModalCheck)
