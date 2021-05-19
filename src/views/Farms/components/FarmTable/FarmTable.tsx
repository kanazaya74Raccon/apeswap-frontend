import React, { useRef } from 'react'
import styled from 'styled-components'
import { useTable, Button, ColumnType } from '@apeswapfinance/uikit'
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

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`

// const StyledIconFixed = styled.div`
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   width: 50px;
//   height: 50px;
// `

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
          <ScrollButtonContainer>
            <Button variant="text" onClick={scrollToTop}>
              {TranslateString(999, 'To Top')}
            </Button>
          </ScrollButtonContainer>
        </TableContainer>
      </Container>
    </>
  )
}

export default FarmTable
