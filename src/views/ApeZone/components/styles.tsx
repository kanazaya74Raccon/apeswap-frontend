import styled from 'styled-components'
import { Card, Heading, Text, Button, Checkbox, Flex } from '@apeswapfinance/uikit'

export const StyledCard = styled(Card)`
  overflow: visible;
  border-radius: 10px;
  background: ${({ theme }) => (theme.isDark ? theme.colors.white2 : theme.colors.primaryBright)};
  padding: 10px;
  margin-top: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0px;
    margin-left: 10px;
  }
`
export const HeaderCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${({ theme }) => (theme.isDark ? '#0B0B0B' : '#F0F0F0')};
  padding-top: 10px;
  padding-bottom: 5px;
`
export const Header = styled(Heading)`
  font-size: 25px;
  font-weight: 700;
  text-transform: uppercase;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 30px;
  }
`
export const TokensDisplay = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.yellow};
  text-transform: uppercase;
`
export const ContentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${({ theme }) => (theme.isDark ? '#0B0B0B' : '#F0F0F0')};
  margin-top: 10px;
  padding: 10px;
`
export const StyledButton = styled(Button)`
  background: #ffb300;
  border-radius: 10px;
  box-shadow: none;
  text-transform: uppercase;
  margin-top: 15px;
`
export const StyledText = styled(Text)`
  z-index: 199;
  margin-left: 10px;
`
export const CheckBoxSection = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: unset;
    visibility: hidden;
  }
`
export const CheckBoxCon = styled.div`
  display: flex;
  align-items: center;
  width: 50px;
  height: 50px;
`
export const NewCheckBox = styled(Checkbox)`
  background: ${({ theme }) => (theme.isDark ? '#3D3D3D' : theme.colors.primaryBright)};
`
export const FlexSection = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 120px;
  }
`

// ConvertCard
export const CBS = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`
export const StyledCard2 = styled(Card)`
  overflow: visible;
  border-radius: 10px;
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.primaryBright)};
  padding: 10px;
`

// ConfirmModal
export const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`
