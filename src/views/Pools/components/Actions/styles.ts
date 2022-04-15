import { Button, Flex } from '@ape.swap/uikit'
import styled from '@emotion/styled'
import UnlockButton from 'components/UnlockButton'

export const StyledButtonSquare = styled(Button)`
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  min-width: 227px;
  height: 44px;
`

export const StyledUnlockButton = styled(UnlockButton)`
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  min-width: 227px;
  height: 44px;
`

export const SmallButtonSquare = styled(Button)`
  max-width: 44px;
  height: 44px;
`

export const ActionContainer = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.md} {
    width: auto;
  }
`

export const CenterContainer = styled(Flex)`
  width: 100%;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.md} {
    width: auto;
    justify-content: auto;
  }
`
