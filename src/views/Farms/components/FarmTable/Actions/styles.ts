import styled from 'styled-components'

export const ActionContainer = styled.div`
  padding: 24px;
  border: 2px solid ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  min-height: 150px;
  margin-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 0;
    max-height: 100px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 48px;
    margin-right: 0;
    margin-bottom: 0;
    max-height: 100px;
  }
`

export const ActionTitles = styled.div`
  font-weight: 300;
  font-size: 12px;
  margin-bottom: 8px;
`

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`

export const Subtle = styled.span`
  color: ${({ theme }) => theme.colors.textSubtle};
`

export const ActionContent = styled.div`
  margin-top: 1px;
`
export const Earned = styled.div`
  font-weight: 300;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
`

export const StakedStyle = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSubtle};
`
