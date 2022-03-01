import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import farms from 'config/constants/farms'
import { Farm } from 'state/types'
import { useFetchFarmsHome } from 'state/strapi/fetchStrapi'
import { useFarmFromPid, useFetchLpTokenPrices, usePollFarms } from 'state/hooks'
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

const HotFarms = () => {
  usePollFarms()
  useFetchLpTokenPrices()
  const { farmsData, loading } = useFetchFarmsHome()

  const farmMustBeUnder = farms.reduce((prev, curr) => (prev.pid > curr.pid ? prev : curr)).pid

  let pid1 = parseInt(farmsData[0]?.pid1) || DEFAULT_FARM
  let pid2 = parseInt(farmsData[0]?.pid2) || DEFAULT_FARM
  if (pid1 > farmMustBeUnder) {
    pid1 = DEFAULT_FARM
  }
  if (pid2 > farmMustBeUnder) {
    pid2 = DEFAULT_FARM
  }
  const fetchedFarms = [useFarmFromPid(pid1), useFarmFromPid(pid2)]

  return (
    <>
      <HotFarmsWrapper>
        <CardHeaderImage />
        <HotFarmsText fontWeight={800}>Hot Farms</HotFarmsText>
        <FarmWrapper>
          {loading ? (
            <></>
          ) : (
            fetchedFarms.map((farm: Farm) => (
              <a href="https://apeswap.finance/farms" rel="noopener noreferrer" key={farm?.pid}>
                <FarmCardForHome farm={farm} key={farm?.pid} />
              </a>
            ))
          )}
        </FarmWrapper>
      </HotFarmsWrapper>
    </>
  )
}

export default HotFarms
