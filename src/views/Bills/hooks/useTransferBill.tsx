import { useCallback } from 'react'
import { useBillNftContract } from 'hooks/useContract'
import { userTransferBillNft } from 'utils/callHelpers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

// Transfer a bill
const useTransferBill = (billNftAddress: string, billId: string, toAddress: string) => {
  const { account } = useActiveWeb3React()
  const billNftContract = useBillNftContract(billNftAddress)
  const handleTransfer = useCallback(async () => {
    try {
      const tx = await userTransferBillNft(billNftContract, billId, account, toAddress)
      return tx
    } catch (e) {
      console.error(e)
      return null
    }
  }, [billId, toAddress, billNftContract, account])
  return { onTransfer: handleTransfer }
}

export default useTransferBill
