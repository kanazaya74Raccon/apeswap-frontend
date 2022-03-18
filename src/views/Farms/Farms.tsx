import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex } from '@apeswapfinance/uikit'
import { useFarmLpAprs, useFarms, useFetchFarmLpAprs, useFetchLpTokenPrices, usePollFarms } from 'state/hooks'
import ListViewMenu from 'components/ListViewMenu'
import { orderBy } from 'lodash'
import { Farm } from 'state/types'
import useI18n from 'hooks/useI18n'
import DisplayFarms from './components/DisplayFarms'
import { BLUE_CHIPS, NUMBER_OF_FARMS_VISIBLE, STABLES } from './constants'
import { Header, HeadingContainer, StyledHeading } from './styles'
import HarvestAllAction from './components/CardActions/HarvestAllAction'

const Farms: React.FC = () => {
  useFetchLpTokenPrices()
  useFetchFarmLpAprs()
  usePollFarms()
  const { pathname } = useLocation()
  const { chainId } = useActiveWeb3React()
  const TranslateString = useI18n()
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const { account } = useActiveWeb3React()
  const farmsLP = useFarms(account)
  const farmLpAprs = useFarmLpAprs()
  const mergedFarms = farmsLP?.map((farm) => {
    return {
      ...farm,
      lpApr: (
        farmLpAprs?.find((farmLp) => farmLp.chainId === chainId)?.lpAprs?.find((lp) => lp.pid === farm.pid)?.lpApr * 100
      )?.toFixed(2),
    }
  })
  const finalFarms = mergedFarms?.map((farm) => {
    return { ...farm, apy: (parseFloat(farm.apy) + parseFloat(farm.lpApr)).toFixed(2) }
  })
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

  const activeFarms = finalFarms.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const inactiveFarms = finalFarms.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const hasHarvestPids = farmsLP
    .filter((farm) => farm.userData && new BigNumber(farm.userData.earnings).isGreaterThan(0))
    .map((filteredFarm) => {
      return filteredFarm.pid
    })

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
          <ListViewMenu
            onHandleQueryChange={handleChangeQuery}
            onSetSortOption={setSortOption}
            onSetStake={setStakedOnly}
            harvestAll={<HarvestAllAction pids={hasHarvestPids} disabled={hasHarvestPids.length === 0} />}
            stakedOnly={stakedOnly}
            query={query}
            showMonkeyImage
          />
          <DisplayFarms farms={renderFarms()} />
          <div ref={loadMoreRef} />
        </Flex>
      </Flex>
    </>
  )
}

export default React.memo(Farms)
