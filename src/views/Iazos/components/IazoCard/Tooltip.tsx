import React from 'react'
import { TagLink } from 'state/types'
import { Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export interface TooltipProps {
  title: string
  tagLinks?: TagLink[]
}

const Tooltip: React.FC<TooltipProps> = ({ children, title, tagLinks }) => {
  return (
    <Container>
      {children}
      <TooltipContent>
        <Text fontFamily="poppins" fontSize="19px" bold>
          {' '}
          {title}
        </Text>
        {tagLinks?.map((tagLink) => {
          return (
            <StyledLink
              key={tagLink.title}
              href={tagLink?.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              {tagLink?.title}
            </StyledLink>
          )
        })}
      </TooltipContent>
    </Container>
  )
}

const TooltipContent = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.text};
  width: max-content;
  display: none;
  padding: 16px;
  font-family: Poppins;
  font-size: 17px;
  line-height: 25px;
  max-height: 500px;
  z-index: 1000;
  position: absolute;
  bottom: calc(100% + 0px);
  transform: translate(34px, 0);
  right: 0;
  max-width: 246px;
  &:after {
    content: '';
    width: 0;
    height: 0;
    bottom: 0;
    position: absolute;
    z-index: 1000;
  }

  &:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
`

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  pointer-events: auto !important;
  &:hover ${TooltipContent}, &:focus-within ${TooltipContent} {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: auto !important;
  }
`

const StyledLink = styled.a`
  margin-top: 5px;
  position: relative;
  display: block;
  font-family: Poppins;
  font-weight: 400;
  font-size: 15px;
  text-decoration: underline;
  align-text: center;
  pointer-events: auto !important;
`

export default Tooltip
