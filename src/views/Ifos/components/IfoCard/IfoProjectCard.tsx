import React from 'react'
import styled from 'styled-components'
import { Card, Heading, Text, Link, LinkExternal } from '@apeswapfinance/uikit'
import { Ifo } from 'config/constants/types'
import IfoCardDescription from './IfoCardDescription'
import IfoCard from './index'

export interface IfoCardProps {
  ifo: Ifo
}

const StyledIfoCard = styled(Card)<{ ifoId: string }>`
  background-image: ${(props) => `url('/images/ifos/${props.ifoId}-bg.svg')`};
  background-repeat: no-repeat;
  background-position: -5px -5px;
  background-size: contain;
  padding-top: 112px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50px;
  width: 100%;
  background-size: 102.5%;
  margin-bottom: 26px;
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
`

const IfoProjectCard: React.FC<IfoCardProps> = ({ ifo }) => {
  const { id, subTitle, description, launchDate, launchTime, projectSiteUrl } = ifo

  return (
    <StyledIfoCard ifoId={id}>
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
          <IfoCard ifo={ifo} gnana />
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
