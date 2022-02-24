import { ArrowDropDownIcon, Card, Flex, Text } from '@apeswapfinance/uikit'
import styled, { keyframes } from 'styled-components'

const ExpandLargeAnimation = keyframes`
    0%{height: 0;}
    100%{height: 100px;}
`

const ExpandSmallAnimation = keyframes`
    0%{height: 0;}
    100%{height: 243px;}
`

export const ListExpandedContainer = styled(Flex)`
  height: 243px;
  align-items: center;
  animation: ${ExpandSmallAnimation} 0.3s ease;
  overflow: hidden;
  margin: 0px 10px 0px 10px;
  background-color: ${({ theme }) => (theme.isDark ? '#383838' : '#F1EADA')};
  ${({ theme }) => theme.mediaQueries.lg} {
    animation: ${ExpandLargeAnimation} 0.3s ease;
    height: 100px;
  }
`
//   ${({theme}) => theme.colors.dark3};

export const ListCardContainer = styled(Card)`
  display: flex;
  height: 110px;
  border-radius: 0;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(226, 226, 226, 0.2);
  cursor: pointer;
  padding: 10px;
  margin: 0px 10px 0px 10px;
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    height: 86px;
    padding: 0px 15px 0px 15px;
  }
`
//   ${({theme}) => theme.colors.white2};
export const ListViewContainer = styled.div`
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
  max-width: 650px;
  width: 100%;
  height: 50px;
  align-items: flex-end;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.lg} {
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
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 16px;
  }
`
