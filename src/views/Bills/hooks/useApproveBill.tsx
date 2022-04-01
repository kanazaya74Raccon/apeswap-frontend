import { useCallback } from 'react'
import { ethers } from 'ethers'
import { useERC20 } from 'hooks/useContract'

// Approve a bill
const useApproveBill = (tokenAddress: string, billAddress: string) => {
  const tokenContract = useERC20(tokenAddress)
  const handleApprove = useCallback(async () => {
    const tx = await tokenContract.approve(billAddress, ethers.constants.MaxUint256).then((trx) => trx.wait())
    return tx
  }, [billAddress, tokenContract])
  return { onApprove: handleApprove }
}

export default useApproveBill
