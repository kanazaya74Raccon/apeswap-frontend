import styled from 'styled-components'

export const SaleStatusContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  flex-direction: row;
  align-items: space-between;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

export const Wrapper = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

export const ProgressBarWrapper = styled.div`
  width: 280px;
  margin-top: 15px;
  margin-bottom: 20px;
  border-radius: 20px;
  overflow: hidden;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 557px;
  }
`

export const ProgressBar = styled.div`
  height: 18px;
  width: 100%;
  border-radius: 20px;
  background: #c4c4c4;
`

export const IazoSymbolsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    align-items: flex-start;
    justify-content: space-between;
  }
`

export const Progress = styled(ProgressBar)<{ percentComplete: string }>`
  width: ${(props) => props.percentComplete};
  background: linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%);
`
