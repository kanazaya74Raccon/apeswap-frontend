import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import { useWeb3React } from '@web3-react/core'
import { getTokenBalance } from 'utils/erc20'
import { getContract, getWeb3 } from 'utils/web3'
import useRefresh from './useRefresh'
import { useBananaAddress } from './useAddress'
import useWeb3 from './useWeb3'
import { useERC20 } from './useContract'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, library, chainId } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const web3 = getWeb3(chainId)
      const tokenContract = getContract(erc20ABI, tokenAddress, chainId)
      const res = await getTokenBalance(web3, tokenAddress, account, tokenContract)
      setBalance(new BigNumber(res))
    }

    if (account && library) {
      fetchBalance()
    }
  }, [account, library, tokenAddress, fastRefresh, chainId])

  return balance
}

export const useAccountTokenBalance = (account: string, tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { fastRefresh } = useRefresh()
  const web3 = useWeb3()
  const tokenContract = useERC20(tokenAddress)

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(web3, tokenAddress, account, tokenContract)
      setBalance(new BigNumber(res))
    }

    if (account && web3) {
      fetchBalance()
    }
  }, [account, tokenAddress, fastRefresh, web3, tokenContract])

  return balance
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const bananaAddress = useBananaAddress()
  const bananaContract = useERC20(bananaAddress)

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await bananaContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh, bananaAddress, bananaContract])

  return totalSupply
}

export const useBurnedBalance = (tokenAddress: string) => {
  const { slowRefresh } = useRefresh()
  const [balance, setBalance] = useState(new BigNumber(0))
  const web3 = useWeb3()
  const tokenContract = useERC20(tokenAddress)

  useEffect(() => {
    async function fetchTotalSupply() {
      const res = await getTokenBalance(web3, tokenAddress, '0x000000000000000000000000000000000000dEaD', tokenContract)
      setBalance(new BigNumber(res))
    }

    fetchTotalSupply()
  }, [slowRefresh, tokenAddress, web3, tokenContract])

  return balance
}

export default useTokenBalance
