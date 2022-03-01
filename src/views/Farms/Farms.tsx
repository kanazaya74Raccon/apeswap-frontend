import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex } from '@apeswapfinance/uikit'
import { useFarms, useFetchLpTokenPrices, usePollFarms } from 'state/hooks'
import useTheme from 'hooks/useTheme'
import { orderBy } from 'lodash'
import { Farm } from 'state/types'
import useI18n from 'hooks/useI18n'
import SearchInput from './components/SearchInput'
import DisplayFarms from './components/DisplayFarms'
import Select from './components/Select/Select'
import FarmTabButtons from './components/FarmTabButtons'
import { BLUE_CHIPS, NUMBER_OF_FARMS_VISIBLE, OPTIONS, STABLES } from './constants'
import HarvestAllAction from './components/CardActions/HarvestAllAction'
import {
  ControlContainer,
  Header,
  HeadingContainer,
  LabelWrapper,
  StyledCheckbox,
  StyledHeading,
  StyledImage,
  StyledText,
  ToggleWrapper,
} from './styles'

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

  const { isDark } = useTheme()

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const renderFarms = () => {
    let farms = isActive ? activeFarms : inactiveFarms

    if (stakedOnly) {
      farms = stakedOnlyFarms
    }

    if (query) {
      farms = farms.filter((farm) => {
        return farm.lpSymbol.toUpperCase().includes(query.toUpperCase())
      })
    }

    switch (sortOption) {
      case 'all':
        return farms
      case 'stables':
        return farms
          .filter((farm) => STABLES.includes(farm.tokenSymbol) && STABLES.includes(farm.quoteTokenSymbol))
          .slice(0, numberOfFarmsVisible)
      case 'apr':
        return orderBy(farms, (farm) => parseFloat(farm.apr), 'desc').slice(0, numberOfFarmsVisible)
      case 'new':
        return farms
      case 'blueChips':
        return farms
          .filter((farm) => BLUE_CHIPS.includes(farm.tokenSymbol) || BLUE_CHIPS.includes(farm.quoteTokenSymbol))
          .slice(0, numberOfFarmsVisible)
      case 'liquidity':
        return orderBy(farms, (farm: Farm) => parseFloat(farm.totalLpStakedUsd), 'desc').slice(0, numberOfFarmsVisible)
      default:
        return farms.slice(0, numberOfFarmsVisible)
    }
  }

  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1" mb="12px" mt={0} fontWeight={800}>
            {TranslateString(999, 'Stake LP tokens to earn BANANA')}
          </StyledHeading>
        </HeadingContainer>
      </Header>

      <Flex justifyContent="center" style={{ position: 'relative', top: '30px', width: '100%' }}>
        <Flex flexDirection="column" alignSelf="center" style={{ maxWidth: '1130px', width: '100%' }}>
          <ControlContainer>
            <Flex alignItems="flex-end" justifyContent="space-between" style={{ border: '1px solid red' }}>
              <LabelWrapper>
                <StyledText bold mr="15px">
                  Search
                </StyledText>
                <SearchInput onChange={handleChangeQuery} value={query} />
              </LabelWrapper>
              <Select options={OPTIONS} onChange={(option) => setSortOption(option.value)} />
            </Flex>
            <Flex alignItems="center" style={{ border: '1px solid green' }}>
              <FarmTabButtons />
              <ToggleWrapper onClick={() => setStakedOnly(!stakedOnly)}>
                <StyledCheckbox checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
                <StyledText> {TranslateString(1116, 'Staked')}</StyledText>
              </ToggleWrapper>
            </Flex>
            <HarvestAllAction pids={hasHarvestPids} disabled={hasHarvestPids.length === 0} />
            {isDark ? (
              <StyledImage src="/images/farm-night-farmer.svg" alt="night-monkey" />
            ) : (
              <StyledImage src="/images/farm-day-farmer.svg" alt="day-monkey" />
            )}
          </ControlContainer>
          <DisplayFarms farms={renderFarms()} />
          <div ref={loadMoreRef} />
        </Flex>
      </Flex>
    </>
  )
}

export default React.memo(Farms)
