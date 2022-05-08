import React, { useState } from 'react'
import styled from 'styled-components'
import { Toggle } from '@apeswapfinance/uikit'
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
  const [index, setIndex] = useState(1)
  const handleClick = () => {
    onSelect(index === 0 ? 'current' : 'past')
    setIndex((prev) => (prev === 0 ? 1 : 0))
  }
  const { t } = useTranslation()
  return (
    <Wrapper style={{ marginTop: '20px' }}>
      <Toggle size="lg" labels={[t('CURRENT'), t('PAST')]} checked={selectedTab !== 'current'} onClick={handleClick} />
    </Wrapper>
  )
}

export default React.memo(IfoTabButtons)
