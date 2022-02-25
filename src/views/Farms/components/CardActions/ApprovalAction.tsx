import React, { useState } from 'react'
import { Skeleton, AutoRenewIcon, LinkExternal, Text } from '@apeswapfinance/uikit'
import { useApprove } from 'hooks/useApprove'
import { useERC20 } from 'hooks/useContract'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useToast } from 'state/hooks'
import { StyledButtonSquare } from './styles'

interface ApprovalActionProps {
  stakingTokenContractAddress: string
  pid: number
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ stakingTokenContractAddress, pid, isLoading = false }) => {
  const { chainId } = useActiveWeb3React()
  const stakingTokenContract = useERC20(stakingTokenContractAddress)
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onApprove } = useApprove(stakingTokenContract, pid)
  const { toastSuccess } = useToast()

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <StyledButtonSquare
          className="noClick"
          disabled={pendingTrx}
          onClick={async () => {
            setPendingTrx(true)
            await onApprove()
              .then((resp) => {
                const trxHash = resp.transactionHash
                toastSuccess(
                  'Approve Successful',
                  <LinkExternal href={getEtherscanLink(trxHash, 'transaction', chainId)}>
                    <Text> View Transaction </Text>
                  </LinkExternal>,
                )
              })
              .catch((e) => {
                console.error(e)
                setPendingTrx(false)
              })
            setPendingTrx(false)
          }}
          endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
        >
          ENABLE
        </StyledButtonSquare>
      )}
    </>
  )
}

export default React.memo(ApprovalAction)
