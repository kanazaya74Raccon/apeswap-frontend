import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

export const PageWrapper = styled.div`
  display: none;
  display: flex;
  padding-bottom: 200px;
  margin-bottom: 100px;
  justify-content: center;
`

export const LaunchPadWrapper = styled.div`
  border-radius: 20px;
  margin-top: 50px;
  background: ${(props) => (props.theme.isDark ? '#222222' : 'rgba(255, 255, 255, 1)')};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`

export const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  font-size: 30px;
  font-style: normal;
  line-height: 52px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 45px;
    margin-bottom: 20px;
  }
`
export const StyledText = styled(Text)`
  font-family: Poppins;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`

export const WarningWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  left: 411px;
  top: 502px;
  background-color: rgba(223, 65, 65, 0.1);
  border-radius: 10px;
  margin-top: 20px;
  z-index: 0;
  padding: 25px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
    padding: 50px;
  }
`

export const BeforeSaleWrapper = styled.div`
  background: ${(props) => (props.theme.isDark ? ' rgba(51, 51, 51, 1)' : 'rgba(240, 240, 240, 1)')};
  border-radius: 10px;
  width: 300px;
  margin-top: 40px;
  margin-bottom: 40px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

export const SpinnerHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-left: 20px;
`

export const IazoCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 110px;
  width: 300px;
  border-radius: 10px;
  margin-bottom: 12.5px;
  background: ${(props) => (props.theme.isDark ? ' rgba(65, 65, 65, 1)' : 'rgba(161, 101, 82, 1)')};
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`
export const CardMonkey = styled.div`
  position: absolute;
  height: 110px;
  width: 300px;
  overflow: hidden;
  background: url(images/card-ape.svg) no-repeat 425px 0px;
  opacity: 0.2;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

export const TokenHeaderInformationWrapper = styled.div`
  display: flex;
  height: 65%;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-left: 20px;
`

export const TokenImage = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-left: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 71px;
    height: 71px;
    margin-left: 25px;
  }
`

export const TokenName = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  font-size: 19px;
  padding-left: 2px;
  align-self: flex-start;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 24px;
  }
`

export const TokenButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 330px;
  }
`

export const TokenInfoButton = styled.div<{ opacity: string }>`
  display: flex;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  height: 27px;
  border-radius: 5px;
  font-size: 9px;
  cursor: pointer;
  background-color: rgba(255, 179, 0, ${(props) => props.opacity});
  color: white;
  z-index: 1;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
    padding-left: 15px;
    padding-right: 15px;
  }
`
