import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative h-full sm:h-[60%] scrollbar-hide  overflow-auto  bg-[#ffffff] rounded-[50px] w-[500px] drop-shadow-[0px 5px 31px rgba(0,0,0,0.35)] ">
        {children}
      </div>
    </div>
  );
};

export default Modal;
