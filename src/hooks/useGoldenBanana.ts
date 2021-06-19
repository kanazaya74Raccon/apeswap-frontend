import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useTreasury } from 'hooks/useContract'
import BigNumber from 'bignumber.js'

export const buy = async (contract, amount, account) => {
  try {
    return contract.methods
      .buy(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error(err)
  }
}

export const sell = async (contract, amount, account) => {
  try {
    return contract.methods
      .sell(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error(err)
  }
}

export const useSellGoldenBanana = () => {
  const { account } = useWeb3React()
  const treasuryContract = useTreasury()

  const handleSell = useCallback(
    async (amount: string) => {
      try {
        const txHash = await sell(treasuryContract, amount, account)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, treasuryContract],
  )

  return { handleSell }
}

export const useBuyGoldenBanana = () => {
  const { account } = useWeb3React()
  const treasuryContract = useTreasury()

  const handleBuy = useCallback(
    async (amount: string) => {
      try {
        const txHash = await buy(treasuryContract, amount, account)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, treasuryContract],
  )

  return { handleBuy }
}
