import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { CHAIN_ID } from 'config/constants'
import track from 'utils/track'

const useLinearIAOHarvest = (contract: any, setPendingTx: (f: boolean) => unknown) => {
  const { account } = useWeb3React()

  const handleClaim = useCallback(async () => {
    try {
      setPendingTx(true)
      const tx = await contract.methods.harvest().send({ from: account })

      track({
        event: 'iao',
        chain: CHAIN_ID,
        data: {
          cat: 'claim',
          contract: tx.to,
        },
      })
    } catch (e) {
      console.error('Claim error', e)
    }

    setPendingTx(false)
  }, [account, contract.methods, setPendingTx])

  return handleClaim
}

export default useLinearIAOHarvest
