import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useTvl } from 'state/hooks'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  const newTvl = useTvl()
  const tvl = newTvl.toNumber()
  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          {TranslateString(999, 'Total Value Locked (TVL)')}
        </Heading>
        {tvl ? (
          <>
            <CardValue fontSize="40px" decimals={0} value={tvl} prefix="$" />
            <Text color="textSubtle">{TranslateString(999, 'Across all LPs and BananaSplit Pools')}</Text>
          </>
        ) : (
          <>
            <Skeleton height={66} />
          </>
        )}
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
