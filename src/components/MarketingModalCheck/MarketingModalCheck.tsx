import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { MarketingModal } from '@apeswapfinance/uikit'

const MarketingModalCheck = () => {
  const location = useLocation()
  const history = useHistory()

  const correctDisplayRoute = location.search.includes('modal=1')

  const onDismiss = () => {
    history.push({
      pathname: '/',
    })
  }

  return (
    correctDisplayRoute && (
      <MarketingModal
        title="Welcome to ApeSwap's Farms"
        description="Start earning passive income with your cryptocurrency!"
        onDismiss={onDismiss}
        goToFarms={() => null}
        goToLiquidity={() => null}
        connectWallet={() => null}
        startEarning={() => null}
      />
    )
  )
}

export default MarketingModalCheck
