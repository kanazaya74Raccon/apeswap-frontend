import { useCallback } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import billAbi from 'config/abi/bill.json'
import { userClaimBill } from 'utils/callHelpers'
import { getContract } from 'utils'
import { Bill } from 'config/abi/types'

// Claim a Bill
const useClaimBill = (billMap: { billAddress: string; billIds: string[] }[]) => {
  const { account, library } = useActiveWeb3React()
  const handleClaimBill = useCallback(async () => {
    const billTrxs = billMap.map(async (bm) => {
      const billContract = getContract(bm.billAddress, billAbi, library, account) as Bill
      return userClaimBill(billContract, bm.billIds)
    })
    return Promise.all(billTrxs)
  }, [billMap, library, account])

  return { onClaimBill: handleClaimBill }
}

export default useClaimBill
