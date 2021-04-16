import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from '@apeswapfinance/uikit'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import { useFarms, usePriceBnbBusd, usePriceEthBusd } from 'state/hooks'
import { BLOCKS_PER_YEAR, BANANA_PER_BLOCK, BANANA_POOL_PID } from 'config'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  flex: 1;
  background: ${({ theme }) => (theme.isDark ? '#27262c' : '#A16552')};
  width: 100%;
  max-height: 160px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    max-height: 275px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    max-height: 140px;
    margin-bottom: 32px;
  }
`
const VerticalBody = styled(CardBody)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledFlex = styled(Flex)`
  margin-top: auto;
  align-items: center;
  margin-left: auto;
`

const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  font-size: 30px;
  line-height: 45px;
  text-align: center;
  letter-spacing: 0.05em;

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 22px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    font-size: 28px;
  }
`

const StyledHeading = styled(Heading)`
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.05em;
`

const StyledNavLink = styled(NavLink)`
  width: 100%;
  height: 100%;
`

const EarnAPYCard = () => {
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const bnbPrice = usePriceBnbBusd()
  const ethPriceUsd = usePriceEthBusd()

  const maxAPY = useRef(Number.MIN_VALUE)

  const getHighestAPY = () => {
    const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')

    calculateAPY(activeFarms)

    return (maxAPY.current * 100).toLocaleString('en-US').slice(0, -1)
  }

  const calculateAPY = useCallback(
    (farmsToDisplay) => {
      const bananaPriceVsBNB = new BigNumber(
        farmsLP.find((farm) => farm.pid === BANANA_POOL_PID)?.tokenPriceVsQuote || 0,
      )

      farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const bananaRewardPerBlock = BANANA_PER_BLOCK.times(farm.poolWeight)
        const bananaRewardPerYear = bananaRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = bananaPriceVsBNB.times(bananaRewardPerYear).div(farm.lpTotalInQuoteToken)

        if (farm.quoteTokenSymbol === QuoteToken.BUSD) {
          apy = bananaPriceVsBNB.times(bananaRewardPerYear).div(farm.lpTotalInQuoteToken).times(bnbPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.BANANA) {
          apy = bananaRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          apy = bananaPriceVsBNB.div(ethPriceUsd).times(bananaRewardPerYear).div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const bananaApy =
            farm && bananaPriceVsBNB.times(bananaRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apy = bananaApy && dualApy && bananaApy.plus(dualApy)
        }
        if (maxAPY.current < apy.toNumber()) {
          maxAPY.current = apy.toNumber()
        }

        return apy
      })
    },
    [bnbPrice, farmsLP, ethPriceUsd],
  )

  return (
    <StyledFarmStakingCard>
      <StyledNavLink to="/farms">
        <img
          width="250px"
          style={{ opacity: 0.1, position: 'absolute', right: '-80px', top: '0px' }}
          src="/images/monkey.svg"
          alt="monkey"
        />
        <VerticalBody>
          <Heading color="white" size="sm" fontSize="16px" mb="12px">
            {TranslateString(736, 'Earn up to APR')}
          </Heading>
          <CardMidContent color="white">
            {getHighestAPY() ? `${getHighestAPY()}%` : <Skeleton animation="pulse" variant="rect" height="44px" />}
          </CardMidContent>
          <StyledFlex justifyContent="flex-end">
            <StyledHeading color="white" size="sm" mt="15px" fontFamily="poppins">
              In Farms
            </StyledHeading>
            <ArrowForwardIcon mt={15} color="white" />
          </StyledFlex>
        </VerticalBody>
      </StyledNavLink>
    </StyledFarmStakingCard>
  )
}

export default EarnAPYCard
