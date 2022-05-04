import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Text, Card, Checkbox, ArrowDropDownIcon } from '@apeswapfinance/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { PoolCategory } from 'config/constants/types'
import useWindowSize, { Size } from 'hooks/useDimensions'
import MenuTabButtons from 'components/ListViewMenu/MenuTabButtons'
import { useBlock } from 'state/block/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import Banner from 'components/Banner'
import { usePollPools, usePools } from 'state/hooks'
import { Pool } from 'state/types'
import Page from 'components/layout/Page'
import { useTranslation } from 'contexts/Localization'
import ToggleView from '../PoolsLegacy/components/ToggleView/ToggleView'
import SearchInput from '../PoolsLegacy/components/SearchInput'
import PoolCard from '../PoolsLegacy/components/PoolCard/PoolCard'
import PoolTable from '../PoolsLegacy/components/PoolTable/PoolTable'
import { ViewMode } from '../PoolsLegacy/components/types'

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
  padding-bottom: 10px;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    height: 59px;
    padding: 0px;
    justify-content: flex-start;
    padding-left: 50px;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0px;
  cursor: pointer;
  ${Text} {
    margin-left: 4px;
    ${({ theme }) => theme.mediaQueries.md} {
      margin-left: 8px;
    }
  }
`

const ToggleContainer = styled.div<{ size: number }>`
  position: absolute;
  right: 5%;
  display: flex;
  flex-direction: column;
  height: 75px;
  margin-left: 15px;
  justify-content: space-between;
  transform: translateY(-25px);
  ${({ theme }) => theme.mediaQueries.md} {
    position: relative;
    height: auto;
    margin-left: 0px;
    align-items: center;
    justify-content: space-between;
    width: 180px;
    transform: translateY(0px);
    flex-direction: row;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 250px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    width: 340px;
  }
`

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > ${Text} {
    font-size: 12px;
  }

  margin-left: 30px;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    margin-left: 0px;
    align-items: center;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: flex-start;
  display: flex;
  align-items: flex-end;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: center;
    align-items: center;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 12px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 15px !important;
  }
`

interface CheckboxProps {
  checked?: boolean
}

const StyledCheckbox = styled(Checkbox)<CheckboxProps>`
  height: 21px;
  width: 21px;
`

const ContainerLabels = styled.div`
  background: ${({ theme }) => theme.colors.white2};
  border-radius: 16px;
  margin-top: 24px;
  height: 32px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: 34px;
  }
`

const StyledLabelContainerHot = styled.div`
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 5px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 35px;
    margin-right: 35px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
    top: 6px;
    left: 38px;
    margin: 0px;
  }
`

const StyledLabelContainerLP = styled.div`
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 5px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 35px;
    margin-right: 35px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
    top: 6px;
    left: 169px;
    margin: 0px;
  }
`

const StyledLabelContainerAPR = styled.div`
  cursor: pointer;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 5px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 35px;
    margin-right: 35px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
    top: 6px;
    left: 365px;
    margin: 0px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    left: 409px;
  }
`

const StyledLabelContainerLiquidity = styled.div`
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 5px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 35px;
    margin-right: 35px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
    top: 6px;
    left: 500px;
    margin: 0px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    left: 610px;
  }
`

const StyledLabelContainerEarned = styled.div`
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 5px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 35px;
    margin-right: 35px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0px;
    position: absolute;
    top: 6px;
    left: 651px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    left: 801px;
  }
`

const CardContainer = styled.div`
  margin-top: 17px;

  transform: translateY(-85px);
  ${({ theme }) => theme.mediaQueries.md} {
    transform: translateY(-60px);
  }
`

const ButtonCheckWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    width: fit-content;
  }
`

const StyledPage = styled(Page)`
  padding-left: 5px;
  padding-right: 5px;
  width: 100vw;

  ${({ theme }) => theme.mediaQueries.xs} {
    padding-left: 10px;
    padding-right: 10px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 16px;
    padding-right: 16px;
  }
`

const StyledLabel = styled.div<LabelProps>`
  display: flex;
  color: ${({ theme, active }) => (active ? '#FFFFFF' : theme.colors.primary)};
  padding: 4px 12px;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  border-radius: ${({ active }) => active && '50px'};
  background-color: ${({ active }) => active && '#FFB300'};
`

interface DropdownProps {
  down?: boolean
}

const StyledArrowDropDownIcon = styled(ArrowDropDownIcon)<DropdownProps>`
  color: white;
  transform: ${({ down }) => (!down ? 'rotate(180deg)' : 'rotate(0)')};
  margin-left: 7px;
  margin-top: 2px;
  /* 'rotate(180deg)' : 'rotate(0)'; */
