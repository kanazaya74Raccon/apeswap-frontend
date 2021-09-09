import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Text, Skeleton } from '@apeswapfinance/uikit'
import { Pool } from 'state/types'

export interface PoolWithStakeValue extends Pool {
  apr?: BigNumber
  staked?: BigNumber
  addStakedUrl?: string
  stakedTokenPrice?: number
  rewardTokenPrice?: number
}

interface HarvestProps {
  pool: PoolWithStakeValue
}

const PCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  text-align: center;
  width: 316px;
  height: 90px;
  background-color: ${({ theme }) => (theme.isDark ? '#27262c' : '#faf9fa')};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: hidden;
  margin-top: 15px;
  @media screen and (max-width: 350px) {
    width: 295px;
    margin-right: 8px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0px;
  }
`

const StyledBackground = styled(Flex)`
  justify-content: space-between;
  background: rgb(255, 179, 0, 0.4);
  border-radius: 20px;
  width: 137px;
  height: 90px;
  align-items: flex-end;
  margin-left: 0px;
  padding-left: 7px;
  padding-right: 7px;
`

const StyledImage = styled.img`
  display: none;
  align-self: center;
  display: flex;
  width: 45px;
  height: 45px;
`

const StyledArrow = styled.img`
  display: none;
  align-self: center;
  display: flex;
  width: 12px;
  height: 12px;
`

const DescriptionContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 150px;
  width: 160px;
  height: 60px;
`
const ApyWrapper = styled.div`
  width: 160px;
  display: flex;
  margin-top: 7.5px;
`

const ApyText = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 19px;
  display: flex;
  margin-right: 2.5px;
  align-items: center;
  letter-spacing: 1px;
`

const ApyNumber = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 20px;
  margin-left: 4px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: 1px;
`

const StyledHeading = styled(Heading)`
  font-size: 22px;
  ${({ theme }) => theme.mediaQueries.xs} {
    text-align: start;
  }
`

const PoolCardForHome: React.FC<HarvestProps> = ({ pool }) => {
  const { image, tokenName, stakingTokenName, apr } = pool

  return (
    <PCard>
      <StyledBackground>
        <StyledImage src={`/images/tokens/${stakingTokenName}.svg`} alt={stakingTokenName} />
        <StyledArrow src="/images/arrow.svg" alt="arrow" />
        <StyledImage src={`/images/tokens/${image || `${tokenName}.svg`}`} alt={tokenName} />
      </StyledBackground>
      <DescriptionContainer>
        <StyledHeading>{tokenName}</StyledHeading>
        <ApyWrapper>
          <ApyText>APR:</ApyText>
          {apr.toFixed(2) !== 'NaN' ? <ApyNumber>{apr.toFixed(2)}%</ApyNumber> : <Skeleton width="80px" />}
        </ApyWrapper>
      </DescriptionContainer>
    </PCard>
  )
}

export default PoolCardForHome
