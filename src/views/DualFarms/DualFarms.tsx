import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { Flex } from '@apeswapfinance/uikit'
import { useFetchFarmLpAprs } from 'state/hooks'
import { useDualFarms, usePollDualFarms } from 'state/dualFarms/hooks'
import { DualFarm } from 'state/types'
import { orderBy } from 'lodash'
import ListViewLayout from 'components/layout/ListViewLayout'
import Banner from 'components/Banner'
import ListViewMenu from '../../components/ListViewMenu'
import HarvestAllAction from './components/CardActions/HarvestAllAction'
import DisplayFarms from './components/DisplayFarms'
import { BLUE_CHIPS, NUMBER_OF_FARMS_VISIBLE, STABLES } from '../Farms/constants'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'

const { search } = window.location
const params = new URLSearchParams(search)

const urlSearchedFarm = parseInt(params.get('pid'))

const DualFarms: React.FC = () => {
  usePollDualFarms()
  const { account, chainId } = useActiveWeb3React()
  useFetchFarmLpAprs(chainId)

  const { pathname } = useLocation()
  const [observerIsSet, setObserverIsSet] = useState(false)
  const farmsLP = useDualFarms(account)
  const [query, setQuery] = useState('')
  const [sortOption, setSortOption] = useState('all')

  const [stakedOnly, setStakedOnly] = useState(false)
  const isActive = !pathname.includes('history')

  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const stakedOnlyInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const hasHarvestPids = [...activeFarms, ...inactiveFarms]
    .filter(
      (farm) =>
        farm.userData &&
        new BigNumber(farm.userData.miniChefEarnings)
          .plus(new BigNumber(farm.userData.rewarderEarnings))
          .isGreaterThan(0),
    )
    .map((filteredFarm) => {
      return filteredFarm.pid
    })

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
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

  const renderFarms = () => {
    let farms = isActive ? activeFarms : inactiveFarms

    if (urlSearchedFarm) {
      const farmCheck =
        activeFarms?.find((farm) => {
          return farm.pid === urlSearchedFarm
        }) !== undefined
      if (farmCheck) {
        farms = [
          activeFarms?.find((farm) => {
            return farm.pid === urlSearchedFarm
          }),
          ...activeFarms?.filter((farm) => {
            return farm.pid !== urlSearchedFarm
          }),
        ]
      }
    }

    if (query) {
      farms = farms.filter((farm) => {
        return `${farm?.stakeTokens?.token0?.symbol}-${farm?.stakeTokens?.token1?.symbol}`
          .toUpperCase()
          .includes(query.toUpperCase())
      })
    }

    if (stakedOnly) {
      farms = isActive ? stakedOnlyFarms : stakedOnlyInactiveFarms
    }

    switch (sortOption) {
      case 'all':
        return farms.slice(0, numberOfFarmsVisible)
      case 'stables':
        return farms
          .filter(
            (farm) =>
              STABLES.includes(farm.stakeTokens.token0.symbol) && STABLES.includes(farm.stakeTokens.token1.symbol),
          )
          .slice(0, numberOfFarmsVisible)
      case 'apr':
        return orderBy(farms, (farm) => parseFloat(farm.apy), 'desc').slice(0, numberOfFarmsVisible)
      case 'new':
        return farms
      case 'blueChips':
        return farms
          .filter(
            (farm) =>
              BLUE_CHIPS.includes(farm.stakeTokens.token0.symbol) ||
              BLUE_CHIPS.includes(farm.stakeTokens.token1.symbol),
          )
          .slice(0, numberOfFarmsVisible)
      case 'liquidity':
        return orderBy(farms, (farm: DualFarm) => parseFloat(farm.totalStaked), 'desc').slice(0, numberOfFarmsVisible)
      default:
        return farms.slice(0, numberOfFarmsVisible)
    }
  }

  return (
    <>
      <Flex
        flexDirection="column"
        justifyContent="center"
        mb="100px"
        style={{ position: 'relative', top: '30px', width: '100%' }}
      >
        <ListViewLayout>
          <Banner
            banner="polygon-farms"
            link="https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/farms"
            title="Polygon Farms"
            listViewBreak
            maxWidth={1130}
          />
          <Flex alignItems="center" justifyContent="center" mt="20px">
            <ListViewMenu
              onHandleQueryChange={handleChangeQuery}
              onSetSortOption={setSortOption}
              onSetStake={setStakedOnly}
              harvestAll={<HarvestAllAction pids={hasHarvestPids} disabled={hasHarvestPids.length === 0} />}
              stakedOnly={stakedOnly}
              query={query}
              activeOption={sortOption}
              showMonkeyImage
            />
          </Flex>
          <DisplayFarms farms={renderFarms()} openPid={urlSearchedFarm} />
        </ListViewLayout>
      </Flex>
      <div ref={loadMoreRef} />
    </>
  )
}

export default DualFarms
