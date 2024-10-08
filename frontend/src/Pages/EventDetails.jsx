import React, { useState } from "react";
import PrimaryContainer from "../Components/PrimaryContainer";
import { Tab } from "@headlessui/react";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const EventDetails = () => {
  const classNames = (...classes) => classes.filter(Boolean).join(" ");
  const [isVisible, setIsVisible] = useState(true);

  const tabs = [
    "Event Details",
    "Registration",
    "Schedule",
    "Pricing",
    "CEU's",
    "Speakers",
    "Exhibitors",
    "Sponsors",
  ];

  return (
    <PrimaryContainer>
      <h2 className="sm:text-xl md:text-2xl font-extrabold text-[#283275] mb-9">
        Fall NACC Mini Conference{" "}
        <button className="px-3 py-1 text-xs sm:text-sm font-normal text-[#282728] bg-[#c2e0b3] rounded-full">
          Active
        </button>
      </h2>

      <Tab.Group>
        <Tab.List className="flex flex-col border-b-2 border-gray-300 sm:flex-row sm:space-x-9">
          {tabs.map((tab, index) => (
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
            <div className="mt-6 bg-gray-100 border border-gray-600 rounded-3xl">
              <div className="bg-[#ffffff] rounded-t-3xl">
                <div className="flex flex-col items-start justify-between border-b border-gray-400 sm:flex-row sm:items-center">
                  <p className="text-[#282728] text-sm font-normal px-6 py-4">
                    Display Title:
                    <span className="ml-2 text-base font-semibold text-seamlessBlue-700">
                      Fall NACC Mini Conference
                    </span>
                  </p>
                  <ChevronDownIcon className="w-5 h-5 text-gray-500 cursor-pointer m-3.5" />
                </div>

                <div className="space-y-2 border-b border-gray-400">
                  <div className="py-10 px-9">
                    <span className="flex justify-between">
                      <p className="text-[#282728] text-sm font-normal">
                        Display Title:
                      </p>
                      <PencilIcon className="w-5 h-5" />
                    </span>
                    <h2 className="text-xl font-semibold sm:text-2xl text-seamlessBlue-700">
                      The 2024 North American Conservation Corps Annual
                      Conference
                    </h2>
                    <span className="flex items-center mt-2 space-x-2">
                      <div className="relative">
                        <button
                          onClick={() => setIsVisible(!isVisible)}
                          className={`inline-flex h-5 w-9 items-center rounded-full  transition-colors duration-300 border border-black ${
                            isVisible ? "bg-gray-200" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`h-3 w-3 bg-white rounded-full transition-transform duration-300 transform border border-black ${
                              isVisible ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                      <p className="text-sm text-seamlessBlue-700">
                        Show On Public Site
                      </p>
                    </span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-400">
                <div className="flex px-6 py-4">
                  <p className="text-sm text-[#282728]">Description:</p>
                  <p className="text-base font-semibold text-seamlessBlue-700">
                    The Conference unites people from across sectors and
                    throughout the country who are connected...
                  </p>
                </div>
                <div className="flex flex-col items-start gap-1 px-6 py-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-[#282728]">Dates:</p>
                  <p className="text-base font-semibold text-seamlessBlue-700">
                    10.24.24 - 10.16.24
                  </p>
                </div>
                <div className="flex flex-col items-start gap-1 px-6 py-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-[#282728]">Location:</p>
                  <p className="text-base font-semibold text-seamlessBlue-700">
                    Hyatt Regency Denver at Colorado Convention Center
                  </p>
                </div>
                <div className="flex flex-col items-start gap-1 px-6 py-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-[#282728]">Registration Opens:</p>
                  <p className="text-base font-semibold text-seamlessBlue-700">
                    10.02.2024
                  </p>
                </div>
                <div className="flex flex-col items-start gap-1 px-6 py-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-[#282728]">
                    Membership Level Access:
                  </p>
                  <p className="text-base font-semibold text-seamlessBlue-700">
                    Chapter Gold, Chapter Silver
                  </p>
                </div>

                <div className="flex flex-col items-start gap-1 px-6 py-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-[#282728]">Event Type:</p>
                  <p className="text-base font-semibold text-seamlessBlue-700">
                    On-Site
                  </p>
                </div>
                <div className="flex flex-col items-start gap-1 px-6 py-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-[#282728]">Event Category:</p>
                  <p className="text-base font-semibold text-seamlessBlue-700">
                    Outreach
                  </p>
                </div>
                <div className="flex flex-col items-start gap-1 px-6 py-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-[#282728]">Status:</p>
                  <p className="text-base font-semibold text-seamlessBlue-700">
                    Active
                  </p>
                </div>
              </div>
            </div>
          </Tab.Panel>
          {[1, 2, 3, 4, 5, 6, 7]?.map((tab) => (
            <Tab.Panel>
              <div className="mt-6 space-y-4 border border-gray-600 rounded-3xl">
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
          ))}
        </Tab.Panels>
      </Tab.Group>
    </PrimaryContainer>
  );
};

export default EventDetails;
