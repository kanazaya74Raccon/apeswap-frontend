import React, { useState } from 'react'
import { JSBI, Pair, Percent } from '@apeswapfinance/sdk'
import {
  Text,
  ChevronUpIcon,
  ChevronDownIcon,
  Card,
  CardBody,
  Flex,
  CardProps,
  ButtonSquare,
} from '@apeswapfinance/uikit'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTotalSupply from '../../hooks/useTotalSupply'

import { useTokenBalance } from '../../state/wallet/hooks'
import { currencyId } from '../../utils/currencyId'
import { unwrappedToken } from '../../utils/wrappedCurrency'

import { AutoColumn } from '../layout/Column'
import CurrencyLogo from '../Logo/CurrencyLogo'
import { DoubleCurrencyLogo } from '../Logo'
import { RowBetween, RowFixed } from '../layout/Row'
import { BIG_INT_ZERO } from '../../config/constants'
import Dots from '../Loader/Dots'

const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

interface PositionCardProps extends CardProps {
  pair: Pair
  showUnwrapped?: boolean
}

export function MinimalPositionCard({ pair, showUnwrapped = false }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <>
      {userPoolBalance && JSBI.greaterThan(userPoolBalance.raw, JSBI.BigInt(0)) ? (
        <Card>
          <CardBody>
            <AutoColumn gap="16px">
              <FixedHeightRow>
                <RowFixed>
                  <Text color="secondary" bold>
                    LP tokens in your wallet
                  </Text>
                </RowFixed>
              </FixedHeightRow>
              <FixedHeightRow onClick={() => setShowMore(!showMore)}>
                <RowFixed>
                  <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin size={20} />
                  <Text small color="textSubtle">
                    {currency0.symbol}-{currency1.symbol} LP
                  </Text>
                </RowFixed>
                <RowFixed>
                  <Text>{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</Text>
                </RowFixed>
              </FixedHeightRow>
              <AutoColumn gap="4px">
                <FixedHeightRow>
                  <Text color="textSubtle" small>
                    Share of Pool:
                  </Text>
                  <Text>{poolTokenPercentage ? `${poolTokenPercentage.toFixed(6)}%` : '-'}</Text>
                </FixedHeightRow>
                <FixedHeightRow>
                  <Text color="textSubtle" small>
                    {`Pooled ${currency0.symbol}`}:
                  </Text>
                  {token0Deposited ? (
                    <RowFixed>
                      <Text ml="6px">{token0Deposited?.toSignificant(6)}</Text>
                    </RowFixed>
                  ) : (
                    '-'
                  )}
                </FixedHeightRow>
                <FixedHeightRow>
                  <Text color="textSubtle" small>
                    {`Pooled ${currency1.symbol}`}:
                  </Text>
                  {token1Deposited ? (
                    <RowFixed>
                      <Text ml="6px">{token1Deposited?.toSignificant(6)}</Text>
                    </RowFixed>
                  ) : (
                    '-'
                  )}
                </FixedHeightRow>
              </AutoColumn>
            </AutoColumn>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <Text fontSize="14px" style={{ textAlign: 'center' }}>
            {`By adding liquidity you'll earn 0.2% of all trades on this pair proportional to your share of the pool.
            Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.`}
          </Text>
        </Card>
      )}
    </>
  )
}

export default function FullPositionCard({ pair, ...props }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <Card style={{ borderRadius: '12px' }} {...props}>
      <Flex justifyContent="space-between" role="button" onClick={() => setShowMore(!showMore)} p="16px">
        <Flex flexDirection="column">
          <Flex alignItems="center" mb="4px">
            <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={28} />
            <Text bold ml="8px" fontSize="22px">
              {!currency0 || !currency1 ? <Dots>Loading</Dots> : `${currency0.symbol}/${currency1.symbol}`}
            </Text>
          </Flex>
        </Flex>
        {showMore ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Flex>

      {showMore && (
        <AutoColumn gap="16px" style={{ padding: '16px' }}>
          <FixedHeightRow>
            <RowFixed>
              <Text fontSize="20px">Your total pooled tokens</Text>
            </RowFixed>
            {userPoolBalance ? (
              <RowFixed>
                <Text ml="6px" fontSize="20px">
                  {userPoolBalance?.toSignificant(4)}
                </Text>
              </RowFixed>
            ) : (
              '-'
            )}
          </FixedHeightRow>
          <FixedHeightRow>
            <RowFixed>
              <Text fontSize="20px">Pooled {currency0.symbol}</Text>
            </RowFixed>
            {token0Deposited ? (
              <RowFixed>
                <Text ml="6px" mr="6px" fontSize="20px">
                  {token0Deposited?.toSignificant(6)}
                </Text>
                <CurrencyLogo size="20px" currency={currency0} />
              </RowFixed>
            ) : (
              '-'
            )}
          </FixedHeightRow>
          <FixedHeightRow>
            <RowFixed>
              <Text fontSize="20px">Pooled {currency1.symbol}</Text>
            </RowFixed>
            {token1Deposited ? (
              <RowFixed>
                <Text ml="6px" mr="6px" fontSize="20px">
                  {token1Deposited?.toSignificant(6)}
                </Text>
                <CurrencyLogo size="20px" currency={currency1} />
              </RowFixed>
            ) : (
              '-'
            )}
          </FixedHeightRow>

          <FixedHeightRow>
            <Text fontSize="20px">Share of pool</Text>
            <Text fontSize="20px">
              {poolTokenPercentage
                ? `${poolTokenPercentage.toFixed(2) === '0.00' ? '<0.01' : poolTokenPercentage.toFixed(2)}%`
                : '-'}
            </Text>
          </FixedHeightRow>

          {userPoolBalance && JSBI.greaterThan(userPoolBalance.raw, BIG_INT_ZERO) && (
            <Flex flexDirection="row" mt="10px">
              <ButtonSquare
                as={Link}
                to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}
                fullWidth
                style={{ height: '40px', fontSize: '20px', marginRight: '8px', fontWeight: 700 }}
              >
                Add
              </ButtonSquare>
              <ButtonSquare
                as={Link}
                to={`/remove/${currencyId(currency0)}/${currencyId(currency1)}`}
                mb="8px"
                fullWidth
                style={{ height: '40px', fontSize: '20px', marginLeft: '8px', fontWeight: 700 }}
              >
                Remove
              </ButtonSquare>
            </Flex>
          )}
        </AutoColumn>
      )}
    </Card>
  )
}
