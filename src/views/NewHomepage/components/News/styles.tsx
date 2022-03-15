import styled from 'styled-components'

export const NewsCard = styled.div<{ image: string; index: number; listLength: number }>`
  height: 332.5px;
  min-width: 266px;
  max-width: 266px;
  opacity: 1;
  flex-shrink: 1;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  transition: ease 1000ms;
`

export const NewsWrapper = styled.div`
  display: flex;
  height: 500px;
  align-items: center;
  overflow: hidden;
  max-width: 1412px;
  width: 95vw;
  justify-content: center;
  padding-bottom: 50px;
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
  & :nth-child(5) {
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
    & :nth-child(5) {
      display: block;
    }
  }
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
