import { IconButton, Text, Flex } from '@ape.swap/uikit'
import BigNumber from 'bignumber.js'
import ListView from 'components/ListView'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { useLocation } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ApyButton from 'components/ApyCalculator/ApyButton'
import useIsMobile from 'hooks/useIsMobile'
import React from 'react'
import { Pool } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { NextArrow } from 'views/Farms/components/styles'
import { useTranslation } from 'contexts/Localization'
import Actions from './Actions'
import HarvestAction from './Actions/HarvestAction'
import InfoContent from '../InfoContent'
import { Container, StyledButton, ActionContainer } from './styles'

const DisplayPools: React.FC<{ pools: Pool[]; openId?: number }> = ({ pools, openId }) => {
  const { chainId } = useActiveWeb3React()
  const isMobile = useIsMobile()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const isActive = !pathname.includes('history')

  const poolsListView = pools.map((pool) => {
    const token1 = pool?.stakingToken?.symbol
    const token2 = pool?.rewardToken?.symbol
    const totalDollarAmountStaked = getBalanceNumber(pool?.totalStaked) * pool?.stakingToken?.price
    const liquidityUrl = !pool?.lpStaking
      ? pool.stakingToken.symbol === 'GNANA'
        ? 'https://apeswap.finance/gnana'
        : `https://apeswap.finance/swap?outputCurrency=${pool?.stakingToken.address[chainId]}`
      : `${BASE_ADD_LIQUIDITY_URL}/${pool?.lpTokens?.token?.address[chainId]}/${pool?.lpTokens?.quoteToken?.address[chainId]}`
    const userAllowance = pool?.userData?.allowance
    const userEarnings = getBalanceNumber(
      pool?.userData?.pendingReward || new BigNumber(0),
      pool?.rewardToken?.decimals,
    )
    const userEarningsUsd = `$${(userEarnings * pool.rewardToken?.price).toFixed(2)}`
    const userTokenBalance = `${getBalanceNumber(pool?.userData?.stakingTokenBalance || new BigNumber(0))?.toFixed(6)}`
    const userTokenBalanceUsd = `$${(
      getBalanceNumber(pool?.userData?.stakingTokenBalance || new BigNumber(0)) * pool?.stakingToken?.price
    ).toFixed(2)}`

    // Token symbol logic is here temporarily for nfty
    return {
      tokens: { token1, token2: token2 === 'NFTY ' ? 'NFTY2' : token2 || pool?.tokenName },
      title: (
        <Text ml={10} weight="bold">
          {pool?.rewardToken?.symbol || pool?.tokenName}
        </Text>
      ),
      id: pool.sousId,
      infoContent: <InfoContent pool={pool} />,
      infoContentPosition: 'translate(-82%, 28%)',
      open: openId === pool.sousId,
      cardContent: (
        <>
          <Flex sx={{ width: '90px', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            {!isMobile && (
              <>
                <a href={pool.projectLink} target="_blank" rel="noreferrer">
                  <IconButton icon="website" color="primaryBright" width={20} style={{ padding: '8.5px 10px' }} />
                </a>
                <a href={pool?.twitter} target="_blank" rel="noreferrer">
                  <IconButton icon="twitter" color="primaryBright" width={20} />
                </a>
              </>
            )}
          </Flex>
          <ListViewContent
            title={t('APR')}
            value={`${isActive ? pool?.apr?.toFixed(2) : '0.00'}%`}
            width={isMobile ? 95 : 80}
            height={50}
            toolTip={t('APR is calculated based on current value of the token, reward rate and pool % owned.')}
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(0, 60%)"
            aprCalculator={
              <ApyButton
                lpLabel={pool?.stakingToken?.symbol}
                rewardTokenName={pool?.rewardToken?.symbol}
                rewardTokenPrice={pool?.rewardToken?.price}
                apy={pool?.apr / 100}
                addLiquidityUrl={liquidityUrl}
              />
            }
          />
          <ListViewContent
            title={t('Total Staked')}
            value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
            width={isMobile ? 160 : 110}
            height={50}
            toolTip={t('The total value of the tokens currently staked in this pool.')}
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(0%, 75%)"
          />
          <ListViewContent title={t('Earned')} value={userEarningsUsd} height={50} width={isMobile ? 80 : 150} />
        </>
      ),
      expandedContent: (
        <>
          <ActionContainer>
            {isMobile && (
              <ListViewContent
                title={`${t('Available')} ${pool?.stakingToken?.symbol}`}
                value={userTokenBalance}
                value2={userTokenBalanceUsd}
                value2Secondary
                width={190}
                height={50}
                lineHeight={15}
                ml={10}
              />
            )}
            <a href={liquidityUrl} target="_blank" rel="noopener noreferrer">
              <StyledButton sx={{ width: '150px' }}>
                {t('GET')} {pool?.stakingToken?.symbol}
              </StyledButton>
            </a>
            {!isMobile && (
              <ListViewContent
                title={`${t('Available')} ${pool?.stakingToken?.symbol}`}
                value={userTokenBalance}
                value2={userTokenBalanceUsd}
                value2Secondary
                width={190}
                height={50}
                lineHeight={15}
                ml={10}
              />
            )}
          </ActionContainer>
          {!isMobile && <NextArrow />}
          <Actions
            allowance={userAllowance?.toString()}
            stakedBalance={pool?.userData?.stakedBalance?.toString()}
            stakedTokenSymbol={pool?.stakingToken?.symbol}
            stakingTokenBalance={pool?.userData?.stakingTokenBalance?.toString()}
            stakeTokenAddress={pool?.stakingToken?.address[chainId]}
            stakeTokenValueUsd={pool?.stakingToken?.price}
            sousId={pool?.sousId}
          />
          {!isMobile && <NextArrow />}
          <HarvestAction
            sousId={pool?.sousId}
            disabled={userEarnings <= 0}
            userEarnings={userEarnings}
            earnTokenSymbol={pool?.rewardToken?.symbol || pool?.tokenName}
          />
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
