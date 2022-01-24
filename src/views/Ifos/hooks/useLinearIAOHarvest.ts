import { useCallback } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import track from 'utils/track'
import { Contract } from 'ethers'

const useLinearIAOHarvest = (contract: Contract, setPendingTx: (f: boolean) => unknown) => {
  const { account, chainId } = useActiveWeb3React()

  const handleClaim = useCallback(async () => {
    try {
      setPendingTx(true)
      const tx = await contract.harvest().send({ from: account })

      track({
        event: 'iao',
        chain: chainId,
        data: {
          cat: 'claim',
          contract: tx.to,
        },
      })
    } catch (e) {
      console.error('Claim error', e)
    }

    setPendingTx(false)
  }, [account, contract, setPendingTx, chainId])

  return handleClaim
}

export default useLinearIAOHarvest
