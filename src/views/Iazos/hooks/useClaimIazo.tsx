import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { userWithdraw } from 'utils/callHelpers'
import { useIazoContract } from 'hooks/useContract'
import track from 'utils/track'

const useClaimIazo = (iazoAddress: string) => {
  const { chainId } = useWeb3React()
  const iazoContract = useIazoContract(iazoAddress)
  const handleClaim = useCallback(async () => {
    try {
      const tx = await userWithdraw(iazoContract)

      track({
        event: 'iazo',
        chain: chainId,
        data: {
          cat: 'claim',
          address: iazoAddress,
        },
      })

      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [iazoContract, iazoAddress, chainId])

  return { onClaim: handleClaim }
}

export default useClaimIazo
