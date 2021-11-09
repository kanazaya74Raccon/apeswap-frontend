import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { useBanana, useLottery, useNonFungibleApes } from './useContract'
import { getAllowance } from '../utils/erc20'

// Retrieve lottery allowance
export const useLotteryAllowance = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useWeb3React()
  const lotteryContract = useLottery()
  const bananaContract = useBanana()

  useEffect(() => {
    const fetchAllowance = async () => {
      const res = await getAllowance(bananaContract, lotteryContract, account)
      setAllowance(new BigNumber(res))
    }

    if (account && bananaContract && bananaContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, bananaContract, lotteryContract])

  return allowance
}

// Retrieve IFO allowance
export const useIfoAllowance = (tokenContract: Contract, spenderAddress: string, dependency?: any) => {
  const { account } = useWeb3React()
  const [allowance, setAllowance] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tokenContract.methods.allowance(account, spenderAddress).call()
        setAllowance(new BigNumber(res))
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
        const res = await tokenContract.methods.isApprovedForAll(account, spenderAddress).call()
        setAllowance(res)
      } catch (e) {
        setAllowance(null)
      }
    }
    fetch()
  }, [account, spenderAddress, tokenContract, dependency])

  return allowance
}
