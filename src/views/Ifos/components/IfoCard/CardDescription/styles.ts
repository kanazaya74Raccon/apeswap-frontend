import styled from 'styled-components'
import { Text, Image, LinkExternal } from '@apeswapfinance/uikit'

export const StyledIfoCardDescription = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => (theme.isDark ? theme.colors.white : theme.colors.primary)};
  cursor: pointer;
  display: block;
  font-weight: 800;
  font-family: Poppins;
  outline: 0;
  width: 100%;
`

export const Description = styled(Text).attrs({ fontFamily: 'poppins' })<{ isOpen: boolean }>`
  color: ${({ theme }) => (theme.isDark ? theme.colors.white : theme.colors.primary)};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  margin-top: 24px;
`

export const IconImage = styled(Image)`
  margin-left: 8px;
  display: inline-block;
`

export const Link = styled(LinkExternal)`
  color: ${({ theme }) => (theme.isDark ? theme.colors.white : theme.colors.primary)};
`
