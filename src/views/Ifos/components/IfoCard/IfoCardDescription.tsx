import React, { useState } from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

export interface IfoCardDescriptionProps {
  defaultIsOpen?: boolean
  description: string
}

const StyledIfoCardDescription = styled.div`
  width: 100%;
`

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: block;
  font-weight: 800;
  font-family: Poppins;
  outline: 0;
  width: 100%;
  font-family: 'Titan One';
`

const Description = styled(Text).attrs({ fontFamily: 'poppins' })<{ isOpen: boolean }>`
  color: ${({ theme }) => theme.colors.textSubtle};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  font-family: 'Titan One';
`

const IfoCardDescription: React.FC<IfoCardDescriptionProps> = ({ defaultIsOpen = true, description }) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const TranslateString = useI18n()

  const handleClick = () => setIsOpen(!isOpen)

  return (
    <StyledIfoCardDescription>
      <ToggleButton onClick={handleClick}>
        {isOpen ? TranslateString(999, 'Hide') : TranslateString(999, 'Show')}
      </ToggleButton>
      <Description isOpen={isOpen}>{description}</Description>
    </StyledIfoCardDescription>
  )
}

export default IfoCardDescription
