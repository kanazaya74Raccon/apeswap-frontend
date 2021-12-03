import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { removeAuction } from 'utils/callHelpers'
import { useAuction } from './useContract'

const useRemoveAuction = () => {
  const { account } = useWeb3React()
  const auctionContract = useAuction()

  const handleRemoveAuction = useCallback(
    async (id) => {
      try {
        const txHash = await removeAuction(auctionContract, id, account)
        console.info(txHash)
      } catch (e) {
        console.warn(e)
      }
    },
    [account, auctionContract],
  )

  return { onRemoveAuction: handleRemoveAuction }
}

export default useRemoveAuction
