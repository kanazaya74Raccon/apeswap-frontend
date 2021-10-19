import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'

export interface EarnedProps {
  earnings?: number
}

const Amount = styled.span<{ earned: number }>`
  color: #38a611;
  display: flex;
  align-items: center;
  font-size: 20px;
  width: 110px;
`

const Earned: React.FunctionComponent<EarnedProps> = ({ earnings }) => {
  const { account } = useWeb3React()

  const amountEarned = account ? earnings : null
  const displayBalance = amountEarned ? amountEarned.toLocaleString() : '?'

  return <Amount earned={amountEarned}>{displayBalance}</Amount>
}

export default Earned
