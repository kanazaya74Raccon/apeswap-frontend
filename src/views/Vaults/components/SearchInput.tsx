import React, { useState, useRef } from 'react'
import { Input, SearchIcon2 } from '@apeswapfinance/uikit'
import styled from 'styled-components'

const StyledInput = styled(Input)`
  border-radius: 20px;
  background: ${({ theme }) => (theme.isDark ? '#353547' : '#f0f0f0')};
  margin-left: auto;
  height: 28px;
  font-family: 'Titan One';

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 32px;
  }

  :focus {
    box-shadow: 0px 0px 0px 1px #ffb300, 0px 0px 0px 4px rgb(255 179 0 / 40%) !important;
  }
`

const StyledSearchIcon = styled(SearchIcon2)`
  position: absolute;
  right: 10px;
  top: 7px;
  width: 14px;
  height: 14px;
`

const InputWrapper = styled.div`
  position: relative;
  width: 140px;

  @media screen and (min-width: 340px) {
    width: 160px;
  }

  @media screen and (min-width: 360px) {
    width: 180px;
  }

  @media screen and (min-width: 390px) {
    width: 200px;
  }

  @media screen and (min-width: 460px) {
    width: 220px;
  }

  @media screen and (min-width: 500px) {
    width: 240px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 244px;
    display: block;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 220px;
    display: block;
  }

  @media screen and (min-width: 900px) {
    width: 244px;
  }
`

const Container = styled.div<{ toggled: boolean }>``

interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  const [toggled, setToggled] = useState(false)
  const inputEl = useRef(null)

  return (
    <Container toggled={toggled}>
      <InputWrapper>
        <StyledInput ref={inputEl} value={value} onChange={onChange} onBlur={() => setToggled(false)} />
        <StyledSearchIcon color="primary" />
      </InputWrapper>
    </Container>
  )
}

export default SearchInput
