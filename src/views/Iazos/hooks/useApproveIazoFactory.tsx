import { useCallback } from 'react'
import { ethers } from 'ethers'
import { useIazoFactoryAddress } from 'hooks/useAddress'
import { useERC20 } from 'hooks/useContract'

// Approve iazo factory
const useApproveIazoFactory = (tokenAddress: string) => {
  const iazoFactoryAddress = useIazoFactoryAddress()
  const tokenContract = useERC20(tokenAddress)
  const handleApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.approve(iazoFactoryAddress, ethers.constants.MaxUint256)
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [iazoFactoryAddress, tokenContract])

  return { onApprove: handleApprove }
}

export default useApproveIazoFactory
