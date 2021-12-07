import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import FaqDropdown from './FaqDropdown'

const LaunchPadInfoWrapper = styled.div`
  width: 300px;
  border-radius: 10px;
  background: ${(props) => (props.theme.isDark ? '#333333' : 'rgba(240, 240, 240, 1)')};
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
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
  font-family: poppins;
  font-weight: 400;
  padding-bottom: 25px;
`
const MoreInfo = styled.a`
  font-family: poppins;
  font-size: 15px;
  font-weight: 700;
  line-height: 17px;
  text-align: center;
  padding-top: 15px;
  padding-bottom: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};
`

const FaqLink = styled.a`
  font-family: poppins;
  font-size: 16px;
  font-weight: 700;
  text-decoration: underline;
`

const listOfFaqs = [
  {
    title: 'How to Create an SS-IAO',
    description: (
      <>
        Read the{' '}
        <FaqLink
          href="https://apeswap.gitbook.io/apeswap-finance/product-information/self-serve-iaos-ss-iaos/how-to-create-an-ss-iao"
          target="_blank"
          rel="noopener noreferrer"
        >
          documentation
        </FaqLink>{' '}
        before you begin to make sure you understand how SS-IAOs work, what you should have in place before create your
        presale, and the associated risks.
      </>
    ),
  },
  {
    title: 'SS-IAO Best Practices',
    description: (
      <>
        Looking for tips on what the best projects do? Or want to quickly gain support from ApeSwap post launch? Read{' '}
        <FaqLink
          href="https://ape-swap.medium.com/self-serve-iaos-best-practices-on-how-to-attract-apes-9610b370b448"
          target="_blank"
          rel="noopener noreferrer"
        >
          our guide
        </FaqLink>{' '}
        from our own due diligence expert Alpha Rho.
      </>
    ),
  },
  {
    title: 'FAQ',
    description: (
      <>
        Have any other burning questions about SS-IAOs? Check out our{' '}
        <FaqLink
          href="https://apeswap.gitbook.io/apeswap-finance/product-information/self-serve-iaos-ss-iaos/ss-iao-faq"
          target="_blank"
          rel="noopener noreferrer"
        >
          FAQ
        </FaqLink>{' '}
        to get all the answers!
      </>
    ),
  },
]

export default function LuanchpadInfo(): JSX.Element {
  return (
    <LaunchPadInfoWrapper>
      <StyledHeader>Self-Serve Launchpad Info</StyledHeader>
      <StyledText>
        Run your own decentralized Self-Serve Initial Ape Offering (SS-IAO) to raise funds and liquidity for your
        project!
      </StyledText>

      {listOfFaqs.map((faq) => (
        <FaqDropdown key={faq.title} title={faq.title}>
          {faq.description}
        </FaqDropdown>
      ))}
      <MoreInfo
        href="https://apeswap.gitbook.io/apeswap-finance/product-information/self-serve-iaos-ss-iaos"
        target="_blank"
        rel="noopener noreferrer"
      >
        DOCUMENTATION {'>'}
      </MoreInfo>
    </LaunchPadInfoWrapper>
  )
}
