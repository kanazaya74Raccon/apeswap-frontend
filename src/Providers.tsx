import React from 'react'
import { ModalProvider } from '@apeswapfinance/uikit'
import { Web3ReactProvider } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { getLibrary } from 'utils/web3React'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { BlockContextProvider } from 'contexts/BlockContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import store from 'state'

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <HelmetProvider>
          <ThemeContextProvider>
            <BlockContextProvider>
              <RefreshContextProvider>
                <ModalProvider>{children}</ModalProvider>
              </RefreshContextProvider>
            </BlockContextProvider>
          </ThemeContextProvider>
        </HelmetProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers
