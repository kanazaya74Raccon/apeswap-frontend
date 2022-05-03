import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import { Currency, ETHER, TokenAmount, ROUTER_ADDRESS, Token } from '@apeswapfinance/sdk'
import { Text, Flex, AddIcon, useModal } from '@apeswapfinance/uikit'
import { RouteComponentProps } from 'react-router-dom'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import UnsupportedCurrencyFooter from 'components/UnsupportedCurrencyFooter'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import LiquidityPositionLink from 'components/Links/LiquidityPositons'
import Page from 'components/layout/Page'
import track from 'utils/track'
import CurrencyInputHeader from 'views/Swap/components/CurrencyInputHeader'
import { getTokenUsdPrice } from 'utils/getTokenUsdPrice'
import { LargeStyledButton } from 'views/Swap/styles'
import { Wrapper } from 'views/Swap/components/styled'
import SwapBanner from 'components/SwapBanner'
import WalletTransactions from 'components/RecentTransactions/WalletTransactions'
import { useDispatch } from 'react-redux'
import { parseAddress } from 'hooks/useAddress'
import { useSwapState } from 'state/swap/hooks'
import { useTranslation } from 'contexts/Localization'
import { AppDispatch } from '../../state'
import { AutoColumn, ColumnCenter } from '../../components/layout/Column'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { DoubleCurrencyLogo } from '../../components/Logo'
import { AppBody } from '../../components/App'
import Row, { RowBetween } from '../../components/layout/Row'
import UnlockButton from '../../components/UnlockButton'
import { PairState } from '../../hooks/usePairs'
import { useCurrency } from '../../hooks/Tokens'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import { Field, resetMintState } from '../../state/mint/actions'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../state/mint/hooks'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { useIsExpertMode, useUserRecentTransactions, useUserSlippageTolerance } from '../../state/user/hooks'
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
  // Either use the url params or the user swap state for initial liquidity add
  const { INPUT, OUTPUT } = useSwapState()
  const swapCurrencyA = INPUT.currencyId
  const swapCurrencyB = OUTPUT.currencyId

  const loadCurrencyIdA = currencyIdA || swapCurrencyA
  const loadCurrencyIdB = currencyIdB || swapCurrencyB

  const currencyA = useCurrency(loadCurrencyIdA)
  const currencyB = useCurrency(loadCurrencyIdB)
  const { t } = useTranslation()

  const [recentTransactions] = useUserRecentTransactions()
  const [addValueUsd, setAddValueUsd] = useState<number>(null)

  useEffect(() => {
    if (!loadCurrencyIdA && !loadCurrencyIdB) {
      dispatch(resetMintState())
    }
  }, [dispatch, loadCurrencyIdA, loadCurrencyIdB])

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
  const [approvalA, approveACallback] = useApproveCallback(
    parsedAmounts[Field.CURRENCY_A],
    parseAddress(ROUTER_ADDRESS, chainId),
  )
  const [approvalB, approveBCallback] = useApproveCallback(
    parsedAmounts[Field.CURRENCY_B],
    parseAddress(ROUTER_ADDRESS, chainId),
  )

  useEffect(() => {
    const getAddVal = async () => {
      const isNative = currencyA?.symbol === 'ETH'
      const isLp = false
      const usdVal = await getTokenUsdPrice(
        chainId,
        currencyA instanceof Token ? currencyA?.address : '',
        currencyA?.decimals,
        isLp,
        isNative,
      )
      setAddValueUsd(Number(parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)) * usdVal * 2)
    }
    getAddVal()
  }, [setAddValueUsd, chainId, currencyA, parsedAmounts])

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
            )} ${t('Pool Tokens')}`}
          </Text>
        </Row>
        <Text small textAlign="left" my="24px" style={{ fontStyle: 'italic' }}>
          {t(
            'Output is estimated. If the price changes by more than %allowedSlippage%% your transaction will revert.',
            { allowedSlippage: allowedSlippage / 100 },
          )}
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
      if (newCurrencyIdA === loadCurrencyIdB) {
        history.push(`/add/${loadCurrencyIdB}/${loadCurrencyIdA}`)
      } else if (loadCurrencyIdB) {
        history.push(`/add/${newCurrencyIdA}/${loadCurrencyIdB}`)
      } else {
        history.push(`/add/${newCurrencyIdA}`)
      }
    },
    [loadCurrencyIdB, history, loadCurrencyIdA],
  )
  const handleCurrencyBSelect = useCallback(
    (currencyB_: Currency) => {
      const newCurrencyIdB = currencyId(currencyB_)
      if (loadCurrencyIdA === newCurrencyIdB) {
        if (loadCurrencyIdB) {
          history.push(`/add/${loadCurrencyIdB}/${newCurrencyIdB}`)
        } else {
          history.push(`/add/${newCurrencyIdB}`)
        }
      } else {
        history.push(`/add/${loadCurrencyIdA || 'ETH'}/${newCurrencyIdB}`)
      }
    },
    [loadCurrencyIdA, history, loadCurrencyIdB],
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
      title={noLiquidity ? t('You are creating a pool') : t('You will receive')}
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
      <Flex justifyContent="center" mb="20px">
        <Flex flexDirection="column">
          <SwapBanner />
          <AppBody>
            <CurrencyInputHeader />
            <Flex flexWrap="wrap" alignItems="center" mt="15px" mb="5px">
              <LiquidityPositionLink />
              <Title bold fontSize="22px">
                {t('Add Liquidity')}
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
                            {t('You are the first liquidity provider.')}
                          </Text>
                          <Text mb="8px">{t('The ratio of tokens you add will set the price of this pool.')}</Text>
                          <Text>{t('Once you are happy with the rate click supply to review.')}</Text>
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
                  showCommonBases
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
                  showCommonBases
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
                            <LargeStyledButton
                              onClick={approveACallback}
                              disabled={approvalA === ApprovalState.PENDING}
                            >
                              {approvalA === ApprovalState.PENDING ? (
                                <Dots>{`${t('Enabling')} ${currencies[Field.CURRENCY_A]?.getSymbol(chainId)}`}</Dots>
                              ) : (
                                `${t('Enable')} ${currencies[Field.CURRENCY_A]?.getSymbol(chainId)}`
                              )}
                            </LargeStyledButton>
                          )}
                          {approvalB !== ApprovalState.APPROVED && (
                            <LargeStyledButton
                              onClick={approveBCallback}
                              disabled={approvalB === ApprovalState.PENDING}
                            >
                              {approvalB === ApprovalState.PENDING ? (
                                <Dots>{`${t('Enabling')} ${currencies[Field.CURRENCY_B]?.getSymbol(chainId)}`}</Dots>
                              ) : (
                                `${t('Enable')} ${currencies[Field.CURRENCY_B]?.getSymbol(chainId)}`
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
                      disabled={
                        !isValid || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED
                      }
                    >
                      {error ?? t('Supply')}
                    </LargeStyledButton>
                  </AutoColumn>
                )}
              </AutoColumn>
            </Wrapper>
          </AppBody>
          {!addIsUnsupported ? (
            pair && !noLiquidity && pairState !== PairState.INVALID ? (
              <></>
            ) : null
          ) : (
            <UnsupportedCurrencyFooter currencies={[currencies.CURRENCY_A, currencies.CURRENCY_B]} />
          )}
          {recentTransactions && <WalletTransactions />}
        </Flex>
      </Flex>
    </Page>
  )
}
