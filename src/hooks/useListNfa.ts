import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import track from 'utils/track'
import { CHAIN_ID } from 'config/constants'
import { listNfa } from 'utils/callHelpers'
import { useAuction } from './useContract'

const useListNfa = () => {
  const { account } = useWeb3React()
  const auctionContract = useAuction()

  const handleListNfa = useCallback(
    async (id, auctionLength, timeToExtend, minimumExtendTime, minimumBid) => {
      try {
        const txHash = await listNfa(
          auctionContract,
          id,
          auctionLength,
          timeToExtend,
          minimumExtendTime,
          minimumBid,
          account,
        )
        track({
          event: 'nfa',
          chain: CHAIN_ID,
          data: {
            cat: 'add-auction',
            id,
            auctionLength,
            extendTime: timeToExtend,
            minimumBid,
          },
        })
        console.info(txHash)
      } catch (e) {
        console.warn(e)
      }
    },
    [account, auctionContract],
  )

  return { onListNfa: handleListNfa }
}

export default useListNfa
