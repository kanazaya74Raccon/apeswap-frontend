import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Providers from './Providers'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'



function Updaters() {
  return (
    <>
      <ListsUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
      <Updaters />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)
