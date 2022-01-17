import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import { Currency, ETHER, TokenAmount } from '@apeswapfinance/sdk'
import { Text, Flex, AddIcon, useModal } from '@apeswapfinance/uikit'
import { RouteComponentProps } from 'react-router-dom'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import UnsupportedCurrencyFooter from 'components/UnsupportedCurrencyFooter'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import LiquidityPositionLink from 'components/Links/LiquidityPositons'
import Page from 'components/layout/Page'
import CurrencyInputHeader from 'views/Swap/components/CurrencyInputHeader'
import { LargeStyledButton } from 'views/Swap/styles'
import { Wrapper } from 'views/Swap/components/styleds'
import SwapBanner from 'components/SwapBanner'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../state'
import { AutoColumn, ColumnCenter } from '../../components/layout/Column'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { DoubleCurrencyLogo } from '../../components/Logo'
import { AppBody } from '../../components/App'
import Row, { RowBetween } from '../../components/layout/Row'
import UnlockButton from '../../components/UnlockButton'

import { ROUTER_ADDRESS } from '../../config/constants'
import { PairState } from '../../hooks/usePairs'
import { useCurrency } from '../../hooks/Tokens'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import { Field, resetMintState } from '../../state/mint/actions'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../state/mint/hooks'

import { useTransactionAdder } from '../../state/transactions/hooks'
import { useIsExpertMode, useUserSlippageTolerance } from '../../state/user/hooks'
import { calculateGasMargin, calculateSlippageAmount, getRouterContract } from '../../utils'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { wrappedCurrency } from '../../utils/wrappedCurrency'
import Dots from '../../components/Loader/Dots'
import ConfirmAddModalBottom from './ConfirmAddModalBottom'
import { currencyId } from '../../utils/currencyId'
import PoolPriceBar from './PoolPriceBar'

const Title = styled(Text)`
  margin-left: 110px;
  margin-top: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 0px;
    margin-top: 0px;
  }
`

