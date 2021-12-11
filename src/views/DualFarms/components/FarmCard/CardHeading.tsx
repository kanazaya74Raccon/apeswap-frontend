import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Flex, Heading, Skeleton, Text, Image, useMatchBreakpoints } from '@apeswapfinance/uikit'
import UnlockButton from 'components/UnlockButton'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
import { DualFarm } from 'state/types'
import { Token } from 'config/constants/types'

import HarvestAction from './HarvestAction'
import ApyButton from '../../../../components/ApyCalculator/ApyButton'
import ExpandableSectionButton from './ExpandableSectionButton'

export interface ExpandableSectionProps {
  lpLabel?: string
  apr?: BigNumber
  farmImage?: string
  tokenSymbol?: string
  stakeTokens?: { token0: Token; token1?: Token }
  rewardTokens?: { token0: Token; token1?: Token }
  addLiquidityUrl?: string
  bananaPrice?: BigNumber
  farmAPR: string
  removed: boolean
  hideButton?: boolean
  pid?: number
  lpSymbol: string
  showExpandableSection?: boolean
  farm?: DualFarm
}

const StyledBackground = styled.div`
  width: 120px;
  height: 90px;
  background: rgb(255, 179, 0, 0.4);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 120px;
    width: 180px;
  }
`
const StyledHeading = styled(Heading)`
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.xs} {
    text-align: start;
  }

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
  font-weight: 200;
  font-family: 'Titan One';

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 25px;
    line-height: 29px;
    font-weight: 200;
  }
`

const StyledFlexContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 6px;
  margin-right: 8px;
  align-items: center;
  flex: 1;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-right: 15px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
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
  margin-right: 10px;

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
  width: 100%;
  justify-content: flex-end;

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
  font-family: 'Titan One';

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
    line-height: 23px;
  }
`
const IconImage = styled(Image)`
  align: center;
  width: 40px;
  height: 40px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 70px;
    height: 70px;
  }
`

const IconQuoteToken = styled(Image)`
  align: center;
  width: 20px;
  height: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 35px;
    height: 35px;
  }
`

const IconRewardToken = styled(Image)`
  align: center;
  width: 25px;
  height: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 35px;
    height: 35px;
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

const ButtonContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: flex-end;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
  }
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  apr,
  addLiquidityUrl,
  stakeTokens,
  rewardTokens,
  bananaPrice,
  farmAPR,
  removed,
  showExpandableSection,
  hideButton = true,
  farm,
}) => {
  const TranslateString = useI18n()

  const miniChefRewardTokens = getBalanceNumber(farm?.userData?.miniChefEarnings, farm?.rewardTokens?.token0?.decimals)
  const rewarderTokens = getBalanceNumber(farm?.userData?.rewarderEarnings, farm?.rewardTokens?.token1?.decimals)
  const dollarsEarned = miniChefRewardTokens * farm?.rewardToken0Price + rewarderTokens * farm?.rewardToken1Price

  const displayBalance = dollarsEarned ? `$${dollarsEarned.toFixed(2)}` : '?'

  const { isXl: isDesktop } = useMatchBreakpoints()

  const { account } = useWeb3React()

  return (
    <Flex>
      <StyledBackground>
        <IconImage
          src={`/images/tokens/${stakeTokens?.token1?.symbol}.svg`}
          alt={stakeTokens?.token1?.symbol}
          width={60}
          height={60}
          marginLeft="7.5px"
        />
        <IconQuoteToken
          src={`/images/tokens/${stakeTokens?.token0?.symbol}.svg`}
          alt={stakeTokens?.token0?.symbol}
          width={35}
          height={35}
          marginLeft={isDesktop ? '-20px' : '-13px'}
          marginTop={isDesktop ? '45px' : '30px'}
        />
        <IconArrow src="/images/arrow.svg" alt="arrow" width={10} height={10} marginRight="8px" marginLeft="8px" />
        <IconRewardToken
          src={`/images/tokens/${rewardTokens?.token0?.symbol}.svg`}
          alt={rewardTokens?.token1?.symbol}
          width={35}
          height={35}
          marginBottom={isDesktop ? '30px' : '25px'}
          marginRight="-5px"
        />
        <IconRewardToken
          src={`/images/tokens/${rewardTokens?.token1?.symbol}.svg`}
          alt={rewardTokens?.token1?.symbol}
          width={35}
          height={35}
          marginTop={isDesktop ? '30px' : '25px'}
          marginRight="7.5px"
        />
      </StyledBackground>
      <StyledFlexContainer>
        <LabelContainer>
          <StyledHeading fontFamily="Titan One">{lpLabel}</StyledHeading>
          {!removed && (
            <Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <StyledText1>APR:</StyledText1>
              {apr ? (
                <FlexSwitch>
                  {!hideButton && (
                    <ApyButton
                      lpLabel={lpLabel}
                      rewardTokenName="BANANA"
                      addLiquidityUrl={addLiquidityUrl}
                      rewardTokenPrice={bananaPrice}
                      apy={apr}
                    />
                  )}
                  <StyledAPRText>{farmAPR}%</StyledAPRText>
                </FlexSwitch>
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </Text>
          )}
          <StyledFlexEarnedSmall>
            <StyledText2 color="primary" pr="3px">
              {TranslateString(999, 'Earned')}
            </StyledText2>
            <StyledText3>{displayBalance}</StyledText3>
          </StyledFlexEarnedSmall>
        </LabelContainer>
        <LabelContainer2>
          <StyledFlexEarned>
            <Flex>
              <StyledText2 color="primary" pr="3px">
                {TranslateString(999, 'Earned')}
              </StyledText2>
            </Flex>
            <StyledText3>{displayBalance}</StyledText3>
          </StyledFlexEarned>
          <ButtonContainer>
            {!account ? <UnlockButton padding="8px" /> : <HarvestAction dualFarm={farm} />}
            <ExpandableSectionButton expanded={showExpandableSection} />
          </ButtonContainer>
        </LabelContainer2>
      </StyledFlexContainer>
    </Flex>
  )
}

export default CardHeading
