import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'

interface DonutChartProps {
  items: {
    label: string
    value: number
    color: string
    angleOffset?: string
    angleRotate?: string
  }[]
  title: string
}

const chartAnimation = keyframes`
    0%{stroke-dashoffset: 0}
`

const ChartWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 500px;
  }
`

const ChartSvg = styled.svg`
  position: relative;
  border: 1px solid red;
  ${({ theme }) => theme.mediaQueries.md} {
    position: absolute;
    height: 100%;
    width: 100%;
  }
`

const ChartCircle = styled.circle`
  height: 100px;
  width: 200px;
  animation: ${chartAnimation} 2s;
`

const GraphCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid red;
  ${({ theme }) => theme.mediaQueries.md} {
    align-items: flex-start;
    margin-left: 335px;
  }
`

const GraphCard = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  height: 35px;
  width: 30px;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-right: 15px;
`

const IconAndTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const StyledText = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
`

const StyledHeader = styled(Text)`
  position: absolute;
  top: 20px;
  font-family: Poppins;
  font-weight: 700;
  font-size: 22px;
  line-height: 27px;
  margin-top: 15px;
`

// Creating a svg chart to have more control over design
const DonutChart: React.FC<DonutChartProps> = ({ items, title }) => {
  const { isMd, isSm } = useMatchBreakpoints()
  const isMobile = isMd || isSm

  const calculateOffset = (val) => {
    return circumference - getPercent(val) * circumference
  }
  const getPercent = (val) => {
    return val / total
  }
  const strokeWidth = 6
  const cx = isMobile ? 50 : 25
  const cy = isMobile ? 64 : 52
  const r = 29
  const circumference = Math.PI * 2 * r
  const total = items.reduce((a, b) => a + b.value, 0)
  const sortedItems = items.sort((a, b) => (a.value > b.value ? -1 : 1))
  let angleOffset = -90
  const offsetChart = sortedItems.map((item, i) => {
    const temp = {
      ...item,
      angleOffset,
      angleRotate: `rotate(${angleOffset}, ${cx}, ${cy})`,
    }
    angleOffset = getPercent(item.value) * 360 + angleOffset
    return temp
  })

  return (
    <ChartWrapper>
      <StyledHeader>{title}</StyledHeader>
      <ChartSvg viewBox="0 0 100 100">
        <ChartCircle cx={cx} cy={cy} r={r - strokeWidth / 2} fill="transparent" stroke="white" strokeWidth={0.5} />
        <ChartCircle cx={cx} cy={cy} r={r + strokeWidth / 2} fill="transparent" stroke="white" strokeWidth={0.5} />
        <ChartCircle cx={cx} cy={cy} r={r} fill="transparent" stroke="white" strokeWidth={strokeWidth} />
        {offsetChart.map((item) => (
          <ChartCircle
            cx={cx}
            cy={cy}
            r={r}
            fill="transparent"
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference - 0.4}
            strokeDashoffset={calculateOffset(item.value)}
            transform={item.angleRotate}
          />
        ))}
      </ChartSvg>
      <GraphCardWrapper>
        {offsetChart.map((item) => (
          <IconAndTextWrapper>
            <GraphCard color={item.color} />
            <StyledText>
              {item.label.toUpperCase()} - {(getPercent(item.value) * 100).toFixed(0)}%
            </StyledText>
          </IconAndTextWrapper>
        ))}
      </GraphCardWrapper>
    </ChartWrapper>
  )
}

export default React.memo(DonutChart)
