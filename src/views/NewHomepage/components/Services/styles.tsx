import styled from 'styled-components'
import { FadeIn } from 'views/NewHomepage/styles'

export const ColorWrap = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.card};
  align-items: center;
  justify-content: center;
`

export const YieldCard = styled.div<{ image?: string }>`
  position: relative;
  width: 338px;
  height: 442px;
  opacity: 1;
  padding: 20px 10px 20px 10px;
  border-radius: 10px;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  animation: ${FadeIn} 0.5s linear;
`

export const ServiceWrapper = styled.div`
  display: flex;
  height: 610px;
  width: 95vw;
  max-width: 1412px;
  align-items: center;
  justify-content: center;
  & ${YieldCard}:nth-child(2),
  & ${YieldCard}:nth-child(3),
  & ${YieldCard}:nth-child(4) {
    display: none;
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    justify-content: space-around;
    & ${YieldCard}:nth-child(2) {
      display: inline-block;
    }
  }
  @media screen and (min-width: 1080px) and (max-width: 1405px) {
    justify-content: space-between;
    & ${YieldCard}:nth-child(2),
    & ${YieldCard}:nth-child(3) {
      display: inline-block;
    }
  }
  @media screen and (min-width: 1405px) {
    justify-content: space-between;
    & ${YieldCard}:nth-child(2),
    & ${YieldCard}:nth-child(3),
    & ${YieldCard}:nth-child(4) {
      display: inline-block;
    }
  }
`
