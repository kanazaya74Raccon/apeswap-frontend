import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Flex } from '@apeswapfinance/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import { useBlock } from 'state/block/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePollJungleFarms, useJungleFarms } from 'state/jungleFarms/hooks'
import ListViewLayout from 'components/layout/ListViewLayout'
import Banner from 'components/Banner'
import { JungleFarm } from 'state/types'
import DisplayJungleFarms from './components/DisplayJungleFarms'
import ListViewMenu from '../../components/ListViewMenu'
import HarvestAll from './components/Actions/HarvestAll'

const NUMBER_OF_FARMS_VISIBLE = 10

const JungleFarms: React.FC = () => {
  usePollJungleFarms()
  const [stakedOnly, setStakedOnly] = useState(false)
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('all')
  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const { account } = useWeb3React()
  const { pathname } = useLocation()
  const allJungleFarms = useJungleFarms(account)
  const { t } = useTranslation()
  const { currentBlock } = useBlock()
  const { search } = window.location
  const params = new URLSearchParams(search)
  const urlSearchedFarm = parseInt(params.get('id'))
  const isActive = !pathname.includes('history')
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    const showMoreJungleFarms = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreJungleFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const currJungleFarms = allJungleFarms.map((farm) => {
    return { ...farm, isFinished: farm.jungleId === 0 ? false : farm.isFinished || currentBlock > farm.endBlock }
  })

  const farmsWithHarvestAvailable = currJungleFarms.filter((farm) =>
    farm.userData ? farm.userData.pendingReward > new BigNumber(0) : null,
  )
  const harvestJungleIds = farmsWithHarvestAvailable.map((farm) => {
    return farm.jungleId
  })

  const [finishedJungleFarms, openFarms] = partition(currJungleFarms, (farm) => farm.isFinished)

  const stakedOnlyFarms = openFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  const stakedInactiveFarms = finishedJungleFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const sortJungleFarms = (farmsToSort: JungleFarm[]) => {
    switch (sortOption) {
      case 'apr':
        return orderBy(farmsToSort, (farm: JungleFarm) => farm.apr, 'desc')
      case 'earned':
        return orderBy(
          farmsToSort,
          (farm: JungleFarm) => {
            if (!farm.userData || !farm.rewardToken?.price) {
              return 0
            }
            return getBalanceNumber(farm.userData.pendingReward) * farm.rewardToken?.price
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          farmsToSort,
          (farm: JungleFarm) => getBalanceNumber(farm.totalStaked) * farm.stakingToken?.price,
          'desc',
        )
      default:
        return orderBy(farmsToSort, (farm: JungleFarm) => farm.sortOrder, 'asc')
    }
  }

  const renderJungleFarms = () => {
    let chosenJungleFarms = isActive ? openFarms : finishedJungleFarms
    if (urlSearchedFarm) {
      const farmCheck =
        openFarms?.find((farm) => {
          return farm.jungleId === urlSearchedFarm
        }) !== undefined
      if (farmCheck) {
        chosenJungleFarms = [
          openFarms?.find((farm) => {
            return farm.jungleId === urlSearchedFarm
          }),
          ...openFarms?.filter((farm) => {
            return farm.jungleId !== urlSearchedFarm
          }),
        ]
      }
    }

    if (stakedOnly) {
      chosenJungleFarms = isActive ? stakedOnlyFarms : stakedInactiveFarms
    }
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      chosenJungleFarms = chosenJungleFarms.filter((farm) => farm.tokenName.toLowerCase().includes(lowercaseQuery))
    }

    return sortJungleFarms(chosenJungleFarms).slice(0, numberOfFarmsVisible)
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
            banner="jungle-farms"
            title={t('Jungle Farms')}
            link="https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/farms"
            listViewBreak
            maxWidth={1130}
          />
          <Flex alignItems="center" justifyContent="center" mt="20px">
            <ListViewMenu
              onHandleQueryChange={handleChangeQuery}
              onSetSortOption={setSortOption}
              onSetStake={setStakedOnly}
              harvestAll={<HarvestAll jungleIds={harvestJungleIds} disabled={harvestJungleIds.length === 0} />}
              stakedOnly={stakedOnly}
              query={searchQuery}
              activeOption={sortOption}
              showMonkeyImage
            />
          </Flex>
          <DisplayJungleFarms jungleFarms={renderJungleFarms()} openId={urlSearchedFarm} />
        </ListViewLayout>
      </Flex>
      <div ref={loadMoreRef} />
    </>
  )
}

export default React.memo(JungleFarms)
