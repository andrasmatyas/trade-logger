import { dataContext } from '../../context/dataContext'
import {
  FilteredDataContext,
  SetFilteredDataContext,
} from '../../context/filteredDataContext'
import {
  FilterOnContext,
  SetFilterOnContext,
} from '../../context/filterOnContext'
import './FilterBox.css'
import { useContext, useState } from 'react'

const FilterBox = () => {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [currency1, setCurrency1] = useState('')
  const [currency2, setCurrency2] = useState('')
  const [buyOn, setBuyOn] = useState(true)
  const [sellOn, setSellOn] = useState(true)
  const [receiveOn, setReceiveOn] = useState(true)
  const [withdrawOn, setWithdrawOn] = useState(true)
  const data = useContext(dataContext)
  const filteredData = useContext(FilteredDataContext)
  const setFilteredData = useContext(SetFilteredDataContext)
  const filterOn = useContext(FilterOnContext)
  const setFilterOn = useContext(SetFilterOnContext)
  const currencyOptions = getCurrencyOptions(filterOn ? filteredData : data)
  function getCurrencyOptions(tableData) {
    return tableData.reduce(
      (acc, row) => {
        const currentArray = acc
        if (!currentArray.includes(row.currency1)) {
          currentArray.push(row.currency1)
        }
        if (!currentArray.includes(row.currency2)) {
          currentArray.push(row.currency2)
        }
        return currentArray
      },
      ['']
    )
  }

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
  function filterBoolean(row, filterArray) {
    let typeArray = []
    if (filterArray[5]) {
      typeArray.push('Buy')
    }
    if (filterArray[6]) {
      typeArray.push('Sell')
    }
    if (filterArray[7]) {
      typeArray.push('Receive')
    }
    if (filterArray[8]) {
      typeArray.push('Withdraw')
    }
    let dateFromBool = filterArray[1] ? row.datetime >= filterArray[1] : true
    let dateToBool = filterArray[2] ? row.datetime <= filterArray[2] : true
    let currency1Bool = filterArray[3]
      ? row.currency1 === filterArray[3] || row.currency2 === filterArray[3]
      : true
    let currency2Bool = filterArray[4]
      ? row.currency1 === filterArray[4] || row.currency2 === filterArray[4]
      : true
    return (
      dateFromBool &&
      dateToBool &&
      currency1Bool &&
      currency2Bool &&
      typeArray.includes(row.type)
    )
  }
  function filterHandler(filterArray) {
    if (filterArray[0]) {
      setFilterOn(true)
      const filData = data.filter((row) => filterBoolean(row, filterArray))
      setFilteredData(filData)
    } else {
      setFilterOn(false)
      setFilteredData([])
    }
  }
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
            {currencyOptions.map((val, i) => (
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
            {currencyOptions.map((val, i) => (
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
              filterHandler([false, '', '', '', '', true, true, true, true])
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
                filterHandler([
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
