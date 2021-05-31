import React from 'react'
import PropTypes from 'prop-types'

function InputField(props) {
  const { placeholder='search', onChange, onBlur, value } = props;
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '1rem'
  }
  return (
    <label style={styles}>
      {placeholder}
      <input
        className="common-input"
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        type="text"
        value={value}
      />
    </label>
  )
}

InputField.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.string
}

export {
  InputField
}

