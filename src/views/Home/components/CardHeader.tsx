import styled, { DefaultTheme } from 'styled-components'
import { CardHeader as UIKitCardHeader } from '@apeswapfinance/uikit'

// const getBackground = (theme: DefaultTheme) => {
//   if (theme.isDark) {
//     return 'linear-gradient(139.73deg, #142339 0%, #24243D 47.4%, #37273F 100%)'
//   }

//   return 'linear-gradient(139.73deg, #E6FDFF 0%, #EFF4F5 46.87%, #F3EFFF 100%)'
// }

// background: ${({ theme }) => getBackground(theme)};

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
