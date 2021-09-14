import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  height: 44px;
  width: 457px;
  left: 661px;
  top: 343px;
  border-radius: 10px;
  padding-left: 15px;
  font-family: Poppins;
  font-size: 18px;
  line-height: 23px;
  text-align: left;
  background: url(images/magnifiglass.svg) no-repeat 420px 10px, #333333;
  color: #ffffff;
`

const TextInput: React.FC = () => {
  return <Input placeholder="Search token name or address...." src="image/magniflass.svg" />
}

export default TextInput
