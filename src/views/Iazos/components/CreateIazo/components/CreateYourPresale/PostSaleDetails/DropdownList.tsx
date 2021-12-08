import React, { useState } from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

interface DropdownListProps {
  dropdownList: string[]
  defaultIndex: number
  title?: string
  onChange: (item: string) => void
}

const DropdownList: React.FC<DropdownListProps> = ({ dropdownList, title, defaultIndex, onChange }) => {
  const [opened, setOpened] = useState(false)
  const [selectedItem, setSelectedItem] = useState(dropdownList[defaultIndex])
  const dropdownListFiltered = dropdownList.filter((item) => item !== selectedItem)

  return (
    <DropdownWrapper onClick={() => setOpened(!opened)}>
      <InputTitle>{title}</InputTitle>
      <HeaderWrapper>
        <StyledHeader>{selectedItem}</StyledHeader>
      </HeaderWrapper>
      {opened && (
        <DropDownWrapper>
          {dropdownListFiltered.map((item) => (
            <DropdownItem
              onClick={() => {
                setSelectedItem(item)
                onChange(item)
              }}
            >
              <StyledText>{item}</StyledText>
            </DropdownItem>
          ))}
        </DropDownWrapper>
      )}
    </DropdownWrapper>
  )
}

const DropdownWrapper = styled.div`
  position: relative;
  width: 318px;
  border-radius: 10px;
  background: ${(props) => (props.theme.isDark ? 'rgba(51, 51, 51, 1)' : '#E5E5E5')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  flex-direction: column;
`
const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-size: 20px;
  font-weight: 700;
  margin-left: 20px;
  text-align: left;
`
const StyledText = styled(Text)`
  text-align: start;
  font-family: Poppins;
  font-size: 18px;
  font-weight: 500;
  margin-left: 20px;
`

const DropdownItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 60px;
  cursor: pointer;
  opacity: 0.7;
  z-index: 100;
  &:hover {
    opacity: 1;
  }
`

const InputTitle = styled(Text)`
  position: absolute;
  top: -30px;
  align-self: center;
  align-content: center;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 700;
`

const DropDownWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 60px;
  display: flex;
  flex-direction: column;
  border-radius: 0px 0px 10px 10px;
  background: ${(props) => (props.theme.isDark ? 'rgba(51, 51, 51, 1)' : '#E5E5E5')};
`

const HeaderWrapper = styled.div`
  height: 55.5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export default DropdownList
