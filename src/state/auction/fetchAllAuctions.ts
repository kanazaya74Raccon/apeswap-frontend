import auctionAbi from 'config/abi/auction.json'
import { AuctionsOverall, Auction, Nfa } from 'state/types'
import { getAuctionAddress } from 'utils/addressHelper'
import BigNumber from 'bignumber.js'
import { ZERO_ADDRESS } from 'config'
import multicall from 'utils/multicall'

export const fetchAuctionDetails = async (auctionContractAddress: string, chainId: number) => {
  const call = [
    {
      address: auctionContractAddress,
      name: 'activeAuctionNodeId',
    },
    {
      address: auctionContractAddress,
      name: 'minIncrementAmount',
    },
    {
      address: auctionContractAddress,
      name: 'minIncrementPercentage',
    },
    {
      address: auctionContractAddress,
      name: 'auctionFeePercent',
    },
    {
      address: auctionContractAddress,
      name: 'lastNodeId',
    },
  ]
  const auctionDetails = await multicall(chainId, auctionAbi, call)
  return auctionDetails
}

export const fetchAllAuctions = async (nfas: Nfa[], chainId: number): Promise<AuctionsOverall> => {
  const auctionContractAddress = getAuctionAddress(chainId)
  const [activeAuctionId, minIncrementAmount, minIncrementPercentage, auctionFeePercent, pushedAuctions] =
    await fetchAuctionDetails(auctionContractAddress, chainId)
  const getAuctionCalls = [...Array(new BigNumber(pushedAuctions).toNumber())].map((e, i) => {
    return {
      address: auctionContractAddress,
      name: 'getAuctionWithPosition',
      params: [i + 1],
    }
  })
  const allAuctions = await multicall(chainId, auctionAbi, getAuctionCalls)
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
          nfa: nfas.find((nft) => nft.index === auction.node.data.toNumber()),
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
