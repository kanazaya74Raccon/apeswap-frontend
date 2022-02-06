import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Contract } from '@ethersproject/contracts'
import { TransactionResponse } from '@ethersproject/providers'
import { ETHER, JSBI, Percent, Token, ROUTER_ADDRESS } from '@apeswapfinance/sdk'
import { LargeStyledButton } from 'views/Swap/styles'
import Page from 'components/layout/Page'
import { Text, AddIcon, Flex, Card, useModal, useMatchBreakpoints, ButtonSquare } from '@apeswapfinance/uikit'
import { getTokenUsdPrice } from 'utils/getTokenUsdPrice'
import { RouteComponentProps } from 'react-router'
import { BigNumber } from '@ethersproject/bignumber'
import { Wrapper } from 'views/Swap/components/styled'
import CurrencyInputHeader from 'views/Swap/components/CurrencyInputHeader'
import LiquidityPositionLink from 'components/Links/LiquidityPositons'
import SwapBanner from 'components/SwapBanner'
import { parseAddress } from 'hooks/useAddress'
import { AutoColumn } from '../../components/layout/Column'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { AppBody } from '../../components/App'
import { RowBetween, RowFixed, AutoRow } from '../../components/layout/Row'
import UnlockButton from '../../components/UnlockButton'

import { CurrencyLogo, DoubleCurrencyLogo } from '../../components/Logo'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useCurrency } from '../../hooks/Tokens'
import { usePairContract } from '../../hooks/useContract'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'

import { useTransactionAdder } from '../../state/transactions/hooks'
import { calculateGasMargin, calculateSlippageAmount, getRouterContract } from '../../utils'
import { wrappedCurrency } from '../../utils/wrappedCurrency'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import Dots from '../../components/Loader/Dots'
import { useBurnActionHandlers, useDerivedBurnInfo, useBurnState } from '../../state/burn/hooks'
import { Field } from '../../state/burn/actions'
import { useUserSlippageTolerance } from '../../state/user/hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import useTotalSupply from '../../hooks/useTotalSupply'

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => (theme.isDark ? '#383838' : '#F0F0F0')};
  height: 110px;
  width: 48.5%;
  margin-top: 15px;
  margin-bottom: 10px;
`

const EvenRow = styled(AutoRow)`
  background-color: rgba(124, 124, 125, 0.08);
  justify-content: space-between;
  padding: 2.5px 15px 2.5px 15px;
`

const OddRow = styled(AutoRow)`
  background-color: rgba(124, 124, 125, 0.15);
  justify-content: space-between;
  padding: 2.5px 15px 2.5px 15px;
`

const Title = styled(Text)`
  margin-left: 85px;
  margin-top: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 0px;
    margin-top: 0px;
  }
