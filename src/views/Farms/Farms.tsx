import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex } from '@apeswapfinance/uikit'
import { useFarms, useFarmUser, useFetchLpTokenPrices, usePollFarms } from 'state/hooks'
import useTheme from 'hooks/useTheme'
import useI18n from 'hooks/useI18n'
import SearchInput from './components/SearchInput'
import * as S from './styles'
import DisplayFarms from './components/DisplayFarms'
import Select from './components/Select/Select'
import FarmTabButtons from './components/FarmTabButtons'
import { NUMBER_OF_FARMS_VISIBLE, OPTIONS } from './constants'
import HarvestAllAction from './components/CardActions/HarvestAllAction'

const Farms: React.FC = () => {
  usePollFarms()
  useFetchLpTokenPrices()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const { account } = useActiveWeb3React()
  const farmsLP = useFarms(account)
  const [query, setQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const [sortDirection, setSortDirection] = useState<boolean | 'desc' | 'asc'>('desc')
  const loadMoreRef = useRef<HTMLDivElement>(null)

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

  const hasHarvestPids = farmsLP
    .filter((farm) => farm.userData && new BigNumber(farm.userData.earnings).isGreaterThan(0))
    .map((filteredFarm) => {
      return filteredFarm.pid
    })

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const { isDark } = useTheme()

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
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

  const renderFarms = () => {
    let farms = isActive ? activeFarms : inactiveFarms

    if (stakedOnly) {
      farms = stakedOnlyFarms
    }

    //   switch (sort) {
    //     case 'upcoming':
    //       return upcomingIazos
    //     case 'live':
    //       return currentIazos
    //     case 'done':
    //       return pastIAzos
    //     default:
    //       return [...currentIazos, ...upcomingIazos]
    //   }
    // }

    if (query) {
      const filteredFarms = farms.filter((farm) => {
        return farm.lpSymbol.toUpperCase().includes(query.toUpperCase())
      })
      return filteredFarms
    }

    return farms.slice(0, numberOfFarmsVisible)
  }

  return (
    <>
      <S.Header>
        <S.HeadingContainer>
          <S.StyledHeading as="h1" mb="12px" mt={0} fontWeight={800}>
            {TranslateString(999, 'Stake LP tokens to earn BANANA')}
          </S.StyledHeading>
        </S.HeadingContainer>
      </S.Header>

      <Flex justifyContent="center" style={{ position: 'relative', top: '30px', width: '100%' }}>
        <Flex flexDirection="column" alignSelf="center" style={{ maxWidth: '1130px', width: '100%' }}>
          <S.ControlContainer>
            <S.ViewControls>
              <S.LabelWrapper>
                <S.StyledText bold mr="15px">
                  Search
                </S.StyledText>
                <SearchInput onChange={handleChangeQuery} value={query} />
              </S.LabelWrapper>
              <Select options={OPTIONS} />
              <Flex justifyContent="space-around" flexWrap="wrap">
                <FarmTabButtons />
                <S.ToggleWrapper onClick={() => setStakedOnly(!stakedOnly)}>
                  <S.StyledCheckbox checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
                  <S.StyledText> {TranslateString(1116, 'Staked')}</S.StyledText>
                </S.ToggleWrapper>
                <HarvestAllAction pids={hasHarvestPids} disabled={hasHarvestPids.length === 0} />
              </Flex>

              {isDark ? (
                <S.StyledImage src="/images/farm-night-farmer.svg" alt="night-monkey" />
              ) : (
                <S.StyledImage src="/images/farm-day-farmer.svg" alt="day-monkey" />
              )}
            </S.ViewControls>
          </S.ControlContainer>
          {/* {renderContent()} */}
          <DisplayFarms farms={renderFarms()} />
          <div ref={loadMoreRef} />
        </Flex>
      </Flex>
    </>
  )
}

export default React.memo(Farms)
