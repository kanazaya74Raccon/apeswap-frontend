import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { CurrencyAmount, JSBI, Token, Trade } from '@apeswapfinance/sdk'
import { Button, Text, ArrowDownIcon, useModal, Flex, Card } from '@apeswapfinance/uikit'
import Page from 'components/layout/Page'
import SwapBanner from 'components/SwapBanner'
import { getTokenUsdPrice } from 'utils/getTokenUsdPrice'
import track from 'utils/track'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import AddressInputPanel from './components/AddressInputPanel'
import Column, { AutoColumn } from '../../components/layout/Column'
import ConfirmSwapModal from './components/ConfirmSwapModal'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import PriceInputPanel from '../../components/PriceInputPanel'
import { AutoRow, RowBetween } from '../../components/layout/Row'
import confirmPriceImpactWithoutFee from './components/confirmPriceImpactWithoutFee'
import { ArrowWrapper, SwapCallbackError, Wrapper } from './components/styled'
import TradePrice from './components/TradePrice'
import ImportTokenWarningModal from './components/ImportTokenWarningModal'
import ProgressSteps from './components/ProgressSteps'
import { AppBody } from '../../components/App'

import UnlockButton from '../../components/UnlockButton'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useCurrency, useAllTokens } from '../../hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from '../../hooks/useApproveCallback'
import { useOrderCallback } from '../../hooks/useOrderCallback'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { Field } from '../../state/swap/actions'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../state/swap/hooks'
import { useExpertModeManager, useUserSlippageTolerance, useUserSingleHopOnly } from '../../state/user/hooks'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from '../../utils/prices'
import { StyledInputCurrencyWrapper, StyledSwapContainer, LargeStyledButton } from './styles'
import CurrencyInputHeader from './components/CurrencyInputHeader'
import OrderHistoryPanel from './components/OrderHistoryPanel'

const Label = styled(Text)`
  font-size: 12px;
  font-weight: bold;
`

const OrderPanel = styled.div`
  background-color: ${({ theme }) => theme.colors.white3};
  border-radius: 20px;
  overflow: hidden;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-bottom: 55px;
  }
`

const OrderInfoPanel = styled.div`
  background-color: ${({ theme }) => theme.colors.white3};
  border-radius: 20px;
  margin-top: 10px;
  padding: 20px;
`

