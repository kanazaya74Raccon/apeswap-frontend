import React from 'react'
import styled from 'styled-components'
import { Card, Heading, Text, ButtonSquare } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

const Container = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.white)};
  border-radius: 20px;
  margin-top: 0.5em;
  padding-top: 1.2em;
  padding-bottom: 1.2em;
`
const Main = styled.div`
  width: 100%;
`
const Main2 = styled.div`
  width: 100%;
  padding-left: 0.5em;
  padding-right: 0.5em;
  margin-top: 1.5em;
`
const FirstHeaderCon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`
const FirstHeader = styled(Heading)`
  font-size: 20px;
  color: ${({ theme }) => (theme.isDark ? '#FFFFFF' : theme.colors.text)};
  font-weight: 700;
  text-transform: uppercase;
`
const InfoCon = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? '#0B0B0B' : '#F0F0F0')};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  border-radius: 10px;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`
const InfoText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? '#FFFFFF' : theme.colors.text)};
  font-size: 10px;
  font-weight: 400;
  text-align: center;
`
const Sect = styled.div`
  display: flex;
  flex-direction: column;
  height: 280px;
  justify-content: space-evenly;
`
const Sect1 = styled.div`
  display: flex;
  justify-content: space-evenly;
`
const Sect1a = styled.div`
  width: 15%;
  height: 80px;
  /* background: yellow; */
  border-radius: 10px;
  display: flex;
  align-items: center;
`
const Sect1b = styled(Sect1a)`
  width: 20%;
  /* background: red; */
`
const Sect1c = styled(Sect1a)`
  width: 40%;
  /* background: green; */
`
const Sect1d = styled(Sect1a)`
  width: 20%;
  /* background: blue; */
`
const Text1 = styled(Text)`
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
const Text2 = styled(Text1)`
  height: 30px;
  visibility: visible;
`
const Text3 = styled(Text1)`
  font-size: 10px;
  height: 100%;
  visibility: visible;
`

const Text4 = styled(Text3)`
  font-size: 12px;
  padding-left: 0.3em;
  padding-right: 0.3em;
`
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
`

interface InfoProps {
  content: string
}

const Info: React.FC<InfoProps> = ({ content }) => {
  return (
    <InfoCon>
      <InfoText>{content}</InfoText>
    </InfoCon>
  )
}

export const GnanaDisclaimers: React.FC = () => {
  const TranslateString = useI18n()

  const learnMore = () => {
    return window.open('https://apeswap.gitbook.io/apeswap-finance/', '_blank')
  }
  return (
    <Container>
      <Main>
        <FirstHeaderCon>
          <FirstHeader>Please be informed</FirstHeader>
        </FirstHeaderCon>

        <Sect>
          <Sect1>
            <Sect1a>
              <Text1>Fee1</Text1>
            </Sect1a>
            <Sect1b>
              <Text2>Buying</Text2>
            </Sect1b>
            <Sect1c>
              <Text4>Staking/Committing</Text4>
            </Sect1c>
            <Sect1d>
              <Text4>Selling</Text4>
            </Sect1d>
          </Sect1>

          <Sect1>
            <Sect1a>
              <Text2>Fee</Text2>
            </Sect1a>
            <Sect1b>
              <Text3>
                28% Burn Fee <br /> 2% Reflect Fee
              </Text3>
            </Sect1b>
            <Sect1c>
              <Text3>2% Reflect Fee (Both in and out)</Text3>
            </Sect1c>
            <Sect1d>
              <Text3>2% Reflect Fee</Text3>
            </Sect1d>
          </Sect1>

          <Sect1>
            <Sect1a>
              <Text2>Value</Text2>
            </Sect1a>
            <Sect1b>
              <Text3>.7 GNANA Per BANANA</Text3>
            </Sect1b>
            <Sect1c>
              <Text3>1 GNANA calculated as 1.389 BANANA</Text3>
            </Sect1c>
            <Sect1d>
              <Text3>.98 BANANA Per GNANA</Text3>
            </Sect1d>
          </Sect1>
        </Sect>
      </Main>

      <Main2>
        <FirstHeaderCon>
          <FirstHeader>Key Disclaimers</FirstHeader>
        </FirstHeaderCon>

        <Info content="The reflect fee occurs every Tx" />
        <Info content="You do not get reflects in staking pools" />

        {/* <Info content="The 2% reflect fee occurs on ALL transactions" />
        <Info content="You do not accumulate reflect fees when your GNANA is staked in a pool" /> */}
      </Main2>

      <Footer>
        <ButtonSquare onClick={learnMore} fontSize="12px">
          {TranslateString(292, 'LEARN MORE')}
        </ButtonSquare>
      </Footer>
    </Container>
  )
}

export default GnanaDisclaimers
