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
  z-index: 1;
`
export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 60px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const SettingsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 60px;
    margin-top: 40px;
  }
`

export const IlosWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 360px;
  margin-top: 35px;
  margin-bottom: 35px;
  align-items: center;
  justify-content: center;
`

export const TopNavWrapper = styled.div`
  position: relative;
  height: 0px;
  width: 320px;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  z-index: 0;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 856px;
  }
`

export const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-size: 30px;
  font-style: normal;
  line-height: 52px;
  text-align: center;
  width: 100%;
  font-weight: 700;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 45px;
  }
`

export const StyledButton = styled.button`
  width: 195px;
  height: 46px;
  color: #ffffff;
  background-color: #ffb300;
  border-radius: 10px;
  font-size: 18px;
  margin-top: 20px;
  border: none;
  cursor: pointer;
  font-family: Poppins;
  font-weight: 700;
`
export const PresaleText = styled(Text)`
  font-family: Poppins;
  font-size: 20px;
  line-height: 30px;
`

export const SpinnerHolder = styled.div`
  margin-top: 90px;
  margin-left: 50px;
`
