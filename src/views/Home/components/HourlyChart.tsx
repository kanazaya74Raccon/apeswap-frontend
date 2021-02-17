import React, { useState } from 'react'
import { Button } from '@apeswapfinance/uikit'

import { useChartData } from 'hooks/api'

import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components'

const Charts = styled.div`
  .apexcharts-tooltip  {
    font-family: Helvetica;
  }
`

const ApexChart = () => {
  const [isDaily, setIsDaily] = useState(false)
  const resolution = isDaily ? '1D' : '60'
  const data = useChartData(resolution)

  const chartConfig = {
    series: [
      {
        data,
      },
    ],
    options: {
      chart: {
        type: 'candlestick',
        toolbar: {
          // show: false
        },
      },
      title: {
        text: `BANANA/BUSD - ${isDaily ? 'Daily' : 'Hourly'}`,
        align: 'left',
        style: {
          fontFamily: 'Titan One',
          fontWeight: 200,
        },
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        labels: {
          formatter(value) {
            return `$ ${value}`
          },
        },
      },
      tooltip: {
        enable: false,
        style: {
          fontSize: '10px',
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#18C08B',
            downward: '#FFB357',
          },
        },
      },
    },
  }

  const onChangeResolution = () => {
    setIsDaily(!isDaily)
  }

  return (
    <Charts>
      <div id="chart-candlestick">
        {data && (
          <ReactApexChart options={chartConfig.options} series={chartConfig.series} type="candlestick" height={560} />
        )}
      </div>
      <Button onClick={onChangeResolution}>{isDaily ? 'Hourly' : 'Daily'}</Button>
      <div id="chart-bar">
        {/* TODO VOLUME <ReactApexChart options={this.state.optionsBar} series={this.state.seriesBar} type="bar" height={160} /> */}
      </div>
    </Charts>
  )
}
export default ApexChart
