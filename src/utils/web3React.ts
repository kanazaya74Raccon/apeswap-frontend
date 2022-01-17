import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { ConnectorNames } from '@apeswapfinance/uikit'
import { BscConnector } from '@binance-chain/bsc-connector'
import getRpcUrl from 'utils/getRpcUrl'
import { CHAIN_ID } from 'config/constants/chains'
import { Web3Provider } from '@ethersproject/providers'

const POLLING_INTERVAL = 15000

// When adding a new chain we need to add the CHAIN_ID to the supported chains

const injected = new InjectedConnector({
  supportedChainIds: [CHAIN_ID.BSC, CHAIN_ID.BSC_TESTNET, CHAIN_ID.MATIC, CHAIN_ID.MATIC_TESTNET],
})

const walletconnect = new WalletConnectConnector({
  rpc: { [CHAIN_ID.BSC]: getRpcUrl(CHAIN_ID.BSC) },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

const bscConnector = new BscConnector({ supportedChainIds: [CHAIN_ID.BSC] })

export const walletlink = new WalletLinkConnector({
  url: getRpcUrl(CHAIN_ID.BSC),
  supportedChainIds: [CHAIN_ID.BSC],
  appName: 'Apeswap',
  darkMode: true,
  appLogoUrl: 'https://apeswap.finance/logo.png',
})

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector,
  [ConnectorNames.Walletlink]: walletlink
}

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}
