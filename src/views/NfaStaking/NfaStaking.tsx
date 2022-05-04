import React, { useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Text, Card, Checkbox } from '@apeswapfinance/uikit'
import { partition } from 'lodash'
import { useNfaStakingPools, usePollNfaStakingData } from 'state/hooks'
import Page from 'components/layout/Page'
import Banner from 'components/Banner'
import { useTranslation } from 'contexts/Localization'
import SearchInput from '../PoolsLegacy/components/SearchInput'
import PoolCard from './components/PoolCard/PoolCard'

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

const StyledText = styled(Text)`
  font-weight: 600;
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

const NfaStaking: React.FC = () => {
  usePollNfaStakingData()
  const [stakedOnly, setStakedOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { pathname } = useLocation()
  const isActive = !pathname.includes('history')
  const allNfaStakingPools = useNfaStakingPools()
  const { t } = useTranslation()
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
      <StyledPage width="1130px">
        <Banner
          banner="nfa-staking"
          link="https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake"
          title={t('Nfa Staking')}
          maxWidth={1130}
          margin="0 0 20px 0px"
          titleColor="primaryBright"
        />
        <ControlContainer>
          <ViewControls>
            <LabelWrapper>
              <StyledText mr="15px">{t('Search')}</StyledText>
              <SearchInput onChange={handleChangeQuery} value={searchQuery} />
            </LabelWrapper>
            <ButtonCheckWrapper>
              <ToggleContainer>
                <ToggleWrapper onClick={() => setStakedOnly(!stakedOnly)}>
                  <StyledCheckbox checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
                  <StyledText>{t('Staked')}</StyledText>
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
