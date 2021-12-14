import React from 'react'
import styled, { keyframes } from 'styled-components'

interface ImageProps {
  src?: string
  alt?: string
  originalLink?: string
  rarityTier: number
  borderRadius?: string
}

interface ContainerProps {
  gradient: string
  backgroundSize: string
  borderRadius?: string
}

const sway = keyframes`
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
`

const Container = styled.div<ContainerProps>`
  background: ${(props) => props.gradient};
  background-size: ${(props) => props.backgroundSize};
  position: relative;
  overflow: hidden;
  padding-bottom: 100%;
  animation: ${sway} 20s ease infinite;
  border-radius: ${(props) => props.borderRadius};
`

const TierSvg = styled.div`
  position: absolute;
  top: 2.5%;
  right: 5%;
  mix-blend-mode: screen;
  font-size: 50px;
  fill: rgba(255, 255, 255, 0.1);
`

const TierNumber = styled.p`
  font-family: 'Titan One';
`

const Image: React.FC<ImageProps> = ({ src, alt, rarityTier, borderRadius }) => {
  let gradientStyle = ''
  let backgroundSize = ''
  if (rarityTier === 1) {
    gradientStyle = 'linear-gradient(90deg, rgba(0,83,255,1) 0%, rgba(73,252,69,1) 100%);'
    backgroundSize = '200% 200%'
  } else if (rarityTier === 2) {
    gradientStyle =
      'radial-gradient(circle, rgba(255,0,0,0.6189426112241772) 10%, rgba(121, 7, 242, .75) 70%,rgba(255,162,0,.8) 100%);'
    backgroundSize = '200% 200%'
  } else if (rarityTier === 3) {
    gradientStyle =
      'linear-gradient( 293.5deg,  rgba(254,255,42,1) .2%, rgba(251,148,207,1) 9.9%, rgba(181,149,208,1) 22.9%, rgba(254,255,42,1) 36.4%, rgba(181,149,208,1) 50.1%, rgba(0,255,252,1) 61.1%, rgba(181,149,208,1) 71.2%, rgba(254,255,42,1) 84.2%, rgba(0,255,252,1) 92.2% );'
    backgroundSize = '300% 300%'
  } else if (rarityTier === 4) {
    gradientStyle =
      'radial-gradient(circle, rgba(255,255,255,.7) 0%, rgba(255,255,255,0) 70%), linear-gradient(-45deg, rgba(255, 255, 0, .1),rgba(255, 0, 0, .1) ,rgba(255, 255, 0, .1),rgba(0, 255, 255, .1), rgba(255, 255, 255, .1),rgba(255, 255, 0, .1), rgba(255, 0, 255, .1) ,rgba(0, 255, 0, .1), rgba(255, 255, 0, .1)), url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/13471/sparkles.gif)'
    backgroundSize = '100% 100%'
  } else if (rarityTier === 5) {
    gradientStyle =
      'radial-gradient(circle, rgba(243,255,35,1) 0%, rgba(148,187,233,0) 80%), url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/13471/sparkles.gif)'
    backgroundSize = '100% 100%'
  }

  return (
    <Container gradient={gradientStyle} backgroundSize={backgroundSize} borderRadius={borderRadius}>
      <TierSvg>
        <TierNumber>{rarityTier}</TierNumber>
      </TierSvg>
      {src && <StyledImage src={src} alt={alt} />}
    </Container>
  )
}

export default Image
