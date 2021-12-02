import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { HomeModal } from '@apeswapfinance/uikit'

const HomeModalCheck = () => {
  const location = useLocation()
  const history = useHistory()

  const correctDisplayRoute = location.search.includes('?startModal=simple')

  const onDismiss = () => {
    history.push({
      pathname: '/',
    })
  }

  return (
    correctDisplayRoute && (
      <HomeModal
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

export default HomeModalCheck
