import React, { useEffect, useRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const TextInput = ({
  placeholder,
  value,
  isFocused,
  type,
  required,
  className,
  onChange,
  ...props
}) => {
  const input = useRef();
  const [viewType, setViewType] = useState(type === "password");

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, [isFocused]);

  const togglePasswordVisibility = () => {
    setViewType(!viewType);
  };

  return (
    <div className="relative flex items-center">
      <input
        {...props}
        ref={input}
        onChange={onChange}
        required={required}
        value={value}
        type={viewType ? "password" : "text"} 
        placeholder={placeholder}
        className={`text-sm text-normal font-Montserrat rounded-full md:min-w-[322px] text-seamlessBlue-200 placeholder-seamlessBlue-200 px-6 py-3 ${className}`}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4"
        >
          {viewType ? (
            <EyeSlashIcon className="w-5 h-5 text-seamlessBlue-200" />
          ) : (
            <EyeIcon className="w-5 h-5 text-seamlessBlue-200" />
          )}
        </button>
      )}
    </div>
  );
};

export default TextInput;
