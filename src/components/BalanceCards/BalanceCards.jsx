import './BalanceCards.css'

const BalanceCards = ({ currency, amount }) => {
  function formatAmount(currency, amount) {
    if (amount % 1) {
      switch (currency) {
        case 'USD':
          return amount.toFixed(2)

        default:
          return amount.toFixed(8)
      }
    } else {
      return amount
    }
  }
  return (
    <div className='balance-card'>
      <div className='balance-amount'>{formatAmount(currency, amount)}</div>
      <div className='balance-currency'>{currency}</div>
    </div>
  )
}

export default BalanceCards
