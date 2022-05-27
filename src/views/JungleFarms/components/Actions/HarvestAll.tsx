import React, { useState } from 'react'
import { useJungleHarvestAll } from 'hooks/useHarvest'
import { useToast } from 'state/hooks'
import { fetchJungleFarmsUserDataAsync } from 'state/jungleFarms'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { StyledButtonSquare } from './styles'

interface HarvestActionsProps {
  jungleIds: number[]
  disabled?: boolean
}

const HarvestAll: React.FC<HarvestActionsProps> = ({ jungleIds, disabled }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onHarvestAll } = useJungleHarvestAll(jungleIds)
  const { toastSuccess } = useToast()
  const { t } = useTranslation()

  const handleHarvestAll = async () => {
    setPendingTrx(true)
    await onHarvestAll()
      .then((resp) => {
        resp.map((trx) =>
          toastSuccess(t('Harvest Successful'), {
            text: t('View Transaction'),
            url: getEtherscanLink(trx.transactionHash, 'transaction', chainId),
          }),
        )
      })
      .catch((e) => {
        console.error(e)
        setPendingTrx(false)
      })
    dispatch(fetchJungleFarmsUserDataAsync(chainId, account))
    setPendingTrx(false)
  }

  return (
    <StyledButtonSquare
      height={36}
      minWidth={100}
      disabled={disabled || pendingTrx || jungleIds.length <= 0}
      onClick={handleHarvestAll}
      load={pendingTrx}
    >
      {t('HARVEST ALL')} ({jungleIds.length})
    </StyledButtonSquare>
  )
}

export default React.memo(HarvestAll)
