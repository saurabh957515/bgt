import Flatpickr from "react-flatpickr";

function ReactFlatPickr({
  onChange,
  transparent,
  value,
  enableTime = false,
  altInput = false,
  altFormat = "F j, Y",
  mode = "single",
  dateFormat = "m/d/Y",
  className = "",
  disabled,
  ...props
}) {
  return (
    <Flatpickr
      {...props}
      value={value}
      onChange={onChange}
      data-enable-time={enableTime}
      data-alt-input={altInput}
      data-alt-format={altFormat}
      data-mode={mode}
      data-date-format={dateFormat}
      disabled={disabled}
      className={`${
        transparent
          ? " border-t-0 border-l-0 border-r-0 rounded-none border-b border-appBlack-400"
          : " border-appBlack-400 border"
      } block w-full focus:border-gray-300 text-md px-3 text-[15px] focus:ring-gray-300 rounded-md disabled:cursor-not-allowed disabled:text-gray-500 disabled:ring-gray-200 ${className}`}
    />
  );
}

export default ReactFlatPickr;
