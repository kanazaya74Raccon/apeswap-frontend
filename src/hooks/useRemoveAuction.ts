import { useCallback } from 'react'
import { removeAuction } from 'utils/callHelpers'
import { useAuction } from './useContract'

const useRemoveAuction = () => {
  const auctionContract = useAuction()

  const handleRemoveAuction = useCallback(
    async (id) => {
      try {
        const txHash = await removeAuction(auctionContract, id)
        console.info(txHash)
      } catch (e) {
        console.warn(e)
      }
    },
    [auctionContract],
  )

  return { onRemoveAuction: handleRemoveAuction }
}

export default useRemoveAuction
