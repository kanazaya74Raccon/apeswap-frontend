import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Image, LinkExternal } from '@apeswapfinance/uikit'

export interface IfoCardDescriptionProps {
  defaultIsOpen?: boolean
  description: string
  projectSiteUrl: string
}

const StyledIfoCardDescription = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => (theme.isDark ? theme.colors.white : theme.colors.primary)};
  cursor: pointer;
  display: block;
  font-weight: 800;
  font-family: Poppins;
  outline: 0;
  width: 100%;
`

const Description = styled(Text).attrs({ fontFamily: 'poppins' })<{ isOpen: boolean }>`
  color: ${({ theme }) => (theme.isDark ? theme.colors.white : theme.colors.primary)};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  margin-top: 24px;
`

const IconImage = styled(Image)`
  margin-left: 8px;
  display: inline-block;
`

const Link = styled(LinkExternal)`
  color: ${({ theme }) => (theme.isDark ? theme.colors.white : theme.colors.primary)};
`

const IfoCardDescription: React.FC<IfoCardDescriptionProps> = ({
  defaultIsOpen = true,
  description,
  projectSiteUrl,
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const handleClick = () => setIsOpen(!isOpen)

  return (
    <StyledIfoCardDescription>
      {/* TODO: Update external link icon color based on dark/light theme */}
      <Link href={projectSiteUrl} fontFamily="poppins">
        View project site
      </Link>
      <ToggleButton onClick={handleClick}>
        {isOpen ? 'Hide' : 'Show'}
        {/* TODO: Update arrow/down icon, and color based on dark/light theme */}
        <IconImage src="/images/down-arrow.svg" alt="down" width={10} height={10} />
      </ToggleButton>
      <Description isOpen={isOpen}>{description}</Description>
    </StyledIfoCardDescription>
  )
}

export default IfoCardDescription
