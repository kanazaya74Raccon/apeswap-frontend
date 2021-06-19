declare const dataLayer: Array<any>
/// <reference types="react-scripts" />

interface WindowChain {
  ethereum?: {
    isMetaMask?: true
    request?: (...args: any[]) => void
  }
}
