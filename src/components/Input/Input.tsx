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
  background: ${({ theme }) => (theme.isDark ? '#3D3D3D' : theme.colors.white)};
  border-radius: 180px;
  display: flex;
  height: 72px;
  padding: 0 ${(props) => props.theme.spacing[3]}px;
`

const StyledInput = styled.input`
  width: 100%;
  background: none;
  border: 0;
  color: ${({ theme }) => (theme.isDark ? theme.colors.white : theme.colors.primary)};
  flex: 1;
  height: 56px;
  margin: 0;
  padding: 0;
  outline: none;
  font-size: 30px;
  font-weight: 700;
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
