import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useCountUp } from 'react-countup'
import { Text } from '@apeswapfinance/uikit'

interface CardValueProps {
  value: number
  decimals?: number
  fontSize?: string
  prefix?: string
  color?: string
}

const CardValue: React.FC<CardValueProps> = ({ value, decimals, fontSize = 'px', prefix, color }) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  })

  const StyledText = styled(Text)`
    color: ${({ theme }) => (theme.isDark ? 'white' : '#af6e5aff')};
  `

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return color ? (
    <Text bold fontSize={fontSize} color={color}>
      {prefix} {countUp}
    </Text>
  ) : (
    <StyledText bold fontSize={fontSize} color={color}>
      {prefix} {countUp}
    </StyledText>
  )
}

export default CardValue
