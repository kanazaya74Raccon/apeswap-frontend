import { useEffect, useState } from 'react'

/*
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/pancakeswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
export const baseUrl = 'https://api.pancakeswap.com/api/v1'

const priceBaseUrl =
  'https://ape-swap-api.herokuapp.com/pairs?symbol=BSC_NONAME&address=0x7bd46f6da97312ac2dbd1749f82e202764c0b914&token=BANANA&base=BUSD&from=0&to=1613560264'

/* eslint-disable camelcase */

export interface TradePair {
  swap_pair_contract: string
  base_symbol: string
  quote_symbol: string
  last_price: number
  base_volume_24_h: number
  quote_volume_24_h: number
}

export interface ApiStatResponse {
  update_at: string
  '24h_total_volume': number
  total_value_locked: number
  total_value_locked_all: number
  trade_pairs: {
    [key: string]: TradePair
  }
}

export const useGetStats = () => {
  const [data, setData] = useState<ApiStatResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/stat`)
        const responsedata: ApiStatResponse = await response.json()

        setData(responsedata)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export const useChartData = (resolution = '60') => {
  const [data, setData] = useState<any | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${priceBaseUrl}&resolution=${resolution}`)
        const responsedata = await response.json()
        const chartData = []
        for (let i = 0; i < responsedata.c.length; i++) {
          const candle = {
            x: new Date(responsedata.t[i] * 1000),
            y: [responsedata.o[i], responsedata.h[i], responsedata.l[i], responsedata.c[i]],
          }
          chartData.push(candle)
        }
        setData(chartData)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData, resolution])

  return data
}
