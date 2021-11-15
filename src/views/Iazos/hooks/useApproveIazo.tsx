import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'

// Approve an iazo
export const useApproveIazo = (tokenContract: Contract, iazoAddress: string) => {
  const { account } = useWeb3React()
  const onApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.methods.approve(iazoAddress, ethers.constants.MaxUint256).send({ from: account })
      return tx
    } catch {
      return false
    }
  }, [account, iazoAddress, tokenContract])

  return onApprove
}
