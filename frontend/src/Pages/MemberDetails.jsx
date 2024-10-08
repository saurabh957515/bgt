import {
  ChevronDownIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PencilIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import PrimaryContainer from "../Components/PrimaryContainer";
import User from "../Images/User.png";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";

const MemberDetails = () => {
  const classNames = (...classes) => classes.filter(Boolean).join(" ");



  return (
    <PrimaryContainer>
      <h2 className="text-2xl font-extrabold text-[#283275] mb-4">
        Membership
      </h2>

      <Tab.Group>
        <Tab.List className="flex flex-col border-b-2 border-seamlessBlue-400 sm:flex-row sm:space-x-9">
          {[
            "Member Details",
            "Events",
            "Education",
            "Committees",
            "Transactions",
            "Documents",
            "History",
          ].map((tab) => (
            <Tab
              as="button"
              key={tab}
              className={({ selected }) =>
                classNames(
                  "text-base text-seamlessBlue-700 font-semibold leading-[60px]",
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
            <div className="border border-seamlessGray-900 rounded-3xl mt-7">
              <div className="flex items-center justify-between mt-4 mr-5">
                <h2></h2>
                <button className="text-gray-400 hover:text-gray-600">
                  <PencilIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col items-center gap-8 p-4 border-b border-gray-400 md:flex-row">
                <div className="relative mb-3">
                  <img
                    className="w-24 h-24 rounded-full md:h-30 md:w-30"
                    src={User}
                    alt="Profile"
                  />
                  <span className="absolute w-full px-2 py-1 text-sm text-[#282728] bg-seamlessCyan-600 rounded-full left-12 top-8 max-w-[71px] text-center">
                    Invited
                  </span>
                </div>

                <div className="space-y-2 text-center md:text-left">
                  <h2 className="text-2xl font-semibold text-[#283275]">
                    Vanessa Lopez
                  </h2>
                  <p className="text-[#282728] text-lg font-medium">
                    Director of Communications
                  </p>
                  <p className="text-[#282728] text-lg font-medium">
                    Tuscon Arizona Chapter NACC
                  </p>
                </div>
                <div className="space-y-2">
                  <a
                    href="#"
                    className="flex items-center space-x-4 hover:underline"
                  >
                    <GlobeAltIcon className="w-5 h-5" />
                    <span className="text-[#283275] text-lg font-medium">
                      www.NACC/TusconArizona
                    </span>
                  </a>
                  <p className="flex items-center space-x-4">
                    <EnvelopeIcon className="w-5 h-5" />
                    <span className="text-[#283275] text-lg font-medium">
                      1.301.433.9928
                    </span>
                  </p>
                  <p className="flex items-center space-x-4">
                    <PhoneIcon className="w-5 h-5" />
                    <span className="text-[#283275] text-lg font-medium">
                      vlopez@NACC.com
                    </span>
                  </p>
                </div>
              </div>

              <div className="divide-y divide-gray-500">
                <div className="flex items-center justify-between px-6 py-5">
                  <div className="text-seamlessGray-950 flex items-center gap-x-2.5 text-sm font-normal">
                    <span>Status:</span>
                    <span className="py-2.5 px-4 text-seamlessGray-950 bg-seamlessCyan-600 rounded-3xl text-sm">
                      Invited
                    </span>
                  </div>
                  <div className="space-x-2.5">
                    <button className="px-4 py-2.5 text-seamlessGray-950 bg-seamlessCyan-600 rounded-3xl text-sm">
                      Resend Invite
                    </button>
                    <button className="px-4 py-2.5 text-[#ffffff] bg-[#283275] rounded-3xl text-sm">
                      Reset Password
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between px-6 py-5">
                  <div className="text-seamlessGray-950 flex items-center gap-x-2.5 text-sm font-normal">
                    <span>   Member ID:{" "}</span>
                    <span className="py-2.5 px-4 text-seamlessGray-950 bg-seamlessCyan-600 rounded-3xl text-sm">
                      Invited
                    </span>
                  </div>
                  <ChevronDownIcon className="w-6 h-6" />
                </div>
                <div className="py-2 text-sm border-t border-b border-gray-400 text-seamlessGray-950">
                  <div className="flex justify-between mx-4 ">
                    <p>
                   
                      <span className="text-[#283275] text-sm font-semibold">
                        1032882
                      </span>
                    </p>
                    <ChevronDownIcon className="w-6 h-6" />
                  </div>
                </div>
                <div className="py-2 text-sm border-t text-seamlessGray-950">
                  <div className="flex justify-between mx-4">
                    <p>
                      Role:{" "}
                      <span className="text-[#283275] text-sm font-semibold ml-0.5">
                        Admin
                      </span>
                    </p>
                    <ChevronDownIcon className="w-6 h-6" />
                  </div>
                </div>
                <div className="py-2 text-sm border-t border-gray-400 text-seamlessGray-950">
                  <div className="flex justify-between mx-4 ">
                    <p>
                      Chapter:
                      <span className="text-[#283275] text-sm font-semibold ml-0.5">
                        Tuscon Arizona Chapter NACC
                      </span>
                    </p>
                    <ChevronDownIcon className="w-6 h-6" />
                  </div>
                </div>
                <div className="py-2 border-t border-gray-400 text-seamlessGray-950 text-smborder-b">
                  <div className="flex justify-between mx-4">
                    <p>
                      Committees:
                      <span className="text-[#283275] text-sm font-semibold ml-0.5">
                        South West, Events, Education
                      </span>
                    </p>
                    <ChevronDownIcon className="w-6 h-6" />
                  </div>
                </div>

                <div className="py-2 text-sm border-t border-gray-400 text-seamlessGray-950">
                  <div className="flex justify-between mx-4">
                    <p>
                      Subscription:
                      <span className="text-[#283275] text-sm font-semibold ml-0.5">
                        Chapter Gold
                      </span>
                    </p>
                    <ChevronDownIcon className="w-6 h-6" />
                  </div>
                </div>
                <div className="py-2 text-sm border-t border-gray-400 text-seamlessGray-950">
                  <div className="flex justify-between mx-4">
                    <p>
                      Subscription:{" "}
                      <span className="text-[#283275] text-sm font-semibold ml-0.5">
                        Chapter Gold
                      </span>{" "}
                      <span className="px-2 py-1 text-sm text-seamlessGray-950 bg-[#c2e0b3] rounded-xl ml-2">
                        Current
                      </span>
                    </p>
                    <ChevronDownIcon className="w-6 h-6" />
                  </div>
                </div>
                <div className="py-2 text-sm border-t border-gray-400 text-seamlessGray-950">
                  <div className="flex justify-between mx-4">
                    <p>
                      Renewal:{" "}
                      <span className="text-[#283275] text-sm font-semibold ml-0.5">
                        01.15.2025
                      </span>{" "}
                      <span className="px-2 py-1 text-sm text-seamlessGray-950 bg-[#c2e0b3] rounded-xl ml-2">
                        Auto
                      </span>
                    </p>
                    <ChevronDownIcon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
          {[1, 2, 3, 4, 5, 6]?.map((tab) => (
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

export default MemberDetails;