export default function AddLiquidity({
  match: {
    params: { currencyIdA, currencyIdB },
  },
  history,
}: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string }>) {
  const { account, chainId, library } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()

  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)

  useEffect(() => {
    if (!currencyIdA && !currencyIdB) {
      dispatch(resetMintState())
    }
  }, [dispatch, currencyIdA, currencyIdB])


  const expertMode = useIsExpertMode()

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
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

  const isValid = !error

  // modal and loading
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm

  // txn values
  const deadline = useTransactionDeadline() // custom from users settings
  const [allowedSlippage] = useUserSlippageTolerance() // custom from users
  const [txHash, setTxHash] = useState<string>('')

  // get formatted amounts
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

  const atMaxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
      }
    },
    {},
  )

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], ROUTER_ADDRESS)
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], ROUTER_ADDRESS)

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
      <Flex alignItems="center">
        <Text bold fontSize="24px" marginRight="10px">
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
        <Flex alignItems="center">
          <Text bold fontSize="24px" marginRight="10px">
            {liquidityMinted?.toSignificant(6)}
          </Text>
          <DoubleCurrencyLogo
            currency0={currencies[Field.CURRENCY_A]}
            currency1={currencies[Field.CURRENCY_B]}
            size={30}
          />
        </Flex>
        <Row>
          <Text fontSize="20px">
            {`${currencies[Field.CURRENCY_A]?.getSymbol(chainId)}/${currencies[Field.CURRENCY_B]?.getSymbol(
              chainId,
            )} Pool Tokens`}
          </Text>
        </Row>
        <Text small textAlign="left" my="24px" style={{ fontStyle: 'italic' }}>
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

  const handleCurrencyASelect = useCallback(
    (currencyA_: Currency) => {
      const newCurrencyIdA = currencyId(currencyA_)
      if (newCurrencyIdA === currencyIdB) {
        history.push(`/add/${currencyIdB}/${currencyIdA}`)
      } else if (currencyIdB) {
        history.push(`/add/${newCurrencyIdA}/${currencyIdB}`)
      } else {
        history.push(`/add/${newCurrencyIdA}`)
      }
    },
    [currencyIdB, history, currencyIdA],
  )
  const handleCurrencyBSelect = useCallback(
    (currencyB_: Currency) => {
      const newCurrencyIdB = currencyId(currencyB_)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          history.push(`/add/${currencyIdB}/${newCurrencyIdB}`)
        } else {
          history.push(`/add/${newCurrencyIdB}`)
        }
      } else {
        history.push(`/add/${currencyIdA || 'BNB'}/${newCurrencyIdB}`)
      }
    },
    [currencyIdA, history, currencyIdB],
  )

  const handleDismissConfirmation = useCallback(() => {
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput('')
    }
    setTxHash('')
  }, [onFieldAInput, txHash])

  const addIsUnsupported = useIsTransactionUnsupported(currencies?.CURRENCY_A, currencies?.CURRENCY_B)

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
    <Page>
      <Flex alignItems="center" flexDirection="column" flexWrap="nowrap">
        <SwapBanner />
        <AppBody>
          <CurrencyInputHeader />
          <Flex flexWrap='wrap' alignItems="center" mt="15px" mb="5px">
            <LiquidityPositionLink />
            <Title bold fontSize="22px">
              Add Liquidity
            </Title>
          </Flex>
          <Wrapper>
            <AutoColumn gap="10px">
              {noLiquidity && (
                <ColumnCenter>
                  <>
                    <div
                      style={{
                        backgroundColor: 'rgb(255, 0, 0, .2)',
                        borderRadius: '20px',
                        width: '100%',
                        padding: '20px 10px 20px 10px',
                      }}
                    >
                      <Flex flexDirection="column" justifyContent="center" alignItems="center">
                        <Text bold mb="8px">
                          You are the first liquidity provider.
                        </Text>
                        <Text mb="8px">The ratio of tokens you add will set the price of this pool.</Text>
                        <Text>Once you are happy with the rate click supply to review.</Text>
                      </Flex>
                    </div>
                  </>
                </ColumnCenter>
              )}
              <CurrencyInputPanel
                value={formattedAmounts[Field.CURRENCY_A]}
                onUserInput={onFieldAInput}
                onMax={() => {
                  onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
                }}
                onCurrencySelect={handleCurrencyASelect}
                showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
                currency={currencies[Field.CURRENCY_A]}
                addLiquidity
                id="add-liquidity-input-tokena"
              />
              <ColumnCenter
                style={{
                  position: 'relative',
                  height: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    position: 'absolute',
                    backgroundColor: '#FFB300',
                    borderRadius: '50px',
                    width: '50px',
                    height: '50px',
                  }}
                >
                  <AddIcon width="30px" color="white" />
                </Flex>
              </ColumnCenter>
              <CurrencyInputPanel
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
              />
              {currencies[Field.CURRENCY_A] && currencies[Field.CURRENCY_B] && pairState !== PairState.INVALID && (
                <PoolPriceBar
                  currencies={currencies}
                  poolTokenPercentage={poolTokenPercentage}
                  noLiquidity={noLiquidity}
                  price={price}
                  chainId={chainId}
                />
              )}
              {addIsUnsupported ? (
                <LargeStyledButton disabled mb="4px">
                  Unsupported Asset
                </LargeStyledButton>
              ) : !account ? (
                <UnlockButton large />
              ) : (
                <AutoColumn gap="md">
                  {(approvalA === ApprovalState.NOT_APPROVED ||
                    approvalA === ApprovalState.PENDING ||
                    approvalB === ApprovalState.NOT_APPROVED ||
                    approvalB === ApprovalState.PENDING) &&
                    isValid && (
                      <RowBetween>
                        {approvalA !== ApprovalState.APPROVED && (
                          <LargeStyledButton onClick={approveACallback} disabled={approvalA === ApprovalState.PENDING}>
                            {approvalA === ApprovalState.PENDING ? (
                              <Dots>{`Enabling ${currencies[Field.CURRENCY_A]?.getSymbol(chainId)}`}</Dots>
                            ) : (
                              `Enable ${currencies[Field.CURRENCY_A]?.getSymbol(chainId)}`
                            )}
                          </LargeStyledButton>
                        )}
                        {approvalB !== ApprovalState.APPROVED && (
                          <LargeStyledButton onClick={approveBCallback} disabled={approvalB === ApprovalState.PENDING}>
                            {approvalB === ApprovalState.PENDING ? (
                              <Dots>{`Enabling ${currencies[Field.CURRENCY_B]?.getSymbol(chainId)}`}</Dots>
                            ) : (
                              `Enable ${currencies[Field.CURRENCY_B]?.getSymbol(chainId)}`
                            )}
                          </LargeStyledButton>
                        )}
                      </RowBetween>
                    )}
                  <LargeStyledButton
                    onClick={() => {
                      if (expertMode) {
                        onAdd()
                      } else {
                        onPresentAddLiquidityModal()
                      }
                    }}
                    disabled={!isValid || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED}
                  >
                    {error ?? 'Supply'}
                  </LargeStyledButton>
                </AutoColumn>
              )}
            </AutoColumn>
          </Wrapper>
        </AppBody>
        {!addIsUnsupported ? (
          pair && !noLiquidity && pairState !== PairState.INVALID ? (
            // <AutoColumn style={{ minWidth: '20rem', width: '100%', maxWidth: '400px', marginTop: '1rem' }}>
            //   <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />
            // </AutoColumn>
            <></>
          ) : null
        ) : (
          <UnsupportedCurrencyFooter currencies={[currencies.CURRENCY_A, currencies.CURRENCY_B]} />
        )}
      </Flex>
    </Page>
  )
}
