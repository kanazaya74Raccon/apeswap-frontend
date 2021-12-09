import styled from 'styled-components'
import { Text, ArrowDropDownIcon, ArrowDropUpIcon } from '@apeswapfinance/uikit'

export const LaunchPadInfoWrapper = styled.div`
  width: 300px;
  border-radius: 10px;
  background: ${(props) => (props.theme.isDark ? '#333333' : 'rgba(240, 240, 240, 1)')};
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`
export const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  font-size: 24px;
  font-style: normal;
  line-height: 27px;
  padding-top: 25px;
`

export const DropdownHeader = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  padding-left: 20px;
`

export const StyledText = styled(Text)`
  padding: 20px 40px 0px 40px;
  text-align: center;
  font-family: poppins;
  font-weight: 400;
  padding-bottom: 25px;
`
export const MoreInfo = styled.a`
  font-family: poppins;
  font-size: 15px;
  font-weight: 700;
  line-height: 17px;
  text-align: center;
  padding-top: 15px;
  padding-bottom: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};
`

export const FaqLink = styled.a`
  font-family: poppins;
  font-size: 16px;
  font-weight: 700;
  text-decoration: underline;
`

export const FaqWrapper = styled.div`
  position: relative;
  width: 280px;
  border-radius: 10px;
  background: ${(props) => (props.theme.isDark ? '#414141' : 'rgba(161, 101, 82, 1)')};
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 733px;
  }
`

export const DropDownArrow = styled(ArrowDropDownIcon)`
  position: absolute;
  right: 20px;
  width: 15px;
  top: 15px;
  fill: white;
`

export const DropUpArrow = styled(ArrowDropUpIcon)`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 15px;
  fill: white;
`

export const HeaderWrapper = styled.div<{ opened?: boolean }>`
  height: 35px;
  width: 100%;
  left: 356px;
  top: 458px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-box-shadow: ${(props) => props.opened && ' 0 3px 4px -2px #333333'};
  -moz-box-shadow: ${(props) => props.opened && '0 3px 4px -2px #333333'};
  box-shadow: ${(props) => props.opened && ' 0 3px 4px -2px #333333'};
`
