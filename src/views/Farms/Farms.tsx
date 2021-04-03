import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading, RowType, Toggle, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { BLOCKS_PER_YEAR, BANANA_PER_BLOCK, BANANA_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceBananaBusd, usePriceEthBusd, useFarmFromSymbol, useFarmUser } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
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
import Select, { OptionProps } from './components/Select/Select'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: center;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 32px 32px;
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

const Header = styled.div`
  padding-top: 36px;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const bananaPrice = usePriceBananaBusd()
  const bnbPrice = usePriceBnbBusd()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState(ViewMode.TABLE)
  const [sortOption, setSortOption] = useState('hot')

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

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
    switch (sortOption) {
      case 'apr':
        return orderBy(farms, (farm: FarmWithStakedValue) => farm.apy, 'desc')
      case 'multiplier':
        return orderBy(
          farms,
          (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
          'desc',
        )
      case 'earned':
        return orderBy(farms, (farm: FarmWithStakedValue) => (farm.userData ? farm.userData.earnings : 0), 'desc')
      case 'liquidity':
        return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
      default:
        return farms
    }
  }


  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
    const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      const bananaPriceVsBNB = new BigNumber(
        farmsLP.find((farm) => farm.pid === BANANA_POOL_PID)?.tokenPriceVsQuote || 0,
      )
      let farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const bananaRewardPerBlock = BANANA_PER_BLOCK.times(farm.poolWeight)
        const bananaRewardPerYear = bananaRewardPerBlock.times(BLOCKS_PER_YEAR)

        // bananaPriceInQuote * bananaRewardPerYear / lpTotalInQuoteToken
        let apy = bananaPriceVsBNB.times(bananaRewardPerYear).div(farm.lpTotalInQuoteToken)

        if (farm.quoteTokenSymbol === QuoteToken.BUSD || farm.quoteTokenSymbol === QuoteToken.UST) {
          apy = bananaPriceVsBNB.times(bananaRewardPerYear).div(farm.lpTotalInQuoteToken).times(bnbPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          apy = bananaPrice.div(ethPriceUsd).times(bananaRewardPerYear).div(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.BANANA) {
          apy = bananaRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const bananaApy =
            farm && bananaPriceVsBNB.times(bananaRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apy = bananaApy && dualApy && bananaApy.plus(dualApy)
        }
        return { ...farm, apy }
      })
      if (query) {
        const lowercaseQuery = query.toLowerCase()
        farmsToDisplayWithAPY = farmsToDisplayWithAPY.filter((farm: FarmWithStakedValue) => {
          return farm.lpSymbol.toLowerCase().includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPY
    },
    [farmsLP, bnbPrice, ethPriceUsd, bananaPrice, query],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  let farmsStaked = []
  if (isActive) {
    farmsStaked = stakedOnly ? farmsList(stakedOnlyFarms, true) : farmsList(activeFarms, true)
  } else {
    farmsStaked = stakedOnly ? farmsList(stakedInactiveFarms, false) : farmsList(inactiveFarms, false)
  }

  farmsStaked = sortFarms(farmsStaked)

  const rowData = farmsStaked.map((farm) => {

    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase()

    const row: RowProps = {
      apr: {
        value: farm.apy && Number(farm.apy*100).toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: farm.multiplier,
        lpLabel,
        bananaPrice,
        originalValue: farm.apy,
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
            {farmsStaked.map((farm) => (
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
            {farmsStaked.map((farm) => (
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

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <>
      <Header>
      <Heading as="h1" size="lg" color="secondary" mb="12px" style={{ textAlign: 'center' }}>
        {TranslateString(999, 'Stake LP tokens to earn BANANA')}
      </Heading>
      </Header>
      <Page>
        <ControlContainer>
          <ViewControls>
            <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
            <FarmTabButtons />
            <ToggleWrapper>
              <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
              <Text> {TranslateString(1116, 'Staked only')}</Text>
            </ToggleWrapper>
          </ViewControls>
          <FilterContainer>
            <LabelWrapper>
              <Text>SORT BY</Text>
              <Select
                options={[
                  {
                    label: 'APR',
                    value: 'apr',
                  },
                  {
                    label: 'Multiplier',
                    value: 'multiplier',
                  },
                  {
                    label: 'Earned',
                    value: 'earned',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text>SEARCH</Text>
              <SearchInput onChange={handleChangeQuery} value={query} />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
        {renderContent()}
      </Page>
    </>
  )
}

export default Farms
