import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

export default function RadioGroup({
  onChange,
  options = [],
  value = "",
  classname = "",
  name,
  inputClassName = "",
  ...props
}) {
  return (
    <div className={`d-flex flex-wrap ${classname}`}>
      {options.map((option) => (
        <div 
          key={option.value} 
          className="mb-3 form-check me-3" 
          style={{ marginRight: '1rem', marginBottom: '0.75rem' }} // Adjust spacing
        >
          <input
            id={`${option.value}-${name}`}
            name={name}
            type="radio"
            checked={option.value === value}
            value={option.value}
            onChange={(e) => onChange(e.target.value)}
            className={`form-check-input ${inputClassName}`}
            {...props}
          />
          <label
            htmlFor={`${option.value}-${name}`}
            className="form-check-label"
            style={{ fontWeight: '400', }} // Font weight medium and left margin
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
