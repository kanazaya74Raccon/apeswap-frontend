import React from 'react'
import { Navbar as UikitMenu } from '@apeswapfinance/uikit'
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

  const navbarApiResult = [
    {
      id: 1,
      settings: [
        { id: 1, label: 'Raise', settings: [{ id: 1, tag: 'LIVE', navItem: 'Official IAO' }] },
        { id: 2, label: 'Collect', settings: [{ id: 2, tag: 'LIVE', navItem: 'NFA Auction' }] },
      ],
      published_at: '2022-04-11T18:15:41.981Z',
      created_at: '2022-04-11T18:15:39.418Z',
      updated_at: '2022-04-12T14:20:12.100Z',
    },
  ][0].settings

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
      no
      profile={{
        image: profile ? profile?.rarestNft.image : null,
        noProfileLink: '/nft',
        profileLink: '',
      }}
      track={track}
      liveResult={navbarApiResult}
      {...props}
    />
  )
}

export default Menu
