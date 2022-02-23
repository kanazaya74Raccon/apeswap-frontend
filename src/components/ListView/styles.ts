import { ArrowDropDownIcon, Card, Flex } from '@apeswapfinance/uikit'
import styled, { keyframes } from 'styled-components'

const ExpandAnimation = keyframes`
    0%{height: 0;}
    100%{height: 100px;}
`

export const ListExpandedContainer = styled(Flex)`
  width: 1099px;
  height: 100px;
  align-items: center;
  animation: ${ExpandAnimation} 0.3s ease;
  overflow: hidden;
  background-color: ${({ theme }) => (theme.isDark ? '#383838' : '#F1EADA')};
`
//   ${({theme}) => theme.colors.dark3};

export const ListCardContainer = styled(Card)`
  display: flex;
  width: 1099px;
  height: 86px;
  border-radius: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(226, 226, 226, 0.2);
  cursor: pointer;
  padding: 0px 20px 0px 20px;
`
//   ${({theme}) => theme.colors.white2};
export const ListViewContainer = styled.div`
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
  position: absolute;
  width: 625px;
  height: 60px;
  left: 365px;
  align-items: flex-start;
  justify-content: space-between;
`