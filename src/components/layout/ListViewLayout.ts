import { Flex } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'

const ListViewLayout = styled(Flex)`
  position: relative;
  flex-direction: column;
  align-self: center;
  max-width: 500px;
  min-width: 300px;
  width: 100%;
  padding: 0px 10px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
    max-width: 1130px;
    padding: 0px 0px;
  }
`

export default ListViewLayout
