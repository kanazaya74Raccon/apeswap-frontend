import React, { useCallback, useEffect, useState } from 'react'
import { Currency, ETHER, JSBI, TokenAmount } from '@apeswapfinance/sdk'
import { Button, ChevronDownIcon, Text, AddIcon, useModal, Card, Flex } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import CurrencyInputHeader from 'views/Swap/components/CurrencyInputHeader'
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

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: none;
  border-radius: 16px;
`

export default function PoolFinder() {
  const { account } = useActiveWeb3React()

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
    <Card padding="45px 10px">
      <Text textAlign="center">
        {!account ? 'Connect to a wallet to find pools' : 'Select a token to find your liquidity.'}
      </Text>
    </Card>
  )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={handleCurrencySelect}
      showCommonBases
      selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
    />,
  )

  return (
    <Page>
      <Flex alignItems="center" flexDirection="column" flexWrap="nowrap">
        <AppBody>
          <CurrencyInputHeader />
          <AutoColumn style={{ padding: '1rem' }} gap="md">
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
                  <Text ml="8px">{currency0.symbol}</Text>
                </Row>
              ) : (
                <Text ml="8px">Select a Token</Text>
              )}
            </StyledButton>

            <ColumnCenter>
              <AddIcon />
            </ColumnCenter>

            <StyledButton
              endIcon={<ChevronDownIcon />}
              onClick={() => {
                onPresentCurrencyModal()
                setActiveField(Fields.TOKEN1)
              }}
            >
              {currency1 ? (
                <Row>
                  <CurrencyLogo currency={currency1} />
                  <Text ml="8px">{currency1.symbol}</Text>
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
                  <Text textAlign="center">Manage this pool.</Text>
                </StyledInternalLink>
              </ColumnCenter>
            )}

            {currency0 && currency1 ? (
              pairState === PairState.EXISTS ? (
                hasPosition && pair ? (
                  <MinimalPositionCard pair={pair} />
                ) : (
                  <Card padding="45px 10px">
                    <AutoColumn gap="sm" justify="center">
                      <Text textAlign="center">You don’t have liquidity in this pool yet.</Text>
                      <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                        <Text textAlign="center">Add Liquidity</Text>
                      </StyledInternalLink>
                    </AutoColumn>
                  </Card>
                )
              ) : validPairNoLiquidity ? (
                <Card padding="45px 10px">
                  <AutoColumn gap="sm" justify="center">
                    <Text textAlign="center">No pool found.</Text>
                    <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                      Create pool.
                    </StyledInternalLink>
                  </AutoColumn>
                </Card>
              ) : pairState === PairState.INVALID ? (
                <Card padding="45px 10px">
                  <AutoColumn gap="sm" justify="center">
                    <Text textAlign="center" fontWeight={500}>
                      Invalid pair.
                    </Text>
                  </AutoColumn>
                </Card>
              ) : pairState === PairState.LOADING ? (
                <Card padding="45px 10px">
                  <AutoColumn gap="sm" justify="center">
                    <Text textAlign="center">
                      Loading
                      <Dots />
                    </Text>
                  </AutoColumn>
                </Card>
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
