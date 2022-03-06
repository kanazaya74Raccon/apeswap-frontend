import React from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { TabOption } from '../types'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 39px;
`

interface Props {
  selectedTab?: TabOption
  onSelect: (option: TabOption) => unknown
}

const IfoTabButtons = ({ selectedTab = 'current', onSelect }: Props) => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <ButtonMenu
        activeIndex={selectedTab === 'current' ? 0 : 1}
        onClick={(index) => onSelect(index === 0 ? 'current' : 'past')}
        variant="yellow"
      >
        <ButtonMenuItem>{t('Current')}</ButtonMenuItem>
        <ButtonMenuItem>{t('Past')}</ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default IfoTabButtons
