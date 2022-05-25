import React, { useState } from 'react'
import { useJungleHarvest } from 'hooks/useHarvest'
import useIsMobile from 'hooks/useIsMobile'
import { useToast } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { updateJungleFarmsUserPendingReward } from 'state/jungleFarms'
import ListViewContent from 'components/ListViewContent'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { StyledButton } from '../styles'
import { ActionContainer } from './styles'

interface HarvestActionsProps {
  jungleId: number
  userEarnings: number
  earnTokenSymbol: string
  disabled: boolean
}

const HarvestAction: React.FC<HarvestActionsProps> = ({ jungleId, earnTokenSymbol, disabled, userEarnings }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onHarvest } = useJungleHarvest(jungleId)

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
    dispatch(updateJungleFarmsUserPendingReward(chainId, jungleId, account))
    setPendingTrx(false)
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
      <StyledButton
        disabled={disabled || pendingTrx}
        onClick={handleHarvest}
        load={pendingTrx}
        style={{ minWidth: isMobile && jungleId === 0 && '100px', width: isMobile && jungleId === 0 && '100px' }}
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
