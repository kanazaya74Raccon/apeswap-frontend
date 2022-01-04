import React from 'react'
import styled from 'styled-components'
import { Card, Heading, Text } from '@apeswapfinance/uikit'
import { zoneIfo, ifosConfig } from 'config/constants'
import IfoCardDescription from './IfoCardDescription'
import LinearVestingCard from './LinearVesting'
import FourPhaseVestingCard from './FourPhaseVesting'

const StyledIfoCard = styled(Card)<{ ifoId: string }>`
  margin-left: auto;
  margin-right: auto;
  border-radius: 50px;
  width: 100%;
  margin-bottom: 26px;
`

const Banner = styled.img`
  width: 100%;
  height: 135px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 30px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px 50px;
  }
`

const CardListBox = styled.div`
  display: flex;
  padding: 20px 0px;
  gap: 20px;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }

  > div {
    flex: 1;
  }
`

interface IfoCardProps {
  ifoId: string
}

const IfoProjectCard: React.FC<IfoCardProps> = ({ ifoId }) => {
  const ifo = React.useMemo(() => ifosConfig.find((each) => each.id === ifoId), [ifoId])
  const gnanaIfo = React.useMemo(() => zoneIfo.find((each) => each.id === ifoId), [ifoId]) // TODO: Double check if this is correct GNANA project info

  if (!ifo) {
    console.warn(`For project:${ifoId}, ifo configuration is not found`, ifo)
    return null
  }

  const { id, subTitle, description, launchDate, launchTime, projectSiteUrl } = ifo

  return (
    <StyledIfoCard ifoId={id}>
      <Banner src={`/images/ifos/${ifoId}-bg.svg`} alt={ifoId} />
      <Content>
        <Heading fontFamily="poppins" as="h3" fontWeight={700}>
          {subTitle}
        </Heading>

        {/* // TODO: Cannot use block number for the countdown link, as this is the card for the project, not specific to each offering (IAOLinearVesting contract), so `startBlock` is not available */}
        <Text fontSize="14px" color="yellow" fontWeight={700}>
          On {launchDate}, {launchTime}
        </Text>

        <CardListBox>
          {ifo.isLinear ? <LinearVestingCard ifo={ifo} /> : <FourPhaseVestingCard ifo={ifo} />}

          {gnanaIfo?.isLinear && <LinearVestingCard ifo={gnanaIfo}  gnana />}

          {!!gnanaIfo && !gnanaIfo.isLinear && <FourPhaseVestingCard gnana ifo={gnanaIfo} />}
        </CardListBox>

        <IfoCardDescription description={description} projectSiteUrl={projectSiteUrl} defaultIsOpen />
      </Content>
    </StyledIfoCard>
  )
}

export default React.memo(IfoProjectCard)
