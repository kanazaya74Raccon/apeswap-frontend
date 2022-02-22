import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
import { RowType } from '@apeswapfinance/uikit'
import { BLOCKS_PER_YEAR, BANANA_PER_BLOCK, BANANA_POOL_PID } from 'config'
import {
  useFarms,
  usePriceBnbBusd,
  usePriceBananaBusd,
  usePriceEthBusd,
  useFetchLpTokenPrices,
  useLpTokenPrices,
  usePollFarms,
} from 'state/hooks'
import useTheme from 'hooks/useTheme'
import { Farm } from 'state/types'
import { QuoteToken } from 'config/constants/types'
import { orderBy } from 'lodash'
import useI18n from 'hooks/useI18n'
import MarketingModalCheck from 'components/MarketingModalCheck'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Table from './components/FarmTable/FarmTable'
import SearchInput from './components/SearchInput'
import { RowProps } from './components/FarmTable/Row'
import { DesktopColumnSchema } from './components/types'
import * as S from './styles'
import Select from './components/Select/Select'

const NUMBER_OF_FARMS_VISIBLE = 12

// TODO: Sort
const options = [
  {
    label: 'All', value: 'all'
  },
  {
    label: 'New', value: 'new'
  },
  {
    label: 'Blue Chips', value: 'top100'
  },
  {
    label: 'Stables', value: 'stables'
  },
  {
    label: 'APR', value: 'apr'
  },
  {
    label: 'Liquidity', value: 'liquidity'
  },
]

const Farms: React.FC = () => {
  usePollFarms()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const bananaPrice = usePriceBananaBusd()
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const bnbPrice = usePriceBnbBusd()
  const { account } = useWeb3React()
  const farmsLP = useFarms(account)
  const [query, setQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const [sortDirection, setSortDirection] = useState<boolean | 'desc' | 'asc'>('desc')
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useFetchLpTokenPrices()
  const { lpTokenPrices } = useLpTokenPrices()

  const ethPriceUsd = usePriceEthBusd()

  console.log({ farmsLP, ethPriceUsd, lpTokenPrices })

  useEffect(() => {
    const showMoreFarms = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

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

        let totalLiquidity: BigNumber
        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalLiquidity = bnbPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.BANANA) {
          totalLiquidity = bananaPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          totalLiquidity = ethPriceUsd.times(farm.lpTotalInQuoteToken)
        } else {
          totalLiquidity = farm.lpTotalInQuoteToken
        }

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
    [farmsLP, bnbPrice, ethPriceUsd, bananaPrice, query],
  )

  const farmsStakedMemoized = useMemo(() => {
    let farmsStaked = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr.toNumber(), sortDirection)
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

    return sortFarms(farmsStaked).slice(0, numberOfFarmsVisible)
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
    numberOfFarmsVisible,
    sortDirection,
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
        token0: farm.quoteTokenSymbol,
        token1: farm.tokenSymbol,
        label: lpLabel,
        pid: farm.pid,
        image: farm.image,
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

    return <Table data={rowData} columns={columns} farmsPrices={lpTokenPrices} />
  }

  const handleSortOptionChange = (option): void => {
    if (option !== sortOption) {
      setSortDirection('desc')
    } else if (sortDirection === 'desc') {
      setSortDirection('asc')
    } else {
      setSortDirection('desc')
    }
    setSortOption(option)
  }

  return (
    <>
      <MarketingModalCheck />
      <S.Header>
        <S.HeadingContainer>
          <S.StyledHeading as="h1" mb="12px" mt={0} fontWeight={800}>
            {TranslateString(999, 'Stake LP tokens to earn BANANA')}
          </S.StyledHeading>
        </S.HeadingContainer>
      </S.Header>

      <S.StyledPage width="1130px">
        <S.ControlContainer>
          <S.ViewControls>
            <S.LabelWrapper>
              <S.StyledText mr="15px">Search</S.StyledText>
              <SearchInput onChange={handleChangeQuery} value={query} />
            </S.LabelWrapper>
            <Select options={options} />
            <S.ButtonCheckWrapper>
              <FarmTabButtons />
              <S.ToggleWrapper onClick={() => setStakedOnly(!stakedOnly)}>
                <S.StyledCheckbox checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
                <S.StyledText> {TranslateString(1116, 'Staked')}</S.StyledText>
              </S.ToggleWrapper>
            </S.ButtonCheckWrapper>
            {isDark ? (
              <S.StyledImage src="/images/farm-night-farmer.svg" alt="night-monkey" />
            ) : (
              <S.StyledImage src="/images/farm-day-farmer.svg" alt="day-monkey" />
            )}
          </S.ViewControls>
        </S.ControlContainer>
        {renderContent()}
        <div ref={loadMoreRef} />
      </S.StyledPage>
    </>
  )
}

export default Farms