export default function Orders({ history }: RouteComponentProps) {
  const loadedUrlParams = useDefaultsFromURLSearch()
  const { chainId } = useActiveWeb3React()
  const [tradeValueUsd, setTradeValueUsd] = useState<number>(null)
  const { t } = useTranslation()

  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency],
  )

  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens()
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !(token.address in defaultTokens)
    })

  const { account } = useActiveWeb3React()

  // for expert mode
  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      }

  const { onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput],
  )

  // modal and loading
  const [{ tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  )
  const noRoute = !route

  useEffect(() => {
    const getTradeVal = async () => {
      const isLp = false
      const isNative = trade?.inputAmount?.currency?.symbol === 'ETH'
      const usdVal = await getTokenUsdPrice(
        chainId,
        trade?.inputAmount?.currency instanceof Token ? trade?.inputAmount?.currency?.address : '',
        trade?.inputAmount?.currency?.decimals,
        isLp,
        isNative,
      )
      setTradeValueUsd(Number(trade?.inputAmount.toSignificant(6)) * usdVal)
    }
    getTradeVal()
  }, [setTradeValueUsd, chainId, trade])

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage, true)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  const [limitOrderPrice, setLimitOrderPrice] = useState<string>('')
  const [inputFocused, setInputFocused] = useState<boolean>(true)
  const realPriceValue = useMemo(() => {
    if (inputFocused) {
      const price = Number(formattedAmounts[Field.OUTPUT]) / Number(formattedAmounts[Field.INPUT])
      return price === Infinity || Number.isNaN(price) ? '' : price.toFixed(6)
    }
    return limitOrderPrice
  }, [inputFocused, limitOrderPrice, formattedAmounts])

  const outputMinAmount = useMemo(() => {
    return (Number(realPriceValue) * Number(formattedAmounts[Field.INPUT])).toString()
  }, [realPriceValue, formattedAmounts])

  const realOutputValue = useMemo(
    () => (inputFocused ? formattedAmounts[Field.OUTPUT] : outputMinAmount),
    [inputFocused, formattedAmounts, outputMinAmount],
  )

  const orderMarketStatus = useMemo(() => {
    const marketOutput = trade?.outputAmount.toExact()
    if (marketOutput && outputMinAmount) {
      return ((Number(outputMinAmount) - Number(marketOutput)) * 100) / Number(marketOutput)
    }
    return 0
  }, [trade, outputMinAmount])

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
      setInputFocused(true)
    },
    [onUserInput, setInputFocused],
  )

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useOrderCallback(
    trade,
    recipient,
    outputMinAmount,
    orderMarketStatus,
  )

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const [singleHopOnly] = useUserSingleHopOnly()

  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee, t)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, swapErrorMessage: undefined, txHash: undefined })
    swapCallback()
      .then(async (hash) => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, swapErrorMessage: undefined, txHash: hash })
        track({
          event: 'swap',
          value: tradeValueUsd,
          chain: chainId,
          data: {
            token1: trade?.inputAmount?.currency?.getSymbol(chainId),
            token2: trade?.outputAmount?.currency?.getSymbol(chainId),
            token1Amount: Number(trade?.inputAmount.toSignificant(6)),
            token2Amount: Number(trade?.outputAmount.toSignificant(6)),
          },
        })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [priceImpactWithoutFee, swapCallback, tradeToConfirm, trade, chainId, tradeValueUsd, t])

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, showConfirm: false })) // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [onUserInput, txHash])

  const handleAcceptChanges = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, tradeToConfirm: trade }))
  }, [trade])

  // swap warning state
  const [, setSwapWarningCurrency] = useState(null)

  const shouldShowSwapWarning = (swapCurrency) => {
    return swapCurrency
  }

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      const showSwapWarning = shouldShowSwapWarning(inputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(inputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },
    [onCurrencySelection],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency)
      const showSwapWarning = shouldShowSwapWarning(outputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(outputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },

    [onCurrencySelection],
  )

  const swapIsUnsupported = useIsTransactionUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  const [onPresentImportTokenWarningModal] = useModal(
    <ImportTokenWarningModal tokens={importTokensNotInDefault} onCancel={() => history.push('/swap/')} />,
  )

  useEffect(() => {
    if (importTokensNotInDefault.length > 0) {
      onPresentImportTokenWarningModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importTokensNotInDefault.length])

  const handleTypePrice = useCallback(
    (value: string) => {
      setInputFocused(false)
      setLimitOrderPrice(value)
    },
    [setInputFocused, setLimitOrderPrice],
  )

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwapModal
      trade={trade}
      onAcceptChanges={handleAcceptChanges}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      recipient={recipient}
      allowedSlippage={allowedSlippage}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      customOnDismiss={handleConfirmDismiss}
      realSwapPrice={realPriceValue}
      realOutputAmount={realOutputValue}
    />,
    true,
    true,
    'swapConfirmModal',
  )

  return (
    <Page>
      <Flex justifyContent="center" mb="20px">
        <Flex flexDirection="column">
          <SwapBanner />
          <StyledSwapContainer>
            <StyledInputCurrencyWrapper>
              <AppBody>
                <CurrencyInputHeader title={t('Orders')} subtitle={t('Trade tokens in an instant')} />
                <Wrapper id="orders-page">
                  <OrderPanel>
                    <CurrencyInputPanel
                      label={
                        independentField === Field.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From')
                      }
                      value={formattedAmounts[Field.INPUT]}
                      showMaxButton={!atMaxAmountInput}
                      currency={currencies[Field.INPUT]}
                      onUserInput={handleTypeInput}
                      onMax={handleMaxInput}
                      onCurrencySelect={handleInputSelect}
                      otherCurrency={currencies[Field.OUTPUT]}
                      id="orders-currency-input"
                      orders
                    />
                    <PriceInputPanel
                      value={realPriceValue}
                      currentPrice={trade?.executionPrice.toSignificant(6)}
                      inputValue={formattedAmounts[Field.INPUT]}
                      inputCurrency={currencies[Field.INPUT]}
                      outputCurrency={currencies[Field.OUTPUT]}
                      onUserInput={handleTypePrice}
                      id="orders-currency-price"
                    />
                    <CurrencyInputPanel
                      value={realOutputValue}
                      onUserInput={handleTypeOutput}
                      label={independentField === Field.INPUT && !showWrap && trade ? t('To (estimated)') : t('To')}
                      showMaxButton={false}
                      currency={currencies[Field.OUTPUT]}
                      onCurrencySelect={handleOutputSelect}
                      otherCurrency={currencies[Field.INPUT]}
                      id="orders-currency-output"
                      orders
                      disableInput
                    />
                  </OrderPanel>
                  {isExpertMode && recipient !== null && !showWrap ? (
                    <>
                      <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                        <ArrowWrapper clickable={false}>
                          <ArrowDownIcon width="16px" />
                        </ArrowWrapper>
                        <Button variant="text" id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                          - {t('Remove send')}
                        </Button>
                      </AutoRow>
                      <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
                    </>
                  ) : null}

                  {showWrap
                    ? null
                    : Boolean(trade) && (
                        <OrderInfoPanel>
                          <AutoColumn gap="8px">
                            <RowBetween align="center">
                              <Label>Current Price:</Label>
                              <TradePrice
                                price={trade?.executionPrice}
                                showInverted={showInverted}
                                setShowInverted={setShowInverted}
                                color="#FFB300"
                              />
                            </RowBetween>
                            <RowBetween align="center">
                              <Label>
                                {t('Required %symbol1%/%symbol2% change', {
                                  symbol1: currencies[Field.INPUT]?.getSymbol(chainId) ?? '',
                                  symbol2: currencies[Field.OUTPUT]?.getSymbol(chainId) ?? '',
                                })}
                                :
                              </Label>
                              <Text color="#FFB300">{orderMarketStatus.toFixed(2)}%</Text>
                            </RowBetween>
                          </AutoColumn>
                        </OrderInfoPanel>
                      )}
                  <div>
                    {swapIsUnsupported ? (
                      <Button disabled mb="4px">
                        {t('Unsupported Asset')}
                      </Button>
                    ) : !account ? (
                      <UnlockButton large />
                    ) : showWrap ? (
                      <LargeStyledButton disabled={Boolean(wrapInputError)} onClick={onWrap}>
                        {wrapInputError ??
                          (wrapType === WrapType.WRAP ? t('Wrap') : wrapType === WrapType.UNWRAP ? t('Unwrap') : null)}
                      </LargeStyledButton>
                    ) : noRoute && userHasSpecifiedInputOutput ? (
                      <Card style={{ textAlign: 'center' }}>
                        <Text mb="4px">{t('Insufficient liquidity for this trade')}</Text>
                        {singleHopOnly && <Text mb="4px">{t('Try enabling multi-hop trades.')}</Text>}
                      </Card>
                    ) : showApproveFlow ? (
                      <RowBetween>
                        <LargeStyledButton
                          style={{ marginRight: '10px' }}
                          onClick={approveCallback}
                          disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                        >
                          {approval === ApprovalState.PENDING ? (
                            <AutoRow gap="6px" justify="center">
                              <></>
                            </AutoRow>
                          ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                            t('Enabled')
                          ) : (
                            `${t('Enable')} ${currencies[Field.INPUT]?.getSymbol(chainId) ?? ''}`
                          )}
                        </LargeStyledButton>
                        <LargeStyledButton
                          style={{ marginLeft: '10px' }}
                          onClick={() => {
                            if (isExpertMode) {
                              handleSwap()
                            } else {
                              setSwapState({
                                tradeToConfirm: trade,
                                attemptingTxn: false,
                                swapErrorMessage: undefined,
                                txHash: undefined,
                              })
                              onPresentConfirmModal()
                            }
                          }}
                          id="order-button"
                          disabled={
                            !isValid ||
                            approval !== ApprovalState.APPROVED ||
                            (priceImpactSeverity > 3 && !isExpertMode) ||
                            orderMarketStatus === 0
                          }
                        >
                          {priceImpactSeverity > 3 && !isExpertMode
                            ? t('Price Impact High')
                            : priceImpactSeverity > 2
                            ? t('Place Order Anyway')
                            : t('Place Order')}
                        </LargeStyledButton>
                      </RowBetween>
                    ) : (
                      <LargeStyledButton
                        fullWidth
                        onClick={() => {
                          if (isExpertMode) {
                            handleSwap()
                          } else {
                            setSwapState({
                              tradeToConfirm: trade,
                              attemptingTxn: false,
                              swapErrorMessage: undefined,
                              txHash: undefined,
                            })
                            onPresentConfirmModal()
                          }
                        }}
                        id="orer-button"
                        disabled={
                          !isValid ||
                          (priceImpactSeverity > 3 && !isExpertMode) ||
                          !!swapCallbackError ||
                          orderMarketStatus === 0
                        }
                      >
                        {swapInputError ||
                          (priceImpactSeverity > 3 && !isExpertMode
                            ? t('Price Impact Too High')
                            : priceImpactSeverity > 2
                            ? t('Place Order Anyway')
                            : t('Place Order'))}
                      </LargeStyledButton>
                    )}
                    {showApproveFlow && (
                      <Column style={{ marginTop: '1rem' }}>
                        <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />
                      </Column>
                    )}
                    {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
                  </div>
                </Wrapper>
              </AppBody>
              <OrderHistoryPanel />
            </StyledInputCurrencyWrapper>
          </StyledSwapContainer>
        </Flex>
      </Flex>
    </Page>
  )
}
