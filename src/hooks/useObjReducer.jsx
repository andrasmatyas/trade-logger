import { useReducer } from 'react'

const useObjReducer = (initialObjState) => {
  const [objState, objDispatch] = useReducer(objReducer, initialObjState)
  function objReducer(state, action) {
    if (Object.keys(initialObjState).includes(action.type)) {
      return { ...state, [action.type]: action.payload }
    }
    if (action.type === 'reset') {
      return initialObjState
    }
    return state
  }
  return { objState, objDispatch }
}

export default useObjReducer
