import { useCallback } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { userBuyBill, userClaimBill } from 'utils/callHelpers'
import { useBillContract } from 'hooks/useContract'
import track from 'utils/track'

// Claim a Bill
const useClaimBill = (billAddress: string, billId: string) => {
  const { chainId } = useActiveWeb3React()
  const billContract = useBillContract(billAddress)
  const handleClaimBill = useCallback(async () => {
    const tx = await userClaimBill(billContract, billId)
    track({
      event: 'bill',
      chain: chainId,
      data: {
        cat: 'claim',
        address: billContract.address,
        id: billId,
      },
    })
    return tx
  }, [billContract, billId, chainId])

  return { onClaimBill: handleClaimBill }
}

export default useClaimBill
