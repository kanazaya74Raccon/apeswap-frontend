import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { userDeposit } from 'utils/callHelpers'
import { useIazoContract } from 'hooks/useContract'

// Approve an iazo
const useCommitToIazo = (iazoAddress: string, amount: string) => {
  const { account } = useWeb3React()
  const iazoContract = useIazoContract(iazoAddress)
  const handleCommitToIazo = useCallback(async () => {
    try {
      const tx = await userDeposit(iazoContract, amount, account)
      return tx
    } catch (e) {
      console.log(e)
      return false
    }
  }, [account, iazoContract, amount])

  return { onCommit: handleCommitToIazo }
}

export default useCommitToIazo
