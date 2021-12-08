import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Image, ArrowDropDownIcon, ArrowDropUpIcon } from '@apeswapfinance/uikit'

interface TokenDropdown {
  tokens: string[]
  onChange: (token: string) => void
}

const TokenDropdown: React.FC<TokenDropdown> = ({ tokens, onChange }) => {
  const [opened, setOpened] = useState(false)
  const [selectedToken, setSelectedToken] = useState(tokens[0])
  const dropdownTokens = tokens.filter((token) => token !== selectedToken)
  return (
    <Wrapper onClick={() => setOpened(!opened)}>
      <HeaderWrapper opened={opened}>
        <IconImage height={25} width={25} src={`/images/tokens/${selectedToken}.svg`} alt="token" />
        <StyledHeader>{selectedToken}</StyledHeader>
        {opened ? <DropUpArrow /> : <DropDownArrow />}
      </HeaderWrapper>
      {opened &&
        dropdownTokens.map((token, i) => (
          <DropdownItem
            onClick={() => {
              setSelectedToken(token)
              onChange(token)
            }}
            last={i === tokens.length - 2}
          >
            <IconImage height={25} width={25} src={`/images/tokens/${token}.svg`} alt="token" />
            <StyledText>{token}</StyledText>
          </DropdownItem>
        ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 285px;
  border-radius: 10px;
  background: ${(props) => (props.theme.isDark ? '#414141' : 'white')};
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 175px;
    flex-wrap: nowrap;
    margin-top: 0px;
  }
`

const DropDownArrow = styled(ArrowDropDownIcon)`
  position: absolute;
  right: 10px;
  width: 15px;
`

const DropUpArrow = styled(ArrowDropUpIcon)`
  position: absolute;
  right: 10px;
  width: 15px;
`

const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  margin-left: 12px;
  text-align: left;
`
const IconImage = styled(Image)`
  margin-left: 15px;
`
const StyledText = styled(Text)`
  text-align: start;
  font-family: Poppins;
  font-size: 18px;
  font-weight: 500;
  margin-left: 12px;
`

const DropdownItem = styled.div<{ last?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 60px;
  cursor: pointer;
  -webkit-box-shadow: ${(props) => !props.last && ' 0 3px 4px -2px #333333'};
  -moz-box-shadow: ${(props) => !props.last && '0 3px 4px -2px #333333'};
  box-shadow: ${(props) => !props.last && ' 0 3px 4px -2px #333333'};
`

const HeaderWrapper = styled.div<{ opened?: boolean }>`
  height: 45px;
  width: 100%;
  left: 356px;
  top: 458px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  -webkit-box-shadow: ${(props) => props.opened && ' 0 3px 4px -2px #333333'};
  -moz-box-shadow: ${(props) => props.opened && '0 3px 4px -2px #333333'};
  box-shadow: ${(props) => props.opened && ' 0 3px 4px -2px #333333'};
`

export default TokenDropdown
