import styled from 'styled-components'
import { Heading } from '@apeswapfinance/uikit'

const Title = styled(Heading).attrs({ size: 'lg' })`
  color: ${({ theme }) => theme.colors.secondary};
  margin: 16px 0;
`

export default Title
