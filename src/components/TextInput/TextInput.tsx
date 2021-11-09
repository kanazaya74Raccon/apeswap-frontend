import React from 'react'
import styled from 'styled-components'
import { AutoRenewIcon } from '@apeswapfinance/uikit'

interface TextInputProps {
  placeholderText?: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  icon?: string
  backgroundColor?: string
  size?: 'sm' | 'md' | 'lg'
  load?: boolean
}

const sizes = {
  sm: '250px',
  md: '450px',
  lg: '525px',
  xl: '600px',
}

const InputContainer = styled.div<{ size: string }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  width: ${(props) => sizes[props.size]};
`

const Input = styled.input<{ backgroundColor: string; imgSrc: string }>`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding-left: 15px;
  font-family: Poppins;
  font-size: 18px;
  line-height: 23px;
  text-align: left;
  background: ${(props) => props.backgroundColor || '#333333'};
  color: #ffffff;
  border: none;
  z-index: 0;
`

const InputIcon = styled.div<{ imgSrc: string }>`
  position: absolute;
  display: inline-block;
  right: 10px;
  width: 25px;
  height: 25px;
  background-image: ${(props) => `url(${props.imgSrc})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 10;
  cursor: pointer;
`
const SpinnerContainer = styled.div`
  position: absolute;
  display: inline-block;
  right: 10px;
  width: 25px;
  height: 21px;
`

const TextInput: React.FC<TextInputProps> = ({
  size = 'md',
  onChange,
  backgroundColor,
  placeholderText,
  icon,
  load,
}) => {
  return (
    <InputContainer size={size}>
      <Input
        onChange={onChange}
        backgroundColor={backgroundColor}
        placeholder={placeholderText}
        imgSrc={`images/${icon}`}
      />
      {load ? (
        <SpinnerContainer>
          <AutoRenewIcon spin />
        </SpinnerContainer>
      ) : (
        <InputIcon imgSrc={`images/${icon}`} />
      )}
    </InputContainer>
  )
}

export default TextInput
