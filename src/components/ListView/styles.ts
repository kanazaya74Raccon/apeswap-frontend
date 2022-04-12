import { ArrowDropDownIcon, Flex, Text } from '@apeswapfinance/uikit'
import styled, { keyframes } from 'styled-components'

const ExpandLargeAnimation = keyframes`
    0%{height: 0;}
    100%{height: 100px;}
`

const ExpandSmallAnimation = (size?: number) => keyframes`
    0%{height: 0;}
    100%{height: ${size || 234}px;}
`

export const ListExpandedContainer = styled(Flex)<{ size?: number }>`
  height: ${({ size }) => size || 234}px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  animation: ${({ size }) => ExpandSmallAnimation(size)} 0.3s ease;
  overflow: hidden;
  margin: 0px 10px 0px 10px;
  padding: 10px;
  background: ${({ theme }) => theme.colors.white3};
  max-width: 500px;
  min-width: 300px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0px 30px 0px 30px;
    animation: ${ExpandLargeAnimation} 0.3s ease;
    height: 100px;
    max-width: 100%;
  }
`

export const ListCardContainer = styled(Flex)`
  height: 130px;
  border-radius: 0;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.white2};
  border-bottom: 1px solid rgba(226, 226, 226, 0.2);
  padding: 10px;
  margin: 0px 10px 0px 10px;
  max-width: 500px;
  min-width: 300px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    height: 86px;
    padding: 0px 30px 0px 30px;
    max-width: 100%;
  }
`
export const ListViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  & ${ListCardContainer}:first-child {
    border-radius: 10px 10px 0px 0px;
  }
  & ${ListCardContainer}:last-child {
    border-radius: 0px 0px 10px 10px;
    border: none;
  }
`

export const DropDownIcon = styled(ArrowDropDownIcon)<{ open: boolean }>`
  width: 15px;
  transform: ${({ open }) => (open ? 'rotate(-180deg)' : '')};
  transition: transform 0.3s ease;
  right: 0;
  cursor: pointer;
`

export const TagContainer = styled(Flex)`
  align-items: center;
  justify-content: center;
  width: 31px;
  height: 15px;
  border-radius: 7px;
  color: white;
  line-height: 0px;
  font-size: 10px;
  background-color: red;
`

export const ContentContainer = styled(Flex)`
  position: relative;
  width: 100%;
  height: 62.5px;
  align-items: flex-end;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 60px;
  }
`

export const TitleContainer = styled(Flex)`
  align-items: center;
  height: 100%;
  max-width: 290px;
  width: 100%;
`

export const TitleText = styled(Text)`
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`
