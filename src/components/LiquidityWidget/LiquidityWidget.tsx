import React, { useCallback, useState } from 'react'
import { AddIcon, Button } from '@ape.swap/uikit'
import { Box, Flex, Text } from 'theme-ui'
import { BigNumber } from '@ethersproject/bignumber'
import { Currency, ETHER, TokenAmount, ROUTER_ADDRESS, CurrencyAmount } from '@apeswapfinance/sdk'
import WalletTransactions from 'components/RecentTransactions/WalletTransactions'
import { TransactionResponse } from '@ethersproject/providers'
import UnsupportedCurrencyFooter from 'components/UnsupportedCurrencyFooter'
import track from 'utils/track'
import UnderlinedButton from 'components/UnderlinedButton'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { parseAddress } from 'hooks/useAddress'
import useTheme from 'hooks/useTheme'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useIsExpertMode, useUserRecentTransactions, useUserSlippageTolerance } from 'state/user/hooks'
import { useModal } from '@apeswapfinance/uikit'
import TransactionConfirmationModal, { ConfirmationModalContent } from 'components/TransactionConfirmationModal'
import ConfirmAddModalBottom from 'views/AddLiquidity/ConfirmAddModalBottom'
import DoubleCurrencyLogo from 'components/Logo/DoubleLogo'
import { useSwapState } from 'state/swap/hooks'
import { PairState } from '../../hooks/usePairs'
import { useTransactionAdder } from '../../state/transactions/hooks'
import Row, { RowBetween } from '../layout/Row'
import Dots from '../Loader/Dots'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../state/mint/hooks'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import { useCurrency } from '../../hooks/Tokens'
import { Field } from '../../state/mint/actions'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { currencyId } from '../../utils/currencyId'
import { AutoColumn } from '../layout/Column'
import { wrappedCurrency } from '../../utils/wrappedCurrency'
import LiquidityInfo from './LiquidityInfo'
import CurrencyInput from './CurrencyInput'
import { calculateGasMargin, calculateSlippageAmount, getRouterContract } from '../../utils'
import ConnectButton from './ConnectButton'
import styles from './styles'

interface ILiquidityWidgetProps {
  onCancel?: () => void
}

