import styled from 'styled-components'

const Gutter = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  cursor: row-resize;
  height: 12px;
  position: relative;
  &:before {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    content: '';
    height: 4px;
    left: 50%;
    margin-left: -32px;
    position: absolute;
    top: 4px;
    width: 64px;
  }
`

export default Gutter
