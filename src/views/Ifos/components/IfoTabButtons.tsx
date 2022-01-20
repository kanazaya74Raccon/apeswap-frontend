import React from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem } from '@apeswapfinance/uikit'
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
  return (
    <Wrapper>
      <ButtonMenu
        activeIndex={selectedTab === 'current' ? 0 : 1}
        onClick={(index) => onSelect(index === 0 ? 'current' : 'past')}
        variant="yellow"
      >
        <ButtonMenuItem>Current</ButtonMenuItem>
        <ButtonMenuItem>Past</ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default IfoTabButtons
