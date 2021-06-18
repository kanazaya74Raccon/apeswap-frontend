import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Card, CardBody, Heading, Text } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useBanana, useRabbitMintingFarm } from 'hooks/useContract'
import useHasBananaBalance from 'hooks/useHasBananaBalance'
import nftList from 'config/constants/nfts'
import SelectionCard from '../components/SelectionCard'
import NextStepButton from '../components/NextStepButton'
import ApproveConfirmButtons from '../components/ApproveConfirmButtons'
import useProfileCreation from './contexts/hook'

const starterBunnyIds = [5, 6, 7, 8, 9]
const nfts = nftList.filter((nft) => starterBunnyIds.includes(nft.index))
const minimumBananaBalance = 4

const Mint: React.FC = () => {
  const [bunnyId, setBunnyId] = useState(null)
  const { actions, minimumBananaRequired, allowance } = useProfileCreation()
  const { account } = useWeb3React()
  const bananaContract = useBanana()
  const mintingFarmContract = useRabbitMintingFarm()
  const TranslateString = useI18n()
  const hasMinimumBananaRequired = useHasBananaBalance(minimumBananaBalance)
  const {
    isApproving,
    isApproved,
    isConfirmed,
    isConfirming,
    handleApprove,
    handleConfirm,
  } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      // TODO: Move this to a helper, this check will be probably be used many times
      try {
        const response = await bananaContract.methods.allowance(account, mintingFarmContract.options.address).call()
        const currentAllowance = new BigNumber(response)
        return currentAllowance.gte(minimumBananaRequired)
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      return bananaContract.methods
        .approve(mintingFarmContract.options.address, allowance.toJSON())
        .send({ from: account })
    },
    onConfirm: () => {
      return mintingFarmContract.methods.mintNFT(bunnyId).send({ from: account })
    },
    onSuccess: () => actions.nextStep(),
  })

  return (
    <>
      <Text fontSize="20px" color="textSubtle" bold>
        {TranslateString(999, `Step ${1}`)}
      </Text>
      <Heading as="h3" size="xl" mb="24px">
        {TranslateString(999, 'Get Starter Collectible')}
      </Heading>
      <Text as="p">{TranslateString(999, 'Every profile starts by making a “starter” collectible (NFT).')}</Text>
      <Text as="p">{TranslateString(999, 'This starter will also become your first profile picture.')}</Text>
      <Text as="p" mb="24px">
        {TranslateString(999, 'You can change your profile pic later if you get another approved Ape Collectible.')}
      </Text>
      <Card mb="24px">
        <CardBody>
          <Heading as="h4" size="lg" mb="8px">
            {TranslateString(999, 'Choose your Starter!')}
          </Heading>
          <Text as="p" color="textSubtle">
            {TranslateString(999, 'Choose wisely: you can only ever make one starter collectible!')}
          </Text>
          <Text as="p" mb="24px" color="textSubtle">
            {TranslateString(999, 'Cost: 4 BANANA')}
          </Text>
          {nfts.map((nft) => {
            const handleChange = (value: string) => setBunnyId(parseInt(value, 10))

            return (
              <SelectionCard
                key={nft.index}
                name="mintStarter"
                value={nft.index}
                image={`/images/nfts/${nft.image}`}
                isChecked={bunnyId === nft.index}
                onChange={handleChange}
                disabled={isApproving || isConfirming || isConfirmed || !hasMinimumBananaRequired}
              >
                <Text bold>{nft.name}</Text>
              </SelectionCard>
            )
          })}
          <ApproveConfirmButtons
            isApproveDisabled={bunnyId === null || isConfirmed || isConfirming || isApproved}
            isApproving={isApproving}
            isConfirmDisabled={!isApproved || isConfirmed}
            isConfirming={isConfirming}
            onApprove={handleApprove}
            onConfirm={handleConfirm}
          />
          {!hasMinimumBananaRequired && (
            <Text color="failure" mt="16px">
              {TranslateString(999, `A minimum of ${minimumBananaBalance} BANANA is required`)}
            </Text>
          )}
        </CardBody>
      </Card>
      <NextStepButton onClick={actions.nextStep} disabled={!isConfirmed}>
        {TranslateString(999, 'Next Step')}
      </NextStepButton>
    </>
  )
}

export default Mint
