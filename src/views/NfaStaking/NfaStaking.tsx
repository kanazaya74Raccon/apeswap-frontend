import React, { useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Heading, Text, Card, Checkbox } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { partition } from 'lodash'
import useWindowSize, { Size } from 'hooks/useDimensions'
import { useNfaStakingPools, usePollNfaStakingData } from 'state/hooks'
import Page from 'components/layout/Page'
import SearchInput from '../Pools/components/SearchInput'
import PoolCard from './components/PoolCard/PoolCard'

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
    width: 180px;
    transform: translateY(0px);
    flex-direction: row;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 200px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    width: 225px;
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
    height: 300px;
  }
`

const PoolMonkey = styled.div`
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/nfa-pool-ape-night.svg)' : 'url(/images/nfa-pool-ape-day.svg)'};
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
`

const MonkeyWrapper = styled.div`
  position: absolute;
  width: 200px;
  height: 245px;
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
    width: 600px;
    height: 900px;
    top: ${({ theme }) => (theme.isDark ? '-90px' : '-90px')};
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
  margin-left: 50px;
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

const AdminText = styled(Text)`
  font-family: poppins;
  font-size: 18px;
  font-weight: 500;
  color: white;
`

const NfaStaking: React.FC = () => {
  usePollNfaStakingData()
  const [stakedOnly, setStakedOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { pathname } = useLocation()
  const isActive = !pathname.includes('history')
  const size: Size = useWindowSize()
  const allNfaStakingPools = useNfaStakingPools()
  const TranslateString = useI18n()
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const stakedOnlyPools = allNfaStakingPools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0),
  )

  const [finishedPools, openPools] = partition(allNfaStakingPools, (pool) => pool.isFinished)

  const poolsToShow = () => {
    let chosenPools = []
    if (stakedOnly) {
      chosenPools = isActive ? stakedOnlyPools : openPools
    } else {
      chosenPools = isActive ? openPools : finishedPools
    }

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      chosenPools = chosenPools.filter((pool) => `tier ${pool.tier}`.includes(lowercaseQuery))
    }
    return chosenPools
  }

  const cardLayout = (
    <CardContainer>
      <FlexLayout>
        {poolsToShow().map((pool) => (
          <PoolCard key={pool.sousId} pool={pool} removed={false} />
        ))}
      </FlexLayout>
    </CardContainer>
  )

  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1" mb="8px" mt={0} color="white" fontFamily="Titan One">
            {TranslateString(999, 'NFA Staking')}
          </StyledHeading>
          {size.width > 968 && <AdminText>Stake your Non-Fungible Ape for profits from the auction</AdminText>}
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
              <ToggleContainer>
                <ToggleWrapper onClick={() => setStakedOnly(!stakedOnly)}>
                  <StyledCheckbox checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
                  <StyledText>{TranslateString(1116, 'Staked')}</StyledText>
                </ToggleWrapper>
              </ToggleContainer>
            </ButtonCheckWrapper>
          </ViewControls>
        </ControlContainer>
        {cardLayout}
        <div ref={loadMoreRef} />
      </StyledPage>
    </>
  )
}

export default NfaStaking
