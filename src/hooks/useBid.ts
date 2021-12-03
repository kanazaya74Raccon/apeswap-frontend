import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { bid } from 'utils/callHelpers'
import { CHAIN_ID } from 'config/constants'
import track from 'utils/track'
import { useAuction } from './useContract'

const useBid = () => {
  const { account } = useWeb3React()
  const auctionContract = useAuction()

  const handleBid = useCallback(
    async (amount, id, auctionId) => {
      try {
        const txHash = await bid(auctionContract, amount, id, account)
        track({
          event: 'nfa',
          chain: CHAIN_ID,
          data: {
            id,
            auctionId,
            cat: 'bid',
            amount,
          },
        })
        console.info(txHash)
      } catch (e) {
        console.warn(e)
      }
    },
    [account, auctionContract],
  )

  return { onBid: handleBid }
}

export default useBid
