import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Heading, Text, Card, Checkbox } from '@apeswapfinance/uikit'
import partition from 'lodash/partition'
import useBlock from 'hooks/useBlock'
import useI18n from 'hooks/useI18n'
import useWindowSize, { Size } from 'hooks/useDimensions'
import { usePools } from 'state/hooks'
import Page from 'components/layout/Page'
import SearchInput from '../../../Pools/components/SearchInput'
import PoolTabButtons from '../../../Pools/components/PoolTabButtons'
import PoolCard from '../../../Pools/components/PoolCard/PoolCard'

const float = keyframes`
  0% {transform: translate3d(0px, 0px, 0px);}
  50% {transform: translate3d(50px, 0px, 0px);}
  100% {transform: translate3d(0px, 0px, 0px);}
`
const floatSM = keyframes`
  0% {transform: translate3d(0px, 0px, 0px);}
  50% {transform: translate3d(10px, 0px, 0px);}
  100% {transform: translate3d(0px, 0px, 0px);}
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
  justify-content: center;
  margin-left: 0px;
  cursor: pointer;
  ${Text} {
    margin-left: 4px;
    ${({ theme }) => theme.mediaQueries.md} {
      margin-left: 8px;
    }
  } ;
`

const ToggleContainer = styled.div`
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
    width: 200px;
    transform: translateY(0px);
    flex-direction: row;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 250px;
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
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/pool-background-night.svg)' : 'url(/images/pool-background-day.svg)'};
  background-repeat: no-repeat;
  background-size: cover;
  height: 250px;
  background-position: center;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 300px;
    padding-left: 24px;
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 10px;
    padding-right: 10px;
    height: 400px;
  }
`

const PoolMonkey = styled.div`
  background-image: ${({ theme }) => (theme.isDark ? 'url(/images/pool-ape-night.svg)' : 'url(/images/pool-ape.svg)')};
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
`

const MonkeyWrapper = styled.div`
  position: absolute;
  width: 225px;
  height: 275px;
  margin-left: auto;
  margin-right: auto;
  bottom: 0px;
  right: 0px;
  animation: 5s ${floatSM} linear infinite;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 24px;
    padding-right: 24px;
    animation: 10s ${float} linear infinite;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 700px;
    height: 1000px;
    top: ${({ theme }) => (theme.isDark ? '-145px' : '-90px')};
    right: 0;
    animation: 10s ${float} linear infinite;
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

const FlexLayout = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & > * {
    width: 100%;
    margin-bottom: 32px;
  }
`

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
