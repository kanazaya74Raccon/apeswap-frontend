import React from 'react'
import { Button } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'

import { useTranslation } from 'contexts/Localization'
import { IconBox, FeatureBox, B, Frame, SectionHeading, CenteredImage, Container, StyledText } from './styles'

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
  const { t } = useTranslation()
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
      <SectionHeading>{t('HOW IT WORKS')}</SectionHeading>
      <Frame>
        <FeatureBox>
          <Icon name="time-circle" />
          <div>
            <SectionHeading>{t('CONTRIBUTION WINDOW')}</SectionHeading>
            <StyledText>
              {t('IAOs run anywhere from 12-24 hours to ensure everyone across the globe has time to enter with ease.')}
            </StyledText>
          </div>
        </FeatureBox>
        <FeatureBox>
          <Icon name="calendar" />
          <div>
            <SectionHeading>{t('VESTING SCHEDULE')}</SectionHeading>
            <StyledText>
              {t(
                '25% of tokens unlock immediately. The remaining 75% vest linearly over a timeframe specific to each IAO.',
              )}
            </StyledText>
          </div>
        </FeatureBox>
        <FeatureBox>
          <Icon name="bnb-gnana" />
          <div>
            <SectionHeading>{t('2 WAYS TO PARTICIPATE')}</SectionHeading>
            <StyledText>
              <B>{t('Option 1')}</B>: {t('Commit with')} <B>BNB</B>.
            </StyledText>
            <StyledText>
              <B>{t('Option 2')}</B>: {t('Commit with')} <B>GNANA</B>.
            </StyledText>
          </div>
        </FeatureBox>
        <FeatureBox>
          <Icon name="overflow-dollars" />
          <div>
            <SectionHeading>{t('OVERFLOW MODEL')}</SectionHeading>
            <StyledText>
              {t(
                'Your token allocation is based on your percentage of the total raise. All overflow contributions will be returned post-raise.',
              )}
            </StyledText>
          </div>
        </FeatureBox>
      </Frame>
      <Button onClick={handleParticipateClick}>{t('PARTICIPATE NOW')}</Button>
    </Container>
  )
}

export default HowItWorks
