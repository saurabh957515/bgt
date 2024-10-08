import React from "react";

function ActiveUserIcon({ className }) {
  return (
    <svg
    className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="30"
      height="30"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21c0-3.6 3.4-6.5 7.5-6.5s7.5 2.9 7.5 6.5" />
    </svg>
  );
}

export default ActiveUserIcon;
