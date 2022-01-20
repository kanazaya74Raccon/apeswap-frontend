import styled from 'styled-components'
import { Card, Heading, ButtonSquare, Text } from '@apeswapfinance/uikit'

export const Container = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.white)};
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 2em;
    padding-bottom: 0;
  }
`
export const Main = styled.div`
  width: 100%;
`
export const Main2 = styled.div`
  width: 100%;
  padding-left: 0.5em;
  padding-right: 0.5em;
  margin-top: 20px;

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-top: 2em;
  }
`
export const FirstHeaderCon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`
export const FirstHeader = styled(Heading)`
  font-size: 25px;
  color: ${({ theme }) => (theme.isDark ? '#FFFFFF' : theme.colors.text)};
  font-weight: 700;
  text-transform: uppercase;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
    font-size: 30px;
  }
`
export const FirstHeader2 = styled(FirstHeader)`
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: unset;
  }
`

export const InfoCon = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? '#0B0B0B' : '#F0F0F0')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding: 10px 40px;
  height: 66px;

  /* ${({ theme }) => theme.mediaQueries.md} {
    height: 45px;
  } */
`
export const InfoText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#FFFFFF' : theme.colors.text)};
  font-size: 10px;
  font-weight: 400;
  text-align: center;
  line-height: 15px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 12px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
    font-weight: 500;
  }
`
export const Sect = styled.div`
  display: flex;
  flex-direction: column;
  height: 280px;
  justify-content: space-evenly;

  ${({ theme }) => theme.mediaQueries.xl} {
    height: 320px;
  }
`
export const Sect1 = styled.div`
  display: flex;
  justify-content: space-evenly;
`
export const Sect1a = styled.div`
  width: 15%;
  height: 80px;
  border-radius: 10px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.xl} {
    height: 89px;
  }
`
export const Sect1b = styled(Sect1a)`
  width: 20%;
`
export const Sect1c = styled(Sect1a)`
  width: 40%;
`
export const Sect1d = styled(Sect1a)`
  width: 20%;
`
export const Text1 = styled(Text)`
  background: ${({ theme }) => (theme.isDark ? '#0B0B0B' : '#F0F0F0')};
  color: ${({ theme }) => (theme.isDark ? '#FFFFFF' : theme.colors.text)};
  font-size: 12px;
  font-weight: 400;
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding-left: 0.4em;
  padding-right: 0.4em;
  text-align: center;
  visibility: hidden;
`
export const Text2 = styled(Text1)`
  height: 30px;
  visibility: visible;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
    font-weight: 500;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 22px;
    font-weight: 500;
    height: 49px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 22px;
  }
`
export const Text3 = styled(Text1)`
  font-size: 10px;
  height: 100%;
  visibility: visible;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 12px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
    font-weight: 500;
  }
`

export const Text4 = styled(Text3)`
  font-size: 12px;
  font-weight: 400;
  padding-left: 0.3em;
  padding-right: 0.3em;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
    font-weight: 500;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 22px;
    font-weight: 500;
    height: 49px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 22px;
  }
`
export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const InfoSect1 = styled.div``

export const LearnMoreBtn = styled(ButtonSquare)`
  font-size: 12px;
  font-weight: 700;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`
