import React, { useState } from 'react'
import { AutoRenewIcon, Flex, Text } from '@apeswapfinance/uikit'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useBuyBill from 'views/Bills/hooks/useBuyBill'
import BigNumber from 'bignumber.js'
import { useToast } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import { useAppDispatch } from 'state'
import { fetchBillsUserDataAsync, fetchUserOwnedBillsDataAsync } from 'state/bills'
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

  const liquidityUrl = `https://apeswap.finance/add/${token.symbol === 'BNB' ? 'ETH' : token.address[chainId]}/${
    quoteToken.symbol === 'BNB' ? 'ETH' : quoteToken.address[chainId]
  }`

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

  return (
    <>
      <a href={liquidityUrl} target="_blank" rel="noopener noreferrer">
        <GetLPButton variant="secondary">{t('Get LP')}</GetLPButton>
      </a>
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
