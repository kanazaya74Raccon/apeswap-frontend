import React, { useCallback, useEffect, useState } from 'react'
import { Currency, ETHER, JSBI, TokenAmount } from '@apeswapfinance/sdk'
import { Button, ChevronDownIcon, Text, AddIcon, useModal, Flex } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import CurrencyInputHeader from 'views/Swap/components/CurrencyInputHeader'
import SwapBanner from 'components/SwapBanner'
import LiquidityPositionLink from 'components/Links/LiquidityPositons'
import { AutoColumn, ColumnCenter } from '../../components/layout/Column'
import { CurrencyLogo } from '../../components/Logo'
import { MinimalPositionCard } from '../../components/PositionCard'
import Row from '../../components/layout/Row'
import CurrencySearchModal from '../../components/SearchModal/CurrencySearchModal'
import { PairState, usePair } from '../../hooks/usePairs'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { usePairAdder } from '../../state/user/hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import StyledInternalLink from '../../components/Links'
import { currencyId } from '../../utils/currencyId'
import Dots from '../../components/Loader/Dots'
import { AppBody } from '../../components/App'

enum Fields {
  TOKEN0 = 0,
  TOKEN1 = 1,
}

const StyledButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  background-color: ${({ theme }) => (theme.isDark ? '#424242' : 'rgba(230, 230, 230, 1)')};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: none;
  border-radius: 16px;
`

export default function PoolFinder() {
  const { account, chainId } = useActiveWeb3React()

  const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)
  const [currency0, setCurrency0] = useState<Currency | null>(ETHER)
  const [currency1, setCurrency1] = useState<Currency | null>(null)

  const [pairState, pair] = usePair(currency0 ?? undefined, currency1 ?? undefined)
  const addPair = usePairAdder()
  useEffect(() => {
    if (pair) {
      addPair(pair)
    }
  }, [pair, addPair])

  const validPairNoLiquidity: boolean =
    pairState === PairState.NOT_EXISTS ||
    Boolean(
      pairState === PairState.EXISTS &&
        pair &&
        JSBI.equal(pair.reserve0.raw, JSBI.BigInt(0)) &&
        JSBI.equal(pair.reserve1.raw, JSBI.BigInt(0)),
    )

  const position: TokenAmount | undefined = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const hasPosition = Boolean(position && JSBI.greaterThan(position.raw, JSBI.BigInt(0)))

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      if (activeField === Fields.TOKEN0) {
        setCurrency0(currency)
      } else {
        setCurrency1(currency)
      }
    },
    [activeField],
  )

  const prerequisiteMessage = (
    <Text textAlign="center">
      {!account ? 'Connect to a wallet to find pools' : 'Select a token to find your liquidity.'}
    </Text>
  )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={handleCurrencySelect}
      selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
    />,
    true,
    true,
    'selectCurrencyModal',
  )

  return (
    <Page>
      <Flex alignItems="center" flexDirection="column" flexWrap="nowrap">
        <SwapBanner />
        <AppBody>
          <CurrencyInputHeader />
          <Flex alignItems="center" mt="15px" mb="5px">
            <LiquidityPositionLink />
          </Flex>
          <AutoColumn justify="center" style={{ padding: '1rem' }} gap="md">
            <StyledButton
              endIcon={<ChevronDownIcon />}
              onClick={() => {
                onPresentCurrencyModal()
                setActiveField(Fields.TOKEN0)
              }}
            >
              {currency0 ? (
                <Row>
                  <CurrencyLogo currency={currency0} />
                  <Text ml="8px">{currency0.getSymbol(chainId)}</Text>
                </Row>
              ) : (
                <Text ml="8px">Select a Token</Text>
              )}
            </StyledButton>

            <ColumnCenter>
              <AddIcon />
            </ColumnCenter>

            <StyledButton
              mb="20px"
              endIcon={<ChevronDownIcon />}
              onClick={() => {
                onPresentCurrencyModal()
                setActiveField(Fields.TOKEN1)
              }}
            >
              {currency1 ? (
                <Row>
                  <CurrencyLogo currency={currency1} />
                  <Text ml="8px">{currency1.getSymbol(chainId)}</Text>
                </Row>
              ) : (
                <Text as={Row}>Select a Token</Text>
              )}
            </StyledButton>

            {hasPosition && (
              <ColumnCenter
                style={{ justifyItems: 'center', backgroundColor: '', padding: '12px 0px', borderRadius: '12px' }}
              >
                <Text textAlign="center">Pool Found!</Text>
                <StyledInternalLink to="/pool">
                  <Text textAlign="center" style={{ textDecoration: 'underline' }}>
                    Manage this pool.
                  </Text>
                </StyledInternalLink>
              </ColumnCenter>
            )}

            {currency0 && currency1 ? (
              pairState === PairState.EXISTS ? (
                hasPosition && pair ? (
                  <MinimalPositionCard pair={pair} />
                ) : (
                  <AutoColumn gap="sm" justify="center">
                    <Text textAlign="center">You don’t have liquidity in this pool yet.</Text>
                    <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                      <Text style={{ textDecoration: 'underline' }} textAlign="center">
                        Add Liquidity
                      </Text>
                    </StyledInternalLink>
                  </AutoColumn>
                )
              ) : validPairNoLiquidity ? (
                <AutoColumn gap="sm" justify="center">
                  <Text textAlign="center">No pool found.</Text>
                  <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                    Create pool.
                  </StyledInternalLink>
                </AutoColumn>
              ) : pairState === PairState.INVALID ? (
                <AutoColumn gap="sm" justify="center">
                  <Text textAlign="center" fontWeight={500}>
                    Invalid pair.
                  </Text>
                </AutoColumn>
              ) : pairState === PairState.LOADING ? (
                <AutoColumn gap="sm" justify="center">
                  <Text textAlign="center">
                    Loading
                    <Dots />
                  </Text>
                </AutoColumn>
              ) : null
            ) : (
              prerequisiteMessage
            )}
          </AutoColumn>

          {/* <CurrencySearchModal
          isOpen={showSearch}
          onCurrencySelect={handleCurrencySelect}
          onDismiss={handleSearchDismiss}
          showCommonBases
          selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
        /> */}
        </AppBody>
      </Flex>
    </Page>
  )
}
