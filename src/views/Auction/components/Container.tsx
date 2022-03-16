import styled from 'styled-components'

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  ${({ theme }) => theme.mediaQueries.xxl} {
    min-height: 180vh;
  }
`

export default Container
