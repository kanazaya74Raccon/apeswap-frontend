import { useEffect, useReducer, useRef } from 'react'
import { noop } from 'lodash'
import { useWeb3React } from '@web3-react/core'

type Web3Payload = Record<string, unknown> | null

type LoadingState = 'idle' | 'loading' | 'success' | 'fail'

type Action =
  | { type: 'requires_approval' }
  | { type: 'approve_sending' }
  | { type: 'approve_receipt'; payload: Web3Payload }
  | { type: 'approve_error'; payload: Web3Payload }

interface State {
  approvalState: LoadingState
  approvalReceipt: Web3Payload
  approvalError: Web3Payload
}

const initialState: State = {
  approvalState: 'idle',
  approvalReceipt: null,
  approvalError: null,
}

const reducer = (state: State, actions: Action): State => {
  switch (actions.type) {
    case 'requires_approval':
      return {
        ...state,
        approvalState: 'success',
      }
    case 'approve_sending':
      return {
        ...state,
        approvalState: 'loading',
      }
    case 'approve_receipt':
      return {
        ...state,
        approvalState: 'success',
        approvalReceipt: actions.payload,
      }
    case 'approve_error':
      return {
        ...state,
        approvalState: 'fail',
        approvalError: actions.payload,
      }
    default:
      return state
  }
}

type ContractHandler = () => any

interface ApproveConfirmTransaction {
  onApprove: ContractHandler
  onRequiresApproval?: (account) => Promise<boolean>
  onSuccess: (state: State) => void
}

const useApproveTransaction = ({ onApprove, onRequiresApproval, onSuccess = noop }: ApproveConfirmTransaction) => {
  const { account } = useWeb3React()
  const [state, dispatch] = useReducer(reducer, initialState)
  const handlePreApprove = useRef(onRequiresApproval)

  // Check if approval is necessary, re-check if account changes
  useEffect(() => {
    if (account && handlePreApprove.current) {
      handlePreApprove.current(account).then((result) => {
        if (result) {
          dispatch({ type: 'requires_approval' })
        }
      })
    }
  }, [account, handlePreApprove, dispatch])

  return {
    isApproving: state.approvalState === 'loading',
    isApproved: state.approvalState === 'success',
    approvalReceipt: state.approvalReceipt,
    approvalError: state.approvalError,
    handleApprove: () => {
      onApprove()
        .on('sending', () => {
          dispatch({ type: 'approve_sending' })
        })
        .on('receipt', (payload: Web3Payload) => {
          dispatch({ type: 'approve_receipt', payload })
          onSuccess(state)
        })
        .on('error', (error: Web3Payload) => {
          dispatch({ type: 'approve_error', payload: error })
        })
    },
  }
}

export default useApproveTransaction
