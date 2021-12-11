import React from 'react'
import styled from 'styled-components'
import { Card } from '@apeswapfinance/uikit'

export const BodyWrapper = styled(Card)`
  border-radius: 24px;
  width: 680px;
  z-index: 1;
  border: 1px solid yellow;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
