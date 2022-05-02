import React, { useState, useRef } from 'react'
import { Input } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'

const StyledInput = styled(Input)`
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white3};
  font-weight: 800;
  border: none;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 180px;
  }
  @media screen and (min-width: 900px) {
    width: 100px;
  }
  @media screen and (min-width: 1000px) {
    width: 200px;
  }
`

const Container = styled.div<{ toggled: boolean }>``

interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  width?: string
}

const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  const [toggled, setToggled] = useState(false)
  const inputEl = useRef(null)

  return (
    <Container toggled={toggled}>
      <StyledInput ref={inputEl} value={value} onChange={onChange} onBlur={() => setToggled(false)} icon="search" />
    </Container>
  )
}

export default SearchInput
