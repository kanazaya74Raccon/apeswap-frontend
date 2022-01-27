import { useCallback } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import track from 'utils/track'
import { Contract } from 'ethers'

const useFourPhaseIAOHarvest = (contract: Contract, setPendingTx: (f: boolean) => unknown) => {
  const { account, chainId } = useActiveWeb3React()

  const handleClaim = useCallback(
    async (harvestPeriod: number) => {
      try {
        setPendingTx(true)
        const tx = await contract.harvest(harvestPeriod).send({ from: account })

        track({
          event: 'iao',
          chain: chainId,
          data: {
            cat: 'claim',
            contract: tx.to,
            instance: harvestPeriod,
          },
        })
      } catch (e) {
        console.error('Claim error', e)
      }

      setPendingTx(false)
    },
    [account, contract, setPendingTx, chainId],
  )

  return handleClaim
}

export default useFourPhaseIAOHarvest
