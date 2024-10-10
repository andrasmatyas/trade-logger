import './TableBox.css'
import { RiDeleteBack2Fill } from 'react-icons/ri'
import { useState } from 'react'

const DataTable = ({ data, handleDelete }) => {
  const [selectOn, setSelectOn] = useState(false)
  const [selectId, setSelectId] = useState(0)
  function getPrice(row) {
    switch (row.type) {
      case 'Buy':
        return `${(row.amount2 / row.amount1).toFixed(2)} ${row.currency2}`
      case 'Sell':
        return `${(row.amount1 / row.amount2).toFixed(2)} ${row.currency1}`
      default:
        return ''
    }
  }
  return (
    <div className='table-box'>
      <table>
        <thead>
          <tr className='data-header'>
            <th>Type</th>
            <th>Received Amount</th>
            <th>Received Currency</th>
            <th>Sent Amount</th>
            <th>Sent Currency</th>
            <th>Price</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className={`data-row ${
                selectOn === true && selectId === row.id ? 'selected-row' : ''
              }`}
              onClick={() => {
                setSelectOn((prevState) => !prevState)
                setSelectId(row.id)
              }}
            >
              <td>{row.type}</td>
              <td>
                {row.amount1 === 0 && row.currency1 === '' ? '' : row.amount1}
              </td>
              <td>{row.currency1}</td>
              <td>
                {row.amount2 === 0 && row.currency2 === '' ? '' : row.amount2}
              </td>
              <td>{row.currency2}</td>
              <td>{getPrice(row)}</td>
              <td>{row.datetime.replace('T', ' ')}</td>
              {selectOn === true && selectId === row.id && (
                <RiDeleteBack2Fill
                  className='delete-icon delete-left'
                  onClick={() => handleDelete(row.id)}
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default DataTable
