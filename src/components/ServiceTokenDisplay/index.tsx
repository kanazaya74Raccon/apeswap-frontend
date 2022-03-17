import { Flex } from '@apeswapfinance/uikit'
import React from 'react'
import { EarnIcon, TokenContainer } from './styles'

interface ServiceTokenDisplayProps {
  token1: string
  token2?: string
  token3?: string
  token4?: string
  stakeLp?: boolean
  earnLp?: boolean
}

const setUrls = (tokenSymbol: string) => {
  return [
    `https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${tokenSymbol.toUpperCase()}.svg`,
    `https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${tokenSymbol.toUpperCase()}.png`,
  ]
}

const ServiceTokenDisplay: React.FC<ServiceTokenDisplayProps> = ({
  token1,
  token2,
  token3,
  token4,
  stakeLp = false,
  earnLp = false,
}) => {
  const token1Urls = setUrls(token1)
  const token2Urls = token2 ? setUrls(token2) : []
  const token3Urls = token3 ? setUrls(token3) : []
  const token4Urls = token4 ? setUrls(token4) : []

  const StakeTokenEarnToken = (
    <Flex alignItems="center">
      <TokenContainer srcs={token1Urls} />
      <EarnIcon />
      <TokenContainer srcs={token2Urls} />
    </Flex>
  )

  const StakeLpEarnToken = (
    <Flex alignItems="center">
      <TokenContainer zIndex={1} srcs={token1Urls} />
      <TokenContainer ml={-15} srcs={token2Urls} />
      <EarnIcon />
      <TokenContainer srcs={token3Urls} />
    </Flex>
  )
  const StakeLpEarnLp = (
    <Flex alignItems="center">
      <TokenContainer zIndex={1} srcs={token1Urls} />
      <TokenContainer ml={-15} srcs={token2Urls} />
      <EarnIcon />
      <TokenContainer zIndex={1} srcs={token3Urls} />
      <TokenContainer ml={-15} srcs={token4Urls} />
    </Flex>
  )
  const StakeTokenEarnLp = (
    <Flex alignItems="center">
      <TokenContainer srcs={token1Urls} />
      <EarnIcon />
      <TokenContainer zIndex={1} srcs={token2Urls} />
      <TokenContainer ml={-15} srcs={token3Urls} />
    </Flex>
  )

  const displayToReturn = () => {
    if (token1 && !token2 && !token3 && !token4) {
      return (
        <Flex alignItems="center">
          <TokenContainer srcs={token1Urls} />{' '}
        </Flex>
      )
    }
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
