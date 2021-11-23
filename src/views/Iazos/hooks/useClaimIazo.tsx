import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { userDeposit, userDepositNative, userWithdraw } from 'utils/callHelpers'
import { useIazoContract } from 'hooks/useContract'

// Approve an iazo
const useClaimIazo = (iazoAddress: string) => {
  const { account } = useWeb3React()
  const iazoContract = useIazoContract(iazoAddress)
  const handleClaim = useCallback(async () => {
    try {
      const tx = await userWithdraw(iazoContract, account)
      return tx
    } catch (e) {
      console.log(e)
      return false
    }
  }, [account, iazoContract])

  return { onClaim: handleClaim }
}

export default useClaimIazo
