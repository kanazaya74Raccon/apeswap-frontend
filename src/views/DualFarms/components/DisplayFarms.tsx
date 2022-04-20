import React from 'react'
import { Flex, useMatchBreakpoints, Text, LinkExternal, Svg } from '@apeswapfinance/uikit'
import ListView from 'components/ListView'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { DualFarm, Farm } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ApyButton from 'components/ApyCalculator/ApyButton'
import CardActions from './CardActions'
import { Container, FarmButton, NextArrow } from './styles'
import HarvestAction from './CardActions/HarvestAction'
import { ActionContainer } from './CardActions/styles'
import { TokenContainer } from '../../../components/ServiceTokenDisplay/styles'

const DisplayFarms: React.FC<{ farms: DualFarm[]; openPid?: number }> = ({ farms, openPid }) => {
  const { chainId } = useActiveWeb3React()
  const { isXl, isLg, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl

  const farmsListView = farms.map((farm, i) => {
    const polygonScanUrl = `https://polygonscan.com/address/${farm.stakeTokenAddress}`
    const liquidityUrl = `https://apeswap.finance/add/${farm?.stakeTokens?.token1?.address[chainId]}/${farm?.stakeTokens?.token0?.address[chainId]}`
    const userAllowance = farm?.userData?.allowance

    const setUrls = (tokenSymbol: string) => {
      return [
        `https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${tokenSymbol.toUpperCase()}.svg`,
        `https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${tokenSymbol.toUpperCase()}.png`,
      ]
    }

    const userEarningsMiniChef = getBalanceNumber(farm?.userData?.miniChefEarnings || new BigNumber(0)).toFixed(2)
    const userEarningsRewarder = getBalanceNumber(farm?.userData?.rewarderEarnings || new BigNumber(0)).toFixed(2)
    const userEarningsUsd = `$${(
      getBalanceNumber(farm?.userData?.miniChefEarnings || new BigNumber(0)) * farm?.rewardToken0Price +
      getBalanceNumber(farm?.userData?.rewarderEarnings || new BigNumber(0)) * farm?.rewardToken1Price
    ).toFixed(2)}`
    const userTokenBalance = `${getBalanceNumber(farm?.userData?.tokenBalance || new BigNumber(0))?.toFixed(6)} LP`

    const lpValueUsd = farm?.stakeTokenPrice

    const userTokenBalanceUsd = `$${(
      getBalanceNumber(farm?.userData?.tokenBalance || new BigNumber(0)) * lpValueUsd
    ).toFixed(2)}`
    // Changing tooltip placement conditionaly until zindex solution
    return {
      tokens: {
        token1: farm?.stakeTokens?.token1?.symbol,
        token2: farm?.stakeTokens?.token0?.symbol,
        token3: farm?.rewardTokens?.token0?.symbol,
        token4: farm?.dualImage !== false ? farm?.rewardTokens?.token1?.symbol : null,
      },
      title: `${farm?.stakeTokens?.token1?.symbol}-${farm?.stakeTokens?.token0?.symbol}`,
      viewType: 'stakeLP',
      open: farm.pid === openPid,
      id: farm.pid,
      infoContent: (
        <>
          <Flex flexDirection="column">
            <Flex alignItems="space-between" justifyContent="space-between" style={{ width: '100%' }}>
              <Text style={{ fontSize: '12px' }}>Multiplier</Text>
              <Text bold style={{ fontSize: '12px' }}>
                {Math.round(parseFloat(farm.multiplier) * 1000) / 100}X
              </Text>
            </Flex>
            <Flex alignItems="space-between" justifyContent="space-between" style={{ width: '100%' }}>
              <Text style={{ fontSize: '12px' }}>Stake</Text>
              <Text bold style={{ fontSize: '12px' }}>
                LP
              </Text>
            </Flex>
            <Flex alignItems="center" justifyContent="center" mt="15px">
              <LinkExternal href={polygonScanUrl} style={{ fontSize: '14px' }}>
                View on PolygonScan
              </LinkExternal>
            </Flex>
          </Flex>
        </>
      ),
      cardContent: (
        <>
          <ListViewContent
            title="APY"
            value={`${farm?.apy}%`}
            width={isMobile ? 90 : 160}
            toolTip="APY includes annualized BANANA rewards and rewards for providing liquidity (DEX swap fees), compounded daily."
            toolTipPlacement={i === farms.length - 1 && i !== 0 ? 'topLeft' : 'bottomLeft'}
            toolTipTransform={i === farms.length - 1 && i !== 0 ? 'translate(0, -105%)' : 'translate(0, 38%)'}
          />
          <ListViewContent
            title="APR"
            value={`${farm?.apr ? farm?.apr.toFixed(2) : 0}%`}
            value2={`${parseFloat(farm?.lpApr).toFixed(2)}%`}
            value2Icon={
              <span style={{ marginRight: '7px' }}>
                <Svg icon="swap" width={13} color="text" />
              </span>
            }
            valueIcon={
              <span style={{ marginRight: '5px' }}>
                <Svg icon="banana_token" width={15} color="text" />
              </span>
            }
            width={isMobile ? 100 : 200}
            toolTip="BANANA reward APRs are calculated in real time. DEX swap fee APRs are calculated based on previous 24 hours of trading volume. Note: APRs are provided for your convenience. APRs are constantly changing and do not represent guaranteed returns."
            toolTipPlacement={i === farms.length - 1 && i !== 0 ? 'topLeft' : 'bottomLeft'}
            toolTipTransform={i === farms.length - 1 && i !== 0 ? 'translate(0, -105%)' : 'translate(0, 38%)'}
            aprCalculator={
              <ApyButton
                lpLabel={`${farm?.stakeTokens?.token1?.symbol}-${farm?.stakeTokens?.token0?.symbol}`}
                rewardTokenName="BANANA"
                rewardTokenPrice={farm.rewardToken0Price}
                apy={farm?.apr / 100 + parseFloat(farm?.lpApr) / 100}
                addLiquidityUrl={liquidityUrl}
              />
            }
          />
          <ListViewContent
            title="Liquidity"
            value={`$${Number(farm?.totalStaked).toLocaleString(undefined)}`}
            width={isMobile ? 100 : 200}
            toolTip="The total value of the LP tokens currently staked in this farm."
            toolTipPlacement={
              isMobile
                ? i === farms.length - 1 && i !== 0
                  ? 'topRight'
                  : 'bottomRight'
                : i === farms.length - 1 && i !== 0
                ? 'topRight'
                : 'bottomLeft'
            }
            toolTipTransform={
              isMobile
                ? i === farms.length - 1 && i !== 0
                  ? 'translate(-60%, -110%)'
                  : 'translate(-75%, 75%)'
                : i === farms.length - 1 && i !== 0
                ? 'translate(-60%, -110%)'
                : 'translate(0%, 75%)'
            }
          />
          <ListViewContent
            title="Earned"
            value={`${userEarningsMiniChef}`}
            valueIcon={<TokenContainer size={15} ml={-2} mr={5} srcs={setUrls(farm?.rewardTokens.token0.symbol)} />}
            value2={farm?.dualImage !== false ? `${userEarningsRewarder}` : ''}
            value2Icon={
              farm?.dualImage !== false ? (
                <TokenContainer size={15} ml={-2} mr={5} srcs={setUrls(farm?.rewardTokens.token1.symbol)} />
              ) : null
            }
            width={isMobile ? 65 : 100}
          />
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
            stakeLpAddress={farm?.stakeTokenAddress}
            lpValueUsd={lpValueUsd}
            pid={farm.pid}
          />
          {!isMobile && <NextArrow />}
          <HarvestAction pid={farm.pid} disabled={userEarningsMiniChef === '0.00'} userEarningsUsd={userEarningsUsd} />
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
