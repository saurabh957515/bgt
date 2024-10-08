import React, { useEffect, useState } from "react";
import PopUpModel from "../../../Components/PopUpModel";
import NaccLogo from "../../../Images/NaccLogo.png";
import TextInput from "../../../Components/TextInput";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
const AddEventForm = ({
  isModelOpen,
  setIsModelOpen,
  selectedEvent,
  setSelectedEvent,
  setEvents,
  events,
  isEdit,
  setIsEdit,
}) => {
  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Pause", value: "Pause" },
    { label: "InActive", value: "InActive" },
    { label: "Live", value: "Live" },
  ];
  const typeOptions = [
    { label: "Virtual", value: "Virtual" },
    { label: "On-Site", value: "On-Site" },
  ];
  let eventObject = {
    name: "",
    display_title: "",
    location: "",
    status: "",
    type: "",
    registration_title: "",
    registration_date: "",
    description: "",
  };

  const [formData, setFormData] = useState(eventObject);

  const handleInputChange = (name, value) => {
    const newData = { ...formData };
    newData[name] = value;
    setFormData(newData);
  };
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      let newEvents = [...events];
      newEvents = newEvents?.map((event) =>
        event?.id === formData?.id ? formData : event
      );
      setEvents(newEvents);
      localStorage.setItem("events", JSON.stringify(newEvents));
    } else {
      const newFormData = { id: Math.random(), ...formData };
      const newEvents = [...events, newFormData];
      setEvents(newEvents);
      localStorage.setItem("events", JSON.stringify(newEvents));
    }
    setFormData(eventObject);
    setIsModelOpen(false);
    setIsEdit(false);
  };

  useEffect(() => {
    if (isEdit) {
      setFormData(selectedEvent);
    }
  }, [isEdit, selectedEvent]);
  return (
    <PopUpModel
      setOpen={() => {
        setFormData(eventObject);
        setIsModelOpen(false);
        // setSelectedEvent({});
        setIsEdit(false);
      }}
      open={isModelOpen}
    >
      <div className="p-4 md:p-10 bg-white rounded-[50px]  drop-shadow-[0px 5px 31px rgba(0,0,0,0.35)] w-full mx-auto">
        <div className="flex justify-center mb-6">
          <img src={NaccLogo} alt="nacc" className="h-12" />
        </div>
        <form className="w-full pt-5 space-y-5" onSubmit={handleSubmit}>
          <TextInput
            required={true}
            name="firstName"
            onChange={(e) => handleInputChange("name", e.target.value)}
            value={formData.name}
            type="text"
            placeholder="Event Name"
            className={"w-full bg-seamlessGray-300"}
          />
          <TextInput
            required={true}
            type="text"
            className={"w-full bg-seamlessGray-300"}
            name="lastName"
            placeholder="Display Title"
            value={formData.display_title}
            onChange={(e) => handleInputChange("display_title", e.target.value)}
          />

          <TextInput
            required={true}
            type="text"
            className={"w-full bg-seamlessGray-300"}
            name="lastName"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
          <div className="mb-4">
            <Select
              //   options={roles}
              options={statusOptions}
              placeholder="Status"
              value={
                formData.status
                  ? { label: formData.status, value: formData.status }
                  : { label: "Status", value: "Status" }
              }
              onChange={(e) => {
                console.log(e?.value);
                handleInputChange("status", e?.value);
              }}
              styles={customSelectStyles}
            />
          </div>
          <div className="mb-4">
            <Select
              options={typeOptions}
              placeholder="Type"
              value={
                formData.type
                  ? { label: formData.type, value: formData.type }
                  : { label: "Type", value: "type" }
              }
              onChange={(e) => handleInputChange("type", e.value)}
              styles={customSelectStyles}
            />
          </div>
          <TextInput
            required={true}
            type="text"
            className={"w-full bg-seamlessGray-300"}
            name="lastName"
            placeholder="Registration Title"
            value={formData.registration_title}
            onChange={(e) =>
              handleInputChange("registration_title", e.target.value)
            }
          />
          <Flatpickr
            style={{
              color: "#50598f",
            }}
            onChange={(e, date) => {
              handleInputChange("registration_date", date);
            }}
            value={formData?.registration_date}
            disabled={false}
            placeholder="Registration Date"
            className={`bg-seamlessGray-300 placeholder-seamlessBlue-200 text-sm text-seamlessBlue-200 w-full text-md py-3 px-6 rounded-3xl`}
            transperent={true}
          />
          <TextInput
            required={true}
            type="text"
            className={"w-full bg-seamlessGray-300"}
            name="lastName"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />

          <button
            type="submit"
            className="w-full px-4 py-4 mt-2 text-white transition-colors duration-300 bg-[#283275] rounded-[21px] text-sm font-semibold"
          >
       CREATE INVITE
          </button>
        </form>
      </div>
    </PopUpModel>
  );
};

export default AddEventForm;
