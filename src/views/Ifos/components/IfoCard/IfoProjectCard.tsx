import React from 'react'
import styled from 'styled-components'
import { Card, Heading, Text, Link, LinkExternal } from '@apeswapfinance/uikit'
import { zoneIfo, ifosConfig } from 'config/constants'
import IfoCardDescription from './IfoCardDescription'
import IfoCard from './index'

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

        <Text fontSize="14px">
          On {launchDate},
          <Link
            fontSize="14px"
            fontFamily="poppins"
            href="https://www.timeanddate.com/time/aboututc.html"
            target="blank"
            rel="noopener noreferrer"
            ml="4px"
            style={{ display: 'inline' }}
          >
            {launchTime}
          </Link>
        </Text>

        <CardListBox>
          <IfoCard ifo={ifo} />
          {gnanaIfo ? <IfoCard ifo={gnanaIfo} gnana /> : null}
        </CardListBox>

        <LinkExternal href={projectSiteUrl} fontFamily="poppins">
          View project site
        </LinkExternal>

        <IfoCardDescription description={description} defaultIsOpen />
      </Content>
    </StyledIfoCard>
  )
}

export default React.memo(IfoProjectCard)
