import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

export const IazoCardWrapper = styled.div`
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

export const CardMonkey = styled.div`
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

export const HeadingWrapper = styled(CardWrapperTemplate)`
  height: 110px;
  width: 320px;
  border-radius: 10px 10px 0px 0px;
  background: ${(props) => (props.theme.isDark ? '#414141' : 'rgba(161, 101, 82, 1)')};
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

export const TopBodyWrapper = styled(CardWrapperTemplate)`
  width: 320px;
  height: 80px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

export const BottomBodyWrapper = styled(CardWrapperTemplate)`
  width: 320px;
  height: 96px;
  flex-direction: column;
  justify-content: center;
  border-radius: 0px 0px 10px 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

export const TokenHeaderInformationWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const TextBoxWrapper = styled.div<{ align?: string; justify?: string; padding?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justify || 'center'};
  align-items: ${(props) => props.align || 'center'};
  padding-bottom: ${(props) => props.padding};
  ${({ theme }) => theme.mediaQueries.md} {
    height: 100%;
  }
`

export const TokenImage = styled.img`
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

export const TokenName = styled(Text)`
  font-size: 15px;
  padding-left: 15px;
  font-family: Poppins;
  font-weight: 700;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 24px;
  }
`

export const ProgressBar = styled.div`
  height: 8px;
  width: 100%;
  border-radius: 20px;
  background: #c4c4c4;
  margin-bottom: 15px;
`

export const Progress = styled(ProgressBar)<{ percentComplete: string }>`
  width: ${(props) => props.percentComplete};
  background: linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%);
`
