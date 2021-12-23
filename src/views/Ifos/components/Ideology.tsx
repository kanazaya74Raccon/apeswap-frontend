import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'
import { useHistory } from 'react-router-dom'

const FeatureBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Motto = styled(Text).attrs({
  fontFamily: 'poppins',
  textAlign: 'center',
})`
  color: ${({ theme }) => theme.colors.yellow};
  margin: 2px 0 6px 0;
`

const SectionHeading = styled(Heading)`
  font-weight: 800;
`

const Frame = styled.div`
  margin-top: 48px;
  margin-bottom: 32px;

  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
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
  width: 144px;
  height: 98px;
  background-color: ${({ theme }) => (theme.isDark ? '#383838' : '#E5E5E5')};
  position: relative;
  flex-shrink: 0;
  margin-bottom: 8px;
`

const CenteredImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  > a,
  button {
    width: 260px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    gap: 40px;
  }
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
  const history = useHistory()

  const handleDoOwnClick = () => {
    history.push('/ss-iao')
  }

  return (
    <Container>
      <SectionHeading size="lg" fontFamily="poppins" textAlign="center">
        OUR IAO IDEOLOGY
      </SectionHeading>
      <Frame>
        <FeatureBox>
          <Icon name="investment" />

          <SectionHeading fontFamily="poppins" textAlign="center">
            INVESTMENT
          </SectionHeading>
          <Motto>BUILD</Motto>
          <Text fontFamily="poppins" textAlign="center">
            We highly vet applicants to choose projects we believe in as long term investments and partners
          </Text>
        </FeatureBox>
        <FeatureBox>
          <Icon name="development" />

          <SectionHeading fontFamily="poppins" textAlign="center">
            DEVELOPMENT
          </SectionHeading>
          <Motto>HOLD</Motto>
          <Text fontFamily="poppins" textAlign="center">
            The funds raised are used to finalize development and launch the project
          </Text>
        </FeatureBox>
        <FeatureBox>
          <Icon name="innovation" />

          <SectionHeading fontFamily="poppins" textAlign="center">
            INNOVATION
          </SectionHeading>
          <Motto>EXPERIMENT</Motto>
          <Text fontFamily="poppins" textAlign="center">
            These projects are meant to be unique and push the boundaries of DeFi
          </Text>
        </FeatureBox>
      </Frame>
      <ButtonBox>
        <Button variant="yellow" external href="https://ApeSwap.Click/Partners" as="a">
          BE A PARTNER
        </Button>
        <Button variant="yellow" onClick={handleDoOwnClick}>
          DO YOUR OWN
        </Button>
      </ButtonBox>
    </Container>
  )
}

export default HowItWorks
