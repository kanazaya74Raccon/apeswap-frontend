import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { userDeposit, userDepositNative } from 'utils/callHelpers'
import { useIazoContract } from 'hooks/useContract'
import track from 'utils/track'

// Approve an iazo
const useCommitToIazo = (iazoAddress: string, amount: string, isNative?: boolean) => {
  const { account, chainId } = useWeb3React()
  const iazoContract = useIazoContract(iazoAddress)
  const handleCommitToIazo = useCallback(async () => {
    try {
      const tx = isNative
        ? await userDepositNative(iazoContract, amount, account)
        : await userDeposit(iazoContract, amount, account)

      track({
        event: 'iazo',
        chain: chainId,
        data: {
          cat: 'commit',
          address: iazoAddress,
          amount,
        },
      })

      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, iazoContract, iazoAddress, amount, isNative, chainId])

  return { onCommit: handleCommitToIazo }
}

export default useCommitToIazo
