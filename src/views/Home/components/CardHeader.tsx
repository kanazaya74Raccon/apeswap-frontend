import styled from 'styled-components'
import { CardHeader as UIKitCardHeader } from '@apeswapfinance/uikit'

const CardHeader = styled(UIKitCardHeader)`
  background-color: #a16552 !important;
  background: none;
  position: relative;
  text-align: center;
  padding: 12px;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  font-size: 30px;
  line-height: 34px;
  letter-spacing: 0.05em;
`

export default CardHeader
