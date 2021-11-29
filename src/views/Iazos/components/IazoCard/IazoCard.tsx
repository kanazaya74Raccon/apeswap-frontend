import React from 'react'
import styled from 'styled-components'
import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import { Iazo } from 'state/types'
import getTimePeriods from 'utils/getTimePeriods'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import Timer from './Timer'
import Badges from './Badges'

interface iazoCardProps {
  iazo: Iazo
}

const IazoCardWrapper = styled.div`
  position: relative;
  height: 286px;
  width: 320px;
  border-radius: 10px;
  margin-top: 12.5px;
  margin-bottom: 12.5px;
  background: ${(props) => (props.theme.isDark ? '#333333' : 'rgba(240, 240, 240, 1)')};
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

const CardMonkey = styled.div`
  position: absolute;
  height: 286px;
  width: 320px;
  overflow: hidden;
  background: ${(props) =>
    props.theme.isDark
      ? 'url(images/card-ape.svg) no-repeat 425px 110px'
      : 'url(images/card-ape-light.svg) no-repeat 425px 110px'};
  opacity: 0.2;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

const CardWrapperTemplate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 35px;
    padding-right: 35px;
  }
`

const HeadingWrapper = styled(CardWrapperTemplate)`
  height: 110px;
  width: 320px;
  border-radius: 10px 10px 0px 0px;
  background: ${(props) => (props.theme.isDark ? '#414141' : 'rgba(161, 101, 82, 1)')};
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

const TopBodyWrapper = styled(CardWrapperTemplate)`
  width: 320px;
  height: 80px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

const BottomBodyWrapper = styled(CardWrapperTemplate)`
  width: 320px;
  height: 96px;
  flex-direction: column;
  justify-content: center;
  border-radius: 0px 0px 10px 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

const TokenHeaderInformationWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const TextBoxWrapper = styled.div<{ align?: string; justify?: string; padding?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justify || 'center'};
  align-items: ${(props) => props.align || 'center'};
  padding-bottom: ${(props) => props.padding};
  ${({ theme }) => theme.mediaQueries.md} {
    height: 100%;
  }
`

const TokenImage = styled.img`
  border-radius: 50%;
  width: 55px;
  height: 55px;
  margin-left: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 35px;
    height: 35px;
    margin-left: 0px;
  }
`

const TokenName = styled(Text)`
  font-size: 15px;
  padding-left: 15px;
  font-family: Poppins;
  font-weight: 700;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 24px;
  }
`

const BoldAfterText = styled(Text)<{ boldContent?: string }>`
  font-family: poppins;
  font-weight: 400;
  font-size: 10px;
  &:after {
    font-weight: 700;
    content: '${(props) => props.boldContent}';
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`

const ProgressBar = styled.div`
  height: 8px;
  width: 100%;
  border-radius: 20px;
  background: #c4c4c4;
  margin-bottom: 15px;
`

const Progress = styled(ProgressBar)<{ percentComplete: string }>`
  width: ${(props) => props.percentComplete};
  background: linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%);
`

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
  console.log(iazo)
  const { tokenImage } = socialInfo
  const { activeTime, lockPeriod } = timeInfo
  const maxSpend = getBalanceNumber(new BigNumber(maxSpendPerBuyer), parseInt(baseToken.decimals)).toString()
  const totalRaiseFormated = getBalanceNumber(new BigNumber(status.totalBaseCollected), parseInt(baseToken.decimals))
  const softcapFormated = getBalanceNumber(new BigNumber(softcap), parseInt(baseToken.decimals))
  const percentRaised = (totalRaiseFormated / parseFloat(hardcap)) * 100
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
        <BoldAfterText boldContent={`${totalRaiseFormated} / ${hardcap} ${baseToken.symbol}`} />
      </BottomBodyWrapper>
    </IazoCardWrapper>
  )
}

export default IazoCard
