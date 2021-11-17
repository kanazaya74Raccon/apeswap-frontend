import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useERC20 } from 'hooks/useContract'

// Approve an iazo
const useApproveIazo = (tokenAddress: string, iazoAddress: string) => {
  const { account } = useWeb3React()
  const tokenContract = useERC20(tokenAddress)
  const handleApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.methods.approve(iazoAddress, ethers.constants.MaxUint256).send({ from: account })
      return tx
    } catch {
      return false
    }
  }, [account, iazoAddress, tokenContract])

  return { onApprove: handleApprove }
}

export default useApproveIazo
