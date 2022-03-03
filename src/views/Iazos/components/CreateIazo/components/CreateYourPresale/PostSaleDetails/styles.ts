import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

export const LaunchPadInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 471px;
  width: 280px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white4};
  margin-bottom: 30px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 20px 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 686px;
    height: 371px;
  }
`
export const StyledHeader = styled(Text)`
  font-size: 22px;
  line-height: 27px;
  margin-top: 15px;
  font-weight: 700;
`

export const InputTitle = styled(Text)`
  position: absolute;
  top: -25px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 700;
  width: 230px;
  ${({ theme }) => theme.mediaQueries.md} {
    top: -30px;
    font-size: 16px;
    width: 100%;
  }
`

export const PercentageToRaiseWrapper = styled.div`
  position: relative;
  display: flex;
  height: 110px;
  width: 220px;
  flex-wrap: wrap;
  margin-top: 30px;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 475px;
    height: 60px;
    margin-bottom: 30px;
  }
`

export const LiquidityButton = styled.div<{ active: boolean }>`
  display: flex;
  width: 100px;
  height: 35px;
  background: ${(props) => (props.active ? props.theme.colors.yellow : 'transparent')};
  border: 2px solid ${({ theme }) => theme.colors.yellow};
  border-radius: 5px;
  color: ${(props) => (props.active ? props.theme.colors.primaryBright : props.theme.colors.gray)};
  font-weight: 700;

  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 100px;
    height: 40px;
  }
`

export const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: 225px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 110px;
  }
`
