import React from 'react'
import Torus, { PaymentParams, PAYMENT_PROVIDER_TYPE } from '@toruslabs/torus-embed'
import { Button, Flex } from '@apeswapfinance/uikit'
import Page from 'components/layout/Page'
import { useToast } from 'state/hooks'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'

export default function Topup() {
  const { toastError, toastSuccess } = useToast()
  const { account } = useActiveWeb3React()

  const onClickTopup = async (provider: PAYMENT_PROVIDER_TYPE) => {
    const torus = new Torus({})
    await torus.init({
      enableLogging: true,
      showTorusButton: false,
      network: { host: 'bsc_mainnet' },
    })
    const paymentParams: PaymentParams = {
      selectedCryptoCurrency: provider === 'moonpay' ? 'BNB_BSC' : 'BSC_BNB',
      fiatValue: 100,
    }
    if (account) paymentParams.selectedAddress = account
    try {
      const paymentStatus = await torus.initiateTopup(provider, paymentParams)
      toastSuccess('Succesful topup')
      console.log(paymentStatus)
    } catch (e: any) {
      toastError(e.message)
    }
  }

  return (
    <Page>
      <Flex justifyContent="center" mb="20px" mt="20px">
        <Button onClick={() => onClickTopup('moonpay')}>Moonpay</Button>
        <Button onClick={() => onClickTopup('rampnetwork')}>Ramp</Button>
      </Flex>
    </Page>
  )
}