const LiquidiyWidget: React.FC<ILiquidityWidgetProps> = ({ onCancel }) => {
  const { isDark } = useTheme()
  const [recentTransactions] = useUserRecentTransactions()
  const [addValueUsd, setAddValueUsd] = useState<number>(null)

  const { account, chainId, library } = useActiveWeb3React()

  // get formatted amounts
  const { independentField, typedValue, otherTypedValue } = useMintState()

  const { INPUT, OUTPUT } = useSwapState()

  const swapCurrencyA = INPUT.currencyId
  const swapCurrencyB = OUTPUT.currencyId

  const [currencyA1, setcurrencyA1] = useState(swapCurrencyA || 'ETH')
  const [currencyB1, setcurrencyB1] = useState(swapCurrencyB || '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95')

  const currencyA = useCurrency(currencyA1)
  const currencyB = useCurrency(currencyB1)

  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {},
  )

  const handleCurrencyASelect = (currencyA_: Currency) => {
    const newCurrencyIdA = currencyId(currencyA_)
    setcurrencyA1(newCurrencyIdA)
  }

  const atMaxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
      }
    },
    {},
  )
  const addIsUnsupported = useIsTransactionUnsupported(currencies?.CURRENCY_A, currencies?.CURRENCY_B)

  const handleCurrencyBSelect = (currencyB_: Currency) => {
    setcurrencyB1(currencyId(currencyB_))
  }
  const balanceA = useCurrencyBalance(account ?? undefined, currencies[Field.CURRENCY_A])
  const balanceB = useCurrencyBalance(account ?? undefined, currencies[Field.CURRENCY_B])

  const StyledBalanceText = styled(Text)`
    white-space: nowrap;
    overflow: hidden;
    max-width: 5rem;
    text-overflow: ellipsis;
  `
  const ModelStyle = styled.div``
  function Balance({ balance }: { balance: CurrencyAmount }) {
    return <StyledBalanceText title={balance?.toExact()}>{balance?.toSignificant(4)}</StyledBalanceText>
  }

  const [approvalA, approveACallback] = useApproveCallback(
    parsedAmounts[Field.CURRENCY_A],
    parseAddress(ROUTER_ADDRESS, chainId),
  )
  const [approvalB, approveBCallback] = useApproveCallback(
    parsedAmounts[Field.CURRENCY_B],
    parseAddress(ROUTER_ADDRESS, chainId),
  )

  // txn values
  const deadline = useTransactionDeadline() // custom from users settings
  const [allowedSlippage] = useUserSlippageTolerance() // custom from users
  const [txHash, setTxHash] = useState<string>('')

  const isValid = !error
  const expertMode = useIsExpertMode()

  // modal and loading
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm

  const addTransaction = useTransactionAdder()
  const onAdd = async () => {
    if (!chainId || !library || !account) return
    const router = getRouterContract(chainId, library, account)

    const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = parsedAmounts
    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !deadline) {
      return
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? 0 : allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? 0 : allowedSlippage)[0],
    }
    let estimate
    let method: (...args: any) => Promise<TransactionResponse>
    let args: Array<string | string[] | number>
    let value: BigNumber | null
    if (currencyA === ETHER || currencyB === ETHER) {
      const tokenBIsETH = currencyB === ETHER
      estimate = router.estimateGas.addLiquidityETH
      method = router.addLiquidityETH
      args = [
        wrappedCurrency(tokenBIsETH ? currencyA : currencyB, chainId)?.address ?? '', // token
        (tokenBIsETH ? parsedAmountA : parsedAmountB).raw.toString(), // token desired
        amountsMin[tokenBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), // token min
        amountsMin[tokenBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), // eth min
        account,
        deadline.toHexString(),
      ]
      value = BigNumber.from((tokenBIsETH ? parsedAmountB : parsedAmountA).raw.toString())
    } else {
      estimate = router.estimateGas.addLiquidity
      method = router.addLiquidity
      args = [
        wrappedCurrency(currencyA, chainId)?.address ?? '',
        wrappedCurrency(currencyB, chainId)?.address ?? '',
        parsedAmountA.raw.toString(),
        parsedAmountB.raw.toString(),
        amountsMin[Field.CURRENCY_A].toString(),
        amountsMin[Field.CURRENCY_B].toString(),
        account,
        deadline.toHexString(),
      ]
      value = null
    }

    setAttemptingTxn(true)
    await estimate(...args, value ? { value } : {})
      .then((estimatedGasLimit) =>
        method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
        }).then((response) => {
          setAttemptingTxn(false)

          addTransaction(response, {
            summary: `Add ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${currencies[
              Field.CURRENCY_A
            ]?.getSymbol(chainId)} and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencies[
              Field.CURRENCY_B
            ]?.getSymbol(chainId)}`,
          })

          setTxHash(response.hash)

          track({
            event: 'liquidity',
            chain: chainId,
            value: addValueUsd,
            data: {
              token1: currencies[Field.CURRENCY_A]?.getSymbol(chainId),
              token2: currencies[Field.CURRENCY_B]?.getSymbol(chainId),
              token1Amount: parsedAmounts[Field.CURRENCY_A]?.toSignificant(3),
              token2Amount: parsedAmounts[Field.CURRENCY_B]?.toSignificant(3),
              cat: 'add',
            },
          })
        }),
      )
      .catch((err) => {
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        if (err?.code !== 4001) {
          console.error(err)
        }
      })
  }

  const modalHeader = () => {
    return noLiquidity ? (
      <Flex>
        <Text sx={{ fontSize: '24px', marginRight: '10px', fontWeight: '700', lineHeight: '1.5' }}>
          {`${currencies[Field.CURRENCY_A]?.getSymbol(chainId)}/${currencies[Field.CURRENCY_B]?.getSymbol(chainId)}`}
        </Text>
        <DoubleCurrencyLogo
          currency0={currencies[Field.CURRENCY_A]}
          currency1={currencies[Field.CURRENCY_B]}
          size={30}
        />
      </Flex>
    ) : (
      <AutoColumn>
        <Flex sx={{ alignItems: 'center' }}>
          <Text sx={{ fontSize: '24px', marginRight: '10px', fontWeight: '700', lineHeight: '1.5' }}>
            {liquidityMinted?.toSignificant(6)}
          </Text>
          <DoubleCurrencyLogo
            currency0={currencies[Field.CURRENCY_A]}
            currency1={currencies[Field.CURRENCY_B]}
            size={30}
          />
        </Flex>
        <Row>
          <Text sx={{ fontSize: '20px', fontWeight: '400', lineHeight: '1.5' }}>
            {`${currencies[Field.CURRENCY_A]?.getSymbol(chainId)}/${currencies[Field.CURRENCY_B]?.getSymbol(
              chainId,
            )} Pool Tokens`}
          </Text>
        </Row>
        <Text
          sx={{
            textAlign: 'left',
            fontSize: '14px',
            fontWeight: '400',
            marginTop: '24px',
            marginBottom: '24px',
            lineHeight: '1.5',
            fontStyle: 'italic',
          }}
        >
          {`Output is estimated. If the price changes by more than ${
            allowedSlippage / 100
          }% your transaction will revert.`}
        </Text>
      </AutoColumn>
    )
  }

  const modalBottom = () => {
    return (
      <ConfirmAddModalBottom
        price={price}
        currencies={currencies}
        parsedAmounts={parsedAmounts}
        noLiquidity={noLiquidity}
        onAdd={onAdd}
        poolTokenPercentage={poolTokenPercentage}
      />
    )
  }

  const pendingText = `Supplying ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? ''} ${
    currencies[Field.CURRENCY_A]?.getSymbol(chainId) ?? ''
  } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? ''} ${
    currencies[Field.CURRENCY_B]?.getSymbol(chainId) ?? ''
  }`

  const handleDismissConfirmation = useCallback(() => {
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput('')
    }
    setTxHash('')
  }, [onFieldAInput, txHash])

  const [onPresentAddLiquidityModal] = useModal(
    <TransactionConfirmationModal
      title={noLiquidity ? 'You are creating a pool' : 'You will receive'}
      customOnDismiss={handleDismissConfirmation}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      content={() => <ConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />}
      pendingText={pendingText}
      currencyToAdd={pair?.liquidityToken}
    />,
    true,
    true,
    'addLiquidityModal',
  )

  return (
    <>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', marginTop: '20px' }}>
        <Flex>
          <Text
            sx={{
              fontSize: '16px',
              fontWeight: 700,
              lineHeight: '24px',
              color: isDark ? 'primaryBright' : 'brown',
            }}
          >
            Token 1
          </Text>
        </Flex>
        <Flex sx={{ alignItems: 'center' }}>
          <Text
            sx={{
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: '14px',
              marginRight: '10px',
              color: isDark ? 'primaryBright' : 'brown',
            }}
          >
            <Box>
              Balance:&nbsp;&nbsp;
              <Balance balance={balanceA} />
            </Box>
          </Text>
          <Button
            size="sm"
            csx={{ border: 'hidden', borderRadius: '6px', padding: '3px 14px !important' }}
            variant="primary"
            onClick={() => {
              onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
            }}
          >
            <Text sx={{ fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>Max</Text>
          </Button>
        </Flex>
      </Flex>

      <CurrencyInput
        value={formattedAmounts[Field.CURRENCY_A]}
        onUserInput={onFieldAInput}
        onCurrencySelect={handleCurrencyASelect}
        showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
        currency={currencies[Field.CURRENCY_A]}
        addLiquidity
        id="add-liquidity-input-tokena"
        showCommonBases
      />

      <Flex
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: '15px auto 15px',
        }}
      >
        <Flex
          sx={{
            justifyContent: 'center',
            backgroundColor: '#FFB300',
            borderRadius: '30px',
            width: '29px',
            height: '29px',
          }}
        >
          <AddIcon width="25px" color="primaryBright" />
        </Flex>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <Flex>
          <Text
            sx={{
              fontSize: '16px',
              fontWeight: 700,
              lineHeight: '24px',
              color: isDark ? 'primaryBright' : 'brown',
            }}
          >
            Token 2
          </Text>
        </Flex>
        <Flex sx={{ alignItems: 'center' }}>
          <Text
            sx={{
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: '14px',
              marginRight: '10px',
              color: isDark ? 'primaryBright' : 'brown',
            }}
          >
            Balance:&nbsp;&nbsp;
            <Balance balance={balanceB} />
          </Text>
          <Button
            size="sm"
            csx={{ border: 'hidden', borderRadius: '6px', padding: '3px 14px !important' }}
            variant="primary"
            onClick={() => {
              onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
            }}
          >
            <Text sx={{ fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>Max</Text>
          </Button>
        </Flex>
      </Flex>
      {/* </ColumnCenter> */}
      <CurrencyInput
        value={formattedAmounts[Field.CURRENCY_B]}
        onUserInput={onFieldBInput}
        onCurrencySelect={handleCurrencyBSelect}
        onMax={() => {
          onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
        }}
        showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
        currency={currencies[Field.CURRENCY_B]}
        id="add-liquidity-input-tokenb"
        addLiquidity
        showCommonBases
      />
      <LiquidityInfo
        currencies={currencies}
        poolTokenPercentage={poolTokenPercentage}
        noLiquidity={noLiquidity}
        price={price}
        chainId={chainId}
      />

      <Flex
        sx={{
          justifyContent: 'center',
          Button: {
            padding: '7px 30px',
          },
        }}
      >
        {addIsUnsupported ? (
          <Button csx={styles.button} disabled mb="4px">
            Unsupported Asset
          </Button>
        ) : !account ? (
          <ConnectButton />
        ) : (
          <AutoColumn gap="md">
            {(approvalA === ApprovalState.NOT_APPROVED ||
              approvalA === ApprovalState.PENDING ||
              approvalB === ApprovalState.NOT_APPROVED ||
              approvalB === ApprovalState.PENDING) &&
              isValid && (
                <RowBetween>
                  <Flex sx={{ justifyContent: 'space-between', columnGap: '15px' }}>
                    {approvalA !== ApprovalState.APPROVED && (
                      <Button
                        csx={styles.button}
                        onClick={approveACallback}
                        disabled={approvalA === ApprovalState.PENDING}
                      >
                        {approvalA === ApprovalState.PENDING ? (
                          <Dots>{`Enabling ${currencies[Field.CURRENCY_A]?.getSymbol(chainId)}`}</Dots>
                        ) : (
                          `Enable ${currencies[Field.CURRENCY_A]?.getSymbol(chainId)}`
                        )}
                      </Button>
                    )}

                    {approvalB !== ApprovalState.APPROVED && (
                      <Box sx={{ padding: '0 5px' }}>
                        <Button
                          csx={styles.button}
                          onClick={approveBCallback}
                          disabled={approvalB === ApprovalState.PENDING}
                        >
                          {approvalB === ApprovalState.PENDING ? (
                            <Dots>{`Enabling ${currencies[Field.CURRENCY_B]?.getSymbol(chainId)}`}</Dots>
                          ) : (
                            `Enable ${currencies[Field.CURRENCY_B]?.getSymbol(chainId)}`
                          )}
                        </Button>
                      </Box>
                    )}
                  </Flex>
                </RowBetween>
              )}
            <Button
              csx={styles.button}
              onClick={() => {
                if (expertMode) {
                  onAdd()
                } else onPresentAddLiquidityModal()
              }}
              disabled={!isValid || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED}
            >
              {error ?? 'Supply'}
            </Button>
          </AutoColumn>
        )}
        {!addIsUnsupported ? (
          pair && !noLiquidity && pairState !== PairState.INVALID ? (
            <></>
          ) : null
        ) : (
          <UnsupportedCurrencyFooter currencies={[currencies.CURRENCY_A, currencies.CURRENCY_B]} />
        )}
        {recentTransactions && <WalletTransactions />}
      </Flex>
      <Flex sx={{ justifyContent: 'center', margin: '10px 0 0' }}>
        <UnderlinedButton text="cancel" handleClick={onCancel} />
      </Flex>
    </>
  )
}

export default LiquidiyWidget
