import { Flex } from '@apeswapfinance/uikit'
import { BillsArrow } from 'components/Icons'
import React from 'react'
import { EarnIcon, TokenContainer } from './styles'

interface ServiceTokenDisplayProps {
  token1: string
  token2?: string
  token3?: string
  token4?: string
  stakeLp?: boolean
  earnLp?: boolean
  noEarnToken?: boolean
  iconFill?: string
  size?: number
  billArrow?: boolean
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
  iconFill,
  size,
  billArrow,
  stakeLp = false,
  earnLp = false,
  noEarnToken = false,
}) => {
  const token1Urls = setUrls(token1)
  const token2Urls = token2 ? setUrls(token2) : []
  const token3Urls = token3 ? setUrls(token3) : []
  const token4Urls = token4 ? setUrls(token4) : []

  const LpToken = (
    <Flex alignItems="center">
      <TokenContainer zIndex={1} srcs={token1Urls} size={size} />
      <TokenContainer ml={-15} srcs={token2Urls} size={size} />
    </Flex>
  )

  const StakeTokenEarnToken = (
    <Flex alignItems="center">
      <TokenContainer srcs={token1Urls} size={size} />
      <EarnIcon color={iconFill} />
      <TokenContainer srcs={token2Urls} size={size} />
    </Flex>
  )

  const StakeLpEarnToken = (
    <Flex alignItems="center">
      <TokenContainer zIndex={1} srcs={token1Urls} size={size} />
      <TokenContainer ml={-15} srcs={token2Urls} size={size} />
      {billArrow ? <BillsArrow /> : <EarnIcon color={iconFill} />}
      <TokenContainer srcs={token3Urls} size={size} />
    </Flex>
  )
  const StakeLpEarnLp = (
    <Flex alignItems="center">
      <TokenContainer zIndex={1} srcs={token1Urls} size={size} />
      <TokenContainer ml={-15} srcs={token2Urls} size={size} />
      <EarnIcon color={iconFill} />
      <TokenContainer zIndex={1} srcs={token3Urls} size={size} />
      {token4 !== undefined && <TokenContainer ml={-15} srcs={token4Urls} size={size} />}
    </Flex>
  )
  const StakeTokenEarnLp = (
    <Flex alignItems="center">
      <TokenContainer srcs={token1Urls} size={size} />
      <EarnIcon color={iconFill} />
      <TokenContainer zIndex={1} srcs={token2Urls} size={size} />
      <TokenContainer ml={-15} srcs={token3Urls} size={size} />
    </Flex>
  )

  const displayToReturn = () => {
    if (noEarnToken) {
      return LpToken
    }
    if (token1 && !token2 && !token3 && !token4) {
      return (
        <Flex alignItems="center">
          <TokenContainer srcs={token1Urls} size={size} />
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
