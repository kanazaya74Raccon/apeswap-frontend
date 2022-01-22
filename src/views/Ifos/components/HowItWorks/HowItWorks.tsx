import React from 'react'
import { Button, Text } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'

import { IconBox, FeatureBox, B, Frame, SectionHeading, CenteredImage, Container } from './styles';

interface IconProps {
  name: string
}

const Icon = ({ name }: IconProps) => {
  const { isDark } = useTheme()

  return (
    <IconBox>
      <CenteredImage src={`/images/ifos/${name}-${isDark ? 'dark' : 'light'}.svg`} alt={name} />
    </IconBox>
  )
}

interface Props {
  onParticipate: () => boolean
}

const HowItWorks = ({ onParticipate }: Props) => {
  const handleParticipateClick = () => {
    const isSwitching = onParticipate()
    const scroll = () =>
      window.scrollTo({
        top: 360,
        behavior: 'smooth',
      })

    if (isSwitching) {
      setTimeout(scroll, 500)
    } else {
      scroll();
    }
  }

  return (
    <Container>
      <SectionHeading size="lg" fontFamily="poppins">
        HOW IT WORKS
      </SectionHeading>
      <Frame>
        <FeatureBox>
          <Icon name="time-circle" />
          <div>
            <SectionHeading fontFamily="poppins">CONTRIBUTION WINDOW</SectionHeading>
            <Text fontFamily="poppins">
              IAOs run anywhere from 12-24 hours to ensure everyone across the globe has time to enter with ease.
            </Text>
          </div>
        </FeatureBox>
        <FeatureBox>
          <Icon name="calendar" />
          <div>
            <SectionHeading fontFamily="poppins">VESTING SCHEDULE</SectionHeading>
            <Text fontFamily="poppins">
              25% of tokens unlock immediately and the remaining 75% vest linearly over 120 days.
            </Text>
          </div>
        </FeatureBox>
        <FeatureBox>
          <Icon name="bnb-gnana" />
          <div>
            <SectionHeading fontFamily="poppins">2 WAYS TO PARTICIPATE</SectionHeading>
            <Text fontFamily="poppins">
              <B>Option 1</B>: Commit with <B>BNB</B>.
            </Text>
            <Text fontFamily="poppins">
              <B>Option 2</B>: Commit with <B>GNANA</B>.
            </Text>
          </div>
        </FeatureBox>
        <FeatureBox>
          <Icon name="overflow-dollars" />
          <div>
            <SectionHeading fontFamily="poppins">OVERFLOW MODEL</SectionHeading>
            <Text fontFamily="poppins">
              Your token allocation is based on your percentage of the total raise. All overflow contributions will be returned post-raise.
            </Text>
          </div>
        </FeatureBox>
      </Frame>
      <Button variant="yellow" onClick={handleParticipateClick}>
        PARTICIPATE NOW
      </Button>
    </Container>
  )
}

export default HowItWorks
