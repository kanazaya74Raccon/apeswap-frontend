import React, { useState, useRef, useEffect } from 'react'
import { useRouteMatch, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Heading, Text, Card, Checkbox, ArrowDropDownIcon } from '@apeswapfinance/uikit'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import useWindowSize, { Size } from 'hooks/useDimensions'
import { getBalanceNumber } from 'utils/formatBalance'
import { useFarms, usePriceBnbBusd, usePools, useStatsOverall } from 'state/hooks'
import { Pool } from 'state/types'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import Page from 'components/layout/Page'
import ToggleView from './components/ToggleView/ToggleView'
import SearchInput from './components/SearchInput'
import FarmTabButtons from './components/FarmTabButtons'
import PoolCard from './components/PoolCard/PoolCard'
import PoolTable from './components/PoolTable/PoolTable'
import { DesktopColumnSchema, ViewMode } from './components/types'

interface LabelProps {
  active?: boolean
}

export interface PoolWithStakeValue extends Pool {
  apr?: BigNumber
  staked?: BigNumber
  addStakedUrl?: string
  stakedTokenPrice?: number
  rewardTokenPrice?: number
}

const float = keyframes`
  0% { right: 0;}
  50%{ right : 50px;}
  100%{ right: 0;}
`

const ControlContainer = styled(Card)`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: center;
  flex-direction: column;
  overflow: visible;
  padding-bottom: 10px;
  transform: translateY(-85px);

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    height: 59px;
    padding: 0px;
    justify-content: flex-start;
    padding-left: 50px;
    transform: translateY(-60px);
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center
  margin-left: 10px;
  cursor: pointer;

  ${Text} {
    margin-left: 4px;
  ${({ theme }) => theme.mediaQueries.md} { margin-left: 8px;}
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

const HeadingContainer = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

const Header = styled.div`
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/pool-background-night.svg)' : 'url(/images/pool-background-day.svg)'};
  background-repeat: no-repeat;
  background-size: cover;
  height: 400px;
  background-position: center;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const PoolMonkey = styled.div`
  background-image: ${({ theme }) => (theme.isDark ? 'url(/images/pool-ape-night.svg)' : 'url(/images/pool-ape.svg)')};
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
`

const MonkeyContainer = styled.div`
  position: absolute;
  width: 700px;
  margin-left: auto;
  margin-right: auto;
  height: ${({ theme }) => (theme.isDark ? '545px' : '490px')};
  top: ${({ theme }) => (theme.isDark ? '-145px' : '-90px')};
  right: 0;
  animation: 5s ${float} linear infinite;
`

const StyledText = styled(Text)`
  font-weight: 700;
  font-size: 12px;

  ${({ theme }) => theme.mediaQueries.lg} {
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

const StyledImage = styled.img`
  height: 187px;
  width: 134px;
  position: absolute;
  right: 0px;
  bottom: 51px;

  @media screen and (min-width: 340px) {
    right: 20px;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    bottom: 51px;
    right: 0px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    bottom: 0px;
    right: 0px;
  }
`

const ContainerLabels = styled.div`
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin-top: 24px;
  height: 32px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-85px);

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: 34px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    transform: translateY(-60px);
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
    left: 621px;
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
  margin-right: 30px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: fit-content;
  }
`

const StyledHeading = styled(Heading)`
  font-size: 32px;
  max-width: 176px !important;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 36px;
    max-width: 240px !important;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 44px;
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
    max-width: 600px !important;
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
  font-family: Poppins;
  padding: 4px 12px;
  font-weight: bold;
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
  'rotate(180deg)' : 'rotate(0)'
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
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin: 16px 0px;
  position: relative;

  transform: translateY(-85px);
  ${({ theme }) => theme.mediaQueries.md} {
    transform: translateY(-60px);
  }
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

