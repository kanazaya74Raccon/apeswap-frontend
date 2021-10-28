import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Text, ArrowBackIcon, ArrowForwardIcon } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useGetNfaAuctionHistory } from 'hooks/api'

interface RowProps {
  background?: boolean
}

interface ArrowProps {
  active: boolean
}

const PositinBox = styled.div`
  position: absolute;
  width: 100%;
  height: 600px;
  top: 870px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HistoryWrapper = styled.div`
  width: 790px;
  height: 558px;
  background: ${({ theme }) => theme.colors.card};
  mix-blend-mode: normal;
  box-shadow: 5px 4px 8px rgba(0, 0, 0, 0.1), inset 355px 4px 250px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(24px);
  border-radius: 10px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
`

const HistoryTitle = styled(Text)`
  position: absolute;
  top: 30px;
  font-family: Titan One;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 25px;
  letter-spacing: 0.05em;
`

const ColumnHeadersWrapper = styled.div`
  position: absolute;
  top: 80px;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 90px;
  padding-right: 70px;
`
const HeaderText = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.05em;
`

const BodyWrapper = styled.div`
  position: absolute;
  top: 120px;
  height: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 25px;
  padding-right: 25px;
  flex-shrink: 0;
`

const Row = styled.div<RowProps>`
  height: 27px;
  width: 100%;
  background: ${(props) => props.background && (props.theme.isDark ? 'rgb(250, 250, 250, 0.1)' : 'rgb(250, 250, 250)')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 45px;
  padding-right: 45px;
  flex-shrink: 0;
`

const Column = styled.div`
  height: 27;
  width: 120px;
  font-family: Poppins;
  font-style: normal;
  font-size: 14px;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
`

const ArrowsWrapper = styled.div`
  position: absolute;
  top: 490px;
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledBackArrow = styled(ArrowBackIcon)<ArrowProps>`
  fill: #ffb300;
  height: 50px;
  width: 50px;
  margin-right: 10px;
  flex-shrink: 0;
  cursor: ${(props) => props.active && 'pointer'};
  opacity: ${(props) => !props.active && '.3'};
`

const StyledForwardArrow = styled(ArrowForwardIcon)<ArrowProps>`
  fill: #ffb300;
  height: 50px;
  width: 50px;
  margin-left: 10px;
  flex-shrink: 0;
  cursor: ${(props) => props.active && 'pointer'};
  opacity: ${(props) => !props.active && '.3'};
`

const ROWS_PER_PAGE = 13

const History: React.FC = () => {
  const historyData = useGetNfaAuctionHistory()
  const [prevSlice, setPrevSlice] = useState(0)
  const [curSlice, setCurSlice] = useState(ROWS_PER_PAGE)
  const [backArrowFlag, setBackArrowFlag] = useState(false)
  const [forwardArrowFlag, setForwardArrowFlag] = useState(false)

  useEffect(() => {
    setForwardArrowFlag(ROWS_PER_PAGE < historyData?.length)
  }, [setForwardArrowFlag, historyData])

  useEffect(() => {
    if (curSlice > historyData?.length) {
      setForwardArrowFlag(false)
      setBackArrowFlag(true)
    }
    if (prevSlice === 0) {
      setBackArrowFlag(false)
    }
  }, [curSlice, prevSlice, historyData, setForwardArrowFlag, setBackArrowFlag])

  const handleBackArrow = () => {
    if (backArrowFlag) {
      setPrevSlice(prevSlice - ROWS_PER_PAGE)
      setCurSlice(curSlice - ROWS_PER_PAGE)
      setForwardArrowFlag(true)
    }
  }

  const handleForwardArrow = () => {
    if (forwardArrowFlag) {
      setPrevSlice(prevSlice + ROWS_PER_PAGE)
      setCurSlice(curSlice + ROWS_PER_PAGE)
      setBackArrowFlag(true)
    }
  }

  const renderRows = () => {
    const rows =
      Array.isArray(historyData) &&
      historyData?.slice(prevSlice, curSlice).map((data, i) =>
        !(i % 2) ? (
          <Row background>
            <Column>{data.tokenId}</Column>
            <Column>{getBalanceNumber(new BigNumber(data.amount)).toFixed(2)} BNB</Column>
            <Column>
              {data.bidder.slice(0, 4)}...{data.bidder.slice(data.bidder.length - 4, data.bidder.length)}
            </Column>
            <Column>{data.blockNumber}</Column>
          </Row>
        ) : (
          <Row>
            <Column>{data.tokenId}</Column>
            <Column>{getBalanceNumber(new BigNumber(data.amount)).toFixed(2)} BNB</Column>
            <Column>
              {data.bidder.slice(0, 4)}...{data.bidder.slice(data.bidder.length - 4, data.bidder.length)}
            </Column>
            <Column>{data.blockNumber}</Column>
          </Row>
        ),
      )
    return rows
  }

  return (
    <PositinBox>
      <HistoryWrapper>
        <HistoryTitle>History</HistoryTitle>
        <ColumnHeadersWrapper>
          <HeaderText>NFA Index</HeaderText>
          <HeaderText>Amount</HeaderText>
          <HeaderText>Bidder</HeaderText>
          <HeaderText>Block Number</HeaderText>
        </ColumnHeadersWrapper>
        <BodyWrapper>{renderRows()}</BodyWrapper>
        <ArrowsWrapper>
          <StyledBackArrow active={backArrowFlag} onClick={handleBackArrow} />
          <StyledForwardArrow active={forwardArrowFlag} onClick={handleForwardArrow} />
        </ArrowsWrapper>
      </HistoryWrapper>
    </PositinBox>
  )
}

export default History
