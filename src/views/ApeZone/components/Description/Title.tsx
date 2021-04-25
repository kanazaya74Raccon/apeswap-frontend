import styled from 'styled-components'
import { Heading } from '@apeswapfinance/uikit'

interface HeadingProps {
  fontWeight?: number
  color?: string
}

const Title = styled(Heading)<HeadingProps>`
  color: ${({ color }) => (color !== undefined ? color : 'white')};
  font-weight: ${({ fontWeight }) => (fontWeight !== undefined ? fontWeight : 400)};
  line-height: 18px;
`

export default Title
