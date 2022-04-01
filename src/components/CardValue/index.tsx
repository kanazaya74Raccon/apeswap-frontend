import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useCountUp } from 'react-countup'
import { Text } from '@apeswapfinance/uikit'

interface CardValueProps {
  value: number
  decimals?: number
  fontSize?: string
  fontFamily?: string
  prefix?: string
  color?: string
  text?: string
  fontWeight?: number
  differentFontSize?: string
  top?: string
}

const CardValue: React.FC<CardValueProps> = ({
  value,
  decimals,
  fontSize = 'px',
  prefix,
  color,
  fontFamily,
  fontWeight,
  top,
  differentFontSize,
}) => {
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
    margin-top: ${top || 0};
    font-weight: ${fontWeight || 400};
    ${({ theme }) => theme.mediaQueries.xl} {
      font-size: ${differentFontSize || fontSize};
    }
  `

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return (
    <StyledText fontSize={fontSize} color={color} fontWeight={fontWeight} fontFamily={fontFamily}>
      {prefix} {countUp}
    </StyledText>
  )
}

export default CardValue
