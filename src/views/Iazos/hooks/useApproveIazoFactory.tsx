import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useIazoFactoryAddress } from 'hooks/useAddress'
import { useERC20 } from 'hooks/useContract'

// Approve iazo factory
const useApproveIazoFactory = (tokenAddress: string) => {
  const { account } = useWeb3React()
  const iazoFactoryAddress = useIazoFactoryAddress()
  const tokenContract = useERC20(tokenAddress)
  const handleApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.methods
        .approve(iazoFactoryAddress, ethers.constants.MaxUint256)
        .send({ from: account })
      return tx
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, iazoFactoryAddress, tokenContract])

  return { onApprove: handleApprove }
}

export default useApproveIazoFactory
