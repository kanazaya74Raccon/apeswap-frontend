import React from 'react'
import styled from 'styled-components'
import { Nft } from 'config/constants/types'
import { Text } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'

interface MobileDescriptionProps {
  nfa: Nft
}

const DescriptionWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 180px;
  left: 20px;
  top: 620px;
`
const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 180px;
  margin-bottom: 5px;
`
const Stats = styled.div`
  height: 24px;
  border: 1px solid ${(props) => props.theme.colors.text};
  box-sizing: border-box;
  border-radius: 25px;

  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 25px;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  padding-left: 10px;
  padding-right: 10px;
`

const AttributesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  justify-content: center;
  margin-left: 5px;
`

const Attribute = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.05em;
  opacity: 0.6;
`

const MobileDescription: React.FC<MobileDescriptionProps> = ({ nfa }) => {
  const { t } = useTranslation()
  return (
    <>
      <DescriptionWrapper>
        <StatsWrapper>
          <Stats>
            {t('Tier')} {nfa.attributes.rarityTierNumber}
          </Stats>
          <Stats>
            {t('Rarity')} {nfa.attributes.rarityOverallRank} / 1000
          </Stats>
        </StatsWrapper>
        <AttributesWrapper>
          <Attribute>
            {t('Base Color')}: {nfa.attributes.baseColor}
          </Attribute>
          <Attribute>
            {t('Face Color')}: {nfa.attributes.faceColor}
          </Attribute>
          <Attribute>
            {t('Frame')}: {nfa.attributes.frames}
          </Attribute>
          <Attribute>
            {t('Mouth')}: {nfa.attributes.mouths}
          </Attribute>
          <Attribute>
            {t('Eyes')}: {nfa.attributes.eyes}
          </Attribute>
          <Attribute>
            {t('Hat')}: {nfa.attributes.hats}
          </Attribute>
        </AttributesWrapper>
      </DescriptionWrapper>
    </>
  )
}

export default MobileDescription
