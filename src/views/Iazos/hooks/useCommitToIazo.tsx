import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { userDeposit, userDepositNative } from 'utils/callHelpers'
import { useIazoContract } from 'hooks/useContract'

// Approve an iazo
const useCommitToIazo = (iazoAddress: string, amount: string, isNative?: boolean) => {
  const { account } = useWeb3React()
  const iazoContract = useIazoContract(iazoAddress)
  const handleCommitToIazo = useCallback(async () => {
    try {
      const tx = isNative
        ? await userDepositNative(iazoContract, amount, account)
        : await userDeposit(iazoContract, amount, account)
      return tx
    } catch (e) {
      console.log(e)
      return false
    }
  }, [account, iazoContract, amount, isNative])

  return { onCommit: handleCommitToIazo }
}

export default useCommitToIazo
