import React, { useRef } from 'react'
import styled from 'styled-components'
import { useTable, ColumnType } from '@apeswapfinance/uikit'

import Row, { RowProps } from './Row'

export interface ITableProps {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.white2};
  border-radius: 16px;
  margin: 16px 0px;
  position: relative;
`

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.div`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const TableContainer = styled.div`
  position: relative;
`

const FarmTable: React.FC<ITableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { data, columns } = props

  const { rows } = useTable(columns, data, {
    sortable: true,
  })

  return (
    <>
      <Container>
        <TableContainer>
          <TableWrapper ref={tableWrapperEl}>
            <StyledTable>
              {rows.map((row) => {
                return <Row {...row.original} key={row.id} />
              })}
            </StyledTable>
          </TableWrapper>
        </TableContainer>
      </Container>
    </>
  )
}

export default FarmTable
