import React from 'react'
import styled from 'styled-components'

export interface InputProps {
  endAdornment?: React.ReactNode
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  startAdornment?: React.ReactNode
  value: string
}

const StyledInputWrapper = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.white4};
  border-radius: 10px;
  display: flex;
  height: 72px;
  padding: 0 ${(props) => props.theme.spacing[3]}px;
`

const StyledInput = styled.input`
  width: 100%;
  background: none;
  border: 0;
  color: ${({ theme }) => (theme.isDark ? theme.colors.primaryBright : theme.colors.primary)};
  flex: 1;
  height: 56px;
  margin: 0;
  padding: 0;
  outline: none;
  font-weight: 800;
  font-size: 30px;

  &::placeholder {
    color: ${({ theme }) => !theme.isDark && theme.colors.gray};
  }
`

const Input: React.FC<InputProps> = ({ endAdornment, onChange, placeholder, startAdornment, value }) => {
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      <StyledInput placeholder={placeholder} value={value} onChange={onChange} />
      {!!endAdornment && endAdornment}
    </StyledInputWrapper>
  )
}

export default Input
