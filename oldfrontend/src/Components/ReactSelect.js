import React from "react";
import Select from "react-select";

function getValueObj(options, val) {
  return options?.find(({ label, value }) => value === val);
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
  const customStyles = {
    // Customizing the control (input) focus and background color
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#FFFFFF", // Setting the background color to white
      borderColor: state.isFocused ? "#1F2937" : provided.borderColor, // Focus color (gray-900)
      boxShadow: state.isFocused ? "0 0 0 1px #1F2937" : provided.boxShadow, // Focus shadow (gray-900)
      "&:hover": {
        borderColor: state.isFocused ? "#1F2937" : "#D1D5DB", // Hover color for the control (gray-300)
      },
    }),
    // Customizing the options (dropdown items)
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#1F2937" // Selected option background color (gray-900)
        : state.isFocused
        ? "#E5E7EB" // Focused option background color (gray-200)
        : "#FFFFFF", // Default background color for options
      color: state.isSelected
        ? "#FFFFFF" // Text color for selected option
        : state.isFocused
        ? "#1F2937" // Text color for focused option (gray-900)
        : "#374151", // Default text color (gray-700)
      "&:hover": {
        backgroundColor: "#D1D5DB", // Hover background color (gray-300)
        color: "#1F2937", // Hover text color (gray-900)
      },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensuring the dropdown is above other elements
  };

  return (
    <Select
      id={id}
      className={
        `rounded-md focus:border-latisSecondary-800 focus:ring-latisSecondary-800 sm:text-sm ` +
        className +
        (altInput ? " bg-white" : " bg-white")
      }
      styles={customStyles} // Applying the custom styles
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
      menuPlacement="auto" // Automatically places dropdown above/below based on space
      menuPortalTarget={document.body}
    />
  );
}

export default ReactSelect;
