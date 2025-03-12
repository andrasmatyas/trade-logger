import { useContext } from 'react'
import { dataContext } from '../../context/dataContext'
import { FilteredDataContext } from '../../context/filteredDataContext'
import { FilterOnContext } from '../../context/filterOnContext'
import BalanceCards from '../BalanceCards/BalanceCards'
import './BalanceBox.css'

const BalanceBox = () => {
  const data = useContext(dataContext)
  const filteredData = useContext(FilteredDataContext)
  const filterOn = useContext(FilterOnContext)
  const balance = calculateBalance(filterOn ? filteredData : data)
  function calculateBalance(tableData) {
    return tableData.reduce((acc, row) => {
      let currentBalance = acc
      if (row.currency1 !== '') {
        if (currentBalance?.[row.currency1]) {
          currentBalance[row.currency1] =
            currentBalance[row.currency1] + Number(row.amount1)
        } else {
          currentBalance[row.currency1] = Number(row.amount1)
        }
      }
      if (row.currency2 !== '') {
        if (currentBalance?.[row.currency2]) {
          currentBalance[row.currency2] =
            currentBalance[row.currency2] - Number(row.amount2)
        } else {
          currentBalance[row.currency2] = -Number(row.amount2)
        }
      }
      return currentBalance
    }, {})
  }
  return (
    <div className='balance-box'>
      <div className='balance-header'>BALANCE</div>
      <div className='balance-body'>
        {Object.keys(balance).map((currency) => (
          <BalanceCards
            key={currency}
            currency={currency}
            amount={balance[currency]}
          />
        ))}
      </div>
    </div>
  )
}

export default BalanceBox
