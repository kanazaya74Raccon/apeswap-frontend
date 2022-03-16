import { Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const ValuesWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 550px;
  width: 100%;
`

export const ValueCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 338px;
  height: 397px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 0px 20px 0px 20px;
  }
`

export const ValueImage = styled.div<{ image?: string }>`
  height: 200px;
  width: 200px;
  border-radius: 100px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-repeat: no-repeat;
`

export const Bubble = styled.div<{ isActive?: boolean }>`
  background: ${({ isActive, theme }) =>
    isActive ? 'linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%)' : theme.colors.white4};
  height: 14px;
  width: 14px;
  border-radius: 50px;
  margin: 0px 2.5px 0px 2.5px;
  cursor: pointer;
  display: block;
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

export const ValueText = styled(Text)`
  position: absolute;
  font-size: 22px;
  top: 25px;
  text-align: center;
  width: 100%;
`
