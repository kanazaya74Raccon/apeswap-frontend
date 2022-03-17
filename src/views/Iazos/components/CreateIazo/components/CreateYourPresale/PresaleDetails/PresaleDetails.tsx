import React, { useState, useEffect } from 'react'
import { useMatchBreakpoints, Checkbox } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import TokenInput from './TokenInput'
import { TokenSaleDetails, ExtendedERC20Details } from '../types'
import { LaunchPadInfoWrapper, StyledHeader, CheckboxContainer, FooterContainer, StyledText } from './styles'

interface PresaleDataProps {
  pairTokenDetails: ExtendedERC20Details
  onChange?: (presaleDetails: TokenSaleDetails) => void
}

const PresaleDetails: React.FC<PresaleDataProps> = ({ pairTokenDetails, onChange }) => {
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs
  const { isDark } = useTheme()
  const marginRight = isMobile ? '0px' : '12.5px'
  const bgColor = isDark ? '#383838' : '#F1EADA'
  const { tokenSymbol, quoteToken, userBalance, tokenDecimals } = pairTokenDetails
  const [tokenDetails, setTokenDetails] = useState<TokenSaleDetails>({
    tokensForSale: null,
    pricePerToken: null,
    limitPerUser: null,
    softcap: null,
    burnRemains: false,
  })
  const balance = getBalanceNumber(new BigNumber(userBalance), tokenDecimals)
  const { t } = useTranslation()

  useEffect(() => {
    onChange(tokenDetails)
  }, [tokenDetails, onChange])

  return (
    <>
      <LaunchPadInfoWrapper>
        <StyledHeader>{t('How many %symbol% are up for presale?', { symbol: tokenSymbol })}</StyledHeader>
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
          title={`${t('Price of 1')} ${tokenSymbol}`}
          mr={marginRight}
          quoteTokenSymbol={quoteToken}
          size="md"
          backgroundColor={bgColor}
          min={0}
        />
        <TokenInput
          onChange={(e) => setTokenDetails({ ...tokenDetails, limitPerUser: e.currentTarget.value })}
          title={`${quoteToken} ${t('limit per user')}`}
          quoteTokenSymbol={quoteToken}
          ml={marginRight}
          size="md"
          backgroundColor={bgColor}
          min={0}
        />
        <TokenInput
          onChange={(e) => setTokenDetails({ ...tokenDetails, softcap: e.currentTarget.value })}
          title={t('Softcap')}
          quoteTokenSymbol={quoteToken}
          mr={marginRight}
          size="md"
          backgroundColor={bgColor}
          min={0}
          max={parseFloat(tokenDetails?.tokensForSale) * parseFloat(tokenDetails?.pricePerToken)}
        />
        <TokenInput
          defaultVal={(parseFloat(tokenDetails?.tokensForSale) * parseFloat(tokenDetails?.pricePerToken)).toString()}
          title={t('Hardcap')}
          ml={marginRight}
          size="md"
          disabled
          quoteTokenSymbol={quoteToken}
          backgroundColor={bgColor}
          min={0}
        />
        <FooterContainer>
          <CheckboxContainer>
            <Checkbox
              checked={tokenDetails?.burnRemains}
              onChange={() => setTokenDetails({ ...tokenDetails, burnRemains: !tokenDetails?.burnRemains })}
            />
          </CheckboxContainer>
          <StyledText>
            {t('If softcap is met, but hardcap is not, burn the remaining tokens allocated to the token sale.')}
          </StyledText>
        </FooterContainer>
      </LaunchPadInfoWrapper>
    </>
  )
}

export default React.memo(PresaleDetails)
