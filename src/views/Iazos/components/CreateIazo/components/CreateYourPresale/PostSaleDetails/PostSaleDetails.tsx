import React, { useState, useEffect } from 'react'
import { SECONDS_PER_YEAR } from 'config'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import TokenInput from '../PresaleDetails/TokenInput'
import DropdownList from './DropdownList'
import { LiquidityLockDetails } from '../types'
import {
  LaunchPadInfoWrapper,
  StyledHeader,
  InputTitle,
  PercentageToRaiseWrapper,
  LiquidityButton,
  InputsWrapper,
} from './styles'

interface PostSaleDetailsProp {
  quoteTokenSymbol: string
  presalePrice: string
  onChange?: (postSaleDetails: LiquidityLockDetails) => void
}

const PostSaleDetails: React.FC<PostSaleDetailsProp> = ({ quoteTokenSymbol, presalePrice, onChange }) => {
  const lockedLiquidityValues = {
    '2 Years': SECONDS_PER_YEAR.times(2).toNumber(),
    '1 Year': SECONDS_PER_YEAR.toNumber(),
    '6 Months': SECONDS_PER_YEAR.div(2).toNumber(),
  }

  const { isDark } = useTheme()
  const { t } = useTranslation()

  const [liquidityDetails, setLiquidityDetails] = useState<LiquidityLockDetails>({
    liquidityPercent: null,
    listingPrice: null,
    lockLiquidity: lockedLiquidityValues['1 Year'],
  })

  const onLiquidityClick = (amount: number) => {
    setLiquidityDetails((prevState) => ({ ...prevState, liquidityPercent: amount }))
  }

  const minListPrice = presalePrice && parseFloat(presalePrice) - parseFloat(presalePrice) * 0.25
  const maxListPrice = presalePrice && parseFloat(presalePrice) + parseFloat(presalePrice) * 0.5

  useEffect(() => {
    onChange(liquidityDetails)
  }, [liquidityDetails, onChange])

  return (
    <>
      <LaunchPadInfoWrapper>
        <StyledHeader>{t('Post sale liquidity')}</StyledHeader>
        <PercentageToRaiseWrapper>
          <InputTitle>{t('Percentage of raise to lock in liquidity')}</InputTitle>
          <LiquidityButton active={liquidityDetails?.liquidityPercent === 0.3} onClick={() => onLiquidityClick(0.3)}>
            30%
          </LiquidityButton>
          <LiquidityButton active={liquidityDetails?.liquidityPercent === 0.5} onClick={() => onLiquidityClick(0.5)}>
            50%
          </LiquidityButton>
          <LiquidityButton active={liquidityDetails?.liquidityPercent === 0.75} onClick={() => onLiquidityClick(0.75)}>
            75%
          </LiquidityButton>
          <LiquidityButton active={liquidityDetails?.liquidityPercent === 1} onClick={() => onLiquidityClick(1)}>
            100%
          </LiquidityButton>
        </PercentageToRaiseWrapper>
        <InputsWrapper>
          <TokenInput
            onChange={(e) => setLiquidityDetails({ ...liquidityDetails, listingPrice: e.currentTarget.value })}
            title={t('Listing Price')}
            quoteTokenSymbol={quoteTokenSymbol}
            size="md"
            backgroundColor={isDark ? '#383838' : '#F1EADA'}
            min={minListPrice}
            max={maxListPrice}
          />
          <DropdownList
            onChange={(item) =>
              setLiquidityDetails({ ...liquidityDetails, lockLiquidity: lockedLiquidityValues[item] })
            }
            dropdownList={['2 Years', '1 Year', '6 Months']}
            title={t('Lock Liquidity for')}
            defaultIndex={1}
          />
        </InputsWrapper>
      </LaunchPadInfoWrapper>
    </>
  )
}

export default React.memo(PostSaleDetails)
