import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Text } from '@apeswapfinance/uikit'
import partition from 'lodash/partition'
import useBlock from 'hooks/useBlock'
import useI18n from 'hooks/useI18n'
import useWindowSize, { Size } from 'hooks/useDimensions'
import { usePools } from 'state/hooks'
import SearchInput from '../../../Pools/components/SearchInput'
import PoolTabButtons from '../../../Pools/components/PoolTabButtons'
import PoolCard from '../../../Pools/components/PoolCard/PoolCard'

import {
  FlexLayout,
  CardContainer,
  Header,
  StyledHeading,
  HeadingContainer,
  MonkeyWrapper,
  PoolMonkey,
  StyledPage,
  ControlContainer,
  ViewControls,
  LabelWrapper,
  StyledText,
  ButtonCheckWrapper,
  ToggleContainer,
  ToggleWrapper,
  StyledCheckbox,
} from './styles'

const Pools: React.FC = () => {
  const [stakedOnly, setStakedOnly] = useState(false)
  const gnanaOnly = true
  const [searchQuery, setSearchQuery] = useState('')
  const { account } = useWeb3React()
  const { pathname } = useLocation()
  const size: Size = useWindowSize()
  const allPools = usePools(account)
  const block = useBlock()
  const TranslateString = useI18n()
  const isActive = !pathname.includes('history')
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const curPools = allPools.map((pool) => {
    return { ...pool, isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock }
  })

  const [finishedPools, openPools] = partition(curPools, (pool) => pool.isFinished)

  const gnanaOnlyPools = openPools.filter((pool) => pool.stakingToken?.symbol === 'GNANA')

  const gnanaInactivePools = finishedPools.filter((pool) => pool.stakingToken?.symbol === 'GNANA')
  const gnanaStakedOnlyPools = openPools.filter(
    (pool) =>
      pool.userData &&
      new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) &&
      pool.stakingToken?.symbol === 'GNANA',
  )

  const gnanaStakedInactivePools = finishedPools.filter(
    (pool) =>
      pool.userData &&
      new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) &&
      pool.stakingToken?.symbol === 'GNANA',
  )

  const poolsToShow = () => {
    let chosenPools = []
    if (stakedOnly && gnanaOnly) {
      chosenPools = isActive ? gnanaStakedOnlyPools : gnanaStakedInactivePools
    } else {
      chosenPools = isActive ? gnanaOnlyPools : gnanaInactivePools
    }

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      chosenPools = chosenPools.filter((pool) => pool.tokenName.toLowerCase().includes(lowercaseQuery))
    }
    return chosenPools
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

  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1" mb="8px" mt={0} color="gold">
            {TranslateString(999, 'GNANA Pools')}
          </StyledHeading>
          {size.width > 968 && (
            <Text fontSize="22px" fontWeight={400} color="gold">
              Stake GNANA to earn new tokens. <br /> You can unstake at any time. <br /> Rewards are calculated per
              block.
            </Text>
          )}
        </HeadingContainer>
        <MonkeyWrapper>
          <PoolMonkey />
        </MonkeyWrapper>
      </Header>
      <StyledPage width="1130px">
        <ControlContainer>
          <ViewControls>
            <LabelWrapper>
              <StyledText mr="15px">Search</StyledText>
              <SearchInput onChange={handleChangeQuery} value={searchQuery} />
            </LabelWrapper>
            <ButtonCheckWrapper>
              <PoolTabButtons />
              <ToggleContainer>
                <ToggleWrapper onClick={() => setStakedOnly(!stakedOnly)}>
                  <StyledCheckbox checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
                  <StyledText style={{ marginRight: '10px' }}>{TranslateString(1116, 'Staked')}</StyledText>
                </ToggleWrapper>
              </ToggleContainer>
            </ButtonCheckWrapper>
          </ViewControls>
        </ControlContainer>
        {cardLayout}
      </StyledPage>
    </>
  )
}

export default React.memo(Pools)
