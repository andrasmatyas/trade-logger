import { useContext } from 'react'
import useObjReducer from '../../hooks/useObjReducer'
import { dataContext } from '../../context/dataContext'
import {
  FilteredDataContext,
  SetFilteredDataContext,
} from '../../context/filteredDataContext'
import {
  FilterOnContext,
  SetFilterOnContext,
} from '../../context/filterOnContext'
import filterObject from '../../assets/filterObject'
import InputField from '../InputField/InputField'
import SelectField from '../SelectField/SelectField'
import CheckBox from '../CheckBox/CheckBox'
import './FilterBox.css'

const FilterBox = () => {
  const { objState: filterState, objDispatch: filterDispatch } = useObjReducer({
    dateFrom: '',
    dateUntil: '',
    currency1: '',
    currency2: '',
    buyOn: true,
    sellOn: true,
    receiveOn: true,
    withdrawOn: true,
  })
  const data = useContext(dataContext)
  const filteredData = useContext(FilteredDataContext)
  const setFilteredData = useContext(SetFilteredDataContext)
  const filterOn = useContext(FilterOnContext)
  const setFilterOn = useContext(SetFilterOnContext)
  const currency1Options = getCurrencyOptions(filterOn ? filteredData : data)
  const currency2Options = filterState[filterObject.select[0].selectKey]
    ? currency1Options.filter(
        (val) => val !== filterState[filterObject.select[0].selectKey]
      )
    : currency1Options
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
  function filterBoolean(row) {
    let typeArray = []
    if (filterState.buyOn) {
      typeArray.push('Buy')
    }
    if (filterState.sellOn) {
      typeArray.push('Sell')
    }
    if (filterState.receiveOn) {
      typeArray.push('Receive')
    }
    if (filterState.withdrawOn) {
      typeArray.push('Withdraw')
    }
    let dateFromBool = filterState.dateFrom
      ? row.datetime >= filterState.dateFrom
      : true
    let dateUntilBool = filterState.dateUntil
      ? row.datetime <= filterState.dateUntil
      : true
    let currencyBool = true
    if (filterState.currency1 && filterState.currency2) {
      currencyBool =
        (row.currency1 === filterState.currency1 &&
          row.currency2 === filterState.currency2) ||
        (row.currency1 === filterState.currency2 &&
          row.currency2 === filterState.currency1)
    } else if (filterState.currency1) {
      currencyBool =
        row.currency1 === filterState.currency1 ||
        row.currency2 === filterState.currency1
    } else if (filterState.currency2) {
      currencyBool =
        row.currency1 === filterState.currency2 ||
        row.currency2 === filterState.currency2
    }
    return (
      dateFromBool &&
      dateUntilBool &&
      currencyBool &&
      typeArray.includes(row.type)
    )
  }
  function filterHandler() {
    if (
      filterState.dateFrom === '' &&
      filterState.dateUntil === '' &&
      filterState.currency1 === '' &&
      filterState.currency2 === '' &&
      filterState.buyOn &&
      filterState.sellOn &&
      filterState.receiveOn &&
      filterState.withdrawOn
    ) {
      return
    }
    setFilteredData(data.filter((row) => filterBoolean(row)))
    setFilterOn(true)
  }
  function resetHandler() {
    filterDispatch({ type: 'reset' })
    setFilterOn(false)
    setFilteredData([])
  }
  return (
    <div className='filter-box'>
      <div className='filter-header'>FILTER</div>
      <div className='filter-form'>
        {filterObject.input.map((obj, i) => (
          <InputField
            key={`fi-${i}`}
            label={obj.label}
            inputType={obj.inputType}
            inputValue={filterState[obj.inputKey]}
            inputKey={obj.inputKey}
            inputDispatch={filterDispatch}
          />
        ))}
        {filterObject.select.map((obj, i) => (
          <SelectField
            key={`fs-${i}`}
            label={obj.label}
            selectValue={filterState[obj.selectKey]}
            selectKey={obj.selectKey}
            selectOptions={i === 0 ? currency1Options : currency2Options}
            selectDispatch={filterDispatch}
          />
        ))}
        <div className='checkbox-container'>
          {filterObject.checkbox12.map((obj, i) => (
            <CheckBox
              key={`cb-${i}`}
              label={obj.label}
              checkValue={filterState[obj.checkKey]}
              checkKey={obj.checkKey}
              checkDispatch={filterDispatch}
            />
          ))}
        </div>
        <div className='checkbox-container'>
          {filterObject.checkbox34.map((obj, i) => (
            <CheckBox
              key={`cb-${i + 2}`}
              label={obj.label}
              checkValue={filterState[obj.checkKey]}
              checkKey={obj.checkKey}
              checkDispatch={filterDispatch}
            />
          ))}
        </div>
        <div className='filter-button-container'>
          <button className='button' onClick={resetHandler}>
            Reset
          </button>
        </div>
        <div className='filter-button-container'>
          <button className='button' onClick={filterHandler}>
            Filter
          </button>
        </div>
      </div>
    </div>
  )
}
export default FilterBox
