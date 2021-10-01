import React, { useContext } from 'react'
import { Menu as UikitMenu } from '@apeswapfinance/uikit'

import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'

import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { useProfile, useTokenPrices } from 'state/hooks'
import bscConfig from './chains/bscConfig'
import maticConfig from './chains/maticConfig'

const Menu = (props) => {
  const { account, chainId } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const { tokenPrices } = useTokenPrices()
  const bananaPriceUsd = tokenPrices?.find((token) => token.symbol === 'BANANA')?.price
  const { profile } = useProfile()
  const currentMenu = () => {
    if (chainId === 56) {
      return bscConfig
    }
    if (chainId === 137) {
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
      cakePriceUsd={bananaPriceUsd}
      links={currentMenu()}
      profile={{
        image: profile ? profile?.rarestNft.image : null,
        noProfileLink: '/nft',
      }}
      {...props}
    />
  )
}

export default Menu
