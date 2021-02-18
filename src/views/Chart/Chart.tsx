import React, { useState } from 'react'
import { Button } from '@apeswapfinance/uikit'

import { useChartData } from 'hooks/api'

import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components'

const Charts = styled.div`
  .apexcharts-tooltip  {
    font-family: Helvetica;
  }
  margin-bottom: 60px;
`
const Buttons = styled.div`
  text-align: center;
  button {
    margin: 10px;
  }
`

const ApexChart = () => {
  const [resolution, setResolution] = useState('60')
  const [pair, setPair] = useState('BANANA/BUSD')
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
            if (base === 'BUSD')
              return `$ ${value}`
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

  const seriesConfig = {
    seriesBar: [{
    name: 'volume',
    data: data?.volume.data
  }],
  optionsBar: {
    chart: {
      height: 160,
      type: 'bar',
      brush: {
        enabled: true,
        target: 'candles'
      },
      selection: {
        enabled: true,
        xaxis: {
          min: data?.volume.start,
          max: data?.volume.end
        },
        fill: {
          color: '#ccc',
          opacity: 1
        },
        stroke: {
          color: '#0D47A1',
        }
      },
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        columnWidth: '20%',
        colors: {
          ranges: [{
            from: 1000000,
            to: 50000000000,
            color: '#FAFAFA'
          }, {
            from: 50000000000,
            to: 1000000000000,
            color: '#FAFAFA'
          }],
    
        },
      }
    },
    stroke: {
      width: 0
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        offsetX: 13
      }
    },
    yaxis: {
      labels: {
        show: true
      }
    }
  },
};




  const onChangeResolution = (newResolution) => {
    setResolution(newResolution)
  }

  const togglePair = (newPair) => {

    setPair(newPair)
  }

  return (
    <Charts>
      <div id="chart-candlestick">
        {data?.chartData && (
          <ReactApexChart options={chartConfig.options} series={chartConfig.series} type="candlestick" height={560} />
        )}
      </div>
      {/* data?.volume && (
      <div id="chart-bar">
        <ReactApexChart options={seriesConfig.optionsBar} series={seriesConfig.seriesBar} type="bar" height={160} />
      </div>
      ) */}
      <Buttons>
        {/* <Button onClick={() => onChangeResolution('5')}>5 Minute</Button> */}
        <Button onClick={() => onChangeResolution('60')} disabled={resolution === '60'}>Hourly</Button>
        <Button onClick={() => onChangeResolution('1D')} disabled={resolution === '1D'}>Daily</Button>
        {/* <Button onClick={() => onChangeResolution('1W')}>Weekly</Button> */}
      </Buttons> 
      <Buttons>
        <Button onClick={() => togglePair('BANANA/BUSD')} disabled={pair === 'BANANA/BUSD'}>BANANA/BUSD</Button>
        <Button onClick={() => togglePair('BANANA/BNB')} disabled={pair === 'BANANA/BNB'}>BANANA/BNB</Button>
      </Buttons>
    </Charts>
  )
}
export default ApexChart