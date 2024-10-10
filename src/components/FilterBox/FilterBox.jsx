import './FilterBox.css'
import { useState } from 'react'

const FilterBox = ({ balance, handleFilter }) => {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [currency1, setCurrency1] = useState('')
  const [currency2, setCurrency2] = useState('')
  const [buyOn, setBuyOn] = useState(true)
  const [sellOn, setSellOn] = useState(true)
  const [receiveOn, setReceiveOn] = useState(true)
  const [withdrawOn, setWithdrawOn] = useState(true)
  function initFilter() {
    setDateFrom('')
    setDateTo('')
    setCurrency1('')
    setCurrency2('')
    setBuyOn(true)
    setSellOn(true)
    setReceiveOn(true)
    setWithdrawOn(true)
  }
  const selectOptions0 = Object.keys(balance)
  const selectOptions = ['', ...selectOptions0]
  return (
    <div className='filter-box'>
      <div className='filter-header'>FILTER</div>
      <div className='filter-form'>
        <div className='input-field'>
          <label>Date From:</label>
          <input
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            type='datetime-local'
          />
        </div>
        <div className='input-field'>
          <label>Date To:</label>
          <input
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            type='datetime-local'
          />
        </div>
        <div className='input-field'>
          <label>Currency 1:</label>
          <select
            value={currency1}
            onChange={(e) => setCurrency1(e.target.value)}
          >
            {selectOptions.map((val, i) => (
              <option key={i} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
        <div className='input-field'>
          <label>Currency 2:</label>
          <select
            value={currency2}
            onChange={(e) => setCurrency2(e.target.value)}
          >
            {selectOptions.map((val, i) => (
              <option key={i} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
        <div className='checkbox-container'>
          <label>
            <input
              type='checkbox'
              checked={buyOn}
              onChange={() => setBuyOn((prevState) => !prevState)}
            />
            Buy
          </label>
          <label>
            <input
              type='checkbox'
              checked={sellOn}
              onChange={() => setSellOn((prevState) => !prevState)}
            />
            Sell
          </label>
        </div>
        <div className='checkbox-container'>
          <label>
            <input
              type='checkbox'
              checked={receiveOn}
              onChange={() => setReceiveOn((prevState) => !prevState)}
            />
            Receive
          </label>
          <label>
            <input
              type='checkbox'
              checked={withdrawOn}
              onChange={() => setWithdrawOn((prevState) => !prevState)}
            />
            Withdraw
          </label>
        </div>
        <div className='button-container'>
          <button
            onClick={() => {
              initFilter()
              handleFilter([false, '', '', '', '', true, true, true, true])
            }}
          >
            Reset
          </button>
        </div>
        <div className='button-container'>
          <button
            onClick={() => {
              if (
                dateFrom ||
                dateTo ||
                currency1 ||
                currency2 ||
                !(buyOn && sellOn && receiveOn && withdrawOn)
              ) {
                handleFilter([
                  true,
                  dateFrom,
                  dateTo,
                  currency1,
                  currency2,
                  buyOn,
                  sellOn,
                  receiveOn,
                  withdrawOn,
                ])
              }
            }}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  )
}
export default FilterBox
