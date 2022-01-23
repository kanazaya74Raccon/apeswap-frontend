import React from 'react'
import { Button, Text } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'

import { IconBox, FeatureBox, B, Frame, SectionHeading, CenteredImage, Container } from './styles'

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
      scroll()
    }
  }

  return (
    <Container>
      <SectionHeading size="lg">HOW IT WORKS</SectionHeading>
      <Frame>
        <FeatureBox>
          <Icon name="time-circle" />
          <div>
            <SectionHeading fontFamily="poppins">24 HOURS LONG</SectionHeading>
            <Text fontFamily="poppins">
              The IAO time has been expanded allow Apes across the globe to invest with ease.
            </Text>
          </div>
        </FeatureBox>
        <FeatureBox>
          <Icon name="calendar" />
          <div>
            <SectionHeading fontFamily="poppins">VESTING SCHEDULE</SectionHeading>
            <Text fontFamily="poppins">
              25% of the tokens unlocked inmediately and 25% unlocked every month for 3 months.
            </Text>
          </div>
        </FeatureBox>
        <FeatureBox>
          <Icon name="bnb-gnana" />
          <div>
            <SectionHeading fontFamily="poppins">2 WAYS TO PARTICIPATE</SectionHeading>
            <Text fontFamily="poppins">
              <B>Option 1</B>: Token available via <B>BNB</B>.
            </Text>
            <Text fontFamily="poppins">
              <B>Option 2</B>: Token available via <B>GNANA</B>.
            </Text>
          </div>
        </FeatureBox>
        <FeatureBox>
          <Icon name="overflow-dollars" />
          <div>
            <SectionHeading fontFamily="poppins">OVERFLOW MODEL</SectionHeading>
            <Text fontFamily="poppins">
              After the IAO finishes you can claim your token allocation and your overflow $BNB and/or $GNANA will be
              returned to you wallet
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
