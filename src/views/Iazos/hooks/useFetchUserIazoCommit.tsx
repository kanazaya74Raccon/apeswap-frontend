import { useWeb3React } from '@web3-react/core'
import iazoAbi from 'config/abi/iazo.json'
import { useEffect, useState } from 'react'
import multicall from 'utils/multicall'

export interface UserCommit {
  deposited: string
  tokensBought: string
}

const useFetchUserIazoCommit = (iazoAddress: string, dependency?: boolean) => {
  const { chainId, account } = useWeb3React()
  const [commited, setCommited] = useState<UserCommit>({ deposited: null, tokensBought: null })

  useEffect(() => {
    const fetch = async () => {
      try {
        const buyers = await multicall(chainId, iazoAbi, [{ address: iazoAddress, name: 'BUYERS', params: [account] }])
        setCommited({ deposited: buyers[0][0].toString(), tokensBought: buyers[0][1].toString() })
      } catch (e) {
        console.error(e)
      }
    }
    if (account) {
      fetch()
    }
  }, [account, iazoAddress, chainId, dependency])

  return commited
}
export default useFetchUserIazoCommit
