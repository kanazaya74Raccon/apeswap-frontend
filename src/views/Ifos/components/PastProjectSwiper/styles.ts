import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { LeftArrow, RightArrow } from 'components/Icons'
import { Swiper } from 'swiper/react'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 32px;
`

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ProjectImage = styled.img<{ isActive?: boolean }>`
  width: 64px;
  height: 64px;
  border-radius: 100%;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.2)};
`

export const ArrowImage = styled.div`
  width: 50px;
  cursor: pointer;
`

export const StatusTitle = styled(Text)<{ isActive?: boolean }>`
  font-family: Titan one;
  text-align: center;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.2)};
`

export const LeftArrowIcon = styled(LeftArrow)`
  color: ${({ theme }) => (theme.isDark ? theme.colors.white : theme.colors.primary)};
`

export const RightArrowIcon = styled(RightArrow)`
  color: ${({ theme }) => (theme.isDark ? theme.colors.white : theme.colors.primary)};
`

export const ProjectSwiper = styled(Swiper)`
width: calc(57vw);
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
  }
`