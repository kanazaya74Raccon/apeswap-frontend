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
  text?: string
}

const CardValue: React.FC<CardValueProps> = ({ value, decimals, fontSize = 'px', prefix, color, text }) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  })

  const StyledTextColor = styled(Text)<{ text: string }>`
    color: ${({ theme }) => (theme.isDark ? 'white' : '#af6e5aff')};
    font-family: ${text === 'poppins' ? 'Poppins' : 'Titan One'};
  `

  const StyledText = styled(Text)<{ text: string }>`
    font-family: ${text === 'poppins' ? 'Poppins' : 'Titan One'};
  `

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return color ? (
    <StyledText bold fontSize={fontSize} color={color} text={text}>
      {prefix} {countUp}
    </StyledText>
  ) : (
    <StyledTextColor bold fontSize={fontSize} color={color} text={text}>
      {prefix} {countUp}
    </StyledTextColor>
  )
}

export default CardValue
