import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@apeswapfinance/uikit'

import { calculateBananaEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpers'
import { useTranslation } from 'contexts/Localization'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  lpLabel?: string
  rewardTokenName?: string
  rewardTokenPrice?: number
  apy?: number
  addLiquidityUrl?: string
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 24px;
`

const GridItem = styled.div`
  margin-bottom: 10px;
`

const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  lpLabel,
  rewardTokenName,
  rewardTokenPrice,
  apy,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()
  const farmApy = new BigNumber(apy).times(new BigNumber(100)).toNumber()
  const tokenPrice =
    typeof rewardTokenPrice === 'number' ? rewardTokenPrice : new BigNumber(rewardTokenPrice).toNumber()
  const oneThousandDollarsWorthOfBanana = 1000 / tokenPrice

  const bananaEarnedPerThousand1D = calculateBananaEarnedPerThousandDollars({
    numberOfDays: 1,
    farmApy,
    rewardTokenPrice,
  })
  const bananaEarnedPerThousand7D = calculateBananaEarnedPerThousandDollars({
    numberOfDays: 7,
    farmApy,
    rewardTokenPrice,
  })
  const bananaEarnedPerThousand30D = calculateBananaEarnedPerThousandDollars({
    numberOfDays: 30,
    farmApy,
    rewardTokenPrice,
  })
  const bananaEarnedPerThousand365D = calculateBananaEarnedPerThousandDollars({
    numberOfDays: 365,
    farmApy,
    rewardTokenPrice,
  })

  return (
    <Modal onDismiss={onDismiss} title={t('ROI')}>
      <Grid>
        <GridItem>
          <Text fontSize="12px" color="gray" textTransform="uppercase" mb="20px">
            {t('Timeframe')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" color="gray" textTransform="uppercase" mb="20px">
            {t('ROI')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" color="gray" textTransform="uppercase" mb="20px">
            {rewardTokenName}
            {t(' per $1000')}
          </Text>
        </GridItem>
        {/* 1 day row */}
        <GridItem>
          <Text>{t('1d')}</Text>s
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: bananaEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfBanana })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{bananaEarnedPerThousand1D}</Text>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <Text>{t('7d')}</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: bananaEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfBanana })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{bananaEarnedPerThousand7D}</Text>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <Text>{t('30d')}</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: bananaEarnedPerThousand30D, amountInvested: oneThousandDollarsWorthOfBanana })}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text>{bananaEarnedPerThousand30D}</Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem>
          <Text>{`${t('365d')}(${t('APY')})}`}</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({
              amountEarned: bananaEarnedPerThousand365D,
              amountInvested: oneThousandDollarsWorthOfBanana,
            })}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text>{bananaEarnedPerThousand365D}</Text>
        </GridItem>
      </Grid>
      <Description fontSize="12px" color="gray">
        {t(
          'Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
        )}
      </Description>
      <Flex justifyContent="center">
        <LinkExternal href={addLiquidityUrl}>
          {t('Get')} {lpLabel}
        </LinkExternal>
      </Flex>
    </Modal>
  )
}

export default ApyCalculatorModal
