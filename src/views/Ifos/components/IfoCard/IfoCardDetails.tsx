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
  projectSiteUrl,
  raisingAmount,
  totalAmount,
  burnedTxUrl,
}) => {
  const TranslateString = useI18n()

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
          <Text fontSize="14px">{`${totalAmount.div(raisingAmount).times(100).toFixed(2)}%`}</Text>
        </Item>
      </StyledIfoCardDetails>
      <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
        {TranslateString(412, 'View project site')}
      </LinkExternal>
      {burnedTxUrl && burnedTxUrl !== '' && (
        <LinkExternal href={burnedTxUrl} style={{ margin: 'auto' }}>
          {TranslateString(412, 'View burned transactions')}
        </LinkExternal>
      )}
    </>
  )
}

export default IfoCardDetails
