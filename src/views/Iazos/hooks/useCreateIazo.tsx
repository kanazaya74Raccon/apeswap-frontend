import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useIazoFactoryContract } from 'hooks/useContract'
import { createNewIazo } from 'utils/callHelpers'

// Approve an iazo
const useCreateIazo = (iazoToken: string, baseToken: string, burnRemains: boolean, unitParams, creationFee: string) => {
  const { account } = useWeb3React()
  const iazoFactoryContract = useIazoFactoryContract()
  const handleCreateIazo = useCallback(async () => {
    try {
      const tx = await createNewIazo(iazoFactoryContract, account, iazoToken, baseToken, burnRemains, unitParams, creationFee)
      return tx
    } catch (e) {
      console.log(e)
      return false
    }
  }, [account, iazoFactoryContract, iazoToken, baseToken, burnRemains, unitParams, creationFee])

  return { onCreateIazo: handleCreateIazo }
}

export default useCreateIazo
