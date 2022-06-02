import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { ThemeUIStyleObject } from 'theme-ui'

export const FlexContainer = styled.div`
  background-color: ${({ theme }) => (theme.isDark ? theme.colors.background : 'rgba(77, 64, 64, 1)')};
  font-weight: 400;
  color: #fff;
  text-align: justify;
  flex-wrap: wrap;
  width: 250px;
  margin-bottom: 100px;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 90%;
    align-items: center;
    justify-content: center;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 1200px;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 0px;
  }
`

export const Container = styled.div`
  position: relative;
  display: flex;
  background-color: ${({ theme }) => (theme.isDark ? theme.colors.background : 'rgba(77, 64, 64, 1)')};
  border-top: 5px solid ${({ theme }) => theme.colors.white3};
  padding: 20px;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 60px 40px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 80px 50px 100px 50px;
  }
`

export const Heading = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 6px;
  margin-top: 6px;
  color: white;
`

export const Title = styled(Text)`
  font-weight: 700;
  font-size: 30px;
  margin-bottom: 8px;
  color: white;
`

export const styles: Record<string, ThemeUIStyleObject> = {
  text: {
    fontSize: '14px',
    marginBottom: '4px',
  },
  list: {
    fontSize: '14px',
    margin: '0px 0px 4px 25px',
  },
  subList: {
    fontSize: '14px',
    margin: '0px 0px 4px 50px',
  },
}
