import { useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import web3 from 'web3'
import track from 'utils/track'
import { ZERO_ADDRESS } from 'config'

const useIAODeposit = (contract: any, currencyAddress: string, tokenBalance: BigNumber) => {
  const { account, chainId } = useWeb3React()
  const [pendingTx, setPendingTx] = useState(false)

  const isAmountValid = useCallback(
    (amount: string) => {
      const depositValue = new BigNumber(amount).times(new BigNumber(10).pow(18))

      const isValid = depositValue.isGreaterThan(0) && depositValue.isLessThanOrEqualTo(tokenBalance)

      return isValid
    },
    [tokenBalance],
  )

  const handleDeposit = useCallback(
    async (amount: string) => {
      const depositValue = new BigNumber(amount).times(new BigNumber(10).pow(18))

      const isValid = depositValue.isGreaterThan(0) && depositValue.isLessThanOrEqualTo(tokenBalance)

      if (!isValid) return

      setPendingTx(true)

      try {
        if (currencyAddress === ZERO_ADDRESS) {
          await contract.methods
            .depositNative()
            .send({ from: account, value: web3.utils.toBN(depositValue.toString()) })
        } else {
          await contract.methods.deposit(web3.utils.toBN(depositValue.toString())).send({ from: account })
        }

        track({
          event: 'iao',
          chain: chainId,
          data: {
            amount: depositValue,
            cat: 'buy',
            contract: contract.address,
          },
        })
      } catch (e) {
        console.error('Deposit error', e)
      }
      setPendingTx(false)
    },
    [account, contract.address, contract.methods, currencyAddress, tokenBalance, chainId],
  )

  return {
    pendingTx,
    isAmountValid,
    handleDeposit,
  }
}

export default useIAODeposit
