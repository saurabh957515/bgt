import React from "react";

const TextInput = ({ placeholder, value, required, className, onChange, ...props }) => {
  return (
    <input
      {...props}
      onChange={onChange}
      required={required}
      value={value}
      placeholder={placeholder}
      className={`text-sm text-normal font-Montserrat rounded-full md:min-w-[322px] text-seamlessBlue-200 placeholder-seamlessBlue-200 px-6 py-3 ${className}`}
    ></input>
  );
};

export default TextInput;
