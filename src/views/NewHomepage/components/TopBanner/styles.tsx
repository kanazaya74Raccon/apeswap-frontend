import styled from 'styled-components'

export const BannerWrapper = styled.div`
  position: relative;
  display: flex;
  height: 788px;
  width: 100%;
  background: ${({ theme }) =>
    theme.isDark ? theme.colors.background : 'linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%)'};
`
