import styled from 'styled-components'
import Container from './Container'

interface SizeProps {
  width?: string
}

const Page = styled(Container)<SizeProps>`
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
    max-width: ${({ width }) => (width || '992px')};
  }
`

export default Page
