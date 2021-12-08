import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, LinkExternal, Link } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

export interface IfoCardDetailsProps {
  launchDate: string
  launchTime: string
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
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
`

const Display = styled(Text)`
  flex: 1;
  font-size: 14px;
`

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({
  launchDate,
  launchTime,
  saleAmount,
  raiseAmount,
  bananaToBurn,
  raisingAmount,
  totalAmount,
  vestingTime,
  burnedTxUrl,
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
          <Display>{TranslateString(582, 'Launch Time')}</Display>
          <Text fontSize="14px">
            {launchDate},
            <Link
              fontSize="14px"
              href="https://www.timeanddate.com/time/aboututc.html"
              target="blank"
              rel="noopener noreferrer"
              ml="4px"
              style={{ display: 'inline' }}
            >
              {launchTime}
            </Link>
          </Text>
        </Item>
        <Item>
          <Display>{TranslateString(584, 'Total Vesting Time')}</Display>
          <Text fontSize="14px">{vestingTime}</Text>
        </Item>
        <Item>
          <Display>{TranslateString(584, 'For Sale')}</Display>
          <Text fontSize="14px">{saleAmount}</Text>
        </Item>
        <Item>
          <Display>{TranslateString(999, 'To raise (USD)')}</Display>
          <Text fontSize="14px">{raiseAmount}</Text>
        </Item>
        {bananaToBurn && (
          <Item>
            <Display>{TranslateString(586, 'BANANA to burn (USD)')}</Display>
            <Text fontSize="14px">{bananaToBurn}</Text>
          </Item>
        )}
        <Item>
          <Display>{TranslateString(999, 'Total raised (% of target)')}</Display>
          <Text fontSize="14px">{`${percentRaised || subscribeAmount}%`}</Text>
        </Item>
      </StyledIfoCardDetails>
      {burnedTxUrl && burnedTxUrl !== '' && (
        <LinkExternal href={burnedTxUrl} style={{ margin: 'auto' }}>
          {TranslateString(412, 'View burned transactions')}
        </LinkExternal>
      )}
    </>
  )
}

export default IfoCardDetails
