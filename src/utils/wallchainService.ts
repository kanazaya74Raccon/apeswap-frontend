import { WALLCHAIN_PARAMS } from 'config/constants/chains'
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { getWeb3 } from './web3'

type SearchSummary = {
  expectedProfit: number
  firstTokenAddress: string
}

type TransactionArgs = {
  data: string
  destination: string
  sender: string
  value: string
}

export type DataResponse = {
  pathFound: boolean
  summary: { searchSummary: SearchSummary }
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

const getTransactionOpporunity = (dataResonse: DataResponse): SearchSummary => {
  if (dataResonse.pathFound) {
    return dataResonse.summary.searchSummary
  }
  return { expectedProfit: 0, firstTokenAddress: null }
}

/**
 * Call Wallchain API to analyze the expected opportunity.
 * @param methodName function to execute in transaction
 * @param args arguments for the function
 * @param value value parameter for the transaction
 * @param chainId chainId of the blockchain
 * @param account account address from sender
 * @param contractAddress ApeSwap Router contract address
 */
export default function callWallchainAPI(
  methodName: string,
  args: (string | string[])[],
  value: string,
  chainId: number,
  account: string,
  contractAddress: string,
): Promise<any> {
  const functionJsonInterface = IUniswapV2Router02ABI.find((el) => el.name === methodName)
  const web3 = getWeb3(chainId)
  const encodedData = web3.eth.abi.encodeFunctionCall(functionJsonInterface, args)

  return fetch(`${WALLCHAIN_PARAMS[chainId].apiUrl}?key=${WALLCHAIN_PARAMS[chainId].apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      value,
      sender: account,
      data: encodedData,
      destination: contractAddress,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      return null
    })
    .then((responseJson) => {
      if (responseJson) {
        const dataResonse: DataResponse = responseJson
        if (wallchainResponseIsValid(dataResonse, value, account, contractAddress)) {
          // eslint-disable-next-line
          const transactionOpportunity: SearchSummary = getTransactionOpporunity(dataResonse)
          // transactionOpportunity could be tracked for analysis.
        }
      }
    })
}
