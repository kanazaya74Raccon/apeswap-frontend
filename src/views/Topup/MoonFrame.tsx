import React from 'react'
import styled from 'styled-components'
import Iframe from 'react-iframe'

const StyledIframe = styled(Iframe)`
  width: 100%;
  max-width: 398px;
  height: 560px;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 32px;
  border-radius: 1rem;

  & > div {
    grid-column: span 12;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      height: 1200px;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      height: 860px;
    }
  }
`

export default function MoonPayIframe() {
  const baseUrl = 'https://buy-staging.moonpay.io?apiKey=pk_test_ofxbUiq0BDNvCBwRbO5mHjG7gKBKLWY2&colorCode=%23ffb300'

  return (
    <StyledIframe
      title="Moonpay topup"
      url={baseUrl}
      scrolling="no"
      allow="accelerometer; autoplay; camera; gyroscope; payment"
    />
  )
}
