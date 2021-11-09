const fetchAndUpdateNetwork = (web3ChainId: number, account: string, chainId: number) => {
  if (account) {
    if (web3ChainId === chainId) {
      return { chainId }
    }
    return { chainId: web3ChainId }
  }
  return { chainId }
}

export default fetchAndUpdateNetwork