const Pools: React.FC = () => {
  const location = useLocation()
  const size: Size = useWindowSize()
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const { pathname } = useLocation()
  const farms = useFarms()
  const [query, setQuery] = useState('')
  const allPools = usePools(account)
  const [searchQuery, setSearchQuery] = useState('')
  const { statsOverall } = useStatsOverall()
  const bnbPriceUSD = usePriceBnbBusd()
  const block = useBlock()
  const [sortOption, setSortOption] = useState('hot')
  const isActive = !pathname.includes('history')
  const [stakedOnly, setStakedOnly] = useState(false)
  const [gnanaOnly, setGnanaOnly] = useState(false)
  const [viewMode, setViewMode] = useState(null)
  const [sortDirection, setSortDirection] = useState<boolean | 'desc' | 'asc'>('desc')
  const tableWrapperEl = useRef<HTMLDivElement>(null)

  const showFinishedPools = location.pathname.includes('history')

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
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

  const priceToBnb = (tokenName: string, tokenPrice: BigNumber, quoteToken: QuoteToken): BigNumber => {
    const tokenPriceBN = new BigNumber(tokenPrice)
    if (tokenName === 'BNB') {
      return new BigNumber(1)
    }
    if (tokenPrice && quoteToken === QuoteToken.BUSD) {
      return tokenPriceBN.div(bnbPriceUSD)
    }
    return tokenPriceBN
  }

  const poolsWithApy = allPools.map((pool) => {
    const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
    const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.tokenName)
    const stakingTokenFarm = farms.find((s) => s.tokenSymbol === pool.stakingTokenName)
    const stats = statsOverall?.incentivizedPools?.find((x) => x.id === pool.sousId)
    let rewardTokenPrice = stats?.rewardTokenPrice

    let stakedTokenPrice
    let stakingTokenPriceInBNB
    let rewardTokenPriceInBNB

    if (pool.lpData) {
      const rewardToken = pool.lpData.token1.symbol === pool.tokenName ? pool.lpData.token1 : pool.lpData.token0
      stakingTokenPriceInBNB = new BigNumber(pool.lpData.reserveETH).div(new BigNumber(pool.lpData.totalSupply))
      rewardTokenPriceInBNB = new BigNumber(rewardToken.derivedETH)
      stakedTokenPrice = bnbPriceUSD.times(stakingTokenPriceInBNB).toNumber()
    } else if (rewardTokenPrice) {
      stakingTokenPriceInBNB = priceToBnb(pool.stakingTokenName, new BigNumber(stats?.price), QuoteToken.BUSD)
      rewardTokenPriceInBNB = priceToBnb(pool.tokenName, new BigNumber(rewardTokenPrice), QuoteToken.BUSD)
      stakedTokenPrice = bnbPriceUSD.times(stakingTokenPriceInBNB).toNumber()
    } else {
      // /!\ Assume that the farm quote price is BNB
      stakingTokenPriceInBNB = isBnbPool ? new BigNumber(1) : new BigNumber(stakingTokenFarm?.tokenPriceVsQuote)
      rewardTokenPriceInBNB = priceToBnb(
        pool.tokenName,
        rewardTokenFarm?.tokenPriceVsQuote,
        rewardTokenFarm?.quoteTokenSymbol,
      )
      rewardTokenPrice = bnbPriceUSD.times(rewardTokenPriceInBNB).toNumber()
      stakedTokenPrice = bnbPriceUSD.times(stakingTokenPriceInBNB).toNumber()
    }

    const totalRewardPricePerYear = rewardTokenPriceInBNB.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool.totalStaked))
    const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apr,
      rewardTokenPrice,
      stakedTokenPrice,
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)

  const stakedOnlyPools = openPools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0),
  )
  const stakedInactivePools = finishedPools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0),
  )
  const gnanaOnlyPools = openPools.filter((pool) => pool.stakingTokenName === 'GNANA')

  const gnanaInactivePools = finishedPools.filter((pool) => pool.stakingTokenName === 'GNANA')
  const gnanaStakedOnlyPools = openPools.filter(
    (pool) =>
      pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) && pool.stakingTokenName === 'GNANA',
  )

  const gnanaStakedInactivePools = finishedPools.filter(
    (pool) =>
      pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) && pool.stakingTokenName === 'GNANA',
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

  const sortPools = (poolsToSort: PoolWithStakeValue[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(poolsToSort, (pool: PoolWithStakeValue) => pool.apr.toNumber(), 'desc')
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: PoolWithStakeValue) => {
            if (!pool.userData || !pool.rewardTokenPrice) {
              return 0
            }
            return pool.userData.pendingReward.times(pool.rewardTokenPrice)
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: PoolWithStakeValue) => getBalanceNumber(pool.totalStaked) * pool.stakedTokenPrice,
          'desc',
        )
      default:
        return orderBy(poolsToSort, (pool: PoolWithStakeValue) => pool.sortOrder, 'asc')
    }
  }

  const poolsToShow = () => {
    let chosenPools = []

    if (stakedOnly && gnanaOnly) {
      chosenPools =  isActive ? gnanaStakedOnlyPools : gnanaStakedInactivePools
    } else if (stakedOnly && !gnanaOnly) {
      chosenPools = isActive ? stakedOnlyPools : stakedInactivePools
    } else if (!stakedOnly && gnanaOnly) {
      chosenPools = isActive ? gnanaOnlyPools : gnanaInactivePools
    } else{
      chosenPools = isActive ? openPools : finishedPools
    }

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      chosenPools = chosenPools.filter((pool) => pool.earningToken.symbol.toLowerCase().includes(lowercaseQuery))
    }
    console.log(chosenPools)
    return sortPools(chosenPools).slice(0, 50)
  }

  const cardLayout = (
    <CardContainer>
      <FlexLayout>
        {poolsToShow().map((pool) => (
          <PoolCard key={pool.sousId} pool={pool} />
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
              <PoolTable key={pool.sousId} pool={pool} />
            ))}
          </StyledTable>
        </TableWrapper>
      </TableContainer>
    </Container>
  )

  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1" mb="12px" mt={0} color="white">
            {TranslateString(999, 'Banana Fiesta')}
          </StyledHeading>
          <Text fontSize="22px" fontFamily="poppins" fontWeight={400} color="white">
            {TranslateString(999, 'Stake BANANA to earn new tokens.')}
          </Text>
          <Text fontSize="22px" fontFamily="poppins" fontWeight={400} color="white">
            {TranslateString(999, 'You can unstake at any time.')}
          </Text>
          <Text fontSize="22px" fontFamily="poppins" fontWeight={400} color="white">
            {TranslateString(999, 'Rewards are calculated per block.')}
          </Text>
        </HeadingContainer>
        <MonkeyContainer>
          <PoolMonkey />
        </MonkeyContainer>
      </Header>
      <StyledPage width="1130px">
        <ControlContainer>
          <ViewControls>
            <ButtonCheckWrapper>
              {size.width > 968 && viewMode !== null && (
                <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
              )}
              <LabelWrapper>
                <StyledText fontFamily="poppins" mr="15px">
                  Search
                </StyledText>
                <SearchInput onChange={handleChangeQuery} value="" />
              </LabelWrapper>
              <FarmTabButtons />
              <ToggleWrapper>
                <StyledCheckbox checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
                <StyledText fontFamily="poppins" style={{ marginRight: '50px' }}>
                  {TranslateString(1116, 'Staked')}
                </StyledText>
                <StyledCheckbox checked={gnanaOnly} onChange={() => setGnanaOnly(!gnanaOnly)} />
                <StyledText fontFamily="poppins"> {TranslateString(1116, 'GNANA')}</StyledText>
              </ToggleWrapper>
            </ButtonCheckWrapper>
          </ViewControls>
        </ControlContainer>
        <ContainerLabels>
          <StyledLabelContainerHot>
            <StyledLabel active={sortOption === 'hot'} onClick={() => handleSortOptionChange('hot')}>
              Hot
            </StyledLabel>
          </StyledLabelContainerHot>
          <StyledLabelContainerLP>
            <StyledLabel>Token</StyledLabel>
          </StyledLabelContainerLP>
          <StyledLabelContainerAPR>
            <StyledLabel active={sortOption === 'apr'} onClick={() => handleSortOptionChange('apr')}>
              APR
              {sortOption === 'apr' ? (
                <StyledArrowDropDownIcon width="7px" height="8px" color="white" down={sortDirection === 'desc'} />
              ) : null}
            </StyledLabel>
          </StyledLabelContainerAPR>
          <StyledLabelContainerLiquidity>
            <StyledLabel active={sortOption === 'totalStaked'} onClick={() => handleSortOptionChange('totalStaked')}>
              Total Staked
              {sortOption === 'totalStaked' ? (
                <StyledArrowDropDownIcon width="7px" height="8px" color="white" down={sortDirection === 'desc'} />
              ) : null}
            </StyledLabel>
          </StyledLabelContainerLiquidity>
          <StyledLabelContainerEarned>
            <StyledLabel active={sortOption === 'earned'} onClick={() => handleSortOptionChange('earned')}>
              Earned
              {sortOption === 'earned' ? (
                <StyledArrowDropDownIcon width="7px" height="8px" color="white" down={sortDirection === 'desc'} />
              ) : null}
            </StyledLabel>
          </StyledLabelContainerEarned>
        </ContainerLabels>
        {viewMode === ViewMode.CARD ? cardLayout : tableLayout}
      </StyledPage>
    </>
  )
}

export default Pools
