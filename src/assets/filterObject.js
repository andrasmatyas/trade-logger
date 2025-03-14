const filterObject = {
  input: [
    { label: 'Date From:', inputType: 'datetime-local', inputKey: 'dateFrom' },
    {
      label: 'Date Until:',
      inputType: 'datetime-local',
      inputKey: 'dateUntil',
    },
  ],
  select: [
    { label: 'Currency 1:', selectKey: 'currency1' },
    { label: 'Currency 2:', selectKey: 'currency2' },
  ],
  checkbox12: [
    { label: 'Buy', checkKey: 'buyOn' },
    { label: 'Sell', checkKey: 'sellOn' },
  ],
  checkbox34: [
    { label: 'Receive', checkKey: 'receiveOn' },
    { label: 'Withdraw', checkKey: 'withdrawOn' },
  ],
}
export default filterObject
