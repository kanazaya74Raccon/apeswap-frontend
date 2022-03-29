import { Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { FadeIn } from '../../styles'

export const TrendingTokensWrapper = styled.div`
  position: relative;
  max-width: 1412px;
  width: 95vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white2};
  border-radius: 10px;
  z-index: 1;
  padding: 15px 20px 0px 20px;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: grid;
    grid-template-rows: 50px 150px 20px;
    width: 95vw;
    padding: 20px calc(40% - 200px);
  }
  @media screen and (min-width: 1200px) {
    width: 95vw;
    display: flex;
    flex-direction: row;
    padding: 0px 40px 0px 220px;
  }
`

export const TokenContainer = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 83px;
  cursor: pointer;
  opacity: 1;
  animation: ${FadeIn} 2s ease-in;
`

export const Title = styled(Text)`
  text-align: center;
  @media screen and (min-width: 1200px) {
    left: 40px;
    width: 170px;
    position: absolute;
    text-align: left;
  }
`

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`
