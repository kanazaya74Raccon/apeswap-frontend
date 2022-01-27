import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'

export interface ERC20DetailsReturned {
  userBalance: string
  tokenSymbol: string
  totalSupply: string
  tokenDecimals: number
}

const useERC20Details = () => {
  const { account, chainId } = useWeb3React()
  const handleERC20Details = useCallback(
    async (tokenAddress: string): Promise<ERC20DetailsReturned> => {
      const erc20Calls = [
        // Balance in users account
        {
          address: tokenAddress,
          name: 'balanceOf',
          params: [account],
        },
        // Get token symbol
        {
          address: tokenAddress,
          name: 'symbol',
        },
        // Get token total supply
        {
          address: tokenAddress,
          name: 'totalSupply',
        },
        // Get token decimals
        {
          address: tokenAddress,
          name: 'decimals',
        },
      ]
      const [userBalance, tokenSymbol, totalSupply, tokenDecimals] = await multicall(chainId, erc20ABI, erc20Calls)
      return {
        userBalance: userBalance.toString(),
        tokenSymbol: tokenSymbol[0],
        totalSupply: totalSupply.toString(),
        tokenDecimals: parseInt(tokenDecimals),
      }
    },
    [account, chainId],
  )

  return { onHandleERC20Details: handleERC20Details }
}

export default useERC20Details
