import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useERC20 } from 'hooks/useContract'
import { useEffect, useState } from 'react'

const useBillAlowance = (tokenAddress: string, billAddress: string, dependency?: boolean) => {
  const { account } = useWeb3React()
  const [allowance, setAllowance] = useState(null)
  const tokenContract = useERC20(tokenAddress)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tokenContract.allowance(account, billAddress)
        setAllowance(new BigNumber(res?.toString()))
      } catch (e) {
        console.error(e)
        setAllowance(null)
      }
    }
    fetch()
  }, [account, billAddress, tokenAddress, dependency, tokenContract])

  return allowance
}

export default useBillAlowance
