// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.
// In the URL, using the quote token 'BNB' is represented by 'ETH'
const getLiquidityUrlPathParts = ({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, chainId }) => {
  const firstPart = quoteTokenSymbol === 'BNB' ? 'ETH' : quoteTokenAdresses[chainId]
  const secondPart = tokenAddresses[chainId]
  return `${firstPart}/${secondPart}`
}

export default getLiquidityUrlPathParts
