import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'

interface FaqDropdownProps {
  title: string
  description: string
}

const FaqWrapper = styled.div`
  width: 280px;
  border-radius: 10px;
  background: ${(props) => (props.theme.isDark ? '#414141' : 'rgba(161, 101, 82, 1)')};
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 733px;
  }
`
const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  padding-left: 20px;
`

const StyledText = styled(Text)`
  text-align: start;
  padding: 20px 15px 10px 20px;
  font-family: poppins;
`

const HeaderWrapper = styled.div<{ opened?: boolean }>`
  height: 35px;
  width: 100%;
  left: 356px;
  top: 458px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-box-shadow: ${(props) => props.opened && ' 0 3px 4px -2px #333333'};
  -moz-box-shadow: ${(props) => props.opened && '0 3px 4px -2px #333333'};
  box-shadow: ${(props) => props.opened && ' 0 3px 4px -2px #333333'};
`

const FaqDropdown: React.FC<FaqDropdownProps> = ({ title, description }) => {
  const [opened, setOpened] = useState(false)
  return (
    <FaqWrapper onClick={() => setOpened(!opened)}>
      <HeaderWrapper opened={opened}>
        <StyledHeader color="white">{title}</StyledHeader>
      </HeaderWrapper>
      {opened && <StyledText color="white">{description}</StyledText>}
    </FaqWrapper>
  )
}

export default FaqDropdown
