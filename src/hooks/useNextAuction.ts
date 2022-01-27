import { useCallback } from 'react'
import { nextAuction } from 'utils/callHelpers'
import { useAuction } from './useContract'

const useNextAuction = () => {
  const auctionContract = useAuction()

  const handleNextAuction = useCallback(
    async (id) => {
      try {
        const txHash = await nextAuction(auctionContract, id)
        console.info(txHash)
      } catch (e) {
        console.warn(e)
      }
    },
    [auctionContract],
  )

  return { onNextAuction: handleNextAuction }
}

export default useNextAuction
