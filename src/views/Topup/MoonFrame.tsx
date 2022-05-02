import React from 'react'
import styled from 'styled-components'

export const StyledIframe = styled.iframe`
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  border: 0;
  min-height: 660px;
`

export default function MoonPayIframe({ currencyCode = 'BNB_BSC' }) {
  const src = `https://buy-staging.moonpay.io?apiKey=pk_test_ofxbUiq0BDNvCBwRbO5mHjG7gKBKLWY2&colorCode=%23ffb300&currencyCode=${currencyCode}`

  return (
    <StyledIframe
      title="Moonpay topup"
      src={src}
      allow="accelerometer; autoplay; camera; gyroscope; payment"
      frameBorder="0"
      height="100%"
      width="100%"
    />
  )
}
