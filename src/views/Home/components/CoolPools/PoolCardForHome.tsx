import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Text, Skeleton, Image } from '@apeswapfinance/uikit'
import { Pool } from 'state/types'

interface HarvestProps {
  pool: Pool
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
  width: 135px;
  height: 90px;
  background: rgb(255, 179, 0, 0.4);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
`

const IconImage = styled(Image)`
  align: center;
  width: 50px;
  height: 50px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 50px;
    height: 50px;
  }
`

const IconArrow = styled(Image)`
  align: center;
  width: 5px;
  height: 5px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 10px;
    height: 10px;
  }
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
  font-weight: 200;
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
  const { image, tokenName, stakingToken, apr } = pool

  return (
    <PCard>
      <StyledBackground>
        <IconImage
          src={`/images/tokens/${stakingToken?.symbol}.svg`}
          alt={stakingToken?.symbol}
          width={60}
          height={60}
          marginLeft="5px"
        />
        <IconArrow src="/images/arrow.svg" alt="arrow" width={10} height={10} />
        <IconImage
          src={`/images/tokens/${image || `${tokenName}.svg`}`}
          alt={tokenName}
          width={60}
          height={60}
          marginRight="5px"
        />
      </StyledBackground>
      <DescriptionContainer>
        <StyledHeading fontFamily="Titan One">{tokenName}</StyledHeading>
        <ApyWrapper>
          <ApyText>APR:</ApyText>
          {apr ? <ApyNumber>{apr?.toFixed(2)}%</ApyNumber> : <Skeleton width="80px" />}
        </ApyWrapper>
      </DescriptionContainer>
    </PCard>
  )
}

export default PoolCardForHome
