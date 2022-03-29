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
  background: ${({ theme }) => theme.colors.white2};
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
  border-radius: 10px;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

export const Bubble = styled.div<{ isActive?: boolean }>`
  background: ${({ isActive, theme }) =>
    isActive ? 'linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%)' : theme.colors.white4};
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

export const SkeletonWrapper = styled.div`
  position: absolute;
  display: flex;
  height: 500px;
  align-items: center;
  max-width: 1412px;
  width: 95vw;
  top: 0;
  justify-content: center;
  padding-bottom: 50px;
  & :nth-child(2),
  & :nth-child(3),
  & :nth-child(4),
  & :nth-child(5),
  & :nth-child(6) {
    display: none;
  }
  @media screen and (min-width: 555px) and (max-width: 855px) {
    justify-content: space-around;
    & :nth-child(2) {
      display: block;
    }
  }
  @media screen and (min-width: 855px) and (max-width: 1155px) {
    justify-content: space-around;
    & :nth-child(2),
    & :nth-child(3) {
      display: block;
    }
  }
  @media screen and (min-width: 1155px) and (max-width: 1405px) {
    justify-content: space-between;
    & :nth-child(2),
    & :nth-child(3),
    & :nth-child(4) {
      display: block;
    }
  }
  @media screen and (min-width: 1405px) {
    justify-content: space-between;
    & :nth-child(2),
    & :nth-child(3),
    & :nth-child(4),
    & :nth-child(5),
    & :nth-child(6) {
      display: block;
    }
  }
`
