import React from 'react'
import { ModalProvider } from '@apeswapfinance/uikit'
import bsc, { UseWalletProvider } from '@binance-chain/bsc-use-wallet'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import getRpcUrl from 'utils/getRpcUrl'
import { LanguageContextProvider } from 'contexts/Localisation/languageContext'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { BlockContextProvider } from 'contexts/BlockContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import store from 'state'

const Providers: React.FC = ({ children }) => {
  const rpcUrl = getRpcUrl()

  return (
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
  )
}

export default Providers
