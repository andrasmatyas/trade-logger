const inputObject = {
  Buy: [
    { label: 'Buy Amount:', inputType: 'number', inputKey: 'amount1' },
    { label: 'Buy Currency:', inputType: 'text', inputKey: 'currency1' },
    { label: 'Sell Amount:', inputType: 'number', inputKey: 'amount2' },
    { label: 'Sell Currency:', inputType: 'text', inputKey: 'currency2' },
    {
      label: 'Date & Time:',
      inputType: 'datetime-local',
      inputKey: 'datetime',
    },
  ],
  Sell: [
    { label: 'Sell Amount:', inputType: 'number', inputKey: 'amount2' },
    { label: 'Sell Currency:', inputType: 'text', inputKey: 'currency2' },
    { label: 'Buy Amount:', inputType: 'number', inputKey: 'amount1' },
    { label: 'Buy Currency:', inputType: 'text', inputKey: 'currency1' },
    {
      label: 'Date & Time:',
      inputType: 'datetime-local',
      inputKey: 'datetime',
    },
  ],
  Receive: [
    { label: 'Receive Amount:', inputType: 'number', inputKey: 'amount1' },
    { label: 'Receive Currency:', inputType: 'text', inputKey: 'currency1' },
    { blank: true },
    { blank: true },
    {
      label: 'Date & Time:',
      inputType: 'datetime-local',
      inputKey: 'datetime',
    },
  ],
  Withdraw: [
    { label: 'Withdraw Amount:', inputType: 'number', inputKey: 'amount2' },
    { label: 'Withdraw Currency:', inputType: 'text', inputKey: 'currency2' },
    { blank: true },
    { blank: true },
    {
      label: 'Date & Time:',
      inputType: 'datetime-local',
      inputKey: 'datetime',
    },
  ],
}
export default inputObject
