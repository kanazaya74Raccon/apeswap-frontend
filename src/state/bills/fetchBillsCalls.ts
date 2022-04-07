import { BillsConfig } from 'config/constants/types'
import { Call } from 'utils/multicall'

const fetchBillsCalls = (bill: BillsConfig, chainId: number): Call[] => {
  const standardCalls = [
    // Get bill price with LP fees
    {
      address: bill.contractAddress[chainId],
      name: 'trueBillPrice',
    },
    // Get bill current debt
    {
      address: bill.contractAddress[chainId],
      name: 'currentDebt',
    },
    // Get bill current fee
    {
      address: bill.contractAddress[chainId],
      name: 'currentFee',
    },
    // Get bill debt decay
    {
      address: bill.contractAddress[chainId],
      name: 'debtDecay',
    },
    // Get bill debt ratio
    {
      address: bill.contractAddress[chainId],
      name: 'debtRatio',
    },
    // Get bill debt ratio
    {
      address: bill.contractAddress[chainId],
      name: 'totalDebt',
    },
    // Get bill debt ratio
    {
      address: bill.contractAddress[chainId],
      name: 'totalPayoutGiven',
    },
    // Get bill debt ratio
    {
      address: bill.contractAddress[chainId],
      name: 'totalPrincipalBilled',
    },
    // Get bill nft address
    {
      address: bill.contractAddress[chainId],
      name: 'billNft',
    },
    // Terms
    // (1) controlVariable (2) vestingTerm (3) minimumPrice (4) maxPayout (5) maxDebt
    {
      address: bill.contractAddress[chainId],
      name: 'terms',
    },
  ]

  return standardCalls
}

export default fetchBillsCalls
