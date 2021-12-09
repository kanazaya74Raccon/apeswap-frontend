import React from 'react'
import { useMatchBreakpoints } from '@apeswapfinance/uikit'
import { Iazo } from 'state/types'
import getTimePeriods from 'utils/getTimePeriods'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { BoldAfterText } from '../styles'
import Timer from './Timer'
import Badges from './Badges'
import {
  IazoCardWrapper,
  CardMonkey,
  HeadingWrapper,
  TopBodyWrapper,
  BottomBodyWrapper,
  TokenHeaderInformationWrapper,
  TextBoxWrapper,
  TokenImage,
  TokenName,
  ProgressBar,
  Progress,
} from './styles'

interface iazoCardProps {
  iazo: Iazo
}

const IazoCard: React.FC<iazoCardProps> = ({ iazo }) => {
  const {
    maxSpendPerBuyer,
    baseToken,
    iazoToken,
    timeInfo,
    status,
    hardcap,
    softcap,
    liquidityPercent,
    socialInfo,
    iazoTags,
  } = iazo
  const { tokenImage } = socialInfo
  const { activeTime, lockPeriod } = timeInfo
  const maxSpend = getBalanceNumber(new BigNumber(maxSpendPerBuyer), parseInt(baseToken.decimals)).toString()
  const totalRaiseFormated = getBalanceNumber(new BigNumber(status.totalBaseCollected), parseInt(baseToken.decimals))
  const softcapFormated = getBalanceNumber(new BigNumber(softcap), parseInt(baseToken.decimals))
  const hardcapFormatted = getBalanceNumber(new BigNumber(hardcap), parseInt(baseToken.decimals))
  const percentRaised = (totalRaiseFormated / hardcapFormatted) * 100
  const liqudiityLock = parseInt(liquidityPercent) / 10
  const duration = getTimePeriods(parseInt(activeTime), true)
  const lockTime = getTimePeriods(parseInt(lockPeriod), true)
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs

  return (
    <IazoCardWrapper>
      <CardMonkey />
      <HeadingWrapper>
        <TokenHeaderInformationWrapper>
          <TokenImage src={tokenImage} />
          {!isMobile && <TokenName color="white"> {iazoToken.name}</TokenName>}
          <Badges badges={iazoTags} />
        </TokenHeaderInformationWrapper>
        <TextBoxWrapper align="flex-end">
          {isMobile && <TokenName color="white"> {iazoToken.name}</TokenName>}
          <Timer timeInfo={timeInfo} fontSize={isMobile ? '12px' : '16px'} fontColor="white" />
          <BoldAfterText color="white">
            Duration {duration.days}d, {duration.hours}h
          </BoldAfterText>
        </TextBoxWrapper>
      </HeadingWrapper>
      <TopBodyWrapper>
        <TextBoxWrapper align="flex-start">
          <BoldAfterText boldContent={`${baseToken.symbol} / ${iazoToken.symbol}`} />
          <BoldAfterText boldContent={`${liqudiityLock}%`}>Liquidity Lock: </BoldAfterText>
        </TextBoxWrapper>
        {!isMobile && (
          <TextBoxWrapper justify="flex-end" padding="15px">
            <BoldAfterText boldContent={`${maxSpend} ${baseToken.symbol}`}>Max Spend </BoldAfterText>
          </TextBoxWrapper>
        )}
        <TextBoxWrapper align="flex-end">
          <BoldAfterText>{lockTime.days} Days Lock</BoldAfterText>
          <BoldAfterText boldContent={`${softcapFormated} ${baseToken.symbol}`}>Soft Cap: </BoldAfterText>
        </TextBoxWrapper>
      </TopBodyWrapper>
      <BottomBodyWrapper>
        {isMobile && (
          <TextBoxWrapper justify="flex-end" padding="5px">
            <BoldAfterText boldContent={`${maxSpend} ${baseToken.symbol}`}>Max Spend </BoldAfterText>
          </TextBoxWrapper>
        )}
        <ProgressBar>
          <Progress percentComplete={`${percentRaised}%`} />
        </ProgressBar>
        <BoldAfterText boldContent={`${totalRaiseFormated} / ${hardcapFormatted} ${baseToken.symbol}`} />
      </BottomBodyWrapper>
    </IazoCardWrapper>
  )
}

export default IazoCard
