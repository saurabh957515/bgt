import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import NaccLogo from "../Images/NaccLogo.png";
import TextInput from "../Components/TextInput";
import PopUpModel from "../Components/PopUpModel";

const roles = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

const statusOptions = [
  { value: "Invited", label: "Invited" },
  { value: "Active", label: "Active" },
];

const chapters = [
  { value: "chapter1", label: "Chapter 1" },
  { value: "chapter2", label: "Chapter 2" },
];

const committees = [
  { value: "East Organization", label: "East Organization" },
  { value: "West Organization", label: "West Organization" },
];

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "9999px",
    backgroundColor: "#edefef",
    boxShadow: "none",
    outline: "none",
    borderColor: state.isFocused ? "#edefef" : "#edefef",
    padding: "4px 10px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#282728",
    fontSize: "14px",
    fontWeight: "400",
  }),
  option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
    ...provided,
    fontSize: "14px",
    backgroundColor: isDisabled
      ? data?.color
      : isSelected
      ? " #273175"
      : isFocused
      ? " #273175"
      : undefined,
    color: isDisabled
      ? undefined
      : isSelected
      ? " #edefef"
      : isFocused
      ? " #edefef"
      : undefined,
    cursor: isDisabled ? "not-allowed" : "default",
    ":active": {
      ...provided[":active"],
      backgroundColor: !isDisabled
        ? isSelected
          ? " #f0f0"
          : " #edefef"
        : undefined,
    },
  }),
  menu: (provided) => ({
    ...provided,
  }),
};

const AddMemberForm = ({
  setNewMember,
  handleCloseModal,
  memberList,
  setMemberList,
  isModalOpen,
  selectedMember,
  IsEdit,
  setIsEdit,
  
}) => {
  const memberObject = {
    firstName: "",
    lastName: "",
    role: "",
    chapter: "",
    committee: "",
    status: "",
  };
  const [formData, setFormData] = useState(memberObject);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (IsEdit) {
      setNewMember(formData);
      let newMembers = [...memberList];
      newMembers = newMembers?.map((member) =>
        member?.id === formData?.id ? formData : member
      );
      localStorage.setItem("members", JSON.stringify(newMembers));
      setMemberList(newMembers);
    } else {
      const newMember = { ...formData, id: Math.random() };
      setNewMember(newMember);
      const newMembers = [...memberList, newMember];
      localStorage.setItem("members", JSON.stringify(newMembers));
      setMemberList(newMembers);
    }
    handleCloseModal();
    setFormData(memberObject);
  };

  useEffect(() => {
    if (IsEdit) {
      setFormData(selectedMember);
    }
  }, [IsEdit, selectedMember]);
  return (
    <PopUpModel
      setOpen={() => {
        handleCloseModal();
        setFormData(memberObject);
        setIsEdit(false);
        setNewMember({})
      }}
      open={isModalOpen}
    >
      <div className="p-5 md:p-10 bg-white rounded-[50px]  drop-shadow-[0px 5px 31px rgba(0,0,0,0.35)] w-full mx-auto">
        <div className="flex justify-center mb-6">
          <img src={NaccLogo} alt="nacc" className="h-12" />
        </div>
        <form className="w-full pt-5 space-y-4" onSubmit={handleSubmit}>
          <TextInput
            required={true}
            name="firstName"
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            value={formData.firstName}
            type="text"
            placeholder="First Name"
            className={"w-full bg-seamlessGray-300"}
          />
          <TextInput
            required={true}
            type="text"
            className={"w-full bg-seamlessGray-300"}
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
          />
          <div className="mb-4">
            <Select
              options={roles}
              placeholder="Role"
              value={
                formData.role
                  ? { label: formData.role, value: formData.role }
                  : { label: "Role", value: "Role" }
              }
              onChange={(e) => handleInputChange("role", e.value)}
              styles={customSelectStyles}
            />
          </div>
          <div className="mb-4">
            <Select
              options={statusOptions}
              placeholder="Status"
              value={
                formData.status
                  ? { label: formData.status, value: formData.status }
                  : { label: "Status", value: "Status" }
              }
              onChange={(e) => handleInputChange("status", e.value)}
              styles={customSelectStyles}
            />
          </div>

          <div className="mb-4">
            <Select
              options={chapters}
              placeholder="Chapter"
              value={
                formData.chapter
                  ? { label: formData.chapter, value: formData.chapter }
                  : { label: "Chapter", value: "Chapter" }
              }
              onChange={(e) => handleInputChange("chapter", e.value)}
              styles={customSelectStyles}
            />
          </div>

          <div className="mb-4">
            <Select
              options={committees}
              placeholder="Committee"
              value={
                formData.committee
                  ? { label: formData.committee, value: formData.committee }
                  : { label: "Committee", value: "Committee" }
              }
              onChange={(e) => handleInputChange("committee", e.value)}
              styles={customSelectStyles}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-4 mt-2 text-white transition-colors duration-300 bg-[#283275] rounded-[21px] text-sm font-semibold"
          >
            SEND INVITE
          </button>
        </form>
      </div>
    </PopUpModel>
  );
};

export default AddMemberForm;
