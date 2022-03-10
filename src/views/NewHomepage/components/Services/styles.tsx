import styled from 'styled-components'
import { FadeIn } from 'views/NewHomepage/styles'

export const ColorWrap = styled.div`
  position: relative;
  display: flex;
  background: ${({ theme }) => theme.card.background};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

export const YieldCard = styled.div<{ image?: string }>`
  position: relative;
  min-width: 338px;
  max-width: 338px;
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

export const Bubble = styled.div<{ isActive?: boolean }>`
  background: ${({ isActive }) =>
    isActive ? 'linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%)' : 'rgba(66, 66, 66, .2)'};
  height: 14px;
  width: 14px;
  border-radius: 50px;
  margin: 0px 2.5px 0px 2.5px;
  cursor: pointer;
  display: block;
  @media screen and (min-width: 1488px) {
    display: none;
  }
`

export const ServiceWrapper = styled.div`
  display: flex;
  height: 610px;
  width: 95vw;
  max-width: 1412px;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`
