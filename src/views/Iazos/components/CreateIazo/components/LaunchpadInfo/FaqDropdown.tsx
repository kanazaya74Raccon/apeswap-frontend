import React, { useState } from 'react'
import { FaqWrapper, DropdownHeader, StyledText, DropDownArrow, DropUpArrow, HeaderWrapper } from './styles'

interface FaqDropdownProps {
  title: string
}

const FaqDropdown: React.FC<FaqDropdownProps> = ({ title, children }) => {
  const [opened, setOpened] = useState(false)
  return (
    <FaqWrapper onClick={() => setOpened(!opened)}>
      {opened ? <DropUpArrow /> : <DropDownArrow />}
      <HeaderWrapper opened={opened}>
        <DropdownHeader color="white">{title}</DropdownHeader>
      </HeaderWrapper>
      {opened && <StyledText color="white">{children}</StyledText>}
    </FaqWrapper>
  )
}

export default FaqDropdown
