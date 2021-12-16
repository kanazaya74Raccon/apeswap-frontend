import React, { useRef } from 'react'
import styled from 'styled-components'
import { useTable, ColumnType } from '@apeswapfinance/uikit'

import Row, { RowProps } from './Row'
import {LpTokenPrices} from "../../../../state/types";

export interface ITableProps {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
  farmsPrices: LpTokenPrices[]
}

const Container = styled.div`
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin: 16px 0px;
  position: relative;

  transform: translateY(-85px);
  ${({ theme }) => theme.mediaQueries.md} {
    transform: translateY(-60px);
  }
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
  background-color: ${({ theme }) => (theme.isDark ? 'black' : '#faf9fa')};
`

const TableContainer = styled.div`
  position: relative;
`

const FarmTable: React.FC<ITableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { data, columns , farmsPrices} = props

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
                return <Row {...row.original} key={row.id} farmsPrices={farmsPrices}/>
              })}
            </StyledTable>
          </TableWrapper>
        </TableContainer>
      </Container>
    </>
  )
}

export default FarmTable
