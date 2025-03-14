import './InputField.css'
const InputField = ({
  label,
  required = false,
  inputType,
  inputValue,
  inputKey,
  inputDispatch,
}) => {
  return (
    <div className='input-field-container'>
      <label className='input-label'>
        {label}
        {required && <span className='input-span-danger'> *Required</span>}
      </label>
      <input
        className={`input-field  ${required ? 'input-field-danger' : ''}`}
        name={inputKey}
        type={inputType}
        placeholder={inputType === 'number' ? 'Enter Amount' : 'Enter Currency'}
        value={inputValue}
        onChange={(e) =>
          inputDispatch({ type: inputKey, payload: e.target.value })
        }
      />
    </div>
  )
}

export default InputField
