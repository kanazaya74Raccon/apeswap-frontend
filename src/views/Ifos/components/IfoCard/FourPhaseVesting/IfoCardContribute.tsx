import React, { useState } from 'react'
import { Text } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import getTimePeriods from 'utils/getTimePeriods'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useIfoAllowance } from 'hooks/useAllowance'
import { useIfoApprove } from 'hooks/useApprove'
import { getBalanceNumber } from 'utils/formatBalance'
import { ZERO_ADDRESS } from 'config'
import { Contract } from 'ethers'
import { useTranslation } from 'contexts/Localization'
import useTokenBalance from 'hooks/useTokenBalance'
import useUserInfo from './useUserInfo'

import {
  ApproveButton,
  VestingButtonWrapper,
  VestingClaimButton,
  Claim,
  DisplayVestingTime,
  TextWrapRow,
} from './styles'
import ContributeInput from '../ContributeInput/ContributeInput'
import useFourPhaseIAOHarvest from '../../../hooks/useFourPhaseIAOHarvest'

export interface Props {
  account: string
  address: string
  currency: string
  currencyAddress: string
  contract: Contract
  amountContributed: number
  tokenDecimals: number
  isActive?: boolean
  isFinished?: boolean
}

const formatTime = (time: any): string => {
  return `${time.days}d ${time.hours}h ${time.minutes}m`
}

const IfoCardContribute: React.FC<Props> = ({
  address,
  currency,
  currencyAddress,
  contract,
  tokenDecimals,
  isFinished,
  isActive,
}) => {
  const [pendingTx, setPendingTx] = useState(false)

  const { account } = useActiveWeb3React()

  const allowance = useIfoAllowance(currencyAddress, address, pendingTx)
  const tokenBalance = useTokenBalance(currencyAddress)
  const onApprove = useIfoApprove(currencyAddress, address)

  const { userTokenStatus, harvestBlockReleases, userInfo, userHarvestedFlags } = useUserInfo(
    contract,
    tokenDecimals,
    address,
  )
  const onClaim = useFourPhaseIAOHarvest(contract, setPendingTx)

  const harvestTwoTime = getTimePeriods(harvestBlockReleases.two, true)
  const harvestThreeTime = getTimePeriods(harvestBlockReleases.three, true)
  const harvestFourTime = getTimePeriods(harvestBlockReleases.four, true)

  const { t } = useTranslation()

  if (currencyAddress !== ZERO_ADDRESS && allowance === null) {
    return null
  }

  if (
    isActive &&
    currencyAddress !== ZERO_ADDRESS &&
    (allowance.isLessThanOrEqualTo(new BigNumber('0')) || allowance.isLessThan(tokenBalance))
  ) {
    return (
      <ApproveButton
        disabled={pendingTx}
        // variant="yellow"
        onClick={async () => {
          try {
            setPendingTx(true)
            await onApprove()
            setPendingTx(false)
          } catch (e) {
            setPendingTx(false)
            console.warn(e)
          }
        }}
      >
        {t('APPROVE')}
      </ApproveButton>
    )
  }

  const amountContributed = getBalanceNumber(new BigNumber(userInfo.amount.toString()))

  const tokensHarvestedAvailable = getBalanceNumber(
    new BigNumber(userTokenStatus?.offeringTokenHarvest.toString()),
    tokenDecimals,
  )
  const tokensVested = getBalanceNumber(new BigNumber(userTokenStatus?.offeringTokensVested.toString()), tokenDecimals)

  return (
    <>
      {!isFinished && account && (
        <>
          <ContributeInput
            currency={currency}
            contract={contract}
            tokenBalance={tokenBalance}
            currencyAddress={currencyAddress}
            disabled={pendingTx}
          />
          {amountContributed > 0 && (
            <TextWrapRow>
              <Text fontSize="14px" fontWeight={600}>
                {t('Your contributions')}:
              </Text>
              <Text fontSize="14px" fontWeight={600}>
                {amountContributed.toFixed(4)} {currency}
              </Text>
            </TextWrapRow>
          )}
        </>
      )}
      {isFinished && (
        <>
          <VestingButtonWrapper>
            {amountContributed > 0 && (
              <>
                <VestingClaimButton disabled={userHarvestedFlags[0]} onClick={() => onClaim(0)}>
                  {userHarvestedFlags[0] ? <Claim>Claimed</Claim> : <Claim color="white">{t('Claim')}</Claim>}
                </VestingClaimButton>
                {(tokensVested > 0 || tokensHarvestedAvailable > 0) && (
                  <>
                    <VestingClaimButton
                      disabled={harvestBlockReleases.two > 0 || userHarvestedFlags[1]}
                      onClick={() => onClaim(1)}
                    >
                      {userHarvestedFlags[1] && harvestBlockReleases.two < 0 && <Claim>{t('Claimed')}</Claim>}
                      {!userHarvestedFlags[1] && harvestBlockReleases.two < 0 && (
                        <Claim color="white">{t('Claim')}</Claim>
                      )}
                      {harvestBlockReleases.two > 0 && (
                        <>
                          <DisplayVestingTime label>{t('Vesting time')}</DisplayVestingTime>
                          <DisplayVestingTime>{formatTime(harvestTwoTime)}</DisplayVestingTime>
                        </>
                      )}
                    </VestingClaimButton>
                    <VestingClaimButton
                      disabled={harvestBlockReleases.three > 0 || userHarvestedFlags[2]}
                      onClick={() => onClaim(2)}
                    >
                      {userHarvestedFlags[2] && harvestBlockReleases.three < 0 && <Claim>{t('Claimed')}</Claim>}
                      {!userHarvestedFlags[2] && harvestBlockReleases.three < 0 && (
                        <Claim color="white">{t('Claim')}</Claim>
                      )}
                      {harvestBlockReleases.three > 0 && (
                        <>
                          <DisplayVestingTime label>{t('Vesting time')}</DisplayVestingTime>
                          <DisplayVestingTime>{formatTime(harvestThreeTime)}</DisplayVestingTime>
                        </>
                      )}
                    </VestingClaimButton>
                    <VestingClaimButton
                      disabled={harvestBlockReleases.four > 0 || userHarvestedFlags[3]}
                      onClick={() => onClaim(3)}
                    >
                      {userHarvestedFlags[3] && harvestBlockReleases.four < 0 && <Claim>{t('Claimed')}</Claim>}
                      {!userHarvestedFlags[3] && harvestBlockReleases.four < 0 && (
                        <Claim color="white">{t('Claim')}</Claim>
                      )}
                      {harvestBlockReleases.four > 0 && (
                        <>
                          <DisplayVestingTime label>{t('Vesting time')}</DisplayVestingTime>
                          <DisplayVestingTime>{formatTime(harvestFourTime)}</DisplayVestingTime>
                        </>
                      )}
                    </VestingClaimButton>
                  </>
                )}
              </>
            )}
          </VestingButtonWrapper>
        </>
      )}
    </>
  )
}

export default IfoCardContribute
