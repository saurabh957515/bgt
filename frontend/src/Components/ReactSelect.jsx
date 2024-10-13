import React from 'react';
import Select from 'react-select';


function getValueObj(options, val) {
  return options?.find(({ label, value }) => {
    return value === val;
  });
}

function ReactSelect({
  closeMenuOnSelect,
  value,
  name,
  placeholder,
  onChange,
  options,
  id = '',
  isMulti = false,
  className = '',
  altInput = false,
  isClearable = false,
  disabled = false,
  required = false,
}) {
  // const colorStyles = {
  //   control: (provided, { altInput }) => ({
  //     ...provided,
  //     backgroundColor: `${altInput} ? #ffffff : #edefef`,
  //     minHeight: '36px',
  //     '&:focus': {
  //       borderColor: tailwindConfig.theme.colors.latisGray[600] + ' !important',
  //       boxShadow: 'none',
  //     },
  //     borderWidth: '1px',
  //   }),
  //   menuPortal: base => ({ ...base, zIndex: 9999 }),

  // };
  return (
    <Select
      id={id}
      className={
        `rounded-md py-1 focus:border-latisSecondary-800 focus:ring-latisSecondary-800  sm:text-sm  ` +
        className 
      }
      // styles={colorStyles}
      isMulti={isMulti}
      closeMenuOnSelect={closeMenuOnSelect}
      value={typeof value === 'object' ? value : getValueObj(options, value)}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      options={options}
      isDisabled={disabled}
      isClearable={isClearable}
      required={required}
      menuPortalTarget={document.body}
    />
  );
}

export default ReactSelect;
