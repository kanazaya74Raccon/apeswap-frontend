const storeImage = {}

export const getTokenUrlBySymbol = async (tokenSymbol: string): Promise<string> => {
  // console.log(storeImage)
  if (storeImage[tokenSymbol]) {
    return storeImage[tokenSymbol]
  }
  if (!tokenSymbol) {
    return null
  }
  const fetchUrlSvg = `https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${tokenSymbol}.svg`
  const fetchUrlPng = `https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${tokenSymbol}.png`
  const url = fetch(fetchUrlSvg).then((svRes) => {
    if (svRes.ok) {
      storeImage[tokenSymbol] = fetchUrlSvg
      return fetchUrlSvg
    }
    return fetch(fetchUrlPng).then((pngRes) => {
      if (pngRes.ok) {
        storeImage[tokenSymbol] = fetchUrlPng
        return fetchUrlPng
      }
      return null
    })
  })
  return url
}
