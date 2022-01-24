import { useCallback } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { userDeposit, userDepositNative } from 'utils/callHelpers'
import { useIazoContract } from 'hooks/useContract'
import track from 'utils/track'

// Approve an iazo
const useCommitToIazo = (iazoAddress: string, amount: string, isNative?: boolean) => {
  const { chainId } = useActiveWeb3React()
  const iazoContract = useIazoContract(iazoAddress)
  const handleCommitToIazo = useCallback(async () => {
    try {
      const tx = isNative
        ? await userDepositNative(iazoContract, amount)
        : await userDeposit(iazoContract, amount)

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
  }, [iazoContract, iazoAddress, amount, isNative, chainId])

  return { onCommit: handleCommitToIazo }
}

export default useCommitToIazo
