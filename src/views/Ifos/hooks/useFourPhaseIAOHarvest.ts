import { useCallback } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import track from 'utils/track'
import { Contract } from 'ethers'

const useFourPhaseIAOHarvest = (contract: Contract, setPendingTx: (f: boolean) => unknown) => {
  const { chainId } = useActiveWeb3React()

  const handleClaim = useCallback(
    async (harvestPeriod: number) => {
      try {
        setPendingTx(true)
        const tx = await contract.harvest(harvestPeriod)

        await tx.wait()

        track({
          event: 'iao',
          chain: chainId,
          data: {
            cat: 'claim',
            contract: contract.address,
            instance: harvestPeriod,
          },
        })
      } catch (e) {
        console.error('Claim error', e)
      }

      setPendingTx(false)
    },
    [contract, setPendingTx, chainId],
  )

  return handleClaim
}

export default useFourPhaseIAOHarvest
