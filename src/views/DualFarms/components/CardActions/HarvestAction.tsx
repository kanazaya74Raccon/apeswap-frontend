import React, { useState } from 'react'
import { useMiniChefHarvest } from 'hooks/useHarvest'
import { AutoRenewIcon, useMatchBreakpoints } from '@apeswapfinance/uikit'
import { useToast } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ListViewContent from 'components/ListViewContent'
import { useTranslation } from 'contexts/Localization'
import { FarmButton } from '../styles'
import { ActionContainer } from './styles'

interface HarvestActionsProps {
  pid: number
  userEarningsUsd: string
  disabled: boolean
}

const HarvestAction: React.FC<HarvestActionsProps> = ({ pid, disabled, userEarningsUsd }) => {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onReward } = useMiniChefHarvest(pid)
  const { toastSuccess } = useToast()
  const { isXl, isLg, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl

  return (
    <ActionContainer>
      {isMobile && <ListViewContent title={t('Earned')} value={userEarningsUsd} width={100} height={50} ml={10} />}
      <FarmButton
        className="noClick"
        disabled={disabled || pendingTrx}
        onClick={async () => {
          setPendingTrx(true)
          await onReward()
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
          setPendingTrx(false)
        }}
        endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
      >
        {t('HARVEST')}
      </FarmButton>
      {!isMobile && <ListViewContent title={t('Earned')} value={userEarningsUsd} width={100} height={50} ml={10} />}
    </ActionContainer>
  )
}

export default React.memo(HarvestAction)
