import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { BLOCKS_PER_YEAR, BANANA_PER_BLOCK, BANANA_POOL_PID } from 'config'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import farms from 'config/constants/farms'
import { useFetchFarmsHome } from 'state/strapi/fetchStrapi'
import { useFarmFromPid, usePriceBnbBusd, usePriceEthBusd, usePriceBananaBusd, useDualFarmsFromPid } from 'state/hooks'
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
  @media screen and (max-width: 350px) {
    width: 300px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 718px;
    height: 203px;
    background-image: ${({ theme }) =>
      theme.isDark ? 'url(/images/ape-home-hot-farms-dark.svg)' : 'url(/images/ape-home-hot-farms-light.svg)'};
  }
`

const CardHeaderImage = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.isDark ? 'rgba(184, 152, 237, .35)' : 'rgba(184, 152, 237, .7)'};
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
  @media screen and (max-width: 350px) {
    width: 310px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: space-between;
    padding-left: 25px;
    padding-right: 25px;
    flex-direction: row;
    margin-top: 20px;
  }
`

const DEFAULT_FARM = 1
const DEFAULT_FARM_TWO = 2

const DualHotFarms = () => {
  const pid1 = DEFAULT_FARM
  const pid2 = DEFAULT_FARM_TWO

  const farmsToDisplay = [useDualFarmsFromPid(pid1), useDualFarmsFromPid(pid2)]

  return (
    <>
      <HotFarmsWrapper>
        <CardHeaderImage />
        <HotFarmsText>Hot Farms</HotFarmsText>
        <FarmWrapper>
          {farmsToDisplay.map((farm) => (
            <a href="https://apeswap.finance/farms" rel="noopener noreferrer">
              <FarmCardForHome farm={farm} />
            </a>
          ))}
        </FarmWrapper>
      </HotFarmsWrapper>
    </>
  )
}

export default DualHotFarms
