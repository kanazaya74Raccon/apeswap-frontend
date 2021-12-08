import React, { useState, useEffect } from 'react'
import { useMatchBreakpoints } from '@apeswapfinance/uikit'
import TextInput from 'components/TextInput'
import useTheme from 'hooks/useTheme'
import ImageUpload from './ImageUpload'
import { SaleInformation } from '../types'
import { InputWrapper, StyledHeader, HeaderWrapper } from './styles'

interface InformationProps {
  onChange: (saleInformatiom: SaleInformation) => void
}

const Information: React.FC<InformationProps> = ({ onChange }) => {
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs
  const { isDark } = useTheme()
  const inputSize = isMobile ? 'sm' : 'lg'
  const bgColor = isDark ? '#222222' : 'white'
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
          backgroundColor={bgColor}
          size={inputSize}
          height="sm"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Website..."
          title="Website:*"
          url
          mandatory
        />
        <TextInput
          onChange={(e) => setInformation({ ...information, whitepaper: e.currentTarget.value })}
          backgroundColor={bgColor}
          size={inputSize}
          height="sm"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Docs..."
          title="Docs:"
          url
        />
        <TextInput
          onChange={(e) => setInformation({ ...information, twitter: e.currentTarget.value })}
          backgroundColor={bgColor}
          size={inputSize}
          height="sm"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Twitter..."
          title="Twitter:*"
          url
          mandatory
        />
        <TextInput
          onChange={(e) => setInformation({ ...information, telegram: e.currentTarget.value })}
          backgroundColor={bgColor}
          size={inputSize}
          height="sm"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Telegram..."
          title="Telegram:*"
          url
          mandatory
        />
        <TextInput
          onChange={(e) => setInformation({ ...information, medium: e.currentTarget.value })}
          backgroundColor={bgColor}
          size={inputSize}
          height="sm"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Medium..."
          title="Medium:*"
          url
          mandatory
        />
        <TextInput
          onLargeChange={(e) => setInformation({ ...information, description: e.currentTarget.value })}
          backgroundColor={bgColor}
          size={inputSize}
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
