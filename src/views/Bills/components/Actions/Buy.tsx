import React, { useState } from 'react'
import { AutoRenewIcon, Flex, Text, useModal } from '@apeswapfinance/uikit'
import { LiquidityModal } from 'components/LiquidityWidget'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useBuyBill from 'views/Bills/hooks/useBuyBill'
import BigNumber from 'bignumber.js'
import { useToast } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import { useAppDispatch } from 'state'
import { fetchBillsUserDataAsync, fetchUserOwnedBillsDataAsync } from 'state/bills'
import { Field, selectCurrency } from 'state/swap/actions'
import { useTranslation } from 'contexts/Localization'
import { BuyProps } from './types'
import { BuyButton, GetLPButton, MaxButton, StyledInput } from './styles'

const Buy: React.FC<BuyProps> = ({
  userLpValue,
  token,
  quoteToken,
  billAddress,
  disabled,
  onValueChange,
  onBillId,
  onTransactionSubmited,
}) => {
  const formatUserLpValue = getFullDisplayBalance(new BigNumber(userLpValue))
  const [amount, setAmount] = useState('')
  const { chainId, account } = useActiveWeb3React()
  const { onBuyBill } = useBuyBill(billAddress, amount)
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()

  const handleInput = (val: string) => {
    setAmount(val)
    onValueChange(val)
  }

  const searchForBillId = (resp) => {
    const billId = resp.events[6]?.args?.billId?.toString()
    const { transactionHash } = resp
    onBillId(billId, transactionHash)
  }

  const handleBuy = async () => {
    setPendingTrx(true)
    onTransactionSubmited(true)
    await onBuyBill()
      .then((resp) => {
        const trxHash = resp.transactionHash
        searchForBillId(resp)
        toastSuccess(t('Buy Successful'), {
          text: t('View Transaction'),
          url: getEtherscanLink(trxHash, 'transaction', chainId),
        })
      })
      .catch((e) => {
        console.error(e)
        toastError(e?.data?.message || t('Something went wrong please try again'))
        setPendingTrx(false)
        onTransactionSubmited(false)
      })
    dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
    dispatch(fetchBillsUserDataAsync(chainId, account))
    setPendingTrx(false)
  }

  // TODO: clean up this code
  // Hack to get the close modal function from the provider
  // Need to export ModalContext from uikit to clean up the code
  const [, closeModal] = useModal(<></>)
  const [onPresentAddLiquidityWidgetModal] = useModal(
    <LiquidityModal handleClose={closeModal} />,
    true,
    true,
    'liquidityWidgetModal',
  )

  const showLiquidity = () => {
    dispatch(
      selectCurrency({
        field: Field.INPUT,
        currencyId: token.symbol === 'BNB' ? 'ETH' : token.address[chainId],
      }),
    )
    dispatch(
      selectCurrency({
        field: Field.OUTPUT,
        currencyId: quoteToken.symbol === 'BNB' ? 'ETH' : quoteToken.address[chainId],
      }),
    )
    onPresentAddLiquidityWidgetModal()
  }

  return (
    <>
      <GetLPButton variant="secondary" onClick={showLiquidity}>
        {t('Get LP')}
      </GetLPButton>
      <Flex style={{ position: 'relative' }}>
        <Text fontSize="12px" style={{ position: 'absolute', top: 14, left: 10, zIndex: 1 }} bold>
          {t('Amount')}:
        </Text>
        <MaxButton size="sm" onClick={() => handleInput(formatUserLpValue)}>
          {t('Max')}
        </MaxButton>
        <StyledInput onChange={(e) => handleInput(e.target.value)} value={amount} />
        <Text fontSize="12px" style={{ position: 'absolute', bottom: 6, left: 10, zIndex: 1, opacity: 0.8 }}>
          {t('Balance')}:
        </Text>
        <Text fontSize="12px" style={{ position: 'absolute', bottom: 5, right: 10, zIndex: 1, opacity: 0.8 }}>
          {formatUserLpValue?.slice(0, 15)} LP
        </Text>
      </Flex>
      <BuyButton
        onClick={handleBuy}
        endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
        disabled={disabled || parseFloat(formatUserLpValue) < parseFloat(amount) || pendingTrx}
      >
        {t('Buy')}
      </BuyButton>
    </>
  )
}

export default React.memo(Buy)
