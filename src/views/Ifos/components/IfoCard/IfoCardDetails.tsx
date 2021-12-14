import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, LinkExternal, Link } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

export interface IfoCardDetailsProps {
  saleAmount: string
  raiseAmount: string
  bananaToBurn: string
  projectSiteUrl: string
  raisingAmount: BigNumber
  totalAmount: BigNumber
  burnedTxUrl: string
  vestingTime: string
  address: string
  percentRaised?: string
}

const StyledIfoCardDetails = styled.div`
  margin: 32px 0;
  border-radius: 5px;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  padding: 4px 10px;
  background: #7c7c7d0f;

  &:first-child {
    border-radius: 5px 5px 0px 0px;
  }

  &:last-child {
    border-radius: 0px 0px 5px 5px;
  }

  &:nth-child(even) {
    background: #7c7c7d08;
  }
`

const Display = styled(Text)`
  flex: 1;
  font-size: 14px;
  font-family: 'Titan One';
`

const DisplayText = styled(Text)`
  font-family: 'Titan One';
`

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({
  saleAmount,
  raiseAmount,
  bananaToBurn,
  raisingAmount,
  totalAmount,
  vestingTime,
  burnedTxUrl, // TODO: Where to show it
  address,
  percentRaised,
}) => {
  const TranslateString = useI18n()

  // HIFI subscribe hotfix
  let subscribeAmount = raisingAmount.eq(new BigNumber(0)) ? 0 : totalAmount.div(raisingAmount).times(100).toFixed(2)

  if (address === '0x4D5e1E722e9280d44C564ef3FC14E0B03a50ad47') {
    // IFO
    subscribeAmount = 4459.42
  } else if (address === '0xe3528182889afEAEADE455841b6CFE9AC1e53a03') {
    // APEZONE
    subscribeAmount = 252.33
  }

  return (
    <>
      <StyledIfoCardDetails>
        <Item>
          <Display>{TranslateString(584, 'For Sale')}</Display>
          <DisplayText fontSize="14px">{saleAmount}</DisplayText>
        </Item>
        <Item>
          <Display>{TranslateString(999, 'To raise (USD)')}</Display>
          <DisplayText fontSize="14px">{raiseAmount}</DisplayText>
        </Item>
        {bananaToBurn && (
          <Item>
            <Display>{TranslateString(586, 'BANANA to burn (USD)')}</Display>
            <DisplayText fontSize="14px">{bananaToBurn}</DisplayText>
          </Item>
        )}
        <Item>
          <Display>{TranslateString(999, 'Total raised (% of the target)')}</Display>
          <DisplayText fontSize="14px">{`${percentRaised || subscribeAmount}%`}</DisplayText>
        </Item>
        <Item>
          <Display>{TranslateString(584, 'Total Vesting Time')}</Display>
          <Text fontSize="14px">{vestingTime}</Text>
        </Item>
      </StyledIfoCardDetails>

      {/* {burnedTxUrl && burnedTxUrl !== '' && (
        <LinkExternal fontFamily="Titan One" href={burnedTxUrl} style={{ margin: 'auto' }}>
          {TranslateString(412, 'View burned transactions')}
        </LinkExternal>
      )} */}
    </>
  )
}

export default IfoCardDetails
