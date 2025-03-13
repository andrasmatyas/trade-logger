import { useState, useEffect, useContext } from 'react'
import { dataActionsContext } from '../../context/dataContext'
import { FilterOnContext } from '../../context/filterOnContext'
import inputObject from '../../assets/inputObject'
import useInputReducer from '../../hooks/useInputReducer'
import InputField from '../InputField/InputField'
import './InputBox.css'

const InputBox = () => {
  const [transactionType, setTransactionType] = useState('Buy')
  const [requiredArray, setRequiredArray] = useState(
    initialRequiredArrayValue()
  )
  const { inputState, inputDispatch } = useInputReducer()
  const { addRow } = useContext(dataActionsContext)
  const filterOn = useContext(FilterOnContext)
  function initialRequiredArrayValue() {
    return new Array(5).fill(false)
  }
  function calculateRequiredArray() {
    const reqArray = []
    reqArray.push(
      inputState.amount1 === '' || inputState.amount1 === '0' ? true : false
    )
    reqArray.push(inputState.currency1 === '' ? true : false)
    if (transactionType === 'Buy' || transactionType === 'Sell') {
      reqArray.push(
        inputState.amount2 === '' || inputState.amount2 === '0' ? true : false
      )
      reqArray.push(inputState.currency2 === '' ? true : false)
    } else {
      reqArray.push(false)
      reqArray.push(false)
    }
    reqArray.push(inputState.datetime === '' ? true : false)
    return reqArray
  }
  function addHandler() {
    const reqArray = calculateRequiredArray()
    setRequiredArray(reqArray)
    if (
      reqArray[0] ||
      reqArray[1] ||
      reqArray[2] ||
      reqArray[3] ||
      reqArray[4]
    ) {
      return
    }
    addRow({
      ...inputState,
      id: Date.now().toString(),
      type: transactionType,
    })
    inputDispatch({ type: 'reset' })
  }
  useEffect(() => {
    inputDispatch({ type: 'reset' })
    setRequiredArray(initialRequiredArrayValue())
  }, [transactionType])
  return (
    <div className='input-box'>
      <div className='transaction-tab-container'>
        {Object.keys(inputObject).map((type, i) => (
          <div
            key={`trans-${i}`}
            className={`transaction-tab ${
              transactionType === type ? 'tab-selected' : 'tab-not-sel'
            }`}
            onClick={() => setTransactionType(type)}
          >
            {type.toUpperCase()}
          </div>
        ))}
      </div>
      <div className='input-form'>
        {inputObject[transactionType].map((obj, i) =>
          obj.blank === true ? (
            <div className='input-field-blank' key={`input-${i}`}></div>
          ) : (
            <InputField
              key={`input-${i}`}
              label={obj.label}
              required={requiredArray[i]}
              inputType={obj.inputType}
              inputValue={inputState[obj.inputKey]}
              inputKey={obj.inputKey}
              inputDispatch={inputDispatch}
            />
          )
        )}
        <div className='button-container'>
          {!filterOn && <button onClick={addHandler}>{transactionType}</button>}
        </div>
      </div>
    </div>
  )
}

export default InputBox
