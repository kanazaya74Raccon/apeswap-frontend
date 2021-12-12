import React, { useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'
import { Text } from '@apeswapfinance/uikit'

interface CardValueProps {
  value: number
  decimals?: number
  fontSize?: string
  prefix?: string
  suffix?: string
  fontFamily?: string
}

const CardValue: React.FC<CardValueProps> = ({ value, decimals, fontSize = '40px', prefix, suffix, fontFamily }) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  })

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return (
    <Text fontFamily={fontFamily} fontSize={fontSize}>
      {prefix} {countUp} {suffix}
    </Text>
  )
}

export default CardValue
