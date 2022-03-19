import React, { useEffect } from 'react'
import { Menu as UikitMenu } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useAuth from 'hooks/useAuth'
import { CHAIN_ID } from 'config/constants/chains'
import useTheme from 'hooks/useTheme'
import { useProfile, useTokenPrices } from 'state/hooks'
import useSelectNetwork from 'hooks/useSelectNetwork'
import track from 'utils/track'
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
  const currentMenu = () => {
    if (chainId === CHAIN_ID.BSC) {
      return bscConfig
    }
    if (chainId === CHAIN_ID.MATIC) {
      return maticConfig
    }
    return bscConfig
  }

  useEffect(() => {
    const theme = !isDark
    const mode = !theme ? 'light' : 'dark'
    track({
      event: 'themeSwitcher',
      chain: chainId,
      data: { mode },
    })
  }, [isDark, chainId])

  // const changeTheme = () => {
  //   toggleTheme()
  //   const theme = !isDark
  //   const mode = !theme ? 'light' : 'dark'
  //   track({
  //     event: 'themeSwitcher',
  //     chain: chainId,
  //     data: {
  //       mode,
  //     },
  //   })
  // }

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
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
