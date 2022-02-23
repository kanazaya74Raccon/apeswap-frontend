import { Flex } from '@apeswapfinance/uikit'
import React from 'react'
import { EarnIcon, TokenContainer } from './styles'

interface ServiceTokenDisplayProps {
  token1: string
  token2: string
  token3?: string
  token4?: string
  stakeLp?: boolean
  earnLp?: boolean
}

const ServiceTokenDisplay: React.FC<ServiceTokenDisplayProps> = ({
  token1,
  token2,
  token3,
  token4,
  stakeLp = false,
  earnLp = false,
}) => {
  console.log(token1)
  const StakeTokenEarnToken = (
    <Flex alignItems="center">
      <TokenContainer image={token1} />
      <EarnIcon />
      <TokenContainer image={token2} />
    </Flex>
  )

  const StakeLpEarnToken = (
    <Flex alignItems="center">
      <TokenContainer zIndex={1} image={token1} />
      <TokenContainer ml={-15} image={token2} />
      <EarnIcon />
      <TokenContainer image={token3} />
    </Flex>
  )
  const StakeLpEarnLp = (
    <Flex alignItems="center">
      <TokenContainer zIndex={1} image={token1} />
      <TokenContainer ml={-15} image={token2} />
      <EarnIcon />
      <TokenContainer zIndex={1} image={token3} />
      <TokenContainer ml={-15} image={token4} />
    </Flex>
  )
  const StakeTokenEarnLp = (
    <Flex alignItems="center">
      <TokenContainer image={token1} />
      <EarnIcon />
      <TokenContainer zIndex={1} image={token2} />
      <TokenContainer ml={-15} image={token3} />
    </Flex>
  )

  const displayToReturn = () => {
    if (!stakeLp && !earnLp) {
      return StakeTokenEarnToken
    }
    if (stakeLp && !earnLp) {
      return StakeLpEarnToken
    }
    if (stakeLp && earnLp) {
      return StakeLpEarnLp
    }
    return StakeTokenEarnLp
  }

  return displayToReturn()
}

export default React.memo(ServiceTokenDisplay)
