import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, Toggle } from '@apeswapfinance/uikit'
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
  return (
    <Wrapper style={{ marginTop: '20px' }}>
      <Toggle size="lg" labels={['CURRENT', 'PAST']} checked={selectedTab !== 'current'} onClick={handleClick} />
    </Wrapper>
  )
}

export default React.memo(IfoTabButtons)
