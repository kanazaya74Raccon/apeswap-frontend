import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { BLOCKS_PER_YEAR, BANANA_PER_BLOCK, BANANA_POOL_PID } from 'config'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import { useFetchFarmsHome } from 'state/strapi/fetchStrapi'
import { useFarmFromPid, usePriceBnbBusd, usePriceEthBusd, usePriceBananaBusd } from 'state/hooks'
import FarmCardForHome from './FarmCardForHome'

const HotFarmsWrapper = styled.div`
  position: relative;
  height: 321px;
  width: 336px;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/ape-home-hot-farms-dark.svg)' : 'url(/images/ape-home-hot-farms-mobile-light.svg)'};
  border-radius: 30px;
  background-repeat: no-repeat;
  background-size: cover;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 718px;
    height: 203px;
    background-image: ${({ theme }) =>
      theme.isDark ? 'url(/images/ape-home-hot-farms-dark.svg)' : 'url(/images/ape-home-hot-farms-light.svg)'};
  }
`

const CardHeaderImage = styled.div`
  position: absolute;
  background: ${({ theme }) => !theme.isDark && `linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%)`};
  opacity: 0.3;
  height: 321px;
  width: 100%;
  border-radius: 30px;
  z-index: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 203px;
  }
`

const HotFarmsText = styled(Text)`
  position: relative;
  margin-top: 10px;
  font-size: 38px;
  text-align: center;
  color: #ffffff;
  z-index: 1;
`

const FarmWrapper = styled.div`
  margin-top: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: space-between;
    padding-left: 25px;
    padding-right: 25px;
    flex-direction: row;
    margin-top: 20px;
  }
`

const DEFAULT_FARM = 1

const HotFarms = () => {
  const { farmsData, loading } = useFetchFarmsHome()
  const bnbPrice = usePriceBnbBusd()
  const ethPriceUsd = usePriceEthBusd()
  const bananaPrice = usePriceBananaBusd()
  let farmsFetched = []

  const farmsList = useCallback(
    (farmsToDisplay) => {
      const bananaPriceVsBNB = new BigNumber(
        farmsToDisplay.find((farm) => farm.pid === BANANA_POOL_PID)?.tokenPriceVsQuote || 0,
      )
      const farmsToDisplayWithAPR = farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const bananaRewardPerBlock = BANANA_PER_BLOCK.times(farm.poolWeight)
        const bananaRewardPerYear = bananaRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apr = bananaPriceVsBNB.times(bananaRewardPerYear).div(farm.lpTotalInQuoteToken)

        if (farm.quoteTokenSymbol === QuoteToken.BUSD || farm.quoteTokenSymbol === QuoteToken.UST) {
          apr = bananaPriceVsBNB.times(bananaRewardPerYear).div(farm.lpTotalInQuoteToken).times(bnbPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          apr = bananaPrice.div(ethPriceUsd).times(bananaRewardPerYear).div(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.BANANA) {
          apr = bananaRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const bananaApr =
            farm && bananaPriceVsBNB.times(bananaRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApr =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apr = new BigNumber((bananaApr && dualApr && bananaApr.plus(dualApr)).times(100))
        }
        return { ...farm, apr, bananaPrice }
      })
      return farmsToDisplayWithAPR
    },
    [bnbPrice, ethPriceUsd, bananaPrice],
  )

  const pid1 = parseInt(farmsData[0]?.pid1) ? parseInt(farmsData[0]?.pid1) : DEFAULT_FARM
  const pid2 = parseInt(farmsData[0]?.pid2) ? parseInt(farmsData[0]?.pid2) : DEFAULT_FARM
  const farmsToFetch = [  useFarmFromPid(1), useFarmFromPid(pid1), useFarmFromPid(pid2)]
  if (!loading) {
    farmsFetched = farmsList(farmsToFetch)
  }
  return (
    <>
      <HotFarmsWrapper>
        <CardHeaderImage />
        <HotFarmsText>Hot Farms</HotFarmsText>
        <FarmWrapper>
          {farmsFetched.slice(1).map((farm) => (
            <a href="https://apeswap.finance/farms" rel="noopener noreferrer">
              <FarmCardForHome farm={farm} />
            </a>
          ))}
        </FarmWrapper>
      </HotFarmsWrapper>
    </>
  )
}

export default HotFarms
