import styled from 'styled-components'
import { CardHeader as UIKitCardHeader } from '@apeswapfinance/uikit'

const CardHeader = styled(UIKitCardHeader)`
  background-image: url(/images/ape-home-earnings.png);
  position: relative;
  text-align: center;
  height: 111px;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  font-size: 30px;
  line-height: 0px;
  letter-spacing: 0.05em;
  z-index: 0;
`

export default CardHeader
