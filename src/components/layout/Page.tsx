import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { customMeta, DEFAULT_META } from 'config/constants/meta'
import { usePriceBananaBusd } from 'state/hooks'
import Container from './Container'

interface SizeProps {
  width?: string
}

const StyledPage = styled(Container)<SizeProps>`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 32px;
    max-width: ${({ width }) => width || '992px'};
  }
`

const PageMeta = () => {
  const { pathname } = useLocation()
  const bananaPriceUsd = usePriceBananaBusd()
  const bananaPriceUsdDisplay = bananaPriceUsd.toNumber()
    ? `$${bananaPriceUsd.toNumber().toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      })}`
    : ''
  const pageMeta = customMeta[pathname] || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  const pageTitle = bananaPriceUsdDisplay ? [bananaPriceUsdDisplay, title].join(' - ') : title

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  )
}

const Page: React.FC<SizeProps> = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <StyledPage {...props}>{children}</StyledPage>
    </>
  )
}

export default Page
