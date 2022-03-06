import React from 'react'
import { Menu as UikitMenu } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useAuth from 'hooks/useAuth'
import { CHAIN_ID } from 'config/constants/chains'
import useTheme from 'hooks/useTheme'
import { ContextApi } from 'contexts/Localization/types'
import { useTranslation } from 'contexts/Localization'
import { useProfile, useTokenPrices } from 'state/hooks'
import useSelectNetwork from 'hooks/useSelectNetwork'
import bscConfig from './chains/bscConfig'
import maticConfig from './chains/maticConfig'

const Menu = (props) => {
  const { account, chainId } = useActiveWeb3React()
  const { login, logout } = useAuth()
  const { switchNetwork } = useSelectNetwork()
  const { isDark, toggleTheme } = useTheme()
  const { tokenPrices } = useTokenPrices()
  const bananaPriceUsd = tokenPrices?.find((token) => token.symbol === 'BANANA')?.price
  const { profile } = useProfile()
  const { t } = useTranslation()
  const currentMenu = (translate: ContextApi['t']) => {
    if (chainId === CHAIN_ID.BSC) {
      return bscConfig(translate)
    }
    if (chainId === CHAIN_ID.MATIC) {
      return maticConfig(translate)
    }
    return bscConfig(translate)
  }

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      bananaPriceUsd={bananaPriceUsd}
      links={currentMenu(t)}
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
