import React, { useContext } from 'react'
import { Menu as UikitMenu } from '@apeswapfinance/uikit'

import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'
import { CHAIN_ID } from 'config/constants/chains'

import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { useNetworkChainId, useProfile, useTokenPrices } from 'state/hooks'
import useSelectNetwork from 'hooks/useSelectNetwork'
import bscConfig from './chains/bscConfig'
import maticConfig from './chains/maticConfig'

const Menu = (props) => {
  const { account } = useWeb3React()
  const chainId = useNetworkChainId()
  const { login, logout } = useAuth()
  const { switchNetwork } = useSelectNetwork()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const { tokenPrices } = useTokenPrices()
  const bananaPriceUsd = tokenPrices?.find((token) => token.symbol === 'BANANA')?.price
  const { profile } = useProfile()
  const currentMenu = () => {
    if (chainId === CHAIN_ID.BSC) {
      return bscConfig
    }
    if (chainId === CHAIN_ID.MATIC) {
      return maticConfig
    }
    return bscConfig
  }

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      setLang={setSelectedLanguage}
      bananaPriceUsd={bananaPriceUsd}
      links={currentMenu()}
      chainId={chainId}
      switchNetwork={switchNetwork}
      profile={{
        image: profile ? profile?.rarestNft.image : null,
        noProfileLink: '/nft',
      }}
      {...props}
    />
  )
}

export default Menu
