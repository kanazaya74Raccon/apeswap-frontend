import styled, { keyframes } from 'styled-components'

export const Banner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  height: 788px;
  width: 100%;
  background-image: ${({ theme }) => (theme.isDark ? 'url(images/banner-night.svg)' : 'url(images/banner-day.svg)')};
  background-size: cover;
  background-repeat: no-repeat;
`
export const FadeIn = keyframes`
    0%{opacity: .5};
    100%{opacity: 1};
`

export const FadeOut = keyframes`
    0%{opacity: 1};
    100%{opacity: 0};
`
