import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { useWeb3React } from '@web3-react/core'
import { Vault } from 'state/types'
import { Flex, Heading, Skeleton, Text, Image, useMatchBreakpoints } from '@apeswapfinance/uikit'
import Tooltip from 'components/Tooltip/Tooltip'
import UnlockButton from 'components/UnlockButton'
import { getBalanceNumber } from 'utils/formatBalance'
import ExpandableSectionButton from './ExpandableSectionButton'
import ApprovalAction from './CardActions/ApprovalAction'
import StakeAction from './CardActions/StakeActions'

export interface ExpandableSectionProps {
  lpLabel?: string
  apyDaily?: string
  vault?: Vault
  stakeToken?: string
  earnToken?: string
  tokenSymbol?: string
  addLiquidityUrl?: string
  bananaPrice?: BigNumber
  apyYearly?: string
  removed?: boolean
  sousId?: number
  lpSymbol?: string
  earnTokenImage?: string
  showExpandableSection?: boolean
  stakingTokenAddress?: string
  rewardTokenPrice?: number
  image?: string
}

const StyledBackground = styled.div`
  width: 110px;
  height: 80px;
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
    font-size: 21px;
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
  font-family: 'Titan One';

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 25px;
    line-height: 29px;
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
  font-family: 'Titan One';

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
    width: 100%;
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
    width: 40px;
    height: 40px;
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
const TitleContainer = styled.div`
  display: flex;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  vault,
  apyDaily,
  apyYearly,
  removed,
  showExpandableSection,
  stakingTokenAddress,
  image,
}) => {
  const TranslateString = useI18n()
  const { userData, isPair, token0, token1, pid, burning } = vault
  const stakingTokenBalance = new BigNumber(userData?.tokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const allowance = new BigNumber(userData?.allowance || 0)
  const isLoading = !vault?.userData
  const needsApproval = !allowance.gt(0)
  const lpLabel = vault.isPair ? `${vault?.token1?.symbol}-${vault?.token0?.symbol}` : vault?.token0?.symbol
  const { isXl } = useMatchBreakpoints()
  const isDesktop = isXl
  const { account } = useWeb3React()

  const cardHeaderButton = () => {
    if (!account) {
      return <UnlockButton padding="8px" />
    }
    if (needsApproval) {
      return <ApprovalAction stakingContractAddress={stakingTokenAddress} pid={pid} isLoading={isLoading} />
    }
    if (!needsApproval && !accountHasStakedBalance) {
      return (
        <StakeAction
          vault={vault}
          stakingTokenBalance={stakingTokenBalance}
          stakedBalance={stakedBalance}
          isStaked={accountHasStakedBalance}
          firstStake={!accountHasStakedBalance}
          isApproved={!needsApproval}
          isHeader
        />
      )
    }
    if (!needsApproval && accountHasStakedBalance) {
      return (
        <StakeAction
          vault={vault}
          stakingTokenBalance={stakingTokenBalance}
          stakedBalance={stakedBalance}
          isStaked={accountHasStakedBalance}
          firstStake={!accountHasStakedBalance}
          isApproved={!needsApproval}
          isHeader
        />
      )
    }
    return <></>
  }

  return (
    <Flex>
      <StyledBackground>
        {isPair ? (
          <>
            <IconImage
              src={`/images/tokens/${image || `${token1?.symbol}.svg`}`}
              alt={token1?.symbol}
              width={60}
              height={60}
              marginLeft="7.5px"
            />
            <IconQuoteToken
              src={`/images/tokens/${token0?.symbol}.svg`}
              alt={token0?.symbol}
              width={35}
              height={35}
              marginLeft={isDesktop ? '-20px' : '-13px'}
              marginTop={isDesktop ? '45px' : '30px'}
            />
            <IconArrow src="/images/arrow.svg" alt="arrow" width={10} height={10} marginRight="8px" marginLeft="8px" />
            <IconImage
              src={`/images/tokens/${image || `${token1?.symbol}.svg`}`}
              alt={token1?.symbol}
              width={60}
              height={60}
            />
            <IconQuoteToken
              src={`/images/tokens/${token0?.symbol}.svg`}
              alt={token0?.symbol}
              width={35}
              height={35}
              marginLeft={isDesktop ? '-20px' : '-13px'}
              marginTop={isDesktop ? '45px' : '30px'}
              marginRight={7.5}
            />
          </>
        ) : (
          <>
            <IconImage
              src={`/images/tokens/${image || `${token0?.symbol}.svg`}`}
              alt={token0?.symbol}
              width={60}
              height={60}
              marginLeft="7.5px"
            />
            <IconArrow src="/images/arrow.svg" alt="arrow" width={10} height={10} marginLeft="10px" marginRight="8px" />
            <IconImage
              src={`/images/tokens/${image || `${token0?.symbol}.svg`}`}
              alt={token0?.symbol}
              width={60}
              height={60}
              marginRight="10px"
            />
          </>
        )}
      </StyledBackground>
      <StyledFlexContainer>
        <LabelContainer>
          <TitleContainer>
            <StyledHeading fontSize="20px" fontFamily="Titan One">
              {lpLabel}
            </StyledHeading>
            {burning && <Tooltip content="Burns at least 50% of every harvest in the form of $BANANA">🔥</Tooltip>}
          </TitleContainer>
          {!removed && (
            <Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <StyledText1>APY:</StyledText1>
              {apyDaily ? (
                <FlexSwitch>
                  <StyledAPRText>{apyYearly}%</StyledAPRText>
                </FlexSwitch>
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </Text>
          )}
        </LabelContainer>
        <LabelContainer2>
          <StyledFlexEarned>
            <Flex>
              <StyledText2 color="primary" pr="3px">
                {TranslateString(999, 'Staked')}
              </StyledText2>
            </Flex>
            <StyledText3>
              {new BigNumber(vault?.userData?.stakedBalance).gt(0)
                ? getBalanceNumber(new BigNumber(vault?.userData?.stakedBalance)).toFixed(4)
                : '?'}
            </StyledText3>
          </StyledFlexEarned>
          <ButtonContainer>
            {cardHeaderButton()}
            <ExpandableSectionButton expanded={showExpandableSection} />
          </ButtonContainer>
        </LabelContainer2>
      </StyledFlexContainer>
    </Flex>
  )
}

export default CardHeading
