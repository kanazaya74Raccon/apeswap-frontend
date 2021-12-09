import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Text, useMatchBreakpoints, Skeleton } from '@apeswapfinance/uikit'

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

// Creating a svg chart to have more control over design
const DonutChart: React.FC<DonutChartProps> = ({ items, title }) => {
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs

  const calculateOffset = (val) => {
    return circumference - getPercent(val) * circumference
  }
  const getPercent = (val) => {
    return val / total
  }
  const strokeWidth = 3
  const cx = isMobile ? 25 : 12.5
  const cy = isMobile ? 32 : 26
  const r = 14.5
  const circumference = Math.PI * 2 * r
  const total = items.reduce((a, b) => a + b.value, 0)
  const sortedItems = items.sort((a, b) => (a.value > b.value ? -1 : 1))
  let angleOffset = -90
  const offsetChart = sortedItems.map((item) => {
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
      <StyledHeader>{title.includes('null') ? <Skeleton width="200px" height="35px" /> : title}</StyledHeader>
      <ChartContainer>
        <ChartSvg viewBox="0 0 50 50">
          <ChartCircle cx={cx} cy={cy} r={r - strokeWidth / 2} fill="transparent" stroke="white" strokeWidth={0.3} />
          <ChartCircle cx={cx} cy={cy} r={r + strokeWidth / 2} fill="transparent" stroke="white" strokeWidth={0.3} />
          <ChartCircle cx={cx} cy={cy} r={r} fill="transparent" stroke="white" strokeWidth={strokeWidth} />
          {offsetChart.map((item) => (
            <ChartCircle
              cx={cx}
              cy={cy}
              r={r}
              fill="transparent"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference - 0.2}
              strokeDashoffset={calculateOffset(item.value)}
              transform={item.angleRotate}
            />
          ))}
        </ChartSvg>
      </ChartContainer>
      <GraphCardWrapper>
        {offsetChart.map((item) => (
          <IconAndTextWrapper>
            <GraphCard color={item.color} />
            <StyledText>
              {item.value.toString() === 'NaN' ? (
                <Skeleton width="150px" height="35px" />
              ) : (
                `${item.label.toUpperCase()} - ${(getPercent(item.value) * 100).toFixed(1)}%`
              )}
            </StyledText>
          </IconAndTextWrapper>
        ))}
      </GraphCardWrapper>
    </ChartWrapper>
  )
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
  height: 100%;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    position: absolute;
  }
`

const ChartContainer = styled.div`
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
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    align-items: flex-start;
    margin-left: 335px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
`

const GraphCard = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  height: 25px;
  width: 20px;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-right: 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 35px;
    width: 30px;
  }
`

const IconAndTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const StyledText = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`

const StyledHeader = styled(Text)`
  display: flex;
  position: absolute;
  top: 10px;
  font-family: Poppins;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  margin-top: 15px;
  height: 50px;
  justify-content: center;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 22px;
    top: 20px;
  }
`

export default React.memo(DonutChart)
