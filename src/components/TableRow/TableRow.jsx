import './TableRow.css'
import { RiDeleteBack2Fill } from 'react-icons/ri'
const TableRow = ({ row, isSelected, clickHandler, deleteHandler }) => {
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
    <tr
      className={`data-row ${isSelected ? 'selected-row' : ''}`}
      onClick={() => clickHandler(row.id)}
    >
      <td>{row.type}</td>
      <td>{row.amount1 === 0 && row.currency1 === '' ? '' : row.amount1}</td>
      <td>{row.currency1}</td>
      <td>{row.amount2 === 0 && row.currency2 === '' ? '' : row.amount2}</td>
      <td>{row.currency2}</td>
      <td>{getPrice(row)}</td>
      <td>{row.datetime.replace('T', ' ')}</td>
      {isSelected && (
        <RiDeleteBack2Fill
          className='delete-icon delete-left'
          onClick={deleteHandler}
        />
      )}
    </tr>
  )
}

export default TableRow
