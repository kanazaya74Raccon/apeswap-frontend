import React, { useRef } from 'react'
import styled from 'styled-components'
import { useTable, Button, ChevronUpIcon, ColumnType } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

import Row, { RowProps } from './Row'

export interface ITableProps {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
}

const Container = styled.div`
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin: 16px 0px;
`

const ContainerLabels = styled.div`
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin-top: 34px;
  height: 32px;
  display: flex;
  align-items: center;
  height: 100%;
`

const StyledTableLabels = styled.div`
  display: flex;
  margin: 10px 0px;
`

const StyledLabel = styled.div`
  width: 100%;
  display: flex;
  color: ${({ theme }) => theme.colors.textSubtle};
  font-family: Poppins;
  font-weight: bold;
  font-size: 12px;
  line-height: 12px;
`

const StyledLabel2 =  styled.div`
  width: 100%;
  display: flex;
  color: ${({ theme }) => theme.colors.textSubtle};
  font-family: Poppins;
  font-weight: bold;
  font-size: 12px;
  line-height: 12px;
`



const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  background-color: #faf9fa;
`

const TableBody = styled.tbody`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`

const TableContainer = styled.div`
  position: relative;
`

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`

const FarmTable: React.FC<ITableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const TranslateString = useI18n()
  const { data, columns } = props

  const { rows } = useTable(columns, data, {
    sortable: true,
  })

  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  //                     /* eslint-disable no-debugger */
  // debugger;
  // /* eslint-enable no-debugger */

  return (
    <>
      <Container>
        <TableContainer>
          <TableWrapper ref={tableWrapperEl}>
            <StyledTable>
              <TableBody>
                {rows.map((row, index) => {
                  
                   return <div>
                    <ContainerLabels>
        <StyledTableLabels>
          <StyledLabel>LP</StyledLabel>
          <StyledLabel>APR</StyledLabel>
          <StyledLabel>Liquidity</StyledLabel>
          <StyledLabel>Earned</StyledLabel>
          <StyledLabel>Reset</StyledLabel>
        </StyledTableLabels>
      </ContainerLabels>
                   <Row {...row.original} key={`table-row-${row.id}`} />
                   </div>
                  return <Row {...row.original} key={`table-row-${row.id}`} />
                })}
              </TableBody>
            </StyledTable>
          </TableWrapper>
          <ScrollButtonContainer>
            <Button variant="text" onClick={scrollToTop}>
              {TranslateString(999, 'To Top')}
              <ChevronUpIcon color="primary" />
            </Button>
          </ScrollButtonContainer>
        </TableContainer>
      </Container>
    </>
  )
}

export default FarmTable
