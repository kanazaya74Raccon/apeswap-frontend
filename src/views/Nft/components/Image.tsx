import React from 'react'
import styled, { keyframes } from 'styled-components'

interface ImageProps {
  src: string
  alt: string
  originalLink?: string
  rarityTier: number
}

interface ContainerProps {
  gradient: string
}

const breatheAnimation = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
`

const StyledImage = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  transition: opacity 1s linear;
  height: 100%;
  object-fit: cover;
  border-radius: 32px 32px 0 0;
  z-index: 1;
`

const Container = styled.div<ContainerProps>`
  background-image: ${(props) => props.gradient};
  background-size: 150% 150%;
  position: relative;
  width: 10;
  overflow: hidden;
  padding-bottom: 100%;
  animation: ${breatheAnimation} 20s ease infinite;
`

const Image: React.FC<ImageProps> = ({ src, alt, originalLink, rarityTier }) => {
  let gradientStyle = ''
  if (rarityTier === 1) {
    gradientStyle =
      'linear-gradient(-45deg, rgba(0, 255, 0, .65), rgba(0, 255, 202, .65),  rgba(0, 255, 0, .65),  rgba(0, 255, 202, .65))'
  } else if (rarityTier === 2) {
    gradientStyle =
      'linear-gradient(90deg, rgba(0, 255, 255, .65), rgba(0, 255, 255, .45), rgba(0, 255, 255, .65), rgba(0, 255, 255, .45))'
  } else if (rarityTier === 3) {
    gradientStyle =
      'linear-gradient(90deg, rgba(255, 255, 255, .35), rgba(255, 255, 255, .45), rgba(255, 255, 255, .35), rgba(255, 255, 255, .45)), url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/13471/sparkles.gif)'
  } else if (rarityTier === 4) {
    gradientStyle = 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/13471/sparkles.gif)'
  } else if (rarityTier === 5) {
    gradientStyle =
      'linear-gradient(-45deg, rgba(255, 255, 0, .1),rgba(255, 0, 0, .1) ,rgba(255, 255, 0, .1),rgba(0, 255, 255, .1), rgba(255, 255, 255, .1),rgba(255, 255, 0, .1), rgba(255, 0, 255, .1) ,rgba(0, 255, 0, .1), rgba(255, 255, 0, .1)), url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/13471/sparkles.gif)'
  }
  const previewImage = <StyledImage src={src} alt={alt} />
  const rare = rarityTier
  return (
    <Container gradient={gradientStyle}>
      {originalLink ? (
        <a href={originalLink} target="_blank" rel="noreferrer noopener">
          {previewImage}
        </a>
      ) : (
        previewImage
      )}
    </Container>
  )
}

export default Image
