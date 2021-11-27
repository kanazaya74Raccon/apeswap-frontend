import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import TextInput from 'components/TextInput'
import ImageUpload from './ImageUpload'
import { SaleInformation } from '../types'

interface InformationProps {
  onChange: (saleInformatiom: SaleInformation) => void
}

const InputWrapper = styled.div`
  width: 220px;
  height: 680px;
  margin-top: 50px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 720px;
    height: 480px;
    flex-wrap: nowrap;
    margin-top: 20px;
  }
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
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs
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
          size={isMobile ? 'sm' : 'lg'}
          height="sm"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Website..."
          title="Website:*"
          url
        />
        <TextInput
          onChange={(e) => setInformation({ ...information, whitepaper: e.currentTarget.value })}
          backgroundColor="rgba(34, 34, 34, 1)"
          size={isMobile ? 'sm' : 'lg'}
          height="sm"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Docs..."
          title="Docs:"
          url
        />
        <TextInput
          onChange={(e) => setInformation({ ...information, twitter: e.currentTarget.value })}
          backgroundColor="rgba(34, 34, 34, 1)"
          size={isMobile ? 'sm' : 'lg'}
          height="sm"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Twitter..."
          title="Twitter:*"
          url
        />
        <TextInput
          onChange={(e) => setInformation({ ...information, telegram: e.currentTarget.value })}
          backgroundColor="rgba(34, 34, 34, 1)"
          size={isMobile ? 'sm' : 'lg'}
          height="sm"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Telegram..."
          title="Telegram:*"
          url
        />
        <TextInput
          onChange={(e) => setInformation({ ...information, medium: e.currentTarget.value })}
          backgroundColor="rgba(34, 34, 34, 1)"
          size={isMobile ? 'sm' : 'lg'}
          height="sm"
          textColor="rgba(255, 179, 0, 1)"
          placeholderText="Medium..."
          title="Medium:*"
          url
        />
        <TextInput
          onLargeChange={(e) => setInformation({ ...information, description: e.currentTarget.value })}
          backgroundColor="rgba(34, 34, 34, 1)"
          size={isMobile ? 'sm' : 'lg'}
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
