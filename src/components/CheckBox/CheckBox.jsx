import './CheckBox.css'
const CheckBox = ({ label, checkValue, checkKey, checkDispatch }) => {
  return (
    <label className='checkbox-label'>
      <input
        className='checkbox-input'
        type='checkbox'
        checked={checkValue}
        onChange={() => checkDispatch({ type: checkKey, payload: !checkValue })}
      />
      {label}
    </label>
  )
}

export default CheckBox
