import React, { useEffect, useState } from "react";
import PrimaryContainer from "../Components/PrimaryContainer";
import {
  AdjustmentsHorizontalIcon,
  ArrowUpTrayIcon,
  EllipsisHorizontalCircleIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PencilIcon,
  PhoneIcon,
  ArrowLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import Checkbox from "../Components/CheckBox";
import BraIcon from "../Icons/BraIcon";
import Member from "../Images/Member.png";
import { Tab } from "@headlessui/react";
import Modal from "../Components/Modal";
import AddMemberForm from "./AddMemberForm";
import { Popover } from "@headlessui/react";
import PopUp from "../Components/Popover";
import User from "../Images/User.png";
const Membership = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [IsEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleRowClick = (index) => {
    setSelectedRow(index);
  };
  const classNames = (...classes) => classes.filter(Boolean).join(" ");
  const members = [
    {
      id: "lopez",
      profile: "",
      firstName: "Vanessa Lopez",

      status: "Invited",
      role: "Admin",
      chapter: "NA",
      committee: "NA",
      subscription: "Chapter Gold",
      dues: "NA",
    },
    {
      id: "vanessa",
      name: "Vanessa Lopez",
      profile: "",
      firstName: "Active",
      role: "Admin",
      chapter: "Tucson Arizona",
      committee: "South West",
      subscription: "Chapter Gold",
      dues: "Current",
      extraCommittee: 3,
      status: "Invited",
    },
  ];
  const [newMember, setNewMember] = useState({});
  const [memberList, setMemberList] = useState([]);
  const [showMemberDetail, setMemberDetails] = useState(false);
  useEffect(() => {
    const newMembers = JSON.parse(localStorage.getItem("members"));
    if (newMembers?.length > 0) {
      setMemberList(newMembers);
    } else {
      setMemberList(members);
    }
  }, []);

  useEffect(() => {
    if (memberList.length > 0) {
      localStorage.setItem("members", JSON.stringify(memberList));
    }
  }, [memberList]);
  return (
    <>
      {showMemberDetail ? (
        <PrimaryContainer>
          <h2 className="text-2xl font-extrabold text-[#283275] w-full flex justify-between mb-4">
            Membership
            <div
              onClick={() => setMemberDetails(false)}
              className="flex items-center cursor-pointer"
            >
              <ArrowLeftIcon className="w-6 h-6 mr-2 text-seamlessBlue-900" />{" "}
              Go Back
            </div>
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
                        {newMember?.firstName}
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
                          {newMember?.status}
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
                        <span> Member ID: </span>
                        <span className="text-[#283275] text-sm font-semibold">
                          1032882
                        </span>
                      </div>
                      <ChevronDownIcon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between px-6 py-5">
                      <div className="text-seamlessGray-950 flex items-center gap-x-2.5 text-sm font-normal">
                        <span> Role: </span>
                        <span className="text-[#283275] text-sm font-semibold">
                          {newMember?.role}
                        </span>
                      </div>
                      <ChevronDownIcon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between px-6 py-5">
                      <div className="text-seamlessGray-950 flex items-center gap-x-2.5 text-sm font-normal">
                        <span> Chapter: </span>
                        <span className="text-[#283275] text-sm font-semibold">
                          {newMember?.chapter}
                        </span>
                      </div>
                      <ChevronDownIcon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between px-6 py-5">
                      <div className="text-seamlessGray-950 flex items-center gap-x-2.5 text-sm font-normal">
                        <span> Committees: </span>
                        <span className="text-[#283275] text-sm font-semibold">
                          {newMember?.committee}
                        </span>
                      </div>
                      <ChevronDownIcon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between px-6 py-5">
                      <div className="text-seamlessGray-950 flex items-center gap-x-2.5 text-sm font-normal">
                        <span> Subscription: </span>
                        <span className="text-[#283275] text-sm font-semibold">
                          Chapter Gold
                        </span>
                      </div>
                      <ChevronDownIcon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between px-6 py-5">
                      <div className="text-seamlessGray-950 flex items-center gap-x-2.5 text-sm font-normal">
                        <span> Subscription: </span>
                        <span className="text-[#283275] text-sm font-semibold">
                          <span className="text-[#283275] text-sm font-semibold ml-0.5">
                            Chapter Gold
                          </span>{" "}
                          <span className="px-2 py-1 text-sm text-seamlessGray-950 bg-[#c2e0b3] rounded-xl ml-2">
                            Current
                          </span>
                        </span>
                      </div>
                      <ChevronDownIcon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between px-6 py-5">
                      <div className="text-seamlessGray-950 flex items-center gap-x-2.5 text-sm font-normal">
                        <span> Renewal: </span>
                        <span className="text-[#283275] text-sm font-semibold">
                          <span className="text-[#283275] text-sm font-semibold ml-0.5">
                            01.15.2025
                          </span>{" "}
                          <span className="px-2 py-1 text-sm text-seamlessGray-950 bg-[#c2e0b3] rounded-xl ml-2">
                            Auto
                          </span>
                        </span>
                      </div>
                      <ChevronDownIcon className="w-6 h-6" />
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
                          This Tab Panel is not created please first create the
                          Tab
                        </p>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </PrimaryContainer>
      ) : (
        <PrimaryContainer>
          <h2 className="sm:text-xl md:text-2xl font-extrabold text-[#283275] mb-9">
            Membership
          </h2>

          <Tab.Group>
            <Tab.List className="flex flex-col border-b-2 border-seamlessBlue-400 sm:flex-row sm:space-x-9">
              {["Member", "Member Roles", "Subscriptions", "Registration"].map(
                (tab, index) => (
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
                )
              )}
            </Tab.List>

            <Tab.Panels>
              <Tab.Panel>
                <div>
                  <div className="flex flex-col items-center justify-between mt-10 mb-10 space-y-4 md:flex-row md:space-y-0">
                    <div className="flex items-center w-full md:w-auto space-x-4 rounded-full border border-[#DFDEDE] bg-[#cdd5d4] py-2 px-4">
                      <input
                        className="w-full bg-[#cdd5d4] text-sm text-gray-900 focus:outline-none"
                        placeholder="Search..."
                      />
                      <MagnifyingGlassIcon className="text-[#676b6a] w-4 h-4" />
                    </div>

                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 text-base font-medium text-[#282728]">
                        <span>Filter</span>
                        <AdjustmentsHorizontalIcon className="w-6 h-6" />
                      </button>
                      <button className="flex items-center space-x-2 text-base font-medium text-[#282728]">
                        <span>Export List</span>
                        <ArrowUpTrayIcon className="w-6 h-6" />
                      </button>
                      <button
                        className="px-6 py-2 text-white bg-[#283275] rounded-3xl font-semibold text-sm"
                        onClick={() => {
                          setNewMember({});
                          setIsModalOpen(true);
                        }}
                      >
                        ADD MEMBER
                      </button>
                    </div>
                  </div>
                  {memberList?.length > 0 ? (
                    <div className="border h-[40vh] border-[#6b6a6b] overflow-hidden rounded-2xl">
                      <table className="min-w-full table-auto ">
                        <thead className="text-sm font-semibold text-left text-seamlessBlue-700">
                          <tr className="border-b border-gray-300">
                            <th className="p-6">
                              <Checkbox />
                            </th>
                            <th className="text-sm font-semibold">
                              Member Name
                              <BraIcon className="inline-block ml-3" />
                            </th>
                            <th className="p-6 text-sm font-semibold">
                              Status
                              <BraIcon className="inline-block ml-3" />
                            </th>
                            <th className="p-6 text-sm font-semibold">
                              Role
                              <BraIcon className="inline-block ml-3" />
                            </th>
                            <th className="p-6 text-sm font-semibold">
                              Chapter
                              <BraIcon className="inline-block ml-3" />
                            </th>
                            <th className="p-6 text-sm font-semibold">
                              Committee
                              <BraIcon className="inline-block ml-3" />
                            </th>
                            <th className="p-6 text-sm font-semibold">
                              Subscription
                              <BraIcon className="inline-block ml-3" />
                            </th>
                            <th className="p-6 text-sm font-semibold">
                              Dues
                              <BraIcon className="inline-block ml-3" />
                            </th>
                            <th className="p-6"></th>
                          </tr>
                        </thead>
                        <tbody className="">
                          {memberList.map((member, index) => (
                            <tr
                              key={index}
                              className={`border-t w-fit  border-gray-300 cursor-pointer ${
                                member?.id === newMember?.id
                                  ? "bg-[#ffffff] text-seamlessBlue-900 "
                                  : ""
                              }`}
                              onClick={() => {
                                setNewMember(member);
                              }}
                            >
                              <td className="px-6 ">
                                <Checkbox />
                              </td>
                              <td className="flex items-center gap-3 px-4 py-2">
                                <UserCircleIcon
                                  className={`w-8 h-8 font-normal ${
                                    member?.id === newMember?.id
                                      ? "text-seamlessBlue-900"
                                      : "text-seamlessGray-900 "
                                  } `}
                                />
                                {member.firstName}
                              </td>
                              <td className="px-4 ">
                                <span
                                  className={`px-4 py-1.5 rounded-xl text-sm font-normal ${
                                    member.status === "Active"
                                      ? "bg-[#c2e0b3] text-[#282728]"
                                      : member.status === "Invited"
                                      ? "bg-[#cdd5d4] text-[#282728]"
                                      : member.status === "Inactive"
                                      ? "bg-[#e0b3c9] text-[#282728]"
                                      : ""
                                  }`}
                                >
                                  {member.status}
                                </span>
                              </td>
                              <td className="px-4 py-2">{member.role}</td>
                              <td className="px-4 py-2">{member.chapter}</td>
                              <td className="px-4 py-2">
                                {member.committee}
                                {member.extraCommittee && (
                                  <span className="px-2 py-1 ml-2 text-sm bg-[#c2e0b3] text-[#282728] rounded-full">
                                    +{member.extraCommittee}
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-2">
                                {member.subscription || "Chapter Gold"}
                              </td>
                              <td className="px-4 py-2">
                                {member.dues || "NA"}
                              </td>
                              <td className="px-6 py-2 text-right">
                                <PopUp
                                  onChange={() => {
                                    setIsModalOpen(true);
                                    setIsEdit(true);
                                  }}
                                  onEdit={() => setMemberDetails(true)}
                                  editName={"get Details"}
                                  onDelete={(e, close) => {
                                    e.preventDefault();
                                    setMemberList((pre) =>
                                      pre?.filter(
                                        (userMember) =>
                                          userMember?.id !== member?.id
                                      )
                                    );
                                    close();
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="mt-6 space-y-4 border border-gray-600 rounded-3xl">
                      <div className="flex items-center justify-center w-full h-60">
                        <div className="flex flex-col items-center ">
                          <p className="text-lg font-semibold ">
                            No Member Added
                          </p>
                          <p className="text-sm font-medium">
                            Please Add New Member to get the memberList
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Tab.Panel>
              {[1, 2, 3]?.map((tab) => (
                <Tab.Panel>
                  <div className="mt-10 space-y-4 border border-gray-600 rounded-3xl">
                    <div className="flex items-center justify-center w-full h-60">
                      <div className="flex flex-col items-center ">
                        <p className="text-lg font-semibold ">Not Created</p>
                        <p className="text-sm font-medium">
                          This Tab Panel is not created please first create the
                          Tab
                        </p>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
          {/* {isModalOpen && (
            <Modal onClose={handleCloseModal}>
              <AddMemberForm
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal}
                setMemberList={setMemberList}
                memberList={memberList}
                setNewMember={setNewMember}
                newMember={newMember}
              />
            </Modal>
          )} */}
        </PrimaryContainer>
      )}
      <AddMemberForm
        selectedMember={newMember}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        setMemberList={setMemberList}
        memberList={memberList}
        setNewMember={setNewMember}
        newMember={newMember}
        IsEdit={IsEdit}
        setIsEdit={setIsEdit}
      />
    </>
  );
};

export default Membership;
