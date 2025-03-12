import { useState, useContext } from 'react'
import { dataContext, dataActionsContext } from '../../context/dataContext'
import {
  FilteredDataContext,
  SetFilteredDataContext,
} from '../../context/filteredDataContext'
import { FilterOnContext } from '../../context/filterOnContext'
import TableRow from '../TableRow/TableRow'
import './TableBox.css'

const DataTable = () => {
  const [selectOn, setSelectOn] = useState(false)
  const [selectedId, setSelectedId] = useState(0)
  const data = useContext(dataContext)
  const { deleteRow } = useContext(dataActionsContext)
  const filteredData = useContext(FilteredDataContext)
  const setFilteredData = useContext(SetFilteredDataContext)
  const filterOn = useContext(FilterOnContext)
  const renderData = filterOn ? filteredData : data
  const headerTexts = [
    'Transaction',
    'Received Amount',
    'Received Currency',
    'Sent Amount',
    'Sent Currency',
    'Price',
    'Date & Time',
  ]
  function clickHandler(id) {
    setSelectOn((prevState) => !prevState)
    setSelectedId(id)
  }
  function deleteHandler() {
    deleteRow(selectedId)
    if (filterOn) {
      const delFilData = filteredData.filter((row) => row.id !== selectedId)
      setFilteredData(delFilData)
    }
  }
  return (
    <div className='table-box'>
      <table>
        <thead>
          <tr className='data-header'>
            {headerTexts.map((text) => (
              <th>{text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderData.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              isSelected={selectedId === row.id && selectOn === true}
              clickHandler={clickHandler}
              deleteHandler={deleteHandler}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default DataTable
