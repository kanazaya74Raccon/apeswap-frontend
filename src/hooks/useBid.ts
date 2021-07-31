import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { bid } from 'utils/callHelpers'
import { useAuction } from './useContract'

const useBid = () => {
  const { account } = useWeb3React()
  const auctionContract = useAuction()

  const handleBid = useCallback(
    async (amount, id) => {
      try {
        const txHash = await bid(auctionContract, amount, id, account)
        console.info(txHash)
      } catch (e) {
        console.log(e)
      }
    },
    [account, auctionContract],
  )

  return { onBid: handleBid }
}

export default useBid
