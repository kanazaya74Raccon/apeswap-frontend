import React from 'react'
import { Button } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'
import { useHistory } from 'react-router-dom'

import {
  FeatureBox,
  Motto,
  SectionHeading,
  Frame,
  IconBox,
  CenteredImage,
  Container,
  ButtonBox,
  StyledText,
} from './styles'

interface Props {
  name: string
}

const Icon = ({ name }: Props) => {
  const { isDark } = useTheme()

  return (
    <IconBox>
      <CenteredImage src={`/images/ifos/${name}-${isDark ? 'dark' : 'light'}.svg`} alt={name} />
    </IconBox>
  )
}

const HowItWorks = () => {
  const history = useHistory()

  const handleDoOwnClick = () => {
    history.push('/ss-iao')
  }

  return (
    <Container>
      <SectionHeading>OUR IAO IDEOLOGY</SectionHeading>
      <Frame>
        <FeatureBox>
          <Icon name="investment" />
          ``
          <SectionHeading>INVESTMENT</SectionHeading>
          <Motto>BUILD</Motto>
          <StyledText textAlign="center">
            We highly vet applicants to choose projects we believe in as long term investments and partners
          </StyledText>
        </FeatureBox>
        <FeatureBox>
          <Icon name="development" />

          <SectionHeading>DEVELOPMENT</SectionHeading>
          <Motto>HOLD</Motto>
          <StyledText textAlign="center">
            The funds raised are used to finalize development and launch the project
          </StyledText>
        </FeatureBox>
        <FeatureBox>
          <Icon name="innovation" />

          <SectionHeading>INNOVATION</SectionHeading>
          <Motto>EXPERIMENT</Motto>
          <StyledText textAlign="center">
            These projects are meant to be unique and push the boundaries of DeFi
          </StyledText>
        </FeatureBox>
      </Frame>
      <ButtonBox>
        <Button external href="https://ApeSwap.Click/Partners" as="a">
          BECOME A PARTNER
        </Button>
        <Button onClick={handleDoOwnClick}>LAUNCH YOUR OWN</Button>
      </ButtonBox>
    </Container>
  )
}

export default HowItWorks
