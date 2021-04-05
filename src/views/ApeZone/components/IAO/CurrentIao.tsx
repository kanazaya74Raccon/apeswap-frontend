import React from 'react'
import styled from 'styled-components'
import { BaseLayout, Image } from '@apeswapfinance/uikit'
import { zoneIfo } from 'config/constants'
import useI18n from 'hooks/useI18n'
import IfoCard from '../../../Ifos/components/IfoCard'
import Title from '../../../Ifos/components/Title'

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = zoneIfo.find((ifo) => ifo.isActive)

const Iao = () => {
  const TranslateString = useI18n()

  return (
    <div>
      <Title mb="32px" size="xl">
        {TranslateString(594, 'Golden Banana IAO')}
      </Title>
      <Cards>
        <Image src="/images/ape.png" alt="iao ape" width={537} height={370} responsive />
        <IfoCard ifo={activeIfo} />
      </Cards>
    </div>
  )
}

export default Iao
