import React from 'react';

const MySelect = ({options, defaultValue, value, onChange}) => {

  function handleChange(event) {
    const currentOption = event.target.childNodes[event.target.selectedIndex]
    onChange(event.target.value, currentOption.textContent)
  }
  

  return (
    <div>
      <select 
        value={value}
        onChange={handleChange}
        style={{
          background: 'transparent',
          color: 'white', margin: '15px',
          fontSize: '18px',
          fontWeight:'normal'
        }}
      >
        <option disabled value="">{defaultValue}</option>
        {options.map(option => 
            <option key={option.name} value={option.value}>
              {option.name}
            </option>
        )}
      </select>
    </div>
  );
};

export default MySelect;