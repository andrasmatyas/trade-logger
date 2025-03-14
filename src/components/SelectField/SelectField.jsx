import './SelectField.css'
const SelectField = ({
  label,
  selectValue,
  selectKey,
  selectOptions,
  selectDispatch,
}) => {
  return (
    <div className='select-field-container'>
      <label className='select-label'>{label}</label>
      <select
        className='select-field'
        value={selectValue}
        onChange={(e) =>
          selectDispatch({ type: selectKey, payload: e.target.value })
        }
      >
        {selectOptions.map((val, i) => (
          <option key={`${selectKey}-${i}`} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectField
