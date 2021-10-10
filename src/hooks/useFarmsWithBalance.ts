import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import masterChefABI from 'config/abi/masterchef.json'
import { farmsConfig } from 'config/constants'
import { FarmConfig } from 'config/constants/types'
import multicall from 'utils/multicall'
import useRefresh from './useRefresh'
import { useMasterChefAddress } from './useAddress'
import { useMulticallContract } from './useContract'

export interface FarmWithBalance extends FarmConfig {
  balance: BigNumber
}

const useFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState<FarmWithBalance[]>([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const multicallContract = useMulticallContract()
  const masterChefAddress = useMasterChefAddress()

  useEffect(() => {
    const fetchBalances = async () => {
      const calls = farmsConfig.map((farm) => ({
        address: masterChefAddress,
        name: 'pendingCake',
        params: [farm.pid, account],
      }))

      const rawResults = await multicall(multicallContract, masterChefABI, calls)
      const results = farmsConfig.map((farm, index) => ({ ...farm, balance: new BigNumber(rawResults[index]) }))

      setFarmsWithBalances(results)
    }

    if (account) {
      fetchBalances()
    }
  }, [account, fastRefresh, multicallContract, masterChefAddress])

  return farmsWithBalances
}

export default useFarmsWithBalance
