import { useCallback } from 'react'
import { withdrawOfferTokensOnFailure } from 'utils/callHelpers'
import { useIazoContract } from 'hooks/useContract'

const useWithdrawOfferTokens = (iazoAddress: string) => {
  const iazoContract = useIazoContract(iazoAddress)
  const handleWithdraw = useCallback(async () => {
    try {
      const tx = await withdrawOfferTokensOnFailure(iazoContract)
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [iazoContract])

  return { onWithdraw: handleWithdraw }
}

export default useWithdrawOfferTokens
