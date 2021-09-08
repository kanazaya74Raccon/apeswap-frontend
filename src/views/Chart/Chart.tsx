import React from 'react'
import { Heading } from '@apeswapfinance/uikit'

import { useChartData } from 'hooks/api'

import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

import styled from 'styled-components'

const Charts = styled.div`
  .apexcharts-tooltip {
    font-family: Helvetica;
  }
  margin-bottom: 60px;
`

const ApexChart = () => {
  const resolution = '60'
  const pair = 'BANANA/BUSD'
  const data = useChartData(resolution, pair)
  const base = pair.split('/')[1]

  const chartConfig = {
    series: [
      {
        data: data?.chartData,
      },
    ],
    options: {
      chart: {
        type: 'candlestick',
        id: 'candles',
        toolbar: {
          // show: false
        },
      },
      title: {
        text: pair,
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
            if (base === 'BUSD') return `$ ${value}`
            return `${value.toFixed(5)} ${base}`
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

  return (
    <Charts>
      <Heading as="h2" size="xl" mb="24px" mt="24px" color="secondary">
        The chart is temporarily down for now. Please bear with us as we update our data sources!
      </Heading>
      <div id="chart-candlestick">
        {data?.chartData && (
          <ReactApexChart
            options={(chartConfig.options as unknown) as ApexOptions}
            series={chartConfig.series}
            type="candlestick"
            height={560}
          />
        )}
      </div>
      {/* data?.volume && (
      <div id="chart-bar">
        <ReactApexChart options={seriesConfig.optionsBar} series={seriesConfig.seriesBar} type="bar" height={160} />
      </div>
      ) */}
      {/* <Buttons>
        <Button onClick={() => onChangeResolution('60')} disabled={resolution === '60'}>
          Hourly
        </Button>
        <Button onClick={() => onChangeResolution('1D')} disabled={resolution === '1D'}>
          Daily
        </Button>
      </Buttons>
      <Buttons>
        <Button onClick={() => togglePair('BANANA/BUSD')} disabled={pair === 'BANANA/BUSD'}>
          BANANA/BUSD
        </Button>
        <Button onClick={() => togglePair('BANANA/BNB')} disabled={pair === 'BANANA/BNB'}>
          BANANA/BNB
        </Button>
      </Buttons> */}
    </Charts>
  )
}
export default ApexChart
