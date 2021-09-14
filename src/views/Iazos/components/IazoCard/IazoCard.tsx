import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

const IazoCardWrapper = styled.div`
  position: relative;
  height: 286px;
  width: 796px;
  border-radius: 10px;
  margin-top: 12.5px;
  margin-bottom: 12.5px;
  background: #333333;
  cursor: pointer;
`

const CardMonkey = styled.div`
  position: absolute;
  height: 286px;
  width: 796px;
  overflow: hidden;
  background: url(images/card-ape.svg) no-repeat 425px 110px;
  opacity: 0.2;
`

const CardWrapperTemplate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 35px;
  padding-right: 35px;
`

const HeadingWrapper = styled(CardWrapperTemplate)`
  height: 110px;
  width: 796px;
  border-radius: 10px 10px 0px 0px;
  background: #414141;
`

const TopBodyWrapper = styled(CardWrapperTemplate)`
  width: 796px;
  height: 80px;
`

const BottomBodyWrapper = styled(CardWrapperTemplate)`
  width: 796px;
  height: 96px;
  flex-direction: column;
  justify-content: center;
  border-radius: 0px 0px 10px 10px;
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
  height: 100%;
  justify-content: ${(props) => props.justify || 'center'};
  align-items: ${(props) => props.align || 'center'};
  padding-bottom: ${(props) => props.padding};
`

const TokenImage = styled.img`
  border-radius: 50%;
  width: 35px;
  height: 35px;
`

const TokenName = styled(Text)`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  padding-left: 15px;
`

const BoldAfterText = styled(Text)<{ boldContent?: string }>`
  &:after {
    color: #ffffff;
    font-weight: 700;
    content: '${(props) => props.boldContent}';
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

const IazoCard: React.FC = () => {
  return (
    <IazoCardWrapper>
      <CardMonkey />
      <HeadingWrapper>
        <TokenHeaderInformationWrapper>
          <TokenImage src="images/tokens/BANANA.svg" />
          <TokenName> Banana </TokenName>
        </TokenHeaderInformationWrapper>
        <TextBoxWrapper>
          <BoldAfterText boldContent="2:12:34:05">Starts in </BoldAfterText>
          <BoldAfterText>Duration 5d</BoldAfterText>
        </TextBoxWrapper>
      </HeadingWrapper>
      <TopBodyWrapper>
        <TextBoxWrapper align="flex-start">
          <BoldAfterText boldContent="BNB/BANANA" />
          <BoldAfterText boldContent="70%">Liquidity Lock: </BoldAfterText>
        </TextBoxWrapper>
        <TextBoxWrapper justify="flex-end" padding="15px">
          <BoldAfterText boldContent=" 20 BNB">Max Spend</BoldAfterText>
        </TextBoxWrapper>
        <TextBoxWrapper align="flex-end">
          <BoldAfterText>11 Months Lock</BoldAfterText>
          <BoldAfterText boldContent="50 BNB">Soft Cap: </BoldAfterText>
        </TextBoxWrapper>
      </TopBodyWrapper>
      <BottomBodyWrapper>
        <ProgressBar>
          <Progress percentComplete={`${(169 / 500) * 100}%`} />
        </ProgressBar>
        <BoldAfterText boldContent="169/500 BNB" />
      </BottomBodyWrapper>
    </IazoCardWrapper>
  )
}

export default IazoCard
