import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Flex, useMatchBreakpoints } from '@apeswapfinance/uikit'
import ListView from 'components/ListView'
import { ExtendedListViewProps } from 'components/ListView/types'
import { useFarms, useFetchLpTokenPrices, usePollFarms } from 'state/hooks'
import useTheme from 'hooks/useTheme'
import ListViewContent from 'components/ListViewContent'
import useI18n from 'hooks/useI18n'
import SearchInput from './components/SearchInput'
import * as S from './styles'

const NUMBER_OF_FARMS_VISIBLE = 12

const Farms: React.FC = () => {
  usePollFarms()
  useFetchLpTokenPrices()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const { account } = useWeb3React()
  const farmsLP = useFarms(account)
  const [query, setQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const [sortDirection, setSortDirection] = useState<boolean | 'desc' | 'asc'>('desc')
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  console.log({ farmsLP })

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

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const { isDark } = useTheme()

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  // const handleSortOptionChange = (option): void => {
  //   if (option !== sortOption) {
  //     setSortDirection('desc')
  //   } else if (sortDirection === 'desc') {
  //     setSortDirection('asc')
  //   } else {
  //     setSortDirection('desc')
  //   }
  //   setSortOption(option)
  // }

  const setContent = activeFarms.map((farm) => {
    const [token1, token2] = farm.lpSymbol.split('-')
    return {
      tokens: { token1, token2, token3: 'BANANA' },
      tag: 'PRO',
      title: farm.lpSymbol,
      cardContent: (
        <>
          <ListViewContent title="APR" value={`${farm?.apr}%`} width={isMobile ? 10 : 25} />
          <ListViewContent
            title="APY"
            value={`${farm?.apy}%`}
            // value2="100%"
            // value2Icon="/images/swap-icon.svg"
            valueIcon="/images/tokens/banana.svg"
            width={isMobile ? 25 : 40}
          />
          <ListViewContent
            title="Liquidity"
            value={`$${Number(farm?.totalLpStakedUsd).toLocaleString(undefined)}`}
            width={isMobile ? 50 : 75}
          />
          <ListViewContent title="Earned" value="1000000.00" width={isMobile ? 75 : 100} />
        </>
      ),
      expandedContent: <></>,
    } as ExtendedListViewProps
  })

  return (
    <>
      <S.Header>
        <S.HeadingContainer>
          <S.StyledHeading as="h1" mb="12px" mt={0} fontWeight={800}>
            {TranslateString(999, 'Stake LP tokens to earn BANANA')}
          </S.StyledHeading>
        </S.HeadingContainer>
      </S.Header>

      <Flex justifyContent="center" style={{ width: '100%', height: '100%' }}>
        <Flex flexDirection="column" alignSelf="center" style={{ maxWidth: '1130px', width: '100%' }}>
          <S.ControlContainer>
            <S.ViewControls>
              <S.LabelWrapper>
                <S.StyledText mr="15px">Search</S.StyledText>
                <SearchInput onChange={handleChangeQuery} value={query} />
              </S.LabelWrapper>
              <S.ButtonCheckWrapper>
                {/* <FarmTabButtons /> */}
                <S.ToggleWrapper onClick={() => setStakedOnly(!stakedOnly)}>
                  <S.StyledCheckbox checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
                  <S.StyledText> {TranslateString(1116, 'Staked')}</S.StyledText>
                </S.ToggleWrapper>
              </S.ButtonCheckWrapper>
              {isDark ? (
                <S.StyledImage src="/images/farm-night-farmer.svg" alt="night-monkey" />
              ) : (
                <S.StyledImage src="/images/farm-day-farmer.svg" alt="day-monkey" />
              )}
            </S.ViewControls>
          </S.ControlContainer>
          {/* {renderContent()} */}
          <ListView listViews={setContent} />
          <div ref={loadMoreRef} />
        </Flex>
      </Flex>
    </>
  )
}

export default React.memo(Farms)

// <>
//   <ListViewContent title="APR" value="100%" width={25} />
//   <ListViewContent
//     title="APY"
//     value="100%"
//     value2="100%"
//     value2Icon="/images/swap-icon.svg"
//     valueIcon="/images/tokens/banana.svg"
//     width={25}
//   />{' '}
//   <ListViewContent title="Liquidity" value="$20,000,000" width={75} />
//   <ListViewContent title="Earned" value="1000000.00" width={100} />
// </>
