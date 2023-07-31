import React from 'react';

const MySelector = ({value, onChange, selectorClassName, defaultValue, options} ) => {

  function handleChange(event) {
    const currentOption = event.target.childNodes[event.target.selectedIndex]
    onChange(event.target.value, currentOption.textContent)
  }
  

  return (
    <div>
      <select 
        value={value}
        // onChange={handleChange}
        onChange={event =>onChange(event.target.value)}

        className={selectorClassName}
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

export default MySelector;