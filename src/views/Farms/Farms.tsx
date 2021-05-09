import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading, RowType, Toggle, Text, Card, Checkbox } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { BLOCKS_PER_YEAR, BANANA_PER_BLOCK, BANANA_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import {
  useFarms,
  usePriceBnbBusd,
  usePriceBananaBusd,
  usePriceEthBusd,
  useFarmFromSymbol,
  useFarmUser,
  useStatsOverall,
} from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import useTheme from 'hooks/useTheme'
import { fetchFarmUserDataAsync } from 'state/actions'
import { Farm } from 'state/types'
import { QuoteToken } from 'config/constants/types'
import { orderBy } from 'lodash'
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'

import Table from './components/FarmTable/FarmTable'
import SearchInput from './components/SearchInput'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'

interface LabelProps {
  active?: boolean
}

const ControlContainer = styled(Card)`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: center;
  flex-direction: column;
  overflow: visible;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 15px 15px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
      height: 59px;
      padding: 0px;
      justify-content: flex-start;
      padding-left: 50px;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const HeadingContainer = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

const Header = styled.div`
  padding-top: 36px;
  padding-left: 16px;
  padding-right: 16px;
  background-image: ${({ theme }) => (theme.isDark ? 'url(/images/farm-night.svg)' : 'url(/images/farm-day.svg)')};
  background-repeat: no-repeat;
  background-size: cover;
  height: 400px;
  background-position: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const StyledText = styled(Text)`
  font-weight: 700;
  font-size: 15px;
`

const Farms: React.FC = () => {
  const { statsOverall } = useStatsOverall()

  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const bananaPrice = usePriceBananaBusd()
  const bnbPrice = usePriceBnbBusd()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState(ViewMode.TABLE)
  const [sortOption, setSortOption] = useState('')
  const [sortDirection, setSortDirection] = useState<boolean | "desc" | "asc">('desc')

  const ethPriceUsd = usePriceEthBusd()

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)
  const isActive = !pathname.includes('history')

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const { isDark } = useTheme()

  interface CheckboxProps {
    checked?: boolean
  }

  const StyledCheckbox = styled(Checkbox)<CheckboxProps>`
    height: 21px;
    width: 21px;
  `

  const StyledImage = styled.img`
    height: 187px;
    width: 134px;
    position: absolute;
    right: 0px;
    bottom: 21px;
  `

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      const bananaPriceVsBNB = new BigNumber(
        farmsLP.find((farm) => farm.pid === BANANA_POOL_PID)?.tokenPriceVsQuote || 0,
      )
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const bananaRewardPerBlock = BANANA_PER_BLOCK.times(farm.poolWeight)
        const bananaRewardPerYear = bananaRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apr = bananaPriceVsBNB.times(bananaRewardPerYear).div(farm.lpTotalInQuoteToken)
        const totalLiquidity = new BigNumber(statsOverall.farms[farm.pid - 1].tvl)

        if (farm.quoteTokenSymbol === QuoteToken.BUSD || farm.quoteTokenSymbol === QuoteToken.UST) {
          apr = bananaPriceVsBNB.times(bananaRewardPerYear).div(farm.lpTotalInQuoteToken).times(bnbPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          apr = bananaPrice.div(ethPriceUsd).times(bananaRewardPerYear).div(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.BANANA) {
          apr = bananaRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const bananaApr =
            farm && bananaPriceVsBNB.times(bananaRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApr =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apr = new BigNumber((bananaApr && dualApr && bananaApr.plus(dualApr)).times(100))
        }
        return { ...farm, apr, liquidity: totalLiquidity }
      })
      if (query) {
        const lowercaseQuery = query.toLowerCase()
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return farm.lpSymbol.toLowerCase().includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [farmsLP, bnbPrice, ethPriceUsd, bananaPrice, query, statsOverall],
  )

  const farmsStakedMemoized = useMemo(() => {
    let farmsStaked = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr, sortDirection)
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            sortDirection,
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            sortDirection,
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), sortDirection)
        default:
          return farms
      }
    }

    if (isActive) {
      farmsStaked = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    } else {
      farmsStaked = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }

    return sortFarms(farmsStaked)
    // .slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    // archivedFarms,
    isActive,
    // isInactive,
    // isArchived,
    // stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    // numberOfFarmsVisible,
    sortDirection
  ])

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const rowData = farmsStakedMemoized.map((farm) => {
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase()

    const row: RowProps = {
      apr: {
        value: farm.apr && (farm.apr.toNumber() * 100).toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: farm.multiplier,
        lpLabel,
        bananaPrice,
        originalValue: farm.apr && farm.apr.toNumber(),
      },
      farm: {
        image: farm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: farm.pid,
      },
      earned: {
        earnings: farm.userData ? getBalanceNumber(new BigNumber(farm.userData.earnings)) : null,
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }
    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }
              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} />
    }

    return (
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farmsStakedMemoized.map((farm) => (
              <FarmCard
                key={farm.pid}
                farm={farm}
                bananaPrice={bananaPrice}
                account={account}
                removed={false}
                bnbPrice={bnbPrice}
                ethPrice={ethPriceUsd}
                ethereum={ethereum}
              />
            ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsStakedMemoized.map((farm) => (
              <FarmCard
                key={farm.pid}
                farm={farm}
                bananaPrice={bananaPrice}
                account={account}
                removed
                bnbPrice={bnbPrice}
                ethPrice={ethPriceUsd}
                ethereum={ethereum}
              />
            ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }

  const handleSortOptionChange = (option): void => {
    if(option !== sortOption) {
      setSortDirection("desc")
    } else if (sortDirection === "desc") {
      setSortDirection("asc")
      } else {
      setSortDirection("desc")
    }
    setSortOption(option)
  }

  const ContainerLabels = styled.div`
    background: ${({ theme }) => theme.card.background};
    border-radius: 16px;
    margin-top: 34px;
    height: 32px;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-left: 100px;
  `

  const StyledTableLabels = styled.div`
    display: flex;
    margin: 10px 0px;
    width: 100%;
  `

  const StyledLabelContainer = styled.div`
    width: 100%;
    display: flex;
  `

  const StyledLabel = styled.div<LabelProps>`
    display: flex;
    color: ${({ theme, active }) => active ? '#FFFFFF' : theme.colors.primary};
    font-family: Poppins;
    padding: 4px 12px;
    font-weight: bold;
    font-size: 12px;
    line-height: 12px;
    border-radius: ${({ active }) => active && '50px'};
    background-color: ${({ active }) => active && '#FFB300'};
  `

  return (
    <>
      <Header>
        <HeadingContainer>
          <Heading as="h1" size="xxl" mb="12px" mt={60} style={{ maxWidth: '600px' }}>
            {TranslateString(999, 'Stake LP tokens to earn BANANA')}
          </Heading>
        </HeadingContainer>
      </Header>

      <Page width="1130px">
        <ControlContainer>
          <ViewControls>
            <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
            <LabelWrapper style={{ marginLeft: 16 }}>
              <StyledText fontFamily="poppins" mr="15px">
                Search
              </StyledText>
              <SearchInput onChange={handleChangeQuery} value={query} />
            </LabelWrapper>
            <FarmTabButtons />
            <ToggleWrapper>
              <StyledCheckbox checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
              <StyledText fontFamily="poppins"> {TranslateString(1116, 'Staked')}</StyledText>
            </ToggleWrapper>

            {isDark ? (
              <StyledImage src="/images/farm-night-farmer.svg" alt="night-monkey" />
            ) : (
              <StyledImage src="/images/farm-day-farmer.svg" alt="day-monkey" />
            )}
          </ViewControls>
        </ControlContainer>
        <ContainerLabels>
          <StyledTableLabels>
            <StyledLabelContainer>
              <StyledLabel>LP</StyledLabel>
            </StyledLabelContainer>
            <StyledLabelContainer>
              <StyledLabel active={sortOption === 'apr'} onClick={() => handleSortOptionChange('apr')}>
                APR
              </StyledLabel>
            </StyledLabelContainer>
            <StyledLabelContainer>
              <StyledLabel active={sortOption === 'liquidity'} onClick={() => handleSortOptionChange('liquidity')}>
                Liquidity
              </StyledLabel>
            </StyledLabelContainer>
            <StyledLabelContainer>
              <StyledLabel active={sortOption === 'earned'} onClick={() => handleSortOptionChange('earned')}>
                Earned
              </StyledLabel>
            </StyledLabelContainer>
            <StyledLabelContainer>
              <StyledLabel onClick={() => handleSortOptionChange('')}>Reset</StyledLabel>
            </StyledLabelContainer>
          </StyledTableLabels>
        </ContainerLabels>
        {renderContent()}
      </Page>
    </>
  )
}

export default Farms
