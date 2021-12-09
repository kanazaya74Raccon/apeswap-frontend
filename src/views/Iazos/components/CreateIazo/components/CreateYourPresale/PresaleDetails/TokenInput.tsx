import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Image } from '@apeswapfinance/uikit'
import { useToast } from 'state/hooks'

interface TextInputProps {
  placeholderText?: string
  title?: string
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void
  backgroundColor?: string
  size?: 'sm' | 'md' | 'mdlg' | 'lg' | 'xl'
  ml?: string
  mr?: string
  disabled?: boolean
  userBalance?: number
  defaultVal?: string
  quoteTokenSymbol?: string
  tokenSymbol?: string
  min?: number
  max?: number
}

const sizes = {
  sm: '250px',
  md: '310px',
  mdlg: '410px',
  lg: '525px',
  xl: '645px',
}

const TokenInput: React.FC<TextInputProps> = ({
  size = 'md',
  disabled,
  onChange,
  backgroundColor,
  quoteTokenSymbol,
  tokenSymbol,
  userBalance,
  placeholderText,
  title,
  ml,
  mr,
  defaultVal,
  min,
  max,
}) => {
  const { toastError } = useToast()
  const [backgroundColorForInput, setBackgroundColorForInput] = useState(null)

  const onValidate = (e) => {
    const val = parseFloat(e.currentTarget.value)
    if (val < min) {
      toastError(`Value must be greater than ${min}`)
      setBackgroundColorForInput('rgb(255,0,0, .3)')
      return val
    }
    if (val > max) {
      toastError(`Value must be less than ${max}`)
      setBackgroundColorForInput('rgb(255,0,0, .3)')
      return val
    }
    setBackgroundColorForInput(backgroundColor)
    return val
  }

  return (
    <InputContainer size={size} ml={ml} mr={mr}>
      <InputTitle>{title}</InputTitle>
      <Input
        value={defaultVal === 'NaN' ? '' : defaultVal}
        onChange={onChange}
        backgroundColor={backgroundColorForInput || backgroundColor}
        placeholder={placeholderText}
        disabled={disabled}
        type="number"
        onKeyUp={onValidate}
        onWheel={(e) => e.currentTarget.blur()}
      />
      {quoteTokenSymbol ? (
        <HeaderWrapper>
          <IconImage height={25} width={25} src={`/images/tokens/${quoteTokenSymbol}.svg`} alt="token" />
          <StyledHeader>{quoteTokenSymbol}</StyledHeader>
        </HeaderWrapper>
      ) : (
        <TokenWrapper>
          <StyledHeader>{tokenSymbol}</StyledHeader>
          <UserBalanceWrapper> Balance: {userBalance?.toFixed(6)} </UserBalanceWrapper>
        </TokenWrapper>
      )}
    </InputContainer>
  )
}

const InputContainer = styled.div<{ size: string; ml: string; mr: string }>`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
  height: 65px;
  width: ${(props) => sizes[props.size]};
  margin-left: ${(props) => props.ml};
  margin-right: ${(props) => props.mr};
`

const Input = styled.input<{ backgroundColor: string }>`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding-left: 15px;
  font-family: Poppins;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  text-align: left;
  background: ${(props) => props.backgroundColor || '#333333'};
  color: ${(props) => (props.theme.isDark ? 'white' : 'rgba(161, 101, 82, 1)')};
  border: none;
  z-index: 0;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 22px;
  }
`

const InputTitle = styled(Text)`
  position: absolute;
  top: -30px;
  align-self: center;
  align-content: center;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 700;
`

const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`
const IconImage = styled(Image)`
  align: left;
  margin-right: 12px;
`

const HeaderWrapper = styled.div`
  position: absolute;
  height: 35px;
  right: 25px;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const UserBalanceWrapper = styled(Text)`
  height: 15px;
  font-family: Poppins;
  font-weight: bold;
  font-size: 10px;
  opacity: 0.7;
`

const TokenWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  right: -25px;
  height: 54px;
  width: 170px;
  ${({ theme }) => theme.mediaQueries.md} {
    right: 0px;
  }
`

export default TokenInput
