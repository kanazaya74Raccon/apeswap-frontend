import React from 'react'
import styled from 'styled-components'
import { Flex } from '@apeswapfinance/uikit'
import Footer from 'components/Footer/Footer'

const StyledPage = styled.div<{ $removePadding: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${({ $removePadding }) => ($removePadding ? '0' : '16px')};
  padding-bottom: 0;
  min-height: calc(100vh - 64px);
  background: ${({ theme }) => theme.colors.gradients.bubblegum};

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '24px')};
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '32px')};
    padding-bottom: 0;
    min-height: calc(100vh - 100px);
  }
`

const StyledContainer = styled.div`
  display: block;
  width: 100%;
`

const Page: React.FC<React.HTMLAttributes<HTMLDivElement> & { removePadding?: boolean }> = ({
  children,
  removePadding = false,
  ...props
}) => {
  return (
    <>
      <StyledPage $removePadding={removePadding} {...props}>
        {children}
        <Flex flexGrow={1} />
        <StyledContainer>
          <Footer />
        </StyledContainer>
      </StyledPage>
    </>
  )
}

export default Page
