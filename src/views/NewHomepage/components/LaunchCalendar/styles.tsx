import styled from 'styled-components'

export const LaunchCalendarWrapper = styled.div`
  display: flex;
  width: 95vw;
  max-width: 1412px;
  height: 500px;
  justify-content: center;
  align-items: center;
  & :nth-child(2),
  & :nth-child(3),
  & :nth-child(4),
  & :nth-child(5),
  & :nth-child(6) {
    display: none;
  }
  @media screen and (min-width: 485px) and (max-width: 705px) {
    justify-content: space-around;
    & :nth-child(2) {
      display: block;
    }
  }
  @media screen and (min-width: 705px) and (max-width: 930px) {
    justify-content: space-around;
    & :nth-child(2),
    & :nth-child(3) {
      display: block;
    }
  }
  @media screen and (min-width: 930px) and (max-width: 1172px) {
    justify-content: space-around;
    & :nth-child(2),
    & :nth-child(3),
    & :nth-child(4) {
      display: block;
    }
  }
  @media screen and (min-width: 1172px) and (max-width: 1405px) {
    justify-content: space-between;
    & :nth-child(2),
    & :nth-child(3),
    & :nth-child(4),
    & :nth-child(5) {
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

export const ColorWrap = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.card};
  align-items: center;
  justify-content: center;
`

export const LaunchCard = styled.div`
  width: 219px;
  height: 263px;
  border: 1px solid black;
`
