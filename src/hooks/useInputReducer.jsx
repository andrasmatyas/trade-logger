import { useReducer } from 'react'

const initialInputState = {
  amount1: '',
  currency1: '',
  amount2: '',
  currency2: '',
  datetime: '',
}

function inputReducer(state, action) {
  if (Object.keys(initialInputState).includes(action.type)) {
    return { ...state, [action.type]: action.payload }
  }
  if (action.type === 'reset') {
    return initialInputState
  }
  return state
}

const useInputReducer = () => {
  const [inputState, inputDispatch] = useReducer(
    inputReducer,
    initialInputState
  )
  return { inputState, inputDispatch }
}

export default useInputReducer
