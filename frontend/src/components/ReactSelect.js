import React from "react";
import Select from "react-select";

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
  id = "",
  isMulti = false,
  className = "",
  altInput = false,
  isClearable = false,
  disabled = false,
  required = false,
}) {
  // const colorStyles = {
  //   control: (provided, { altInput }) => ({
  //     ...provided,
  //     backgroundColor: `${altInput} ? #ffffff : tailwindConfig.theme.colors.latisGray-200`,
  //     minHeight: '36px',
  //     '&:focus': {
  //       borderColor: tailwindConfig.theme.colors.latisGray[600] + ' !important',
  //       boxShadow: 'none',
  //     },
  //     borderWidth: '1px',
  //   }),
  //   menuPortal: base => ({ ...base, zIndex: 9999 }),
  //   option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
  //     ...provided,
  //     backgroundColor: isDisabled
  //       ? data?.color
  //       : isSelected
  //       ? tailwindConfig.theme.colors.latisGray[400]
  //       : isFocused
  //       ? tailwindConfig.theme.colors.latisGray[400]
  //       : undefined,
  //     color: isDisabled
  //       ? undefined
  //       : isSelected
  //       ? tailwindConfig.theme.colors.latisGray[900]
  //       : isFocused
  //       ? tailwindConfig.theme.colors.latisGray[900]
  //       : undefined,
  //     cursor: isDisabled ? 'not-allowed' : 'default',
  //     ':active': {
  //       ...provided[':active'],
  //       backgroundColor: !isDisabled
  //         ? isSelected
  //           ? tailwindConfig.theme.colors.latisGray[400]
  //           : tailwindConfig.theme.colors.latisGray[400]
  //         : undefined,
  //     },
  //   }),
  // };
  return (
    <Select
      id={id}
      className={
        `rounded-md focus:border-latisSecondary-800 focus:ring-latisSecondary-800  sm:text-sm  ` +
        className +
        (altInput ? " bg-white" : " bg-white")
      }
      // styles={colorStyles}
      isMulti={isMulti}
      closeMenuOnSelect={closeMenuOnSelect}
      value={typeof value === "object" ? value : getValueObj(options, value)}
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