`

const FlexLayout = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & > * {
    width: 100%;
    margin-bottom: 32px;
  }
`

const StyledTable = styled.div`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  background-color: ${({ theme }) => (theme.isDark ? 'black' : '#faf9fa')};
`

const Container = styled.div`
  background: ${({ theme }) => theme.colors.white2};
  border-radius: 16px;
  margin: 16px 0px;
  position: relative;
`

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

const TableContainer = styled.div`
  position: relative;
`
const NUMBER_OF_POOLS_VISIBLE = 12

const JunglePools: React.FC = () => {
  usePollPools()
  const [stakedOnly, setStakedOnly] = useState(false)
  const [gnanaOnly] = useState(false)
  const [bananaOnly] = useState(false)
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [viewMode, setViewMode] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const { account } = useWeb3React()
  const { pathname } = useLocation()
  const size: Size = useWindowSize()
  const allPools = usePools(account)
  const { currentBlock } = useBlock()
  const isActive = !pathname.includes('history')
  const [sortDirection, setSortDirection] = useState<boolean | 'desc' | 'asc'>('desc')
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
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

  const allNonAdminPools = allPools.filter((pool) => !pool.forAdmins && pool?.poolCategory === PoolCategory.JUNGLE)
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

  const cardLayout = (
    <CardContainer>
      <FlexLayout>
        {poolsToShow().map((pool) => (
          <PoolCard key={pool.sousId} pool={pool} removed={!isActive} />
        ))}
      </FlexLayout>
    </CardContainer>
  )

  const tableLayout = (
    <Container>
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            {poolsToShow().map((pool) => (
              <PoolTable key={pool.sousId} pool={pool} removed={!isActive} />
            ))}
          </StyledTable>
        </TableWrapper>
      </TableContainer>
    </Container>
  )

  return (
    <>
      <StyledPage width="1130px">
        <Banner
          banner="jungle-farms"
          title={t("Jungle Farms")}
          link="https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/farms"
          maxWidth={1130}
          margin="0 0 20px 0px"
        />
        <ControlContainer>
          <ViewControls>
            {size.width > 968 && viewMode !== null && (
              <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
            )}
            <LabelWrapper>
              <StyledText mr="15px">{t('Search')}</StyledText>
              <SearchInput onChange={handleChangeQuery} value={searchQuery} />
            </LabelWrapper>
            <ButtonCheckWrapper>
              <div />
              <MenuTabButtons />
              <div style={{ marginRight: '70px' }} />{' '}
              <ToggleContainer size={size.width}>
                <ToggleWrapper onClick={() => setStakedOnly(!stakedOnly)}>
                  <StyledCheckbox checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
                  <StyledText>{t('Staked')}</StyledText>
                </ToggleWrapper>
              </ToggleContainer>
            </ButtonCheckWrapper>
          </ViewControls>
        </ControlContainer>
        <ContainerLabels>
          <StyledLabelContainerHot>
            <StyledLabel active={sortOption === 'hot'} onClick={() => handleSortOptionChange('hot')}>
              {t('Hot')}
            </StyledLabel>
          </StyledLabelContainerHot>
          <StyledLabelContainerLP>
            <StyledLabel>{t('Token')}</StyledLabel>
          </StyledLabelContainerLP>
          <StyledLabelContainerAPR>
            <StyledLabel active={sortOption === 'apr'} onClick={() => handleSortOptionChange('apr')}>
              {t('APR')}
              {sortOption === 'apr' ? (
                <StyledArrowDropDownIcon width="7px" height="8px" color="white" down={sortDirection === 'desc'} />
              ) : null}
            </StyledLabel>
          </StyledLabelContainerAPR>
          <StyledLabelContainerLiquidity>
            <StyledLabel active={sortOption === 'totalStaked'} onClick={() => handleSortOptionChange('totalStaked')}>
              {t('Total Staked')}
              {sortOption === 'totalStaked' ? (
                <StyledArrowDropDownIcon width="7px" height="8px" color="white" down={sortDirection === 'desc'} />
              ) : null}
            </StyledLabel>
          </StyledLabelContainerLiquidity>
          <StyledLabelContainerEarned>
            <StyledLabel active={sortOption === 'earned'} onClick={() => handleSortOptionChange('earned')}>
              {t('Earned')}
              {sortOption === 'earned' ? (
                <StyledArrowDropDownIcon width="7px" height="8px" color="white" down={sortDirection === 'desc'} />
              ) : null}
            </StyledLabel>
          </StyledLabelContainerEarned>
        </ContainerLabels>
        {viewMode === ViewMode.CARD ? cardLayout : tableLayout}
        <div ref={loadMoreRef} />
      </StyledPage>
    </>
  )
}

export default JunglePools
