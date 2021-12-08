import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'

const FeatureBox = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`

const B = styled(Text).attrs({
  fontFamily: 'poppins',
  as: 'span',
})`
  font-weight: 700;
`

const SectionHeading = styled(Heading)`
  font-weight: 800;
`

const Frame = styled.div`
  margin-top: 48px;
  margin-bottom: 32px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px 20px;
    grid-auto-flow: row;
    grid-template-areas:
      '. .'
      '. .';
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.card};
  margin-bottom: 57px;
  padding: 30px 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 30px 50px;
  }
`

const IconBox = styled.div`
  border-radius: 5px;
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => (theme.isDark ? '#383838' : '#E5E5E5')};
  position: relative;
  flex-shrink: 0;
`

const CenteredImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

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
  return (
    <Container>
      <SectionHeading size="lg" fontFamily="poppins">
        HOW IT WORKS
      </SectionHeading>
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
      <Button variant="yellow">PARTICIPATE NOW</Button>
    </Container>
  )
}

export default HowItWorks
