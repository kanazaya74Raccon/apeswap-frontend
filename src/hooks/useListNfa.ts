import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
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
        console.info(txHash)
      } catch (e) {
        console.log(e)
      }
    },
    [account, auctionContract],
  )

  return { onListNfa: handleListNfa }
}

export default useListNfa
