import React from 'react'
import { ModalProvider } from '@apeswapfinance/uikit'
import { Web3ReactProvider } from '@web3-react/core'
import bsc, { UseWalletProvider } from '@binance-chain/bsc-use-wallet'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { getLibrary } from 'utils/web3React'
import getRpcUrl from 'utils/getRpcUrl'
import { LanguageContextProvider } from 'contexts/Localisation/languageContext'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { BlockContextProvider } from 'contexts/BlockContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import store from 'state'

const Providers: React.FC = ({ children }) => {
  const rpcUrl = getRpcUrl()

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <HelmetProvider>
          <ThemeContextProvider>
            <LanguageContextProvider>
              <UseWalletProvider
                chainId={parseInt(process.env.REACT_APP_CHAIN_ID)}
                connectors={{
                  walletconnect: { rpcUrl },
                  bsc,
                }}
              >
                <BlockContextProvider>
                  <RefreshContextProvider>
                    <ModalProvider>{children}</ModalProvider>
                  </RefreshContextProvider>
                </BlockContextProvider>
              </UseWalletProvider>
            </LanguageContextProvider>
          </ThemeContextProvider>
        </HelmetProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers
