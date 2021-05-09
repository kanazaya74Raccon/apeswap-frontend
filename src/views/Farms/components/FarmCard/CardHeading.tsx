import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image, Skeleton, Text } from '@apeswapfinance/uikit'
import ApyButton from '../../../../components/ApyCalculator/ApyButton'

export interface ExpandableSectionProps {
  lpLabel?: string
  apr?: BigNumber
  farmImage?: string
  tokenSymbol?: string
  addLiquidityUrl?: string
  bananaPrice?: BigNumber
  farmAPR: string
  removed: boolean
}

const StyledBackground = styled(Flex)`
  justify-content: center;
  align-items: flex-end;
  width: 121px;
  height: 121px;
  background: rgb(255, 179, 0, 0.4);
  border-radius: 20px;
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  color: ${(props) => props.theme.colors.card};
`

const StyledHeading = styled(Heading)`
  font-size: 22px;
`

const StyledText = styled(Text)`
  font-weight: 700;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  apr,
  farmImage,
  tokenSymbol,
  addLiquidityUrl,
  bananaPrice,
  farmAPR,
  removed
}) => {
  return (
    <Flex>
    <StyledBackground>
      <Image src={`/images/farms/${farmImage}.svg`} alt={tokenSymbol} width={109} height={109} />
      </StyledBackground>
      <Flex flexDirection="column" alignItems="flex-start" justifyContent="center" ml="18px">
        <StyledHeading mb="4px">{lpLabel}</StyledHeading>
        {!removed && (
         <Text bold style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
         <StyledText fontFamily="poppins">APR:</StyledText>
          {apr ? (
              <>
                <ApyButton
                  lpLabel={lpLabel}
                  rewardTokenName="BANANA"
                  addLiquidityUrl={addLiquidityUrl}
                  rewardTokenPrice={bananaPrice}
                  apy={apr}
                />
                {farmAPR}%
              </>
            ) : (
              <Skeleton height={24} width={80} />
            )}
        </Text>)}
      </Flex>
    </Flex>
  )
}

export default CardHeading
