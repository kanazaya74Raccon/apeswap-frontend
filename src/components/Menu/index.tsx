import React, { useContext } from 'react'
import { Menu as UikitMenu } from '@apeswapfinance/uikit'

import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'

import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceBananaBusd, useProfile } from 'state/hooks'
import config from './config'

const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const bananaPriceUsd = usePriceBananaBusd()
  const { profile } = useProfile()

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      setLang={setSelectedLanguage}
      cakePriceUsd={bananaPriceUsd.toNumber()}
      links={config}
      profile={{
        image: profile ? profile?.rarestNft.image : null,
        noProfileLink: '/nft',
      }}
      {...props}
    />
  )
}

export default Menu
