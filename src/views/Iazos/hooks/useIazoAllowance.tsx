import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useERC20 } from 'hooks/useContract'
import { useEffect, useState } from 'react'

const useIazoAllowance = (tokenAddress: string, iazoAddress: string, dependency?: boolean) => {
  const { account } = useWeb3React()
  const [allowance, setAllowance] = useState(null)
  const tokenContract = useERC20(tokenAddress)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tokenContract.methods.allowance(account, iazoAddress).call()
        setAllowance(new BigNumber(res))
      } catch (e) {
        console.error(e)
        setAllowance(null)
      }
    }
    fetch()
  }, [account, iazoAddress, tokenAddress, dependency, tokenContract])

  return allowance
}

export default useIazoAllowance
