import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { MarketingModal, useWalletModal } from '@apeswapfinance/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const MarketingModalCheck = () => {
  const location = useLocation()
  const history = useHistory()
  const { login, logout } = useAuth()
  const { t } = useTranslation()

  const { onPresentConnectModal } = useWalletModal(login, logout)
  const correctDisplayRoute = location.search.includes('modal=1')

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

  return (
    correctDisplayRoute && (
      <MarketingModal
        title={t("Welcome to ApeSwap's Farms")}
        description={t('Start earning passive income with your cryptocurrency!')}
        onDismiss={onDismiss}
        goToFarms={openFarmsLink}
        goToLiquidity={openLiquidityLink}
        connectWallet={openConnectModal}
        startEarning={onDismiss}
      />
    )
  )
}

export default React.memo(MarketingModalCheck)
