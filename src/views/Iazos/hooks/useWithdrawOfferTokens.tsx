import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { withdrawOfferTokensOnFailure } from 'utils/callHelpers'
import { useIazoContract } from 'hooks/useContract'

const useWithdrawOfferTokens = (iazoAddress: string) => {
  const { account } = useWeb3React()
  const iazoContract = useIazoContract(iazoAddress)
  const handleWithdraw = useCallback(async () => {
    try {
      const tx = await withdrawOfferTokensOnFailure(iazoContract, account)
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, iazoContract])

  return { onWithdraw: handleWithdraw }
}

export default useWithdrawOfferTokens
