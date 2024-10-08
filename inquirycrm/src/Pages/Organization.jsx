import React from "react";
import PrimaryContainer from "../Components/PrimaryContainer";
import DotIcons from "../Icons/DotIcon";
import {
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import PopUp from "../Components/Popover";
import { Tab } from "@headlessui/react";
import { classNames } from "../provider";

const Organization = () => {
  const structure = {
    title: "NACC",
    children: [
      {
        title: "Chapters",
      },
      {
        title: "COMMITTEES",
        children: [
          {
            title: "MEMBERS",
          },
          {
            title: "SUBSCRIBERS",
          },
          {
            title: "NON MEMBERS",
          },
        ],
      },
    ],
  };

  const getStructure = (structure, level) => {
    return (
      <>
        <div
          style={{
            marginLeft: `${level * 40}px`,
          }}
          className={classNames(
            "flex items-center justify-between grow p-5 bg-seamlessCyan-500"
          )}
        >
          <div className="flex items-center space-x-2">
            <DotIcons />
            <h3 className="text-sm capitalize sm:text-base md:text-lg font-semibold text-[#282728]">
              {structure?.title}
            </h3>
          </div>
          <div className="flex space-x-2">
          <ViewColumnsIcon className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-[#6c7171]" />
            <PopUp />
          </div>
        </div>
        {structure?.children?.map((child) => getStructure(child, level + 1))}
      </>
    );
  };
  return (
    <PrimaryContainer>
      <h2 className="sm:text-xl md:text-2xl font-extrabold text-[#283275] mb-9">
        Organization
      </h2>

      <Tab.Group>
        <Tab.List className="flex flex-col border-b-2 border-seamlessBlue-400 sm:flex-row sm:space-x-9">
          {["Organization Info", "Structure"].map((tab, index) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  "text-base font-semibold text-seamlessBlue-700 focus:none leading-[60px]",
                  selected ? "  font-semibold " : "font-semibold  mb-1"
                )
              }
            >
              {({ hover, selected }) => (
                <>
                  {tab}
                  {selected && (
                    <p className="w-full h-1 bg-gradient-to-r from-seamlessGradient-start to-seamlessGradient-end" />
                  )}
                </>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <div className="mt-10 space-y-4 border border-gray-600 rounded-3xl">
              <div className="flex items-center justify-center w-full h-60">
                <div className="flex flex-col items-center ">
                  <p className="text-lg font-semibold ">Not Created</p>
                  <p className="text-sm font-medium">
                    This Tab Panel is not created please first create the Tab
                  </p>
                </div>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="flex flex-col my-10 gap-y-4">
              {getStructure(structure, 0)}
            </div>

            <div className="flex justify-center border-t border-seamlessBlue-400 sm:justify-end">
              <button className="py-2 mt-9 sm:py-1 px-6 sm:px-10 text-sm sm:text-base text-[#283275] border border-[#6b6a6b] rounded-full font-semibold">
                SAVE
              </button>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </PrimaryContainer>
  );
};

export default Organization;
