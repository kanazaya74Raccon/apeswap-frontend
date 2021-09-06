import React from 'react'
import { Modal, Flex, Text } from '@apeswapfinance/uikit'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useBanana, useNonFungibleApes, useProfile } from 'hooks/useContract'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { fetchProfile } from 'state/profile'
import { useToast } from 'state/hooks'
import ApproveConfirmButtons from './ApproveConfirmButtons'

interface Props {
  userName: string
  tokenId: number
  account: string
  teamId: number
  minimumBananaRequired: BigNumber
  allowance: BigNumber
  onDismiss?: () => void
}

const ContributeModal: React.FC<Props> = ({
  account,
  teamId,
  tokenId,
  minimumBananaRequired,
  allowance,
  onDismiss,
}) => {
  const TranslateString = useI18n()
  const profileContract = useProfile()
  const nonFungibleApesContract = useNonFungibleApes()
  const dispatch = useDispatch()
  const { toastSuccess } = useToast()
  const bananaContract = useBanana()

  const {
    isApproving,
    isApproved,
    isConfirmed,
    isConfirming,
    handleApprove,
    handleConfirm,
  } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const response = await bananaContract.methods.allowance(account, profileContract.options.address).call()
        const currentAllowance = new BigNumber(response)
        return currentAllowance.gte(minimumBananaRequired)
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      return bananaContract.methods.approve(profileContract.options.address, allowance.toJSON()).send({ from: account })
    },
    onConfirm: () => {
      return profileContract.methods
        .createProfile(teamId, nonFungibleApesContract.options.address, tokenId)
        .send({ from: account })
    },
    onSuccess: async () => {
      await dispatch(fetchProfile(account))
      onDismiss()
      toastSuccess('Profile created!')
    },
  })

  return (
    <Modal title="Complete Profile" onDismiss={onDismiss}>
      <Text color="textSubtle" mb="8px">
        {TranslateString(999, 'Submitting NFT to contract and confirming User Name and Team.')}
      </Text>
      <Flex justifyContent="space-between" mb="16px">
        <Text>{TranslateString(999, 'Cost')}</Text>
        <Text>{TranslateString(999, '1 BANANA')}</Text>
      </Flex>
      <ApproveConfirmButtons
        isApproveDisabled={isConfirmed || isConfirming || isApproved}
        isApproving={isApproving}
        isConfirmDisabled={!isApproved || isConfirmed}
        isConfirming={isConfirming}
        onApprove={handleApprove}
        onConfirm={handleConfirm}
      />
    </Modal>
  )
}

export default ContributeModal
