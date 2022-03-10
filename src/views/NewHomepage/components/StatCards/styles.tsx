import { Card } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  max-width: 339px;
  min-width: 260px;
  width: 100%;
  border-radius: 10px;
  padding: 15px 0px 15px 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 131px;
  }
`

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin: 0px 40px 0px 40px;
  align-items: center;
  max-width: 1412px;
  z-index: 2;
  width: 95vw;
  border-radius: 10px;
  ${StyledCard}:nth-child(1) {
    border-radius: 10px 10px 0px 0px;
  }
  ${StyledCard}:nth-child(2), ${StyledCard}:nth-child(3) {
    border-radius: 0px;
  }
  ${StyledCard}:nth-child(4) {
    border-radius: 0px 0px 10px 10px;
  }
  @media screen and (min-width: 757px) and (max-width: 1200px) {
    display: grid;
    grid-template-columns: 339px 339px;
    margin: 0px 0px 0px 0px;
    justify-content: space-around;
    ${StyledCard}:nth-child(1), ${StyledCard}:nth-child(2) {
      border-radius: 10px 10px 0px 0px;
    }
    ${StyledCard}:nth-child(3), ${StyledCard}:nth-child(4) {
      border-radius: 0px 0px 10px 10px;
    }
  }
  @media screen and (min-width: 1200px) {
    display: grid;
    justify-content: space-between;
    ${StyledCard}:nth-child(1), ${StyledCard}:nth-child(2), 
    ${StyledCard}:nth-child(3), ${StyledCard}:nth-child(4) {
      border-radius: 10px;
    }
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`
