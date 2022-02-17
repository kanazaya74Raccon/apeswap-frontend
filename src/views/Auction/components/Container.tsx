import styled from 'styled-components'

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  height: calc(100vh - 64px);
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  ${({ theme }) => theme.mediaQueries.xl} {
    min-height: 180vh;
  }
`

export default Container
