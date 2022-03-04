import React from 'react'
import { useMatchBreakpoints } from '@apeswapfinance/uikit'
import ListView from 'components/ListView'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { Farm } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ApyButton from 'components/ApyCalculator/ApyButton'
import CardActions from './CardActions'
import { Container, FarmButton, NextArrow, TitleText } from './styles'
import HarvestAction from './CardActions/HarvestAction'
import { ActionContainer } from './CardActions/styles'

const DisplayFarms: React.FC<{ farms: Farm[] }> = ({ farms }) => {
  const { chainId } = useActiveWeb3React()
  const { isXl, isLg } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl

  const farmsListView = farms.map((farm) => {
    const [token1, token2] = farm.lpSymbol.split('-')
    const liquidityUrl = `https://apeswap.finance/add/${
      farm.quoteTokenSymbol === 'BNB' ? 'ETH' : farm.quoteTokenAdresses[chainId]
    }/${farm.tokenAddresses[chainId]}`
    const userAllowance = farm?.userData?.allowance
    const userEarnings = getBalanceNumber(farm?.userData?.earnings || new BigNumber(0))?.toFixed(2)
    const userEarningsUsd = `$${(
      getBalanceNumber(farm?.userData?.earnings || new BigNumber(0)) * farm.bananaPrice
    ).toFixed(2)}`
    const userTokenBalance = `${getBalanceNumber(farm?.userData?.tokenBalance || new BigNumber(0))?.toFixed(6)} LP`
    const userTokenBalanceUsd = `$${(
      getBalanceNumber(farm?.userData?.tokenBalance || new BigNumber(0)) * farm?.lpValueUsd
    ).toFixed(2)}`

    return {
      tokens: { token1, token2, token3: 'BANANA' },
      title: (
        <TitleText ml="10px" bold>
          {farm.lpSymbol}
        </TitleText>
      ),
      cardContent: (
        <>
          <ListViewContent title="APY" value={`${farm?.apy}%`} width={isMobile ? 90 : 160} toolTip="s" />
          <ListViewContent
            title="APR"
            value={`${farm?.apr}%`}
            value2="23.12%"
            value2Icon="/images/swap-icon.svg"
            valueIcon="/images/tokens/banana.svg"
            width={isMobile ? 100 : 200}
            toolTip="APR is calculated by summing up the rewards from providing liquidity (e.g., DEX swap fees) and the rewards in BANANA."
            aprCalculator={
              <ApyButton
                lpLabel={farm.lpSymbol}
                rewardTokenName="BANANA"
                rewardTokenPrice={farm.bananaPrice}
                apy={parseFloat(farm.apr) / 100}
                addLiquidityUrl={liquidityUrl}
              />
            }
          />
          <ListViewContent
            title="Liquidity"
            value={`$${Number(farm?.totalLpStakedUsd).toLocaleString(undefined)}`}
            width={isMobile ? 100 : 200}
            toolTip="s"
          />
          <ListViewContent title="Earned" value={userEarnings} width={isMobile ? 65 : 100} />
        </>
      ),
      expandedContent: (
        <>
          <ActionContainer>
            {isMobile && (
              <ListViewContent
                title="Available LP"
                value={userTokenBalance}
                value2={userTokenBalanceUsd}
                value2Secondary
                width={100}
                height={50}
                lineHeight={15}
                ml={10}
              />
            )}
            <a href={liquidityUrl} target="_blank" rel="noopener noreferrer">
              <FarmButton>GET LP</FarmButton>
            </a>
            {!isMobile && (
              <ListViewContent
                title="Available LP"
                value={userTokenBalance}
                value2={userTokenBalanceUsd}
                value2Secondary
                width={100}
                height={50}
                lineHeight={15}
                ml={10}
              />
            )}
          </ActionContainer>
          {!isMobile && <NextArrow />}
          <CardActions
            allowance={userAllowance?.toString()}
            stakedBalance={farm?.userData?.stakedBalance?.toString()}
            stakingTokenBalance={farm?.userData?.tokenBalance?.toString()}
            stakeLpAddress={farm.lpAddresses[chainId]}
            lpValueUsd={farm.lpValueUsd}
            pid={farm.pid}
          />
          {!isMobile && <NextArrow />}
          <HarvestAction pid={farm.pid} disabled={userEarnings === '0.00'} userEarningsUsd={userEarningsUsd} />
        </>
      ),
    } as ExtendedListViewProps
  })

  return (
    <Container>
      <ListView listViews={farmsListView} />
    </Container>
  )
}

export default React.memo(DisplayFarms)
