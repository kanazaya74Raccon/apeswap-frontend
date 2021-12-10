import React, { useState, useEffect } from 'react'
import { useMatchBreakpoints } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import TokenInput from './TokenInput'
import { TokenSaleDetails, ExtendedERC20Details } from '../types'
import {
  LaunchPadInfoWrapper,
  CheckBoxStyled,
  StyledHeader,
  CheckboxContainer,
  FooterContainer,
  StyledText,
} from './styles'

interface PresaleDataProps {
  pairTokenDetails: ExtendedERC20Details
  onChange?: (presaleDetails: TokenSaleDetails) => void
}

const PresaleDetails: React.FC<PresaleDataProps> = ({ pairTokenDetails, onChange }) => {
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs
  const { isDark } = useTheme()
  const marginRight = isMobile ? '0px' : '12.5px'
  const bgColor = isDark ? 'rgba(51, 51, 51, 1)' : '#E5E5E5'
  const { tokenSymbol, quoteToken, userBalance, tokenDecimals } = pairTokenDetails
  const [tokenDetails, setTokenDetails] = useState<TokenSaleDetails>({
    tokensForSale: null,
    pricePerToken: null,
    limitPerUser: null,
    softcap: null,
    burnRemains: false,
  })
  const balance = getBalanceNumber(new BigNumber(userBalance), tokenDecimals)

  useEffect(() => {
    onChange(tokenDetails)
  }, [tokenDetails, onChange])

  return (
    <>
      <LaunchPadInfoWrapper>
        <StyledHeader>How many {tokenSymbol} are up for presale?</StyledHeader>
        <TokenInput
          onChange={(e) => setTokenDetails({ ...tokenDetails, tokensForSale: e.currentTarget.value })}
          size="lg"
          tokenSymbol={tokenSymbol}
          userBalance={balance}
          backgroundColor={bgColor}
          min={0}
          max={balance}
        />
        <TokenInput
          onChange={(e) => setTokenDetails({ ...tokenDetails, pricePerToken: e.currentTarget.value })}
          title={`Price of 1 ${tokenSymbol}`}
          mr={marginRight}
          quoteTokenSymbol={quoteToken}
          size="md"
          backgroundColor={bgColor}
          min={0}
        />
        <TokenInput
          onChange={(e) => setTokenDetails({ ...tokenDetails, limitPerUser: e.currentTarget.value })}
          title={`${quoteToken} limit per user`}
          quoteTokenSymbol={quoteToken}
          ml={marginRight}
          size="md"
          backgroundColor={bgColor}
          min={0}
        />
        <TokenInput
          onChange={(e) => setTokenDetails({ ...tokenDetails, softcap: e.currentTarget.value })}
          title="Softcap"
          quoteTokenSymbol={quoteToken}
          mr={marginRight}
          size="md"
          backgroundColor={bgColor}
          min={0}
          max={parseFloat(tokenDetails?.tokensForSale) * parseFloat(tokenDetails?.pricePerToken)}
        />
        <TokenInput
          defaultVal={(parseFloat(tokenDetails?.tokensForSale) * parseFloat(tokenDetails?.pricePerToken)).toString()}
          title="Hardcap"
          ml={marginRight}
          size="md"
          disabled
          quoteTokenSymbol={quoteToken}
          backgroundColor={bgColor}
          min={0}
        />
        <FooterContainer>
          <CheckboxContainer>
            <CheckBoxStyled
              checked={tokenDetails?.burnRemains}
              onChange={() => setTokenDetails({ ...tokenDetails, burnRemains: !tokenDetails?.burnRemains })}
            />
          </CheckboxContainer>
          <StyledText>
            If softcap is met, but hardcap is not, burn the remaining tokens allocated to the token sale.
          </StyledText>
        </FooterContainer>
      </LaunchPadInfoWrapper>
    </>
  )
}

export default React.memo(PresaleDetails)
