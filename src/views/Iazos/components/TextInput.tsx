import React from 'react'
import styled from 'styled-components'

interface TextInputProps {
  placeholderText?: string
  icon?: string
  backgroundColor?: string
}

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  width: 457px;
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
  background: ${(props) => (props.backgroundColor || props.theme.isDark ? '#333333' : 'rgba(240, 240, 240, 1)')};
};
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

const TextInput: React.FC<TextInputProps> = ({ backgroundColor, placeholderText, icon }) => {
  return (
    <InputContainer>
      <Input backgroundColor={backgroundColor} placeholder={placeholderText} imgSrc={`images/${icon}`} />
      <InputIcon imgSrc={`images/${icon}`} />
    </InputContainer>
  )
}

export default TextInput
