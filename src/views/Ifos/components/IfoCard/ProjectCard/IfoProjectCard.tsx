import React from 'react'
import { Heading, Text } from '@apeswapfinance/uikit'
import { ifosConfig } from 'config/constants'
import ApeZone from 'config/constants/apezone'
import { useTranslation } from 'contexts/Localization'
import IfoCardDescription from '../CardDescription/IfoCardDescription'
import LinearVestingCard from '../LinearVesting'
import FourPhaseVestingCard from '../FourPhaseVesting'

import { StyledIfoCard, Banner, Content, CardListBox } from './styles'

interface IfoCardProps {
  ifoId: string
}

const IfoProjectCard: React.FC<IfoCardProps> = ({ ifoId }) => {
  const ifo = React.useMemo(() => ifosConfig.find((each) => each.id === ifoId), [ifoId])
  const { t } = useTranslation()
  const gnanaIfo = React.useMemo(() => ApeZone(t).ifos.find((each) => each.id === ifoId), [ifoId]) // TODO: Double check if this is correct GNANA project info

  if (!ifo) {
    console.warn(`For project:${ifoId}, ifo configuration is not found`, ifo)
    return null
  }

  const { id, subTitle, description, launchDate, launchTime, projectSiteUrl } = ifo

  return (
    <StyledIfoCard ifoId={id}>
      <Banner src={`/images/ifos/${ifoId}-bg.svg`} alt={ifoId} />
      <Content>
        <Heading as="h3" fontWeight={400}>
          {subTitle}
        </Heading>

        {/* // TODO: Cannot use block number for the countdown link, as this is the card for the project, not specific to each offering (IAOLinearVesting contract), so `startBlock` is not available */}
        <Text fontSize="14px" color="yellow" fontWeight={600}>
          On {launchDate}, {launchTime}
        </Text>

        <CardListBox>
          {ifo.isLinear ? <LinearVestingCard ifo={ifo} /> : <FourPhaseVestingCard ifo={ifo} />}

          {gnanaIfo?.isLinear && <LinearVestingCard ifo={gnanaIfo} gnana />}

          {!!gnanaIfo && !gnanaIfo.isLinear && <FourPhaseVestingCard gnana ifo={gnanaIfo} />}
        </CardListBox>

        <IfoCardDescription description={description} projectSiteUrl={projectSiteUrl} defaultIsOpen />
      </Content>
    </StyledIfoCard>
  )
}

export default React.memo(IfoProjectCard)
