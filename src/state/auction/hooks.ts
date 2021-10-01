import auctionAbi from 'config/abi/auction.json'
import { AuctionsOverall, Auction } from 'state/types'
import Nfts from 'config/constants/nfts'
import BigNumber from 'bignumber.js'
import { ZERO_ADDRESS } from 'config'
import multicall from 'utils/multicall'
import { useAuctionAddress, useMulticallAddress } from 'hooks/useAddress'

export const useFetchAuctionDetails = async () => {
  const auctionContract = useAuctionAddress()
  const multicallAddress = useMulticallAddress()
  const call = [
    {
      address: auctionContract,
      name: 'activeAuctionNodeId',
    },
    {
      address: auctionContract,
      name: 'minIncrementAmount',
    },
    {
      address: auctionContract,
      name: 'minIncrementPercentage',
    },
    {
      address: auctionContract,
      name: 'auctionFeePercent',
    },
    {
      address: auctionContract,
      name: 'lastNodeId',
    },
  ]
  const auctionDetails = await multicall(multicallAddress, auctionAbi, call)
  return auctionDetails
}

export const useFetchAllAuctions = async (): Promise<AuctionsOverall> => {
  const multicallAddress = useMulticallAddress()
  const auctionContract = useAuctionAddress()
  const [activeAuctionId, minIncrementAmount, minIncrementPercentage, auctionFeePercent, pushedAuctions] =
    await useFetchAuctionDetails()
  const getAuctionCalls = [...Array(new BigNumber(pushedAuctions).toNumber())].map((e, i) => {
    return {
      address: auctionContract,
      name: 'getAuctionWithPosition',
      params: [i + 1],
    }
  })
  const allAuctions = await multicall(multicallAddress, auctionAbi, getAuctionCalls)
  const auctionData = {
    activeAuctionId: new BigNumber(activeAuctionId).toNumber(),
    auctionFeePercent: new BigNumber(auctionFeePercent).toNumber(),
    minIncrementAmount: new BigNumber(minIncrementAmount).toNumber(),
    minIncrementPercentage: new BigNumber(minIncrementPercentage).toNumber(),
    pushedAuctions: new BigNumber(pushedAuctions).toNumber(),
    auctionsRemovedCount: allAuctions.filter((auction) => auction.auction.seller === ZERO_ADDRESS).length,
    auctions: allAuctions
      .map((auction, i): Auction => {
        return {
          auctionId: i + 1,
          nfa: Nfts.find((nft) => nft.index === auction.node.data.toNumber()),
          seller: auction.auction.seller,
          highestBidder: auction.auction.highestBidder,
          highestBid: auction.auction.highestBid.toString(),
          timeExtension: auction.auction.timeExtension.toNumber(),
          timeLength: auction.auction.timeLength.toNumber(),
          minToExtend: auction.auction.minToExtend.toNumber(),
          startTime: auction.auction.startTime.toNumber(),
          endTime: auction.auction.endTime.toNumber(),
        }
      })
      .filter(({ seller }) => seller !== ZERO_ADDRESS),
  }
  return auctionData
}
