import { Flex, Skeleton, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const ListViewContentContainer = styled(Flex)<{ width?: number; height?: number }>`
    flex-direction: column;
    align-items: flex-start:
    border: 1px solid green;
    justify-content: flex-start;
    height: ${({ height }) => (height ? `${height}px` : '100%')};
    max-width: ${({ width }) => width || 100}px;
    width: 100%;
`

export const TitleText = styled(Text)<{ lineHeight?: number }>`
  opacity: 0.6;
  font-size: 12px;
  line-height: ${({ lineHeight }) => lineHeight || 20}px;
  ${({ theme }) => theme.mediaQueries.md} {
  }
`

export const ValueText = styled(Text)<{ lineHeight?: number; value2Secondary?: boolean; color?: string }>`
  font-size: 12px;
  color: ${({ color, theme }) => color || theme.colors.text};
  line-height: ${({ lineHeight }) => lineHeight || 20}px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: ${({ value2Secondary }) => (value2Secondary ? '12px' : '16px')};
  }
`

export const IconImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`

export const ValueSkeleton = styled(Skeleton)`
  width: 60px;
  height: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 100px;
  }
`
