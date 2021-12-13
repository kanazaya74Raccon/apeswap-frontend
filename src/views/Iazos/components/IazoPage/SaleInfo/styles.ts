import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

export const AboutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.text};
  font-family: Poppins;
  line-height: 25px;
  font-weight: 500;
  font-size: 14px;
  width: 300px;
  background: ${(props) => (props.theme.isDark ? ' rgba(51, 51, 51, 1)' : 'rgba(240, 240, 240, 1)')};
  border-radius: 0px 0px 10px 10px;
  padding: 40px 10px 40px 10px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
    padding: 80px 60px 80px 60px;
    font-size: 16px;
  }
`

export const SaleInfoWrapper = styled.div`
  display: flex;
  height: 60px;
  width: 300px;
  margin-top: 25px;
  background: ${(props) => (props.theme.isDark ? ' rgba(51, 51, 51, 1)' : 'rgba(240, 240, 240, 1)')};
  border-radius: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

export const Tab = styled.div<{ active: boolean; borderRadius?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  font-family: Poppins;
  height: 60px;
  font-size: 20px;
  color: white;
  cursor: pointer;
  border-bottom: ${(props) => props.active && '2.5px solid rgba(255, 179, 0, 1)'};
  background-color: ${(props) => (props.theme.isDark ? 'rgba(65, 65, 65, 1)' : 'rgba(161, 101, 82, 1)')};
  border-radius: ${(props) => props.borderRadius};
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 24px;
  }
`

export const InfoWrapper = styled.div`
  display: flex;
  width: 300px;
  margin-bottom: 20px;
  background: ${(props) => (props.theme.isDark ? ' rgba(51, 51, 51, 1)' : 'rgba(240, 240, 240, 1)')};
  border-radius: 0px 0px 10px 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

export const InfoFooterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  margin-bottom: 60px;
  border-radius: 10px;
  justify-content: space-between;
  padding-right: 15px;
  padding-left: 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
    padding-right: 50px;
    padding-left: 50px;
    justify-content: space-between;
  }
`
export const StyledText = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 45px;
  }
`
