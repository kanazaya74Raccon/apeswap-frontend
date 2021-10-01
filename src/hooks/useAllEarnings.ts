import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import masterChefABI from 'config/abi/masterchef.json'
import { farmsConfig } from 'config/constants'
import multicall from 'utils/multicall'
import { useMasterChefAddress, useMulticallAddress } from './useAddress'
import useRefresh from './useRefresh'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const masterChefAddress = useMasterChefAddress()
  const multicallAddress = useMulticallAddress()

  useEffect(() => {
    const fetchAllBalances = async () => {
      const calls = farmsConfig.map((farm) => ({
        address: masterChefAddress,
        name: 'pendingCake',
        params: [farm.pid, account],
      }))

      const res = await multicall(multicallAddress, masterChefABI, calls)

      setBalance(res)
    }

    if (account) {
      fetchAllBalances()
    }
  }, [account, fastRefresh, masterChefAddress, multicallAddress])

  return balances
}

export default useAllEarnings