`

export default function RemoveLiquidity({
  match: {
    params: { currencyIdA, currencyIdB },
  },
}: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const [currencyA, currencyB] = [useCurrency(currencyIdA) ?? undefined, useCurrency(currencyIdB) ?? undefined]
  const [currencyAPrice, setCurrencyAPrice] = useState<number>(null)
  const [currencyBPrice, setCurrencyBPrice] = useState<number>(null)

  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs

  const { account, chainId, library } = useActiveWeb3React()
  const [tokenA, tokenB] = useMemo(
    () => [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)],
    [currencyA, currencyB, chainId],
  )

  const isANative = currencyA?.symbol === 'ETH'
  const isBNative = currencyB?.symbol === 'ETH'

  useEffect(() => {
    const fetchCurrencyATokenPrice = async () => {
      const tokenPriceReturned = await getTokenUsdPrice(
        chainId,
        currencyA instanceof Token ? currencyA?.address : '',
        currencyA?.decimals,
        false,
        isANative,
      )
      setCurrencyAPrice(tokenPriceReturned)
    }
    fetchCurrencyATokenPrice()
  }, [currencyA, chainId, isANative])
  useEffect(() => {
    const fetchCurrencyBTokenPrice = async () => {
      const tokenPriceReturned = await getTokenUsdPrice(
        chainId,
        currencyB instanceof Token ? currencyB?.address : '',
        currencyB?.decimals,
        false,
        isBNative,
      )
      setCurrencyBPrice(tokenPriceReturned)
    }
    fetchCurrencyBTokenPrice()
  }, [currencyB, chainId, isBNative])

  // burn state
  const { independentField, typedValue } = useBurnState()
  const { pair, parsedAmounts, error } = useDerivedBurnInfo(currencyA ?? undefined, currencyB ?? undefined)
  const { onUserInput: _onUserInput } = useBurnActionHandlers()
  const isValid = !error

  const userPoolBalance = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair?.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  // modal and loading
  const [attemptingTxn, setAttemptingTxn] = useState(false) // clicked confirm

  // txn values
  const [txHash, setTxHash] = useState<string>('')
  const deadline = useTransactionDeadline()
  const [allowedSlippage] = useUserSlippageTolerance()

  const formattedAmounts = {
    [Field.LIQUIDITY_PERCENT]: parsedAmounts[Field.LIQUIDITY_PERCENT].equalTo('0')
      ? '0'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].lessThan(new Percent('1', '100'))
      ? '<1'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0),
    [Field.LIQUIDITY]:
      independentField === Field.LIQUIDITY ? typedValue : parsedAmounts[Field.LIQUIDITY]?.toSignificant(6) ?? '',
    [Field.CURRENCY_A]:
      independentField === Field.CURRENCY_A ? typedValue : parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '',
    [Field.CURRENCY_B]:
      independentField === Field.CURRENCY_B ? typedValue : parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '',
  }

  const atMaxAmount = parsedAmounts[Field.LIQUIDITY_PERCENT]?.equalTo(new Percent('1'))

  // pair contract
  const pairContract: Contract | null = usePairContract(pair?.liquidityToken?.address)

  // allowance handling
  const [signatureData, setSignatureData] = useState<{ v: number; r: string; s: string; deadline: number } | null>(null)
  const [approval, approveCallback] = useApproveCallback(
    parsedAmounts[Field.LIQUIDITY],
    parseAddress(ROUTER_ADDRESS, chainId),
  )

  const onAttemptToApprove = async () => {
    if (!pairContract || !pair || !library || !deadline) throw new Error('missing dependencies')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')
    return approveCallback()

    // try to gather a signature for permission
    // const nonce = await pairContract.nonces(account)

    // const EIP712Domain = [
    //   { name: 'name', type: 'string' },
    //   { name: 'version', type: 'string' },
    //   { name: 'chainId', type: 'uint256' },
    //   { name: 'verifyingContract', type: 'address' },
    // ]
    // const domain = {
    //   name: 'Apeswap LPs',
    //   version: '1',
    //   chainId,
    //   verifyingContract: pair.liquidityToken.address,
    // }
    // const Permit = [
    //   { name: 'owner', type: 'address' },
    //   { name: 'spender', type: 'address' },
    //   { name: 'value', type: 'uint256' },
    //   { name: 'nonce', type: 'uint256' },
    //   { name: 'deadline', type: 'uint256' },
    // ]
    // const message = {
    //   owner: account,
    //   spender: ROUTER_ADDRESS,
    //   value: liquidityAmount.raw.toString(),
    //   nonce: nonce.toHexString(),
    //   deadline: deadline.toNumber(),
    // }
    // const data = JSON.stringify({
    //   types: {
    //     EIP712Domain,
    //     Permit,
    //   },
    //   domain,
    //   primaryType: 'Permit',
    //   message,
    // })

    // library
    //   .send('eth_signTypedData_v4', [account, data])
    //   .then(splitSignature)
    //   .then((signature) => {
    //     setSignatureData({
    //       v: signature.v,
    //       r: signature.r,
    //       s: signature.s,
    //       deadline: deadline.toNumber(),
    //     })
    //   })
    //   .catch((err) => {
    //     // for all errors other than 4001 (EIP-1193 user rejected request), fall back to manual approve
    //     if (err?.code !== 4001) {
    //       approveCallback()
    //     }
    //   })
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback(
    (field: Field, value: string) => {
      setSignatureData(null)
      return _onUserInput(field, value)
    },
    [_onUserInput],
  )

  // const onLiquidityInput = useCallback((value: string): void => onUserInput(Field.LIQUIDITY, value), [onUserInput])
  // const onCurrencyAInput = useCallback((value: string): void => onUserInput(Field.CURRENCY_A, value), [onUserInput])
  // const onCurrencyBInput = useCallback((value: string): void => onUserInput(Field.CURRENCY_B, value), [onUserInput])

  // tx sending
  const addTransaction = useTransactionAdder()
  const onRemove = async () => {
    if (!chainId || !library || !account || !deadline) throw new Error('missing dependencies')
    const { [Field.CURRENCY_A]: currencyAmountA, [Field.CURRENCY_B]: currencyAmountB } = parsedAmounts
    if (!currencyAmountA || !currencyAmountB) {
      throw new Error('missing currency amounts')
    }
    const router = getRouterContract(chainId, library, account)

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(currencyAmountB, allowedSlippage)[0],
    }

    if (!currencyA || !currencyB) throw new Error('missing tokens')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    const currencyBIsETH = currencyB === ETHER
    const oneCurrencyIsETH = currencyA === ETHER || currencyBIsETH

    if (!tokenA || !tokenB) throw new Error('could not wrap')

    let methodNames: string[]
    let args: Array<string | string[] | number | boolean>
    // we have approval, use normal remove liquidity
    if (approval === ApprovalState.APPROVED) {
      // removeLiquidityETH
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETH', 'removeLiquidityETHSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          deadline.toHexString(),
        ]
      }
      // removeLiquidity
      else {
        methodNames = ['removeLiquidity']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          deadline.toHexString(),
        ]
      }
    }
    // we have a signature, use permit versions of remove liquidity
    else if (signatureData !== null) {
      // removeLiquidityETHWithPermit
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETHWithPermit', 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
      // removeLiquidityETHWithPermit
      else {
        methodNames = ['removeLiquidityWithPermit']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
    } else {
      throw new Error('Attempting to confirm without approval or a signature. Please contact support.')
    }

    const safeGasEstimates: (BigNumber | undefined)[] = await Promise.all(
      methodNames.map((methodName) =>
        router.estimateGas[methodName](...args)
          .then(calculateGasMargin)
          .catch((err) => {
            console.error(`estimateGas failed`, methodName, args, err)
            return undefined
          }),
      ),
    )

    const indexOfSuccessfulEstimation = safeGasEstimates.findIndex((safeGasEstimate) =>
      BigNumber.isBigNumber(safeGasEstimate),
    )

    // all estimations failed...
    if (indexOfSuccessfulEstimation === -1) {
      console.error('This transaction would fail. Please contact support.')
    } else {
      const methodName = methodNames[indexOfSuccessfulEstimation]
      const safeGasEstimate = safeGasEstimates[indexOfSuccessfulEstimation]

      setAttemptingTxn(true)
      await router[methodName](...args, {
        gasLimit: safeGasEstimate,
      })
        .then((response: TransactionResponse) => {
          setAttemptingTxn(false)

          addTransaction(response, {
            summary: `Remove ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${currencyA?.getSymbol(
              chainId,
            )} and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencyB?.getSymbol(chainId)}`,
          })

          setTxHash(response.hash)
        })
        .catch((err: Error) => {
          setAttemptingTxn(false)
          // we only care if the error is something _other_ than the user rejected the tx
          console.error(err)
        })
    }
  }

  const modalHeader = () => {
    return (
      <AutoColumn gap="md">
        <RowBetween align="flex-end">
          <Text fontSize="24px">{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</Text>
          <RowFixed gap="4px">
            <CurrencyLogo currency={currencyA} size="24px" />
            <Text fontSize="24px" ml="10px">
              {currencyA?.getSymbol(chainId)}
            </Text>
          </RowFixed>
        </RowBetween>
        <RowFixed>
          <AddIcon width="16px" />
        </RowFixed>
        <RowBetween align="flex-end">
          <Text fontSize="24px">{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</Text>
          <RowFixed gap="4px">
            <CurrencyLogo currency={currencyB} size="24px" />
            <Text fontSize="24px" ml="10px">
              {currencyB?.getSymbol(chainId)}
            </Text>
          </RowFixed>
        </RowBetween>
        <Text small textAlign="left" pt="12px" mb="25px" style={{ fontStyle: 'italic' }}>
          {`Output is estimated. If the price changes by more than ${
            allowedSlippage / 100
          }% your transaction will revert.`}
        </Text>
      </AutoColumn>
    )
  }

  const modalBottom = () => {
    return (
      <>
        <RowBetween>
          <Text>{`${currencyA?.getSymbol(chainId) ?? ''}/${currencyB?.getSymbol(chainId) ?? ''} Burned`}</Text>
          <RowFixed>
            <DoubleCurrencyLogo currency0={currencyA} currency1={currencyB} margin />
            <Text>{parsedAmounts[Field.LIQUIDITY]?.toSignificant(6)}</Text>
          </RowFixed>
        </RowBetween>
        {pair && (
          <>
            <RowBetween>
              <Text>Price</Text>
              <Text>
                1 {currencyA?.getSymbol(chainId)} = {tokenA ? pair.priceOf(tokenA).toSignificant(6) : '-'}{' '}
                {currencyB?.getSymbol(chainId)}
              </Text>
            </RowBetween>
            <RowBetween>
              <div />
              <Text>
                1 {currencyB?.getSymbol(chainId)} = {tokenB ? pair.priceOf(tokenB).toSignificant(6) : '-'}{' '}
                {currencyA?.getSymbol(chainId)}
              </Text>
            </RowBetween>
          </>
        )}
        <ButtonSquare
          fullWidth
          mt="25px"
          style={{ fontSize: '20px', height: '50px' }}
          disabled={!(approval === ApprovalState.APPROVED || signatureData !== null)}
          onClick={onRemove}
        >
          Confirm
        </ButtonSquare>
      </>
    )
  }

  const pendingText = `Removing ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? ''} ${
    currencyA?.getSymbol(chainId) ?? ''
  } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? ''} ${currencyB?.getSymbol(chainId) ?? ''}`

  const handleDismissConfirmation = useCallback(() => {
    setSignatureData(null) // important that we clear signature data to avoid bad sigs
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.LIQUIDITY_PERCENT, '0')
    }
    setTxHash('')
  }, [onUserInput, txHash])

  const [onPresentRemoveLiquidity] = useModal(
    <TransactionConfirmationModal
      title="You will receive"
      customOnDismiss={handleDismissConfirmation}
      attemptingTxn={attemptingTxn}
      hash={txHash || ''}
      content={() => <ConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />}
      pendingText={pendingText}
    />,
    true,
    true,
    'removeLiquidityModal',
  )

  return (
    <Page>
      <Flex alignItems="center" flexDirection="column" flexWrap="nowrap" mb="20px">
        <SwapBanner />
        <AppBody>
          <CurrencyInputHeader />
          <Flex flexWrap="wrap" alignItems="center" mt="15px" mb="5px">
            <LiquidityPositionLink />
            <Title bold fontSize="22px">
              Remove Liquidity
            </Title>
          </Flex>
          <Wrapper>
            <CurrencyInputPanel
              value={formattedAmounts[Field.LIQUIDITY_PERCENT]}
              onUserInput={(val) =>
                parseInt(val) > 100
                  ? onUserInput(Field.LIQUIDITY_PERCENT, '100')
                  : val.toString() === ''
                  ? onUserInput(Field.LIQUIDITY_PERCENT, '0')
                  : onUserInput(Field.LIQUIDITY_PERCENT, parseInt(val).toString())
              }
              onMax={() => {
                onUserInput(Field.LIQUIDITY_PERCENT, '100')
              }}
              showMaxButton={!atMaxAmount}
              disableCurrencySelect
              currency={pair?.liquidityToken}
              pair={pair}
              id="liquidity-amount"
              onCurrencySelect={() => null}
              removeLiquidity
              isLp
            />
            {isMobile ? (
              <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                <OddRow justify="space-around" style={{ borderRadius: '5px 5px 0px 0px' }}>
                  <Text fontSize="17px" pt={1}>
                    {currencyA?.getSymbol(chainId) ?? ''}
                  </Text>
                  <Text small>{formattedAmounts[Field.CURRENCY_A] || '-'}</Text>
                </OddRow>
                <EvenRow justify="space-around">
                  <Text fontSize="17px" pt={1}>
                    {currencyB?.getSymbol(chainId) ?? ''}
                  </Text>
                  <Text small>{formattedAmounts[Field.CURRENCY_B] || '-'}</Text>
                </EvenRow>
                <OddRow justify="space-around" style={{ borderRadius: '0px 0px 5px 5px' }}>
                  <Text>Share of pool</Text>
                  <Text>{poolTokenPercentage ? `${poolTokenPercentage.toFixed(6)}%` : '-'}</Text>
                </OddRow>
              </div>
            ) : (
              <>
                <AutoColumn gap="lg">
                  <AutoRow justify="space-between">
                    <StyledCard>
                      <AutoColumn justify="center">
                        {/* <Text>{price?.invert()?.toSignificant(6) ?? '-'}</Text> */}
                        <Text bold fontSize="17px" pt={1}>
                          {currencyA?.getSymbol(chainId) ?? ''}
                        </Text>
                        <Text small>{formattedAmounts[Field.CURRENCY_A] || '-'}</Text>
                        <Text small>
                          {currencyAPrice && formattedAmounts[Field.CURRENCY_A]
                            ? `~ $${(currencyAPrice * parseFloat(formattedAmounts[Field.CURRENCY_A])).toFixed(2)}`
                            : '-'}
                        </Text>
                      </AutoColumn>
                    </StyledCard>
                    <StyledCard mr="7px">
                      <AutoColumn justify="center">
                        {/* <Text>{price?.invert()?.toSignificant(6) ?? '-'}</Text> */}
                        <Text bold fontSize="17px" pt={1}>
                          {currencyB?.getSymbol(chainId) ?? ''}
                        </Text>
                        <Text small>{formattedAmounts[Field.CURRENCY_B] || '-'}</Text>
                        <Text small>
                          {currencyBPrice && formattedAmounts[Field.CURRENCY_B]
                            ? `~ $${(currencyBPrice * parseFloat(formattedAmounts[Field.CURRENCY_B])).toFixed(2)}`
                            : '-'}
                        </Text>
                      </AutoColumn>
                    </StyledCard>
                  </AutoRow>
                </AutoColumn>
                <RowBetween style={{ padding: '0px 15px 0px 10px' }}>
                  <Text bold>Share of pool</Text>
                  <Text bold>{poolTokenPercentage ? `${poolTokenPercentage.toFixed(6)}%` : '-'}</Text>
                </RowBetween>
              </>
            )}

            <>
              {!account ? (
                <UnlockButton large />
              ) : (
                <RowBetween>
                  <LargeStyledButton
                    onClick={onAttemptToApprove}
                    disabled={approval !== ApprovalState.NOT_APPROVED || signatureData !== null}
                    mr="8px"
                  >
                    {approval === ApprovalState.PENDING ? (
                      <Dots>Enabling</Dots>
                    ) : approval === ApprovalState.APPROVED || signatureData !== null ? (
                      'Enabled'
                    ) : (
                      'Enable'
                    )}
                  </LargeStyledButton>
                  <LargeStyledButton
                    onClick={() => {
                      onPresentRemoveLiquidity()
                    }}
                    disabled={!isValid || (signatureData === null && approval !== ApprovalState.APPROVED)}
                    ml="8px"
                  >
                    {error || 'Remove'}
                  </LargeStyledButton>
                </RowBetween>
              )}
            </>
          </Wrapper>
        </AppBody>
      </Flex>
    </Page>
  )
}
