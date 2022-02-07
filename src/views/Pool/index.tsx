import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Pair } from '@apeswapfinance/sdk'
import { Text, Flex, AddIcon, ButtonSquare, Card } from '@apeswapfinance/uikit'
import { Wrapper } from 'views/Swap/components/styled'
import CurrencyInputHeader from 'views/Swap/components/CurrencyInputHeader'
import { Link } from 'react-router-dom'
import Page from 'components/layout/Page'
import UnlockButton from 'components/UnlockButton'
import SwapBanner from 'components/SwapBanner'
import WalletTransactions from 'components/RecentTransactions/WalletTransactions'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import FullPositionCard from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs, useUserRecentTransactions } from '../../state/user/hooks'
import Dots from '../../components/Loader/Dots'
import { AppBody } from '../../components/App'

const StyledCard = styled(Card)`
  background-color: ${({ theme }) => (theme.isDark ? '#383838' : '#F0F0F0')};
`

const StyledText = styled(Text)`
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 25px;
  }
`

const StyledFlex = styled(Flex)`
  background: ${({ theme }) => theme.colors.white2};
`
const InnerFlex = styled(Flex)`
  background: ${({ theme }) => theme.colors.white3};
`

export default function Pool() {
  const { account } = useActiveWeb3React()
  const [recentTransactions] = useUserRecentTransactions()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const renderBody = () => {
    if (!account) {
      return (
        <Flex flexDirection="column" justifyContent="space-between" style={{ height: '130px' }}>
          <Text textAlign="center" fontSize="22.5px" marginTop="10px" bold>
            Add Liquidity To Receive LP Tokens
          </Text>
          <UnlockButton large />
        </Flex>
      )
    }
    if (v2IsLoading) {
      return (
        <Text textAlign="center">
          <Dots>Loading</Dots>
        </Text>
      )
    }
    if (allV2PairsWithLiquidity?.length > 0) {
      return allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
        />
      ))
    }
    return <Text textAlign="center">No liquidity found.</Text>
  }

  return (
    <Page>
      <Flex alignItems="center" flexDirection="column" flexWrap="nowrap" mb="20px">
        <SwapBanner />
        <AppBody>
          <CurrencyInputHeader title="Swap" subtitle="Trade tokens in an instant" />
          <Wrapper>
            <StyledCard style={{ height: '160px', borderRadius: '20px' }} mb="25px">
              <InnerFlex
                flexDirection="column"
                paddingTop="25px"
                paddingBottom="10px"
                justifyContent="space-between"
                alignItems="center"
                style={{ height: '100%' }}
              >
                <StyledText fontWeight={700}>Add liquidity to receive LP tokens</StyledText>
                <ButtonSquare
                  id="join-pool-button"
                  as={Link}
                  to="/add"
                  startIcon={<AddIcon color="white" />}
                  style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}
                >
                  Add Liquidity
                </ButtonSquare>
              </InnerFlex>
            </StyledCard>
            {renderBody()}
          </Wrapper>
          {account && !v2IsLoading && (
            <StyledFlex flexDirection="column" alignItems="center" pt="20px" pb="10px">
              <Text mb="8px">Dont see a pool you joined?</Text>
              <ButtonSquare
                id="import-pool-link"
                as={Link}
                to="/find"
                style={{
                  backgroundColor: 'rgb(0,0,0,0)',
                  fontSize: '16px',
                  color: 'Primary',
                }}
              >
                <Text style={{ textDecoration: 'underline' }} mb="8px">
                  {' '}
                  Find other LP tokens
                </Text>
              </ButtonSquare>
            </StyledFlex>
          )}
        </AppBody>
        {recentTransactions && <WalletTransactions />}
      </Flex>
    </Page>
  )
}
