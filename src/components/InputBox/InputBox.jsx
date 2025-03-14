import { useState, useEffect, useContext } from 'react'
import { dataActionsContext } from '../../context/dataContext'
import { FilterOnContext } from '../../context/filterOnContext'
import inputObject from '../../assets/inputObject'
import useObjReducer from '../../hooks/useObjReducer'
import InputField from '../InputField/InputField'
import './InputBox.css'

const InputBox = () => {
  const [transactionType, setTransactionType] = useState('Buy')
  const [requiredObject, setRequiredObject] = useState(initialRequiredValue())
  const { objState: inputState, objDispatch: inputDispatch } = useObjReducer({
    amount1: '',
    currency1: '',
    amount2: '',
    currency2: '',
    datetime: '',
  })
  const { addRow } = useContext(dataActionsContext)
  const filterOn = useContext(FilterOnContext)
  function initialRequiredValue() {
    return {
      amount1: false,
      currency1: false,
      amount2: false,
      currency2: false,
      datetime: false,
    }
  }
  function calculateRequiredObject() {
    let required = false
    inputObject[transactionType].forEach((obj) => {
      if (obj.inputKey !== undefined) {
        if (
          inputState[obj.inputKey] === '' ||
          inputState[obj.inputKey] === '0'
        ) {
          setRequiredObject((prev) => ({ ...prev, [obj.inputKey]: true }))
          required = true
        } else {
          setRequiredObject((prev) => ({ ...prev, [obj.inputKey]: false }))
        }
      }
    })
    return required
  }
  function addHandler() {
    const reqBool = calculateRequiredObject()
    if (reqBool) {
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
    setRequiredObject(initialRequiredValue())
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
              required={requiredObject[obj.inputKey]}
              inputType={obj.inputType}
              inputValue={inputState[obj.inputKey]}
              inputKey={obj.inputKey}
              inputDispatch={inputDispatch}
            />
          )
        )}
        <div className='input-button-container'>
          {!filterOn && (
            <button className='button' onClick={addHandler}>
              {transactionType}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default InputBox
