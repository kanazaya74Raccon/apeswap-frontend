import { Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const LaunchCalendarWrapper = styled.div`
  position: relative;
  display: flex;
  width: 95vw;
  max-width: 1412px;
  height: 500px;
  justify-content: space-between;
  align-items: center;
`

export const ColorWrap = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.card};
  align-items: center;
  justify-content: center;
`

export const LaunchCard = styled.div`
  width: 219px;
  height: 263px;
  border-radius: 10px;
  padding: 10px 5px 10px 5px;
  background: ${({ theme }) => theme.colors.white3};
`

export const CalendarImg = styled.div<{ image: string }>`
  width: 84px;
  height: 84px;
  background: grey;
  border-radius: 10px;
`

export const Bubble = styled.div<{ isActive?: boolean }>`
  background: ${({ isActive }) =>
    isActive ? 'linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%)' : 'rgba(66, 66, 66, .2)'};
  height: 14px;
  width: 14px;
  border-radius: 50px;
  margin: 0px 2.5px 0px 2.5px;
  cursor: pointer;
`

export const LaunchText = styled(Text)`
  position: absolute;
  font-size: 22px;
  top: 40px;
  text-align: center;
  width: 100%;
`
