import './BalanceBox.css'

const BalanceBox = ({ balance }) => {
  const renderCards = () => {
    let balanceCards = []
    for (let currency in balance) {
      let amountFormatted = 0
      if (balance[currency] % 1) {
        switch (currency) {
          case 'USD':
            amountFormatted = balance[currency].toFixed(2)
            break
          default:
            amountFormatted = balance[currency].toFixed(8)
        }
      } else {
        amountFormatted = balance[currency]
      }
      balanceCards.push(
        <div className='balance-card' key={currency}>
          <div className='balance-amount'>{amountFormatted}</div>
          <div className='balance-currency'>{currency}</div>
        </div>
      )
    }
    return balanceCards
  }
  return (
    <div className='balance-box'>
      <div className='balance-header'>BALANCE</div>
      <div className='balance-body'>{renderCards()}</div>
    </div>
  )
}

export default BalanceBox
