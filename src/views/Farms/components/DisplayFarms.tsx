import React from 'react'
import { Flex, useMatchBreakpoints, Text, LinkExternal, Svg } from '@apeswapfinance/uikit'
import ListView from 'components/ListView'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { Farm } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ApyButton from 'components/ApyCalculator/ApyButton'
import { useTranslation } from 'contexts/Localization'
import CardActions from './CardActions'
import { Container, FarmButton, NextArrow } from './styles'
import HarvestAction from './CardActions/HarvestAction'
import { ActionContainer } from './CardActions/styles'

const DisplayFarms: React.FC<{ farms: Farm[]; openPid?: number }> = ({ farms, openPid }) => {
  const { chainId } = useActiveWeb3React()
  const { isXl, isLg, isXxl } = useMatchBreakpoints()
  const { t } = useTranslation()
  const isMobile = !isLg && !isXl && !isXxl

  const farmsListView = farms.map((farm, i) => {
    const [token1, token2] = farm.lpSymbol.split('-')
    const bscScanUrl = `https://bscscan.com/address/${farm.lpAddresses[chainId]}`
    const liquidityUrl = `https://apeswap.finance/add/${
      farm.quoteTokenSymbol === 'BNB' ? 'ETH' : farm.quoteTokenAdresses[chainId]
    }/${farm.tokenAddresses[chainId]}`
    const projectLink = farm.projectLink
    const userAllowance = farm?.userData?.allowance
    const userEarnings = getBalanceNumber(farm?.userData?.earnings || new BigNumber(0))?.toFixed(2)
    const userEarningsUsd = `$${(
      getBalanceNumber(farm?.userData?.earnings || new BigNumber(0)) * farm.bananaPrice
    ).toFixed(2)}`
    const userTokenBalance = `${getBalanceNumber(farm?.userData?.tokenBalance || new BigNumber(0))?.toFixed(6)} LP`
    const userTokenBalanceUsd = `$${(
      getBalanceNumber(farm?.userData?.tokenBalance || new BigNumber(0)) * farm?.lpValueUsd
    ).toFixed(2)}`

    // Changing tooltip placement conditionaly until zindex solution

    return {
      tokens: { token1: farm.pid === 184 ? 'NFTY2' : token1, token2, token3: 'BANANA' },
      title: farm.lpSymbol,
      open: farm.pid === openPid,
      id: farm.pid,
      infoContent: (
        <>
          <Flex flexDirection="column">
            <Flex alignItems="space-between" justifyContent="space-between" style={{ width: '100%' }}>
              <Text style={{ fontSize: '12px' }}>{t('Multiplier')}</Text>
              <Text bold style={{ fontSize: '12px' }}>
                {Math.round(parseFloat(farm.multiplier) * 1000) / 100}X
              </Text>
            </Flex>
            <Flex alignItems="space-between" justifyContent="space-between" style={{ width: '100%' }}>
              <Text style={{ fontSize: '12px' }}>{t('Stake')}</Text>
              <Text bold style={{ fontSize: '12px' }}>
                {farm.lpSymbol} {t('LP')}
              </Text>
            </Flex>
            <Flex alignItems="center" justifyContent="center" mt="15px">
              <LinkExternal href={bscScanUrl} style={{ fontSize: '14px' }}>
                {t('View on BscScan')}
              </LinkExternal>
            </Flex>
            {projectLink && (
              <Flex alignItems="center" justifyContent="center" mt="15px">
                <LinkExternal href={projectLink} style={{ fontSize: '14px' }}>
                  {t('Learn More')}
                </LinkExternal>
              </Flex>
            )}
          </Flex>
        </>
      ),
      cardContent: (
        <>
          <ListViewContent
            title={t('APY')}
            value={`${farm?.apy}%`}
            width={isMobile ? 90 : 160}
            toolTip={t(
              'APY includes annualized BANANA rewards and rewards for providing liquidity (DEX swap fees), compounded daily.',
            )}
            toolTipPlacement={i === farms.length - 1 && i !== 0 ? 'topLeft' : 'bottomLeft'}
            toolTipTransform={i === farms.length - 1 && i !== 0 ? 'translate(0, -105%)' : 'translate(0, 38%)'}
          />
          <ListViewContent
            title={t('APR')}
            value={`${farm?.apr}%`}
            value2={`${farm?.lpApr}%`}
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
            toolTip={t(
              'BANANA reward APRs are calculated in real time. DEX swap fee APRs are calculated based on previous 24 hours of trading volume. Note: APRs are provided for your convenience. APRs are constantly changing and do not represent guaranteed returns.',
            )}
            toolTipPlacement={i === farms.length - 1 && i !== 0 ? 'topLeft' : 'bottomLeft'}
            toolTipTransform={i === farms.length - 1 && i !== 0 ? 'translate(0, -105%)' : 'translate(0, 38%)'}
            aprCalculator={
              <ApyButton
                lpLabel={farm.lpSymbol}
                rewardTokenName="BANANA"
                rewardTokenPrice={farm.bananaPrice}
                apy={parseFloat(farm?.apr) / 100 + parseFloat(farm?.lpApr) / 100}
                addLiquidityUrl={liquidityUrl}
              />
            }
          />
          <ListViewContent
            title={t('Liquidity')}
            value={`$${Number(farm?.totalLpStakedUsd).toLocaleString(undefined)}`}
            width={isMobile ? 100 : 200}
            toolTip={t('The total value of the LP tokens currently staked in this farm.')}
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
          <ListViewContent title={t('Earned')} value={userEarnings} width={isMobile ? 65 : 100} />
        </>
      ),
      expandedContent: (
        <>
          <ActionContainer>
            {isMobile && (
              <ListViewContent
                title={t('Available LP')}
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
              <FarmButton>{t('GET LP')}</FarmButton>
            </a>
            {!isMobile && (
              <ListViewContent
                title={t('Available LP')}
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
