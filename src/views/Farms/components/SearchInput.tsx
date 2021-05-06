import React, { useState, useRef } from 'react'
import { Input, SearchIcon2 } from '@apeswapfinance/uikit'
import styled from 'styled-components'

const StyledInput = styled(Input)`
  border-radius: 20px;
  background: #f0f0f0;
  margin-left: auto;
  height: 32px;
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
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 244px;
    display: block;
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
        <StyledSearchIcon color="primary"/>
      </InputWrapper>
    </Container>
  )
}

export default SearchInput
