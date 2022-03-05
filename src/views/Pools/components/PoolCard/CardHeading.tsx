import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Flex, Heading, Skeleton, Text, Image } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { Pool } from 'state/types'
import UnlockButtonSquare from 'components/UnlockButtonSquare'
import { useNetworkChainId } from 'state/hooks'
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

const StyledBackground = styled.div`
  width: 120px;
  height: 80px;
  background: rgb(255, 179, 0, 0.4);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 120px;
    width: 200px;
  }
`

const StyledHeading = styled(Heading)`
  font-size: 12px;
  font-weight: 800;
  ${({ theme }) => theme.mediaQueries.xs} {
    text-align: start;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 22px;
  }
`

const StyledText1 = styled(Text)`
  font-weight: 600;
  font-size: 12px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 15px;
  }
`

const StyledText2 = styled(Text)`
  font-weight: 600;
  font-size: 12px;
  margin-top: 1px;
`

const StyledText3 = styled(Text)`
  font-size: 12px;
  color: #38a611;
  font-weight: 800;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 25px;
    line-height: 29px;
  }
`

const StyledText4 = styled(Text)`
  font-size: 12px;
  font-weight: 600;
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
    margin-left: 15px;
    margin-right: 15px;
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
  margin-right: 5px;

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
  font-weight: 800;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
    line-height: 23px;
  }
`

const ButtonContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: flex-end;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 150px;
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

const IconArrow = styled(Image)`
  align: center;
  width: 5px;
  height: 5px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 10px;
    height: 10px;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const StyledUnlockButton = styled(UnlockButtonSquare)`
  font-weight: 600;
  font-size: 11.5px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  pool,
  apr,
  stakeToken,
  earnToken,
  poolAPR,
  removed,
  sousId,
  earnTokenImage,
  showExpandableSection,
  rewardTokenPrice,
}) => {
  const { t } = useTranslation()
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
      return <StyledUnlockButton size="sm" />
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
          width={70}
          height={70}
          marginLeft="7.5px"
        />
        <IconArrow src="/images/arrow.svg" alt="arrow" width={10} height={10} />
        <IconImage
          src={`/images/tokens/${earnTokenImage || `${earnToken}.svg`}`}
          alt={earnToken}
          width={70}
          height={70}
          marginRight="7.5px"
        />
      </StyledBackground>
      <StyledFlexContainer>
        <LabelContainer>
          <StyledHeading>{earnToken}</StyledHeading>
          {!removed && !pool?.forAdmins && (
            <Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <StyledText1>APR:</StyledText1>
              {apr ? (
                <FlexSwitch className="noClick">
                  <ApyButton
                    lpLabel={stakeToken}
                    rewardTokenName={earnToken}
                    addLiquidityUrl="https://apeswap.finance/swap"
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
            <StyledText4 color="primary" pr="3px">
              {t(`${earnToken}`)}
            </StyledText4>
            <StyledText2 color="primary" pr="3px">
              {t('Earned')}
            </StyledText2>
            <StyledText3>{displayBalance}</StyledText3>
          </StyledFlexEarnedSmall>
        </LabelContainer>
        <LabelContainer2>
          <StyledFlexEarned>
            <Flex>
              <StyledText4 color="primary" pr="3px">
                {t(`${earnToken}`)}
              </StyledText4>
              <StyledText2 color="primary" pr="3px">
                {t('Earned')}
              </StyledText2>
            </Flex>
            <StyledText3>{displayBalance}</StyledText3>
          </StyledFlexEarned>
          <ButtonContainer>
            {cardHeaderButton()}
            <ExpandableSectionButton expanded={showExpandableSection} />
          </ButtonContainer>
        </LabelContainer2>
      </StyledFlexContainer>
    </Container>
  )
}

export default CardHeading
