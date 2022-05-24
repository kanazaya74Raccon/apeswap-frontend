import { useCallback } from 'react'
import { CHAIN_ID } from 'config/constants'
import track from 'utils/track'
import Torus, { PaymentParams } from '@toruslabs/torus-embed'
import { useToast } from 'state/hooks'
import useActiveWeb3React from './useActiveWeb3React'

const useTopup = () => {
  const { toastError, toastSuccess } = useToast()
  const { account } = useActiveWeb3React()

  const handleTopup = useCallback(async () => {
    const torus = new Torus({})
    await torus.init({
      enableLogging: false,
      showTorusButton: false,
      network: { host: 'bsc_mainnet' },
    })
    const paymentParams: PaymentParams = {
      selectedCryptoCurrency: 'BNB_BSC',
      fiatValue: 100,
    }
    if (account) paymentParams.selectedAddress = account
    try {
      const paymentStatus = await torus.initiateTopup('moonpay', paymentParams)
      toastSuccess('Succesful topup')
      console.log(paymentStatus)
      track({
        event: 'topup',
        chain: CHAIN_ID,
        data: {
          account,
          cat: 'moonpay',
        },
      })
    } catch (e: any) {
      toastError(e.message)
    }
  }, [account, toastError, toastSuccess])

  return { onTopup: handleTopup }
}

export default useTopup
