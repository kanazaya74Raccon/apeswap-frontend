import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import masterChefABI from 'config/abi/masterchef.json'
import miniChefABI from 'config/abi/miniApeV2.json'
import { dualFarmsConfig, farmsConfig } from 'config/constants'
import { CHAIN_ID } from 'config/constants/chains'
import multicall from 'utils/multicall'
import useRefresh from './useRefresh'
import { useMasterChefAddress, useMiniChefAddress } from './useAddress'
import { useMulticallContract } from './useContract'

const useFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState([])
  const { account, chainId } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const multicallContract = useMulticallContract()
  const masterChefAddress = useMasterChefAddress()
  const miniChefAddress = useMiniChefAddress()

  useEffect(() => {
    const fetchBSCBalances = async () => {
      try {
        const calls = farmsConfig.map((farm) => ({
          address: masterChefAddress,
          name: 'pendingCake',
          params: [farm.pid, account],
        }))

        const rawResults = await multicall(multicallContract, masterChefABI, calls)
        const results = farmsConfig.map((farm, index) => ({ ...farm, balance: new BigNumber(rawResults[index]) }))

        setFarmsWithBalances(results)
      } catch (e) {
        console.warn(e)
      }
    }

    const fetchMiniChefBalances = async () => {
      try {
        const filteredDualFarms = dualFarmsConfig.filter((farm) => farm.network === chainId)
        const calls = filteredDualFarms.map((farm) => ({
          address: miniChefAddress,
          name: 'pendingBanana',
          params: [farm.pid, account],
        }))

        const rawResults = await multicall(multicallContract, miniChefABI, calls)
        const results = filteredDualFarms.map((farm, index) => ({ ...farm, balance: new BigNumber(rawResults[index]) }))

        setFarmsWithBalances(results)
      } catch (e) {
        console.warn(e)
      }
    }

    if (account) {
      if (chainId === CHAIN_ID.BSC) {
        fetchBSCBalances()
      }
      if (chainId === CHAIN_ID.MATIC) {
        fetchMiniChefBalances()
      }
    }
  }, [account, fastRefresh, multicallContract, masterChefAddress, miniChefAddress, chainId])

  return farmsWithBalances
}

export default useFarmsWithBalance
