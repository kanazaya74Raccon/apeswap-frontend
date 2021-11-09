import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { nextAuction } from 'utils/callHelpers'
import { useAuction } from './useContract'

const useNextAuction = () => {
  const { account } = useWeb3React()
  const auctionContract = useAuction()

  const handleNextAuction = useCallback(
    async (id) => {
      try {
        const txHash = await nextAuction(auctionContract, id, account)
        console.info(txHash)
      } catch (e) {
        console.warn(e)
      }
    },
    [account, auctionContract],
  )

  return { onNextAuction: handleNextAuction }
}

export default useNextAuction
