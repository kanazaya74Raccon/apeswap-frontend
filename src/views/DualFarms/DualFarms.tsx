import React, { useEffect, useState, useMemo } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
import { Heading, RowType, Text, Card, Checkbox, ArrowDropDownIcon } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { usePriceBananaBusd, useDualFarms, usePollDualFarms } from 'state/hooks'
import useTheme from 'hooks/useTheme'
import MenuTabButtons from 'components/ListViewMenu/MenuTabButtons'
import useWindowSize, { Size } from 'hooks/useDimensions'
import { DualFarm } from 'state/types'
import { orderBy } from 'lodash'
import { useTranslation } from 'contexts/Localization'
import FarmCard from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import SearchInput from './components/SearchInput'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'

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
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;

  ${Text} {
    margin-left: 4px;
    ${({ theme }) => theme.mediaQueries.md} {
      margin-left: 8px;
    }
  } ;
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
    theme.isDark ? 'url(/images/farm-polygon-night.svg)' : 'url(/images/farm-polygon-day.svg)'};
  background-repeat: no-repeat;
  background-size: cover;
  height: 250px;
  background-position: center;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 24px;
    padding-right: 24px;
    height: 300px;
  }
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
  background: ${({ theme }) => theme.colors.white2};
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
  font-size: 30px;
  max-width: 176px !important;
  color: white;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 30px;
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

const DualFarms: React.FC = () => {
  usePollDualFarms()
  const size: Size = useWindowSize()
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const bananaPrice = usePriceBananaBusd()
  const { account } = useWeb3React()
  const farmsLP = useDualFarms()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState(null)
  const [sortOption, setSortOption] = useState('hot')
  const [sortDirection, setSortDirection] = useState<boolean | 'desc' | 'asc'>('desc')

  useEffect(() => {
    if (size.width !== undefined) {
      if (size.width < 968) {
        setViewMode(ViewMode.CARD)
      } else {
        setViewMode(ViewMode.TABLE)
      }
    }
  }, [size])

  const [stakedOnly, setStakedOnly] = useState(false)
  const isActive = !pathname.includes('history')

  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const { isDark } = useTheme()

  const farmsStakedMemoized = useMemo(() => {
    let farmsStaked = []
    let tempFarmsStaked = []

    const sortFarms = (farms: DualFarm[]): DualFarm[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: DualFarm) => farm.apr, sortDirection)
        case 'multiplier':
          return orderBy(
            farms,
            (farm: DualFarm) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            sortDirection,
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: DualFarm) => (farm.userData ? Number(farm.userData?.miniChefEarnings) : 0),
            sortDirection,
          )
        case 'liquidity':
          return orderBy(farms, (farm: DualFarm) => Number(farm.totalStaked), sortDirection)
        default:
          return farms
      }
    }

    if (isActive) {
      tempFarmsStaked = stakedOnly ? stakedOnlyFarms : activeFarms
    } else {
      tempFarmsStaked = stakedOnly ? stakedInactiveFarms : inactiveFarms
    }

    if (query) {
      farmsStaked = tempFarmsStaked.filter((farm) =>
        `${farm?.stakeTokens?.token0?.symbol}-${farm?.stakeTokens?.token1?.symbol}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
    } else {
      farmsStaked = tempFarmsStaked
    }

    return sortFarms(farmsStaked)
  }, [
    sortOption,
    activeFarms,
    inactiveFarms,
    isActive,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    sortDirection,
    query,
  ])

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const rowData = farmsStakedMemoized.map((farm) => {
    const lpLabel = `${farm?.stakeTokens?.token0?.symbol}-${farm?.stakeTokens?.token1?.symbol}`
    const miniChefRewardTokens = getBalanceNumber(
      farm?.userData?.miniChefEarnings,
      farm?.rewardTokens?.token0?.decimals,
    )
    const rewarderTokens = getBalanceNumber(farm?.userData?.rewarderEarnings, farm?.rewardTokens?.token1?.decimals)
    const dollarsEarned = miniChefRewardTokens * farm?.rewardToken0Price + rewarderTokens * farm?.rewardToken1Price

    const row: RowProps = {
      apr: {
        value: farm.apr?.toFixed(2),
        multiplier: farm.multiplier,
        lpLabel,
        bananaPrice,
        originalValue: farm.apr,
      },
      farm: {
        stakeTokens: farm?.stakeTokens,
        rewardTokens: farm?.rewardTokens,
        dualImage: farm?.dualImage,
        label: `${farm?.stakeTokens?.token1?.symbol}-${farm?.stakeTokens?.token0?.symbol}`,
        pid: farm.pid,
      },
      earned: {
        earnings: farm.userData ? dollarsEarned : null,
        pid: farm.pid,
      },
      liquidity: {
        liquidity: new BigNumber(farm.totalStaked),
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }
    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema(t)

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

      return <Table data={rowData} columns={columns} />
    }

    return (
      <CardContainer>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farmsStakedMemoized.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} bananaPrice={bananaPrice} account={account} removed={false} />
            ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsStakedMemoized.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} bananaPrice={bananaPrice} account={account} removed />
            ))}
          </Route>
        </FlexLayout>
      </CardContainer>
    )
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
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1">{t('Stake LP tokens to earn Rewards')}</StyledHeading>
        </HeadingContainer>
      </Header>

      <StyledPage width="1130px">
        <ControlContainer>
          <ViewControls>
            {size.width > 968 && viewMode !== null && (
              <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
            )}
            <LabelWrapper>
              <StyledText mr="15px">{t('Search')}</StyledText>
              <SearchInput onChange={handleChangeQuery} value={query} />
            </LabelWrapper>
            <ButtonCheckWrapper>
              <div />
              <MenuTabButtons />
              <div style={{ marginRight: '70px' }} />{' '}
              <ToggleWrapper onClick={() => setStakedOnly(!stakedOnly)}>
                <StyledCheckbox checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
                <StyledText> {t('Staked')}</StyledText>
              </ToggleWrapper>
            </ButtonCheckWrapper>
            {isDark ? (
              <StyledImage src="/images/farm-night-farmer.svg" alt="night-monkey" />
            ) : (
              <StyledImage src="/images/farm-day-farmer.svg" alt="day-monkey" />
            )}
          </ViewControls>
        </ControlContainer>
        <ContainerLabels>
          <StyledLabelContainerHot>
            <StyledLabel active={sortOption === 'hot'} onClick={() => handleSortOptionChange('hot')}>
              {t('Hot')}
            </StyledLabel>
          </StyledLabelContainerHot>
          <StyledLabelContainerLP>
            <StyledLabel>LP</StyledLabel>
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
            <StyledLabel active={sortOption === 'liquidity'} onClick={() => handleSortOptionChange('liquidity')}>
              {t('Liquidity')}
              {sortOption === 'liquidity' ? (
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
        {viewMode === null ? null : renderContent()}
      </StyledPage>
    </>
  )
}

export default DualFarms
