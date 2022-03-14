import styled from 'styled-components'
import { Button, Text, ButtonSquare } from '@apeswapfinance/uikit'
// import BaseUnlockButton from 'components/UnlockButton'
import UnlockButtonSquare from 'components/UnlockButtonSquare'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white3};
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 272px;
`

export const VestingButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

export const VestingClaimButton = styled(Button)`
  width: 130px;
  height: 44px;
  background-color: secondary;
  margin: 10px;
  flex-shrink: 0;
  background: #ffb300;
  padding: 0;
  :focus {
    outline: none !important;
    box-shadow: none !important;
    background: #ffb300;
  }
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`

export const DisplayVestingTime = styled(Text)<{ label?: boolean }>`
  font-size: ${({ label }) => (label ? '12px' : '14px')};
  font-weight: ${({ label }) => (label ? 'normal' : 600)};
  line-height: ${({ label }) => (label ? '18px' : '24px')};
`

export const Claim = styled(Text)`
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  text-transform: uppercase;
`

export const TextWrapRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`

export const ApproveButton = styled(ButtonSquare)`
  width: 220px;
  margin: 0 auto;
`

export const UnlockButton = styled(UnlockButtonSquare)`
  width: 220px;
  margin: 0 auto;
  height: 44px;
  font-size: 16px;
`
