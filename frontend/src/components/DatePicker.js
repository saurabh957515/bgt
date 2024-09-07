import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import flatpickr from "flatpickr";

import React from "react";
import "flatpickr/dist/flatpickr.min.css";

const DatePicker = ({ onChange, initialValue }) => {
  const [flatpickrInstance, setFlatpickrInstance] = useState(null);
  const datePickerRef = useRef(null);
  const dates = useRef(initialValue || []); // Initialize with initialValue
  const [applyDate, setApplyDate] = useState(() => () => {});

  useEffect(() => {
    if (datePickerRef.current) {
      const instance = flatpickr(datePickerRef.current, {
        static: true,
        closeOnSelect: false,
        maxDate: "today",
        defaultDate: initialValue, // Set initial value here
        onChange: (selectedDates) => {
          if (selectedDates.length === 0) {
            onChange([]);
            dates.current = [];
          }

          setApplyDate(() => {
            return () => {
              dates.current = selectedDates;
              onChange(selectedDates);
              instance.close();
            };
          });
        },
        onClose: () => {
          instance.setDate(dates.current);
        },
      });

      setFlatpickrInstance(instance);
    }

    return () => flatpickrInstance?.destroy();
  }, [initialValue]);

  return (
    <div>
      <input
      
        style={{
          border: "1px solid #d1d5db",
          borderRadius: "0.35rem",
          width: "100%",
          boxSizing: "border-box",
          padding: "0.5rem",
        }}
        ref={datePickerRef}
        type="text"
        placeholder="Select date..."
      />
      {flatpickrInstance &&
        createPortal(
          <div className="flex justify-center gap-3 py-2">
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                flatpickrInstance.clear(true);
                flatpickrInstance.close();
              }}
            >
              Clear
            </button>
            <button className="ml-2 btn btn-primary" onClick={applyDate}>
              Apply
            </button>
          </div>,
          flatpickrInstance.calendarContainer
        )}
    </div>
  );
};

export default DatePicker;
