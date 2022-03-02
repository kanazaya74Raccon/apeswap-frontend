import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { PoolCategory } from 'config/constants/types'
import { useWeb3React } from '@web3-react/core'
import { Text, Flex } from '@apeswapfinance/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useWindowSize, { Size } from 'hooks/useDimensions'
import { useBlock } from 'state/block/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePollPools, usePools } from 'state/hooks'
import { Pool } from 'state/types'
import ListViewMenu from 'components/ListViewMenu'
import { ViewMode } from './components/types'
import DisplayPools from './components/DisplayPools'
import { Header, HeadingContainer, MonkeyWrapper, PoolMonkey, StyledHeading } from './styles'

interface LabelProps {
  active?: boolean
}

const NUMBER_OF_POOLS_VISIBLE = 12

const Pools: React.FC = () => {
  usePollPools()
  const [stakedOnly, setStakedOnly] = useState(false)
  const [gnanaOnly, setGnanaOnly] = useState(false)
  const [bananaOnly, setBananaOnly] = useState(false)
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [viewMode, setViewMode] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const { account } = useWeb3React()
  const { pathname } = useLocation()
  const size: Size = useWindowSize()
  const allPools = usePools(account)
  const TranslateString = useI18n()
  const { currentBlock } = useBlock()
  const isActive = !pathname.includes('history')
  const [sortDirection, setSortDirection] = useState<boolean | 'desc' | 'asc'>('desc')
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    if (size.width !== undefined) {
      if (size.width < 968) {
        setViewMode(ViewMode.CARD)
      } else {
        setViewMode(ViewMode.TABLE)
      }
    }
  }, [size])

  useEffect(() => {
    const showMorePools = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfPoolsVisible((poolsCurrentlyVisible) => poolsCurrentlyVisible + NUMBER_OF_POOLS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMorePools, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const allNonAdminPools = allPools.filter((pool) => !pool.forAdmins && pool?.poolCategory !== PoolCategory.JUNGLE)
  const curPools = allNonAdminPools.map((pool) => {
    return { ...pool, isFinished: pool.sousId === 0 ? false : pool.isFinished || currentBlock > pool.endBlock }
  })

  const [finishedPools, openPools] = partition(curPools, (pool) => pool.isFinished)

  const stakedOnlyPools = openPools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0),
  )
  const stakedInactivePools = finishedPools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0),
  )

  const gnanaOnlyPools = openPools.filter((pool) => pool.stakingToken?.symbol === 'GNANA')
  const bananaOnlyPools = openPools.filter((pool) => pool.stakingToken?.symbol === 'BANANA')

  const gnanaInactivePools = finishedPools.filter((pool) => pool.stakingToken?.symbol === 'GNANA')
  const bananaInactivePools = finishedPools.filter((pool) => pool.stakingToken?.symbol === 'BANANA')
  const gnanaStakedOnlyPools = openPools.filter(
    (pool) =>
      pool.userData &&
      new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) &&
      pool.stakingToken?.symbol === 'GNANA',
  )
  const bananaStakedOnlyPools = openPools.filter(
    (pool) =>
      pool.userData &&
      new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) &&
      pool.stakingToken?.symbol === 'BANANA',
  )

  const allStakedOnlyPools = openPools.filter(
    (pool) =>
      pool.userData &&
      new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) &&
      (pool.stakingToken?.symbol === 'BANANA' || pool.stakingToken?.symbol === 'GNANA'),
  )

  const gnanaStakedInactivePools = finishedPools.filter(
    (pool) =>
      pool.userData &&
      new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) &&
      pool.stakingToken?.symbol === 'GNANA',
  )

  const bananaStakedInactivePools = finishedPools.filter(
    (pool) =>
      pool.userData &&
      new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) &&
      pool.stakingToken?.symbol === 'BANANA',
  )

  const allStakedInactivePools = finishedPools.filter(
    (pool) =>
      pool.userData &&
      new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) &&
      (pool.stakingToken?.symbol === 'BANANA' || pool.stakingToken?.symbol === 'GNANA'),
  )

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

  const sortPools = (poolsToSort: Pool[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(poolsToSort, (pool: Pool) => pool.apr, sortDirection)
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: Pool) => {
            if (!pool.userData || !pool.rewardToken?.price) {
              return 0
            }
            return getBalanceNumber(pool.userData.pendingReward) * pool.rewardToken?.price
          },
          sortDirection,
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: Pool) => getBalanceNumber(pool.totalStaked) * pool.stakingToken?.price,
          sortDirection,
        )
      default:
        return orderBy(poolsToSort, (pool: Pool) => pool.sortOrder, 'asc')
    }
  }

  const poolsToShow = () => {
    let chosenPools = []

    if (stakedOnly && gnanaOnly && !bananaOnly) {
      chosenPools = isActive ? gnanaStakedOnlyPools : gnanaStakedInactivePools
    } else if (stakedOnly && bananaOnly && !gnanaOnly) {
      chosenPools = isActive ? bananaStakedOnlyPools : bananaStakedInactivePools
    } else if (stakedOnly && !gnanaOnly && !bananaOnly) {
      chosenPools = isActive ? stakedOnlyPools : stakedInactivePools
    } else if (!stakedOnly && gnanaOnly && !bananaOnly) {
      chosenPools = isActive ? gnanaOnlyPools : gnanaInactivePools
    } else if (!stakedOnly && bananaOnly && !gnanaOnly) {
      chosenPools = isActive ? bananaOnlyPools : bananaInactivePools
    } else if (stakedOnly && (bananaOnly || gnanaOnly)) {
      chosenPools = isActive ? allStakedOnlyPools : allStakedInactivePools
    } else {
      chosenPools = isActive ? openPools : finishedPools
    }

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      chosenPools = chosenPools.filter((pool) => pool.tokenName.toLowerCase().includes(lowercaseQuery))
    }
    return sortPools(chosenPools).slice(0, numberOfPoolsVisible)
  }

  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1" mb="8px" mt={0} color="white" fontWeight={800}>
            {TranslateString(999, 'Banana Pools')}
          </StyledHeading>
          {size.width > 968 && (
            <Text fontSize="22px" fontWeight={400} color="white">
              Stake BANANA to earn new tokens. <br /> You can unstake at any time. <br /> Rewards are calculated per
              block.
            </Text>
          )}
        </HeadingContainer>
        <MonkeyWrapper>
          <PoolMonkey />
        </MonkeyWrapper>
      </Header>
      <Flex justifyContent="center" style={{ position: 'relative', top: '30px', width: '100%' }}>
        <Flex flexDirection="column" alignSelf="center" style={{ maxWidth: '1130px', width: '100%' }}>
          <ListViewMenu
            onHandleQueryChange={handleChangeQuery}
            onSetSortOption={setSortOption}
            onSetStake={setStakedOnly}
            stakedOnly={stakedOnly}
            query={searchQuery}
          />
          <DisplayPools pools={poolsToShow()} />
          <div ref={loadMoreRef} />
        </Flex>
      </Flex>
    </>
  )
}

export default Pools
