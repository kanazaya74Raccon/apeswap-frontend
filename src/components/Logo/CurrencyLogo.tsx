import { Currency, ETHER, Token } from '@apeswapfinance/sdk'
import { BinanceIcon} from '@apeswapfinance/uikit'
import { CHAIN_ID } from 'config/constants/chains'
import { getMaticTokenLogoURL } from 'config/constants/maticTokenMapping'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from './Logo'

const getTokenLogoURL = (address: string, chainId: any) => {
  let imageURL
  if (chainId === CHAIN_ID.BSC) {
    if (address?.toLowerCase() === '0x55d398326f99059fF775485246999027B3197955'.toLowerCase()) {
      imageURL = 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/USDT.svg'
    } else {
      imageURL = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${address}/logo.png`
    }
  } else if (chainId === CHAIN_ID.MATIC) {
    imageURL = getMaticTokenLogoURL(address)
  } else {
    imageURL = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
  }
  return imageURL
}

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`
const StyledNativeCurrencyLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 10px;
`
export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const { chainId } = useActiveWeb3React()
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address, chainId)]
      }

      return [getTokenLogoURL(currency.address, chainId)]
    }
    return []
  }, [chainId, currency, uriLocations])

  if (currency === ETHER && chainId) {
    if (chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET) {
      return (
        <StyledNativeCurrencyLogo
          size={size}
          style={style}
          src="https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/MATIC.svg"
        />
      )
    }
    return <BinanceIcon width={size} style={style} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.getSymbol(chainId) ?? 'token'} logo`} style={style} />
}
