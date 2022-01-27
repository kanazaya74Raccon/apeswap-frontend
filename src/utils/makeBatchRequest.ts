import getProvider from './getProvider'

/**
 * Accepts an array of contract method calls and batches them
 *
 * Example:
 *
 * [
 *  contract.method.balanceOf().call,
 *  contract.method.startBlockNumber().call
 * ]
 */
const makeBatchRequest = (calls: any[], chainId: number) => {
  try {
    const provider = getProvider(chainId)
    const batch = new provider.BatchRequest()

    const promises = calls.map((call) => {
      return new Promise((resolve, reject) => {
        batch.add(
          call.request({}, (err, result) => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          }),
        )
      })
    })

    batch.execute()

    return Promise.all(promises)
  } catch {
    return null
  }
}

export default makeBatchRequest
