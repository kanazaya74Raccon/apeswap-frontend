import React from 'react'
import styled from 'styled-components'
import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import FaqDropdown from './FaqDropdown'

const listOfFaqs = [
  {
    title: 'FAQ Titles',
    description: `Is your project stellar!? Apply to be incubated by Unicrypt by sending us a mail at: support@unicrypt.network If you would like to be incubated do not create a presale yet, we'll help with marketing, KYC, Audits, Hardcaps and presale parameters.`,
  },
  {
    title: 'Presale best practices',
    description:
      'this is some sort of text this is some sort of text this is some sort of text this is some sort of text this is some sort of text this is some sort of text this is some sort of text',
  },
  {
    title: 'Some other info',
    description:
      'this is some sort of text this is some sort of text this is some sort of text this is some sort of text this is some sort of text this is some sort of text this is some sort of text',
  },
]

const LaunchPadInfoWrapper = styled.div`
  width: 796px;
  border-radius: 10px;
  background: ${(props) => (props.theme.isDark ? '#333333' : 'rgba(240, 240, 240, 1)')};
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  font-size: 24px;
  font-style: normal;
  line-height: 27px;
  padding-top: 25px;
`

const StyledText = styled(Text)`
  padding: 20px 40px 0px 40px;
  text-align: center;
  padding-bottom: 15px;
  font-family: poppins;
  font-weight: 400;
`
const MoreInfo = styled(Text)`
  font-family: Titan One;
  font-size: 15px;
  font-weight: 400;
  line-height: 17px;
  text-align: center;
  padding-top: 15px;
  padding-bottom: 20px;
  cursor: pointer;
`

export default function LuanchpadInfo(): JSX.Element {
  return (
    <LaunchPadInfoWrapper>
      <StyledHeader>Launchpad Info</StyledHeader>
      <StyledText>
        Run a decentralised Initial Ape Offering (IAO) to raise funds and liquidity for your project with our trusted
        decentalised launchpad.
      </StyledText>
      {listOfFaqs.map((faq) => (
        <FaqDropdown key={faq.title} title={faq.title} description={faq.description} />
      ))}
      <MoreInfo>MORE INFO {'>'}</MoreInfo>
    </LaunchPadInfoWrapper>
  )
}
