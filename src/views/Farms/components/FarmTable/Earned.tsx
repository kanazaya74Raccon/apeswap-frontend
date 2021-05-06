import React from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'

export interface EarnedProps {
  earnings: number
  pid: number
}

const Amount = styled.span<{ earned: number }>`
  color: #38a611;
  display: flex;
  align-items: center;
  font-size: 20px;
`

const Earned: React.FunctionComponent<EarnedProps> = ({ earnings }) => {
  const { account }: { account: string } = useWallet()

  const amountEarned = account ? earnings : null

  const displayBalance = amountEarned ? amountEarned.toLocaleString() : '?'
  return <Amount earned={amountEarned}>{displayBalance}</Amount>
}

export default Earned
