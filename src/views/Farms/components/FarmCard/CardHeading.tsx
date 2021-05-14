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
  height: 80px;
  background: rgb(255, 179, 0, 0.4);
  border-radius: 20px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 121px;
    height: 121px;
    align-items: flex-end;
    height: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 60px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  color: ${(props) => props.theme.colors.card};
`

const StyledHeading = styled(Heading)`
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 22px;
  }
`

const StyledText1 = styled(Text)`
  font-weight: 700;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 15px;
  }
`

const StyledText2 = styled(Text)`
  font-weight: 700;
  font-size: 12px;
  margin-top: 1px;
`

const StyledText3 = styled(Text)`
  font-size: 12px;
  color: #38a611;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 25px;
    line-height: 29px;
  }
`

const StyledText4 = styled(Text)`
  font-size: 12px;
  font-weight: 700;
  margin-top: 1px;
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
  }
`

const StyledFlexContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 6px;
  margin-right: 15px;
  align-items: center;
  flex: 1;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    flex-direction: column;
    justify-content: center;
  }
`

const StyledFlexEarned = styled(Flex)`
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-right: 0px;
    flex-direction: column;
  }
`

const StyledFlexEarnedSmall = styled(Flex)`
  margin-right: 10px;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  width: 120px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`

const LabelContainer2 = styled.div`
  display: flex;
  align-items: flex-start;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
`

const FlexSwitch = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row-reverse;
  }
`

const StyledAPRText = styled.div`
  font-size: 12px;
  line-height: 11px;
  letter-spacing: 1px;
  margin-left: 5px;
  margin-bottom: 2px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
    line-height: 23px;
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
    width: 75px;
    height: 75px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
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
          <StyledHeading>{lpLabel}</StyledHeading>
          {!removed && (
            <Text bold style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <StyledText1 fontFamily="poppins">APR:</StyledText1>
              {apr ? (
                <FlexSwitch>
                  <ApyButton
                    lpLabel={lpLabel}
                    rewardTokenName="BANANA"
                    addLiquidityUrl={addLiquidityUrl}
                    rewardTokenPrice={bananaPrice}
                    apy={apr}
                  />
                  <StyledAPRText>{farmAPR}%</StyledAPRText>
                </FlexSwitch>
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </Text>
          )}
          <StyledFlexEarnedSmall>
            <StyledText4 fontFamily="poppins" color="primary" pr="3px">
              {TranslateString(999, 'Banana ')}
            </StyledText4>
            <StyledText2 fontFamily="poppins" color="primary" pr="3px">
              {TranslateString(999, 'Earned')}
            </StyledText2>
            <StyledText3>{displayBalance}</StyledText3>
          </StyledFlexEarnedSmall>
        </LabelContainer>
        <LabelContainer2>
          <StyledFlexEarned>
            <Flex>
              <StyledText4 fontFamily="poppins" color="primary" pr="3px">
                {TranslateString(999, 'Banana ')}
              </StyledText4>
              <StyledText2 fontFamily="poppins" color="primary" pr="3px">
                {TranslateString(999, 'Earned')}
              </StyledText2>
            </Flex>
            <StyledText3>{displayBalance}</StyledText3>
          </StyledFlexEarned>
          <ButtonContainer>
            {!account ? <UnlockButton /> : <HarvestAction earnings={earnings} pid={pid} />}
            <ExpandableSectionButton onClick={onClick} expanded={showExpandableSection} />
          </ButtonContainer>
        </LabelContainer2>
      </StyledFlexContainer>
    </Flex>
  )
}

export default CardHeading
