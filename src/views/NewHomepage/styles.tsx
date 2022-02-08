import styled, { keyframes } from 'styled-components'

export const Banner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  height: 788px;
  width: 100%;
  background: ${({ theme }) =>
    theme.isDark ? theme.colors.background : 'linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%)'};
`
export const FadeIn = keyframes`
    0%{opacity: .5};
    100%{opacity: 1};
`
