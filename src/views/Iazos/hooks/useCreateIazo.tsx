import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useIazoFactoryContract } from 'hooks/useContract'
import { createNewIazo } from 'utils/callHelpers'
import track from 'utils/track'

// Approve an iazo
const useCreateIazo = (iazoToken: string, baseToken: string, burnRemains: boolean, unitParams, creationFee: string) => {
  const { account, chainId } = useWeb3React()
  const iazoFactoryContract = useIazoFactoryContract()
  const handleCreateIazo = useCallback(async () => {
    try {
      const tx = await createNewIazo(
        iazoFactoryContract,
        account,
        iazoToken,
        baseToken,
        burnRemains,
        unitParams,
        creationFee,
      )

      track({
        event: 'iazo',
        chain: chainId,
        data: {
          cat: 'create',
          account,
          iazoToken,
          baseToken,
          tokenPrice: unitParams[0],
          amount: unitParams[1],
          softcap: unitParams[2],
          startDate: unitParams[3],
          lockPeriod: unitParams[5],
          duration: unitParams[4],
          liquidityPercent: unitParams[7],
          listingPrice: unitParams[8],
        },
      })

      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, iazoFactoryContract, iazoToken, baseToken, burnRemains, unitParams, creationFee, chainId])

  return { onCreateIazo: handleCreateIazo }
}

export default useCreateIazo
