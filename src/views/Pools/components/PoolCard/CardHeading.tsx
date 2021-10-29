import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { useWeb3React } from '@web3-react/core'
import { Pool } from 'state/types'
import { useNetworkChainId } from 'state/hooks'
import { Flex, Heading, Skeleton, Text, Image } from '@apeswapfinance/uikit'
import UnlockButton from 'components/UnlockButton'
import { getBalanceNumber } from 'utils/formatBalance'
import ApyButton from '../../../../components/ApyCalculator/ApyButton'
import ExpandableSectionButton from './ExpandableSectionButton'
import HarvestActions from './CardActions/HarvestActions'
import ApprovalAction from './CardActions/ApprovalAction'
import StakeAction from './CardActions/StakeActions'

export interface ExpandableSectionProps {
  lpLabel?: string
  apr?: BigNumber
  pool?: Pool
  stakeToken?: string
  earnToken?: string
  tokenSymbol?: string
  addLiquidityUrl?: string
  bananaPrice?: BigNumber
  poolAPR?: string
  removed?: boolean
  sousId?: number
  lpSymbol?: string
  earnTokenImage?: string
  showExpandableSection?: boolean
  stakingTokenAddress?: string
  rewardTokenPrice?: number
}

const PoolFinishedSash = styled.div`
  @media (max-width: 1000px) {
    background-image: url('/images/gnanaSash.svg');
    background-position: top right;
    background-repeat: no-repeat;
    height: 35px;
    position: absolute;
    right: -3px;
    top: -1.5px;
    width: 45px;
  }
`

const StyledBackground = styled.div`
  width: 250px;
  height: 80px;
  background: rgb(255, 179, 0, 0.4);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
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
  margin-right: 8px;
  align-items: center;
  flex: 1;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-right: 5px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 5px;
    margin-right: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
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
  width: 110px;
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
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
    line-height: 23px;
  }
`

const ButtonContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: flex-end;
`

const IconImage = styled(Image)`
  align: center;
  width: 50px;
  height: 50px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 57px;
    height: 57px;
  }
`

const StyledArrow = styled.img`
  align-self: center;
  display: flex;
  width: 12px;
  height: 12px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 24px;
    height: 24px;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  pool,
  apr,
  stakeToken,
  earnToken,
  tokenSymbol,
  poolAPR,
  removed,
  sousId,
  earnTokenImage,
  showExpandableSection,
  rewardTokenPrice,
}) => {
  const TranslateString = useI18n()
  const { userData, tokenDecimals, stakingToken } = pool
  const chainId = useNetworkChainId()
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const earnings = new BigNumber(pool.userData?.pendingReward || 0)
  const allowance = new BigNumber(userData?.allowance || 0)
  const rawEarningsBalance = getBalanceNumber(earnings, tokenDecimals)
  const displayBalance = rawEarningsBalance ? rawEarningsBalance.toLocaleString() : '?'
  const isLoading = !pool.userData
  const needsApproval = !allowance.gt(0)
  const isCompound = sousId === 0
  const { account } = useWeb3React()

  const cardHeaderButton = () => {
    if (!account) {
      return <UnlockButton padding="8px" />
    }
    if (needsApproval) {
      return (
        <ApprovalAction
          stakingTokenContractAddress={stakingToken.address[chainId]}
          sousId={sousId}
          isLoading={isLoading}
        />
      )
    }
    if (!needsApproval && !accountHasStakedBalance && !pool.emergencyWithdraw) {
      return (
        <StakeAction
          pool={pool}
          stakingTokenBalance={stakingTokenBalance}
          stakedBalance={stakedBalance}
          isStaked={accountHasStakedBalance}
          firstStake={!accountHasStakedBalance}
        />
      )
    }
    return (
      <HarvestActions
        earnings={earnings}
        sousId={sousId}
        isLoading={isLoading}
        tokenDecimals={pool.tokenDecimals}
        compound={isCompound}
        emergencyWithdraw={pool.emergencyWithdraw}
      />
    )
  }

  return (
    <Container>
      <StyledBackground>
        <IconImage
          src={`/images/tokens/${stakeToken}.svg`}
          alt={stakeToken}
          width={40}
          height={40}
          marginLeft="7.5px"
        />
        <IconImage src="/images/arrow.svg" alt="arrow" width={5} height={5} />
        <IconImage
          src={`/images/tokens/${earnTokenImage || `${earnToken}.svg`}`}
          alt={earnToken}
          width={40}
          height={40}
          marginRight="7.5px"
        />
      </StyledBackground>
      <StyledFlexContainer>
        <LabelContainer>
          <StyledHeading>{earnToken}</StyledHeading>
          {!removed && !pool?.forAdmins && (
            <Text bold style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <StyledText1 fontFamily="poppins">APR:</StyledText1>
              {apr ? (
                <FlexSwitch>
                  <ApyButton
                    lpLabel={stakeToken}
                    rewardTokenName={earnToken}
                    addLiquidityUrl="https://app.apeswap.finance/swap"
                    rewardTokenPrice={new BigNumber(rewardTokenPrice)}
                    apy={apr.div(100)}
                  />
                  <StyledAPRText>{poolAPR}%</StyledAPRText>
                </FlexSwitch>
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </Text>
          )}
          <StyledFlexEarnedSmall>
            <StyledText4 fontFamily="poppins" color="primary" pr="3px">
              {TranslateString(999, `${earnToken}`)}
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
                {TranslateString(999, `${earnToken}`)}
              </StyledText4>
              <StyledText2 fontFamily="poppins" color="primary" pr="3px">
                {TranslateString(999, 'Earned')}
              </StyledText2>
            </Flex>
            <StyledText3>{displayBalance}</StyledText3>
          </StyledFlexEarned>
          <ButtonContainer>
            {cardHeaderButton()}
            <ExpandableSectionButton expanded={showExpandableSection} />
          </ButtonContainer>
        </LabelContainer2>
        {stakeToken === 'GNANA' && <PoolFinishedSash />}
      </StyledFlexContainer>
    </Container>
  )
}

export default CardHeading
