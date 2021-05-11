import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Tag, Flex, Heading, Image, Skeleton, Text } from '@apeswapfinance/uikit'
import UnlockButton from 'components/UnlockButton'
import { getBalanceNumber } from 'utils/formatBalance'
import { useFarmUser } from 'state/hooks'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import HarvestAction from './HarvestAction'
import ApyButton from '../../../../components/ApyCalculator/ApyButton'
import ExpandableSectionButton from './ExpandableSectionButton'

export interface ExpandableSectionProps {
  lpLabel?: string
  apr?: BigNumber
  farmImage?: string
  tokenSymbol?: string
  addLiquidityUrl?: string
  bananaPrice?: BigNumber
  farmAPR: string
  removed: boolean
  pid?: number
  showExpandableSection?: boolean
  onClick?: () => void
}

const StyledBackground = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 60px;
  background: rgb(255, 179, 0, 0.4);
  border-radius: 20px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 121px;
    height: 121px;
    align-items: flex-end;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  color: ${(props) => props.theme.colors.card};
`

const StyledHeading = styled(Heading)`
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 22px;
  }
`

const StyledText1 = styled(Text)`
  font-weight: 700;
  font-size: 10px;
  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 15px;
  }
`

const StyledText2 = styled(Text)`
  font-weight: 700;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 12px;
  }
`

const StyledText3 = styled(Text)`
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 1px;
  color: #38a611;
  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 25px;
    line-height: 29px;
  }
`

const StyledFlexContainer = styled(Flex)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 6px;
  margin-right: 15px;
  flex: 1;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 15px;
  }
`

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;

  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const ButtonContainer = styled.div`
  display: flex;
`

const StyledImage = styled.img`
  font-weight: 700;
  width: 57px;
  height: 57px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 109px;
    height: 109px;
  }
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  apr,
  farmImage,
  tokenSymbol,
  addLiquidityUrl,
  bananaPrice,
  farmAPR,
  removed,
  pid,
  onClick,
  showExpandableSection,
}) => {
  const TranslateString = useI18n()

  const { earnings } = useFarmUser(pid)
  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayBalance = rawEarningsBalance ? rawEarningsBalance.toLocaleString() : '?'

  const { account }: { account: string } = useWallet()

  return (
    <Flex>
      <StyledBackground>
        <StyledImage src={`/images/farms/${farmImage}.svg`} alt={tokenSymbol} />
      </StyledBackground>
      <StyledFlexContainer>
        <LabelContainer>
          <StyledHeading mb="4px">{lpLabel}</StyledHeading>
          {!removed && (
            <Text bold style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <StyledText1 fontFamily="poppins">APR:</StyledText1>
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
            </Text>
          )}
        </LabelContainer>
        <LabelContainer>
          <Flex flexDirection="column">
            <StyledText2 fontFamily="poppins" color="primary" pr="3px">
              {TranslateString(999, 'Banana Earned')}
            </StyledText2>
            <StyledText3>{displayBalance}</StyledText3>
          </Flex>
          <ButtonContainer>
          {!account ? <UnlockButton /> : <HarvestAction earnings={earnings} pid={pid} />}
          <ExpandableSectionButton onClick={onClick} expanded={showExpandableSection} />
          </ButtonContainer>
        </LabelContainer>
      </StyledFlexContainer>
    </Flex>
  )
}

export default CardHeading
