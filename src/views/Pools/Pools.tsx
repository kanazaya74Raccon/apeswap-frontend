import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { PoolCategory } from 'config/constants/types'
import { useWeb3React } from '@web3-react/core'
import { Flex } from '@apeswapfinance/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useBlock } from 'state/block/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePollPools, usePools } from 'state/hooks'
import ListViewLayout from 'components/layout/ListViewLayout'
import Banner from 'components/Banner'
import { Pool } from 'state/types'
import PoolMenu from './components/Menu'
import DisplayPools from './components/DisplayPools'

const NUMBER_OF_POOLS_VISIBLE = 12

const Pools: React.FC = () => {
  usePollPools()
  const [stakedOnly, setStakedOnly] = useState(false)
  const [tokenOption, setTokenOption] = useState('allTokens')
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const { account } = useWeb3React()
  const { pathname } = useLocation()
  const allPools = usePools(account)
  const { currentBlock } = useBlock()
  const { search } = window.location
  const params = new URLSearchParams(search)
  const urlSearchedPool = parseInt(params.get('id'))
  const isActive = !pathname.includes('history')
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

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

  const sortPools = (poolsToSort: Pool[]) => {
    switch (sortOption) {
      case 'apr':
        return orderBy(poolsToSort, (pool: Pool) => pool.apr, 'desc')
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: Pool) => {
            if (!pool.userData || !pool.rewardToken?.price) {
              return 0
            }
            return getBalanceNumber(pool.userData.pendingReward) * pool.rewardToken?.price
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: Pool) => getBalanceNumber(pool.totalStaked) * pool.stakingToken?.price,
          'desc',
        )
      default:
        return orderBy(poolsToSort, (pool: Pool) => pool.sortOrder, 'asc')
    }
  }

  const renderPools = () => {
    let chosenPools = isActive ? openPools : finishedPools
    if (urlSearchedPool) {
      const poolCheck =
        openPools?.find((pool) => {
          return pool.sousId === urlSearchedPool
        }) !== undefined
      if (poolCheck) {
        chosenPools = [
          openPools?.find((pool) => {
            return pool.sousId === urlSearchedPool
          }),
          ...openPools?.filter((pool) => {
            return pool.sousId !== urlSearchedPool
          }),
        ]
      }
    }

    if (stakedOnly) {
      chosenPools = isActive ? stakedOnlyPools : stakedInactivePools
    }
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      chosenPools = chosenPools.filter((pool) => pool.tokenName.toLowerCase().includes(lowercaseQuery))
    }
    if (tokenOption !== 'allTokens') {
      chosenPools = chosenPools.filter((pool) => pool.stakingToken.symbol === tokenOption.toUpperCase())
    }

    return sortPools(chosenPools).slice(0, numberOfPoolsVisible)
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
            banner="pools"
            link="https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/pools"
            title="Staking Pools"
            listViewBreak
            maxWidth={1130}
          />
          <Flex flexDirection="column" alignSelf="center" style={{ maxWidth: '1130px', width: '100%' }}>
            <PoolMenu
              onHandleQueryChange={handleChangeQuery}
              onSetSortOption={setSortOption}
              onSetStake={setStakedOnly}
              onSetTokenOption={setTokenOption}
              pools={[...stakedOnlyPools, ...stakedInactivePools]}
              activeOption={sortOption}
              activeTokenOption={tokenOption}
              stakedOnly={stakedOnly}
              query={searchQuery}
            />
            <DisplayPools pools={renderPools()} openId={urlSearchedPool} />
            <div ref={loadMoreRef} />
          </Flex>
        </ListViewLayout>
      </Flex>
    </>
  )
}

export default React.memo(Pools)
