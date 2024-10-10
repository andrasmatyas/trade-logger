import { useState, useEffect } from 'react'
import './InputBox.css'

const InputBox = ({ filterOn, handleAdd }) => {
  const [transactionType, setTransactionType] = useState('Buy')
  const [amount1, setAmount1] = useState('')
  const [currency1, setCurrency1] = useState('')
  const [amount2, setAmount2] = useState('')
  const [currency2, setCurrency2] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [fieldCheck, setFieldCheck] = useState([true, true, true, true, true])
  useEffect(() => {
    initInput()
  }, [transactionType])
  const tabLabels = ['Buy', 'Sell', 'Receive', 'Withdraw']
  const inputFieldDanger = (index) => {
    return `input-field  ${fieldCheck[index] ? '' : 'input-field-danger'}`
  }
  function initInput() {
    setAmount1('')
    setCurrency1('')
    setAmount2('')
    setCurrency2('')
    setDateTime('')
    setFieldCheck([true, true, true, true, true])
  }
  function generateRow() {
    switch (transactionType) {
      case 'Buy':
        return {
          id: Date.now().toString(),
          type: transactionType,
          amount1: amount1,
          currency1: currency1,
          amount2: amount2,
          currency2: currency2,
          datetime: dateTime,
        }
      case 'Sell':
        return {
          id: Date.now().toString(),
          type: transactionType,
          amount1: amount2,
          currency1: currency2,
          amount2: amount1,
          currency2: currency1,
          datetime: dateTime,
        }
      case 'Receive':
        return {
          id: Date.now().toString(),
          type: transactionType,
          amount1: amount1,
          currency1: currency1,
          amount2: 0,
          currency2: '',
          datetime: dateTime,
        }
      case 'Withdraw':
        return {
          id: Date.now().toString(),
          type: transactionType,
          amount1: 0,
          currency1: '',
          amount2: amount1,
          currency2: currency1,
          datetime: dateTime,
        }
      default:
        return {
          id: '',
          type: '',
          amount1: 0,
          currency1: '',
          amount2: 0,
          currency2: '',
          datetime: '',
        }
    }
  }
  function buttonAction() {
    let checkArray = []
    checkArray.push(amount1 === '' || amount1 === 0 ? false : true)
    checkArray.push(currency1 === '' ? false : true)
    checkArray.push(dateTime === '' ? false : true)
    if (transactionType === 'Buy' || transactionType === 'Sell') {
      checkArray.push(amount2 === '' || amount2 === 0 ? false : true)
      checkArray.push(currency2 === '' ? false : true)
    } else {
      checkArray.push(true)
      checkArray.push(true)
    }
    setFieldCheck(checkArray)
    if (
      checkArray[0] &&
      checkArray[1] &&
      checkArray[2] &&
      checkArray[3] &&
      checkArray[4]
    ) {
      handleAdd(generateRow())
      initInput()
    }
  }
  return (
    <div className='input-box'>
      <div className='transaction-tab-container'>
        {tabLabels.map((type, i) => (
          <div
            key={i}
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
        <div className={inputFieldDanger(0)}>
          <label>
            {transactionType} Amount:
            {!fieldCheck[0] && <span> *Required</span>}
          </label>
          <input
            type='number'
            placeholder='Enter Amount'
            value={amount1}
            onChange={(e) => setAmount1(e.target.value)}
          />
        </div>
        <div className={inputFieldDanger(1)}>
          <label>
            {transactionType} Currency:
            {!fieldCheck[1] && <span>*Required</span>}
          </label>
          <input
            type='text'
            placeholder='Enter Currency'
            value={currency1}
            onChange={(e) => setCurrency1(e.target.value)}
          />
        </div>

        <div className='input-filed-blank'>
          {(transactionType === 'Buy' || transactionType === 'Sell') && (
            <div className={inputFieldDanger(3)}>
              <label>
                {transactionType === 'Buy' ? 'Send' : 'Receive'} Amount:
                {!fieldCheck[3] && <span> *Required</span>}
              </label>
              <input
                type='number'
                placeholder='Enter Amount'
                value={amount2}
                onChange={(e) => setAmount2(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className='input-field-blank'>
          {(transactionType === 'Buy' || transactionType === 'Sell') && (
            <div className={inputFieldDanger(4)}>
              <label>
                {transactionType === 'Buy' ? 'Send' : 'Receive'} Currency:
                {!fieldCheck[4] && <span> *Required</span>}
              </label>
              <input
                type='text'
                placeholder='Enter Currency'
                value={currency2}
                onChange={(e) => setCurrency2(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className={inputFieldDanger(2)}>
          <label>Date & Time:{!fieldCheck[2] && <span> *Required</span>}</label>
          <input
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            type='datetime-local'
          />
        </div>
        <div className='button-container'>
          {!filterOn && (
            <button onClick={() => buttonAction()}>{transactionType}</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default InputBox
