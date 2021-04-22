import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import bananaABI from 'config/abi/banana.json'
import { getContract, httpProvider } from 'utils/web3'
import { getTokenBalance } from 'utils/erc20'
import { getBananaAddress } from 'utils/addressHelpers'
import useRefresh from './useRefresh'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(ethereum, tokenAddress, account)
      setBalance(new BigNumber(res))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, fastRefresh])

  return balance
}

export const useAccountTokenBalance = (account: string, tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { ethereum }: { ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(ethereum, tokenAddress, account)
      setBalance(new BigNumber(res))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, fastRefresh])

  return balance
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const bananaContract = getContract(bananaABI, getBananaAddress())
      const supply = await bananaContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useBurnedBalance = (tokenAddress: string) => {
  const { slowRefresh } = useRefresh()
  const [balance, setBalance] = useState(new BigNumber(0))

  useEffect(() => {
    async function fetchTotalSupply() {
      const res = await getTokenBalance(httpProvider, tokenAddress, '0x000000000000000000000000000000000000dEaD')
      setBalance(new BigNumber(res))
    }

    fetchTotalSupply()
  }, [slowRefresh, tokenAddress])

  return balance
}

export default useTokenBalance
