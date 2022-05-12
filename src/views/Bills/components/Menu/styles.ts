import { Text, Flex } from '@apeswapfinance/uikit'
import { Button } from '@ape.swap/uikit'
import styled from '@emotion/styled'

export const ControlContainer = styled(Flex)`
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  border-radius: 10px;
  justify-content: space-between;
  flex-direction: row;
  padding: 15px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.white2};
  min-width: 300px;
  max-width: 500px;
  width: 100%;
  align-self: center;
  height: 225px;
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 180px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    min-height: 59px;
    height: 100%;
    padding: 0px 50px 0px 30px;
    align-items: center;
    max-width: 100%;
    height: auto;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 0px 50px 0px 30px;
  }
`

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

export const StyledText = styled(Text)`
  font-weight: 700;
  font-size: 16px !important;
`

export const LearnMoreButton = styled(Button)`
  height: 36px;
  width: 192px;
  align-items: center;
  color: ${({ theme }) => theme.colors.yellow};
  border: 2px solid ${({ theme }) => theme.colors.yellow};
`

export const ClaimAllWrapper = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`
