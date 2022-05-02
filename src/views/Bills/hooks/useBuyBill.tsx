import { useCallback } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { userBuyBill } from 'utils/callHelpers'
import { useBillContract } from 'hooks/useContract'
import track from 'utils/track'

// Buy a Bill
const useBuyBill = (billAddress: string, amount: string) => {
  const { chainId, account } = useActiveWeb3React()
  const billContract = useBillContract(billAddress)
  const handleBuyBill = useCallback(async () => {
    const tx = await userBuyBill(billContract, account, amount, '108377')
    track({
      event: 'bill',
      chain: chainId,
      data: {
        cat: 'buy',
        address: billContract.address,
        amount,
      },
    })
    return tx
  }, [billContract, amount, account, chainId])

  return { onBuyBill: handleBuyBill }
}

export default useBuyBill
