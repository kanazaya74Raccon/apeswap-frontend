import styled from 'styled-components'
import { Flex, Card, Button } from '@apeswapfinance/uikit'

// DESCRIPTION
export const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`
export const StyledContainer = styled.div`
  background-color: #af6e5aff;
`
export const StyledFlex = styled(Flex)`
  max-width: 100%;
  margin: auto;
  padding: 0px;
  margin-left: 20px;
  margin-right: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 1200px;
    padding-left: 53px;
    padding-right: 53px;
    margin: auto;
  }
`
export const StyledTextContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  z-index: 99;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 89px;
    margin-bottom: 89px;
  }
`
export const StyledImg = styled.img`
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 80px;
    height: 100%;
    display: inline-block;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 95px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 115px;
  }
`
export const StyledCircle = styled.circle`
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    background-color: #333333;
    width: 120px;
    height: 120px;
    filter: drop-shadow(0px 0px 20px #ebb02a);
    position: relative;
    margin: auto auto;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 140px;
    height: 140px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 174px;
    height: 174px;
  }
`
export const StyledCard = styled(Card)`
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 220px;
    height: 170px;
    margin-top: 176px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 200px;
    height: 190px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 269px;
    height: 256px;
  }
`
export const StyledButton = styled(Button)`
  background: #fafafa;
  border: 2px solid #a16552;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px 40px;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #a16552;
`
export const StyledMonkey = styled.img`
  width: 800px;
  opacity: 0.05;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: -100px;
  left: 0px;
  right: 0px;

  ${({ theme }) => theme.mediaQueries.md} {
    top: -250px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 900px;
    top: -350px;
  }
`
