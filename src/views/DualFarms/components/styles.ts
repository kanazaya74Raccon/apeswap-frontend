import styled from 'styled-components'
import { Tag } from '@ape.swap/uikit'
import { Button, ArrowDropUpIcon, Flex } from '@apeswapfinance/uikit'

export const FarmButton = styled(Button)`
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  min-width: 129px;
  height: 44px;
`

export const NextArrow = styled(ArrowDropUpIcon)`
  transform: rotate(90deg);
`

export const Container = styled(Flex)`
  flex-direction: row;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

export const ServiceTokenDisplayContainer = styled.div`
  margin-left: -2px;
  margin-right: 5px;
`

export const StyledTag = styled(Tag)`
  font-size: 10px;
  padding: 0px 6px !important;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  height: auto;
  width: max-content;
`
