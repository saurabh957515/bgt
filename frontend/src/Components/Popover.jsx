import React from "react";
import { Popover } from "@headlessui/react";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";

const PopUp = ({ onDelete, editName, onEdit, onChange }) => {
  return (
    <Popover className="focus:none">
      {({ open, close }) => (
        <>
          <Popover.Button>
            <EllipsisHorizontalCircleIcon className="sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-[#6c7171]" />
          </Popover.Button>
          <Popover.Panel className="absolute right-0 z-10 mt-2 mr-4 border border-gray-300 rounded-lg shadow-lg bg-seamlessCyan-600 w-36">
            <div className="flex flex-col p-2 font-semibold">
              <button
                onClick={(e) => onDelete(e, close)}
                className="px-4 py-2 text-sm text-left text-seamlessBlue-900 hover:bg-seamlessBlue-300 hover:text-white"
              >
                Delete
              </button>
              {onChange && (
                <button
                  onClick={onChange}
                  className="px-4 py-2 text-sm text-left text-seamlessBlue-900 hover:bg-seamlessBlue-300 hover:text-white"
                >
                  Edit
                </button>
              )}
              <button
                onClick={onEdit}
                className="px-4 py-2 text-sm text-left capitalize text-seamlessBlue-900 hover:bg-seamlessBlue-300 hover:text-white"
              >
                {editName ? editName : "Edit"}
              </button>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default PopUp;
