import React, { useState } from 'react'
import { useSousHarvest } from 'hooks/useHarvest'
import useIsMobile from 'hooks/useIsMobile'
import { useToast } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useSousStake } from 'hooks/useStake'
import { fetchPoolsUserDataAsync, updateUserPendingReward } from 'state/pools'
import ListViewContent from 'components/ListViewContent'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { StyledButton } from '../styles'
import { ActionContainer } from './styles'

interface HarvestActionsProps {
  sousId: number
  userEarnings: number
  earnTokenSymbol: string
  disabled: boolean
}

const HarvestAction: React.FC<HarvestActionsProps> = ({ sousId, earnTokenSymbol, disabled, userEarnings }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const [pendingApeHarderTrx, setPendingApeHarderTrx] = useState(false)
  const { onHarvest } = useSousHarvest(sousId)
  const { onStake } = useSousStake(sousId)

  const { toastSuccess } = useToast()
  const isMobile = useIsMobile()
  const { t } = useTranslation()

  const handleHarvest = async () => {
    setPendingTrx(true)
    await onHarvest()
      .then((resp) => {
        const trxHash = resp.transactionHash
        toastSuccess(t('Harvest Successful'), {
          text: t('View Transaction'),
          url: getEtherscanLink(trxHash, 'transaction', chainId),
        })
      })
      .catch((e) => {
        console.error(e)
        setPendingTrx(false)
      })
    dispatch(updateUserPendingReward(chainId, sousId, account))
    setPendingTrx(false)
  }

  const handleApeHarder = async () => {
    setPendingApeHarderTrx(true)
    await onStake(userEarnings.toString())
      .then((resp) => {
        const trxHash = resp.transactionHash
        toastSuccess(t('Ape Harder Successful'), {
          text: t('View Transaction'),
          url: getEtherscanLink(trxHash, 'transaction', chainId),
        })
      })
      .catch((e) => {
        console.error(e)
        setPendingApeHarderTrx(false)
      })
    dispatch(fetchPoolsUserDataAsync(chainId, account))
    setPendingApeHarderTrx(false)
  }

  return (
    <ActionContainer>
      {isMobile && (
        <ListViewContent
          title={`${t('Earned')} ${earnTokenSymbol}`}
          value={userEarnings?.toFixed(4)}
          width={100}
          height={50}
          ml={10}
        />
      )}
      {sousId === 0 && (
        <StyledButton
          disabled={disabled || pendingApeHarderTrx}
          onClick={handleApeHarder}
          load={pendingApeHarderTrx}
          mr={isMobile ? '0px' : '10px'}
          style={{ minWidth: isMobile && '100px', width: isMobile && '115px', padding: '0px' }}
        >
          {t('Compound')}
        </StyledButton>
      )}
      <StyledButton
        disabled={disabled || pendingTrx}
        onClick={handleHarvest}
        load={pendingTrx}
        style={{ minWidth: isMobile && sousId === 0 && '100px', width: isMobile && sousId === 0 && '100px' }}
      >
        {t('HARVEST')}
      </StyledButton>
      {!isMobile && (
        <ListViewContent
          title={`${t('Earned')} ${earnTokenSymbol}`}
          value={userEarnings?.toFixed(4)}
          width={150}
          height={50}
          ml={10}
        />
      )}
    </ActionContainer>
  )
}

export default React.memo(HarvestAction)
