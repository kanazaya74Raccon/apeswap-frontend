import styled from 'styled-components'

export const ServiceWrapper = styled.div`
  display: flex;
  height: 610px;
  width: 95vw;
  max-width: 1412px;
  align-items: center;
  justify-content: center;
  & :nth-child(2),
  & :nth-child(3),
  & :nth-child(4) {
    display: none;
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    justify-content: space-around;
    & :nth-child(2) {
      display: block;
    }
  }
  @media screen and (min-width: 1080px) and (max-width: 1405px) {
    justify-content: space-between;
    & :nth-child(2),
    & :nth-child(3) {
      display: block;
    }
  }
  @media screen and (min-width: 1405px) {
    justify-content: space-between;
    & :nth-child(2),
    & :nth-child(3),
    & :nth-child(4) {
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

export const YieldCard = styled.div<{ image?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 338px;
  height: 442px;
  padding: 20px 10px 20px 10px;
  border-radius: 10px;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`
