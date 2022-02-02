import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useERC20, useNonFungibleApes } from './useContract'

// Retrieve IFO allowance
export const useIfoAllowance = (tokenAddress: string, spenderAddress: string, dependency?: any) => {
  const { account } = useWeb3React()
  const tokenContract = useERC20(tokenAddress)
  const [allowance, setAllowance] = useState<BigNumber | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tokenContract.allowance(account, spenderAddress)
        setAllowance(new BigNumber(res.toString()))
      } catch (e) {
        setAllowance(null)
      }
    }
    fetch()
  }, [account, spenderAddress, tokenContract, dependency])

  return allowance
}

export const useNfaAllowance = (spenderAddress: string, dependency?: any) => {
  const tokenContract = useNonFungibleApes()
  const { account } = useWeb3React()
  const [allowance, setAllowance] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tokenContract.isApprovedForAll(account, spenderAddress)
        setAllowance(res)
      } catch (e) {
        setAllowance(null)
      }
    }
    fetch()
  }, [account, spenderAddress, tokenContract, dependency])

  return allowance
}
