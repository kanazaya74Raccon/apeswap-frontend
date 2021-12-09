import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useToast } from 'state/hooks'
import { AutoRenewIcon, Text } from '@apeswapfinance/uikit'

interface TextInputProps {
  placeholderText?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onLargeChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  icon?: string
  backgroundColor?: string
  textColor?: string
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  height?: 'sm' | 'md' | 'lg' | 'xl'
  load?: boolean
  url?: boolean
  margin?: string
  mandatory?: boolean
}

const sizes = {
  sm: '285px',
  md: '450px',
  lg: '525px',
  xl: '600px',
}

const heights = {
  sm: '38px',
  md: '44px',
  lg: '100px',
  xl: '120px',
}

const InputContainer = styled.div<{ size: string; height: string }>`
  position: relative;
  display: flex;
  align-items: center;
  height: ${(props) => heights[props.height]};
  width: ${(props) => sizes[props.size]};
`

const Input = styled.input<{
  backgroundColor: string
  imgSrc: string
  textColor: string
  above?: boolean
  margin?: string
  sizeText?: string
}>`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding-left: 15px;
  font-family: Poppins;
  font-size: ${(props) => (props.sizeText === 'sm' ? '13px' : '18px')};
  line-height: 23px;
  word-break: break-word;
  text-align: left;
  margin: ${(props) => props.margin};
  background: ${(props) => props.backgroundColor || '#333333'};
  color: ${(props) => props.theme.colors.text};
  border: none;
  z-index: 0;
  :focus {
    outline: ${(props) => props.textColor || '#ffffff'} 1px solid;
  }
`

const LargeInput = styled.textarea<{ backgroundColor: string; imgSrc: string; textColor: string }>`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding-left: 15px;
  font-family: Poppins;
  font-size: 18px;
  line-height: 23px;
  word-break: break-word;
  text-align: left;
  background: ${(props) => props.backgroundColor || '#333333'};
  color: ${(props) => props.textColor || '#ffffff'};
  border: none;
  z-index: 0;
  :focus {
    outline: ${(props) => props.textColor || '#ffffff'} 1px solid;
  }
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const StyledText = styled(Text)<{ large?: boolean }>`
  position: absolute;
  height: ${(props) => (props.large ? '155px' : '90px')};
  font-family: Poppins;
  font-weight: 500;
  width: 130px;
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.md} {
    position: relative;
    width: 130px;
    flex-wrap: nowrap;
    height: 30px;
    font-size: 16px;
  }
`

const isValidUrl = (val: string) => {
  try {
    const url = new URL(val)
    return url
  } catch {
    return false
  }
}

const TextInput: React.FC<TextInputProps> = ({
  size = 'md',
  height = 'md',
  onChange,
  onLargeChange,
  backgroundColor,
  placeholderText,
  textColor,
  icon,
  load,
  title,
  url,
  margin,
  mandatory,
}) => {
  const { toastError } = useToast()
  const [backgroundColorForInput, setBackgroundColorForInput] = useState(backgroundColor)
  useEffect(() => {
    setBackgroundColorForInput(backgroundColor)
  }, [backgroundColor])

  const onValidate = (e) => {
    const val = e.currentTarget.value
    const isUrl = isValidUrl(val)
    if (!mandatory && val.length === 0) {
      setBackgroundColorForInput(backgroundColor)
      return val
    }
    if (url) {
      if (!isUrl) {
        setBackgroundColorForInput('rgb(255,0,0, .3)')
        toastError('Please enter a valid url')
      } else {
        setBackgroundColorForInput(backgroundColor)
      }
    }
    return val
  }

  return (
    <Container>
      {title && <StyledText large={height === 'lg' || height === 'xl'}>{title}</StyledText>}
      <InputContainer size={size} height={height}>
        {height === 'lg' || height === 'xl' ? (
          <LargeInput
            onChange={onLargeChange}
            backgroundColor={backgroundColor}
            placeholder={placeholderText}
            imgSrc={`images/${icon}`}
            textColor={textColor}
          />
        ) : (
          <Input
            onChange={onChange}
            backgroundColor={url ? backgroundColorForInput : backgroundColor}
            placeholder={placeholderText}
            imgSrc={`images/${icon}`}
            textColor={textColor}
            onKeyUp={onValidate}
            margin={margin}
            sizeText={size}
          />
        )}
        {load ? (
          <SpinnerContainer>
            <AutoRenewIcon spin />
          </SpinnerContainer>
        ) : (
          <InputIcon imgSrc={`images/${icon}`} />
        )}
      </InputContainer>
    </Container>
  )
}

export default TextInput
