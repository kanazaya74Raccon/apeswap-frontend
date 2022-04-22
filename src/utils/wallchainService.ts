import { WALLCHAIN_PARAMS } from 'config/constants/chains'
import { Contract } from 'ethers'

type SearchSummary = {
  expectedProfit?: number
  firstTokenAddress?: string
  firstTokenAmount?: number
}

type TransactionArgs = {
  data: string
  destination: string
  sender: string
  value: string
}

type DataResponse = {
  pathFound: boolean
  summary?: { searchSummary?: SearchSummary }
  transactionArgs: TransactionArgs
}

const wallchainResponseIsValid = (
  dataResonse: DataResponse,
  value: string,
  account: string,
  contractAddress: string,
) => {
  if (!dataResonse.pathFound) {
    // Opportunity was not found -> response should be ignored -> valid.
    return true
  }
  return (
    dataResonse.transactionArgs.destination.toLowerCase() === contractAddress.toLowerCase() &&
    dataResonse.transactionArgs.value.toLowerCase() === value.toLowerCase() &&
    dataResonse.transactionArgs.sender.toLowerCase() === account.toLowerCase()
  )
}

const recordTransactionSummary = (dataResponse: DataResponse, chainId: number) => {
  return fetch('https://apeswap-strapi.sherokuapp.com/arbitrage-testings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstTokenAddress: dataResponse.summary?.searchSummary?.firstTokenAddress || '',
      expectedProfit: dataResponse.summary?.searchSummary?.expectedProfit || 0,
      firstTokenAmount: dataResponse.summary?.searchSummary?.firstTokenAmount || 0,
      chainId,
      sender: dataResponse.transactionArgs.sender,
    }),
  }).catch((error) => {
    console.error('Wallchain Txn Summary Recording Error', error)
  })
}

/**
 * Call Wallchain API to analyze the expected opportunity.
 * @param methodName function to execute in transaction
 * @param args arguments for the function
 * @param value value parameter for the transaction
 * @param chainId chainId of the blockchain
 * @param account account address from sender
 * @param contract ApeSwap Router contract
 */
export default function callWallchainAPI(
  methodName: string,
  args: (string | string[])[],
  value: string,
  chainId: number,
  account: string,
  contract: Contract,
): Promise<any> {
  const encodedData = contract.interface.encodeFunctionData(methodName, args)

  return fetch(`${WALLCHAIN_PARAMS[chainId].apiUrl}?key=${WALLCHAIN_PARAMS[chainId].apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      value,
      sender: account,
      data: encodedData,
      destination: contract.address,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      console.error('Wallchain Error', response.status, response.statusText)
      return null
    })
    .then((responseJson) => {
      if (responseJson) {
        const dataResonse: DataResponse = responseJson
        if (wallchainResponseIsValid(dataResonse, value, account, contract.address)) {
          return recordTransactionSummary(dataResonse, chainId)
        }
      }
      return null
    })
    .catch((error) => {
      console.error('Wallchain Error', error)
    })
}
