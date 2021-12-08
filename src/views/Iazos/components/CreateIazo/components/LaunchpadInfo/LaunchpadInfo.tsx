import React from 'react'
import FaqDropdown from './FaqDropdown'
import { LaunchPadInfoWrapper, StyledHeader, StyledText, MoreInfo, FaqLink } from './styles'

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
