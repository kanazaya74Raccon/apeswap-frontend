import { useWeb3React } from '@web3-react/core'
import iazoAbi from 'config/abi/iazo.json'
import multicallABI from 'config/abi/Multicall.json'
import { useEffect, useState } from 'react'
import { getMulticallAddress } from 'utils/addressHelper'
import multicall from 'utils/multicall'
import { getContract } from 'utils/web3'

export interface UserCommit {
  deposited: string
  tokensBought: string
}

const useFetchUserIazoCommit = (iazoAddress: string, dependency?: boolean) => {
  const { chainId, account } = useWeb3React()
  const multicallContractAddress = getMulticallAddress(chainId)
  const [commited, setCommited] = useState<UserCommit>({ deposited: null, tokensBought: null })

  useEffect(() => {
    const fetch = async () => {
      const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
      try {
        const buyers = await multicall(multicallContract, iazoAbi, [
          { address: iazoAddress, name: 'BUYERS', params: [account] },
        ])
        setCommited({ deposited: buyers[0][0].toString(), tokensBought: buyers[0][1].toString() })
      } catch (e) {
        console.error(e)
      }
    }
    if (account) {
      fetch()
    }
  }, [account, iazoAddress, multicallContractAddress, chainId, dependency])

  return commited
}
export default useFetchUserIazoCommit
