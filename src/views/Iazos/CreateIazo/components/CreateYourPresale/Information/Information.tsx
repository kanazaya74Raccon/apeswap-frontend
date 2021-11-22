import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import TextInput from 'components/TextInput'
import ImageUpload from './ImageUpload'
import { SaleInformation } from '../types'

interface InformationProps {
  onChange: (saleInformatiom: SaleInformation) => void
}

const InputWrapper = styled.div`
  width: 720px;
  height: 480px;
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`
const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 700;
  text-align: left;
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Information: React.FC<InformationProps> = ({ onChange }) => {
  const [information, setInformation] = useState<SaleInformation>({
    website: '',
    whitepaper: '',
    twitter: '',
    telegram: '',
    medium: '',
    description: '',
    tokenLogo: null,
  })

  useEffect(() => {
    onChange(information)
  }, [information, onChange])

  return (
    <>
      <HeaderWrapper>
        <StyledHeader>Information</StyledHeader>
      </HeaderWrapper>
      <InputWrapper>
        <TextInput
          onChange={(e) => setInformation({ ...information, website: e.currentTarget.value })}
          backgroundColor="rgba(34, 34, 34, 1)"
          size="lg"
          height="sm"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Website..."
          title="Website:*"
        />
        <TextInput
          onChange={(e) => setInformation({ ...information, whitepaper: e.currentTarget.value })}
          backgroundColor="rgba(34, 34, 34, 1)"
          size="lg"
          height="sm"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Whitepaper..."
          title="Whitepaper:"
        />
        <TextInput
          onChange={(e) => setInformation({ ...information, twitter: e.currentTarget.value })}
          backgroundColor="rgba(34, 34, 34, 1)"
          size="lg"
          height="sm"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Twitter..."
          title="Twitter:*"
        />
        <TextInput
          onChange={(e) => setInformation({ ...information, telegram: e.currentTarget.value })}
          backgroundColor="rgba(34, 34, 34, 1)"
          size="lg"
          height="sm"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Telegram..."
          title="Telegram:*"
        />
        <TextInput
          onChange={(e) => setInformation({ ...information, medium: e.currentTarget.value })}
          backgroundColor="rgba(34, 34, 34, 1)"
          size="lg"
          height="sm"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Medium..."
          title="Medium:*"
        />
        <TextInput
          onLargeChange={(e) => setInformation({ ...information, description: e.currentTarget.value })}
          backgroundColor="rgba(34, 34, 34, 1)"
          size="lg"
          height="lg"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Description..."
          title="Description:"
        />
        <ImageUpload
          title="Token Logo:*"
          onChange={(e) => setInformation({ ...information, tokenLogo: e.imageFile })}
        />
      </InputWrapper>
    </>
  )
}

export default React.memo(Information)
