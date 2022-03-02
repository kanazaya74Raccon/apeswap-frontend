import { Flex, useMatchBreakpoints } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import ApyButton from 'components/ApyCalculator/ApyButton'
import { TwitterIcon, WebsiteIcon } from 'components/Icons'
import ListView from 'components/ListView'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React from 'react'
import { Pool } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { ActionContainer } from 'views/Farms/components/CardActions/styles'
import { NextArrow } from 'views/Farms/components/styles'
import CardActions from './CardActions'
import HarvestAction from './CardActions/HarvestAction'
import { Container, StyledButton } from './styles'

const DisplayPools: React.FC<{ pools: Pool[] }> = ({ pools }) => {
  const { chainId } = useActiveWeb3React()
  const { isXl, isLg } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl

  const poolsListView = pools.map((pool) => {
    const token1 = pool.stakingToken.symbol
    const token2 = pool.rewardToken.symbol
    const totalDollarAmountStaked = getBalanceNumber(pool?.totalStaked) * pool?.stakingToken?.price
    const liquidityUrl = !pool?.lpStaking
      ? pool.stakingToken.symbol === 'GNANA'
        ? 'https://apeswap.finance/gnana'
        : `https://apeswap.finance/swap?outputCurrency=${pool?.stakingToken.address[chainId]}`
      : `${BASE_ADD_LIQUIDITY_URL}/${pool?.lpTokens?.token?.address[chainId]}/${pool?.lpTokens?.quoteToken?.address[chainId]}`
    const userAllowance = pool?.userData?.allowance
    const userEarnings = getBalanceNumber(pool?.userData?.pendingReward || new BigNumber(0))?.toFixed(2)
    const userEarningsUsd = `$${(
      getBalanceNumber(pool?.userData?.pendingReward || new BigNumber(0)) * pool.rewardToken?.price
    ).toFixed(2)}`
    const userTokenBalance = `${getBalanceNumber(pool?.userData?.stakingTokenBalance || new BigNumber(0))?.toFixed(6)}`
    const userTokenBalanceUsd = `$${(
      getBalanceNumber(pool?.userData?.stakingTokenBalance || new BigNumber(0)) * pool?.stakingToken?.price
    ).toFixed(2)}`

    return {
      tokens: { token1, token2 },
      title: pool.rewardToken.symbol,
      cardContent: (
        <>
          <Flex alignItems="center" justifyContent="space-between" style={{ width: '85px', height: '100%' }}>
            <a href={pool.projectLink} target="_blank" rel="noopener noreferrer">
              <WebsiteIcon />
            </a>
            <a href={pool.projectLink} target="_blank" rel="noopener noreferrer">
              <TwitterIcon />
            </a>
          </Flex>
          <ListViewContent title="APR" value={`${pool?.apr?.toFixed(2)}%`} width={isMobile ? 50 : 80} toolTip="s" />
          <ListViewContent
            title="Liquidity"
            value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
            width={isMobile ? 100 : 130}
            toolTip="s"
          />
          <ListViewContent title="Earned" value="0" width={isMobile ? 65 : 110} />
        </>
      ),
      expandedContent: (
        <>
          <ActionContainer>
            <a href={liquidityUrl} target="_blank" rel="noopener noreferrer">
              <StyledButton>GET {pool.stakingToken.symbol}</StyledButton>
            </a>
            {!isMobile && (
              <ListViewContent
                title={`Available ${pool.stakingToken.symbol}`}
                value={userTokenBalance}
                value2={userTokenBalanceUsd}
                value2Secondary
                width={120}
                height={50}
                lineHeight={15}
                ml={10}
              />
            )}
          </ActionContainer>
          {!isMobile && <NextArrow />}
          <CardActions
            allowance={userAllowance?.toString()}
            stakedBalance={pool?.userData?.stakedBalance?.toString()}
            stakingTokenBalance={pool?.userData?.stakingTokenBalance?.toString()}
            stakeTokenAddress={pool.stakingToken?.address[chainId]}
            stakeTokenValueUsd={pool.stakingToken?.price}
            sousId={pool.sousId}
          />
          {!isMobile && <NextArrow />}
          <HarvestAction sousId={pool.sousId} disabled={userEarnings === '0.00'} userEarningsUsd={userEarningsUsd} />
        </>
      ),
    } as ExtendedListViewProps
  })
  return (
    <Container>
      <ListView listViews={poolsListView} />
    </Container>
  )
}

export default React.memo(DisplayPools)
