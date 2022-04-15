import { useCallback } from 'react'
import { ethers } from 'ethers'
import { useIazoFactoryAddress } from 'hooks/useAddress'
import { useERC20 } from 'hooks/useContract'

// Approve iazo factory
const useApproveIazoFactory = (tokenAddress: string) => {
  const iazoFactoryAddress = useIazoFactoryAddress()
  const tokenContract = useERC20(tokenAddress)
  const handleApprove = useCallback(async () => {
    const tx = await (await tokenContract.approve(iazoFactoryAddress, ethers.constants.MaxUint256)).wait()
    return tx
  }, [iazoFactoryAddress, tokenContract])

  return { onApprove: handleApprove }
}

export default useApproveIazoFactory
