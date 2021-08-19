import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Flex, Heading, Text } from '@apeswapfinance/uikit'
import { Farm } from 'state/types'
import ApyButton from '../../../../components/ApyCalculator/ApyButton'

export interface FarmWithStakedValue extends Farm {
  apr?: BigNumber
  addLiquidityUrl?: string
  bananaPrice?: BigNumber
}

interface HarvestProps {
  farm: FarmWithStakedValue
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
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0px;
  }
`

const StyledBackground = styled(Flex)`
  justify-content: space-between;
  background: rgb(255, 179, 0, 0.4);
  border-radius: 20px;
  width: 104.69px;
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
  width: 90px;
  height: 90px;
`

const DescriptionContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 115px;
  width: 190px;
  height: 60px;
`
const ApyWrapper = styled.div`
  width: 160px;
  display: flex;
  margin-top: 5px;
  z-index: 1;
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

const FarmCardForHome: React.FC<HarvestProps> = ({ farm }) => {
  const { tokenSymbol, lpSymbol, apr, addLiquidityUrl, bananaPrice, quoteTokenSymbol } = farm
  const lpLabel = lpSymbol && lpSymbol.toUpperCase()
  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const farmAPR = new BigNumber(
    farm.apr && farm.apr.times(new BigNumber(100)).toNumber().toLocaleString('en-US').slice(0, -1),
  )

  return (
    <PCard>
      <StyledBackground>
        <StyledImage src={`/images/farms/${farmImage}.svg`} alt={tokenSymbol} />
      </StyledBackground>
      <DescriptionContainer>
        <StyledHeading>
          {tokenSymbol}-{quoteTokenSymbol}
        </StyledHeading>
        <ApyWrapper>
          <ApyText>APR:</ApyText>
          <ApyButton
            lpLabel={lpLabel}
            rewardTokenName="BANANA"
            addLiquidityUrl={addLiquidityUrl}
            rewardTokenPrice={new BigNumber(bananaPrice)}
            apy={apr}
          />
          <ApyNumber>{farmAPR?.toFixed(2)}%</ApyNumber>
        </ApyWrapper>
      </DescriptionContainer>
    </PCard>
  )
}

export default FarmCardForHome
