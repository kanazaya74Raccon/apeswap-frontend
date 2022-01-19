import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import { getTokenBalance } from 'utils/erc20'
import { getContract } from 'utils/getContract'
import useRefresh from './useRefresh'
import { useBananaAddress } from './useAddress'
import { useERC20 } from './useContract'
import useActiveWeb3React from './useActiveWeb3React'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, library, chainId } = useActiveWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const tokenContract = getContract(erc20ABI, tokenAddress, chainId, library)
      console.log('at token balance')
      console.log(tokenContract)
      const res = await getTokenBalance(library, tokenAddress, account, tokenContract)
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
  const { library } = useActiveWeb3React()
  const tokenContract = useERC20(tokenAddress)

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(library, tokenAddress, account, tokenContract)
      setBalance(new BigNumber(res))
    }

    if (account && library) {
      fetchBalance()
    }
  }, [account, tokenAddress, fastRefresh, library, tokenContract])

  return balance
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const bananaAddress = useBananaAddress()
  const bananaContract = useERC20(bananaAddress)

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await bananaContract.totalSupply()
      setTotalSupply(new BigNumber(supply.toString()))
    }

    fetchTotalSupply()
  }, [slowRefresh, bananaAddress, bananaContract])

  return totalSupply
}

export const useBurnedBalance = (tokenAddress: string) => {
  const { slowRefresh } = useRefresh()
  const [balance, setBalance] = useState(new BigNumber(0))
  const { library } = useActiveWeb3React()
  const tokenContract = useERC20(tokenAddress)

  useEffect(() => {
    async function fetchTotalSupply() {
      const res = await getTokenBalance(
        library,
        tokenAddress,
        '0x000000000000000000000000000000000000dEaD',
        tokenContract,
      )
      setBalance(new BigNumber(res))
    }

    fetchTotalSupply()
  }, [slowRefresh, tokenAddress, library, tokenContract])

  return balance
}

export default useTokenBalance
