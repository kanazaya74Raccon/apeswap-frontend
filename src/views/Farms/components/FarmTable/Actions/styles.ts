import styled from 'styled-components'
import UnlockButtonSquare from 'components/UnlockButtonSquare'
import { Text, Flex, ButtonSquare } from '@apeswapfinance/uikit'

export const ActionContainer = styled.div`
  padding: 24px;
  border: 2px solid ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  min-height: 150px;
  margin-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 0;
    max-height: 100px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 48px;
    margin-right: 0;
    margin-bottom: 0;
    max-height: 100px;
  }
`

export const ActionTitles = styled.div`
  font-weight: 300;
  font-size: 12px;
  margin-bottom: 8px;
`

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`

export const Subtle = styled.span`
  color: ${({ theme }) => theme.colors.textSubtle};
`

export const ActionContent = styled.div`
  margin-top: 1px;
`
export const Earned = styled.div`
  font-weight: 300;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
`

export const StakedStyle = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSubtle};
`

export const StyledUnlockButton = styled(UnlockButtonSquare)`
  font-weight: 600;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 26px 20px;
  width: 100%;
  gap: 16px;
  background-color: ${({ theme }) => (theme.isDark ? '#424242' : '#EADFC7')};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 30px 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

export const Caption = styled(Text)`
  opacity: 0.5;
  font-weight: 500;
  font-size: 12px;
  margin-bottom: -4px;
`

export const DollarValue = styled(Text)`
  font-size: 12px;
  margin-top: -4px;
`

export const OnlyDesktop = styled.div`
  display: none;
  width: 15px;
  height: 15px;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`

export const RecordBox = styled(Flex)`
  gap: 10px;
  flex-direction: row;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row-reverse;
  }
`

export const StyledButtonSquare = styled(ButtonSquare)`
  font-weight: 600;
  font-size: 16px;
  height: 44px;
`
