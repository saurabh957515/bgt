import React from "react";
import PrimaryContainer from "../Components/PrimaryContainer";
import Chart from "react-google-charts";
import NaccLogo from "../Images/NaccLogo.png";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { Popover } from "@headlessui/react";
import PopUp from "../Components/Popover";

const Dashboard = () => {
  const data = [
    ["Day", "Background Engagement", "Foreground Engagement"],
    ["Mon", 10, 10],
    ["Tue", 12, 10],
    ["Wed", 14, 5],
    ["Thu", 10, 8],
    ["Fri", 9, 7],
    ["Sat", 11, 4],
    ["Sun", 12, 6],
  ];

  const options = {
    chartArea: { width: "95%", height: "90%" },
    colors: ["#2E3E77", "#A9C7EE"],
    bar: { groupWidth: "20%" },
    isStacked: true,
    hAxis: {
      baselineColor: "transparent",
      gridlines: { color: "transparent" },
      textPosition: "none",
    },
    vAxis: {
      gridlines: { color: "#E5E7EB" },
      baselineColor: "#E5E7EB",
      textPosition: "none",
    },
    legend: { position: "none" },
    backgroundColor: "transparent",
  };

  const cardData = [
    {
      title: "ORGANIZATION",
      content: (
        <div className="py-10 mx-auto">
          <img
            src={NaccLogo}
            alt="Organization Logo"
            className="items-center h-16 "
          />
        </div>
      ),
      className: "col-span-1 md:col-span-1  ",
    },
    {
      title: "ENGAGEMENT",
      content: (
        <div className="relative w-full">
          <Chart
            chartType="ColumnChart"
            data={data}
            options={options}
            width="100%"
            height="100px"
          />
        </div>
      ),
      className: "col-span-1 md:col-span-2",
    },
    {
      title: "CHAPTERS",
      content: (
        <div className="grid items-baseline w-full grid-cols-2 gap-4 mx-1 md:gap-10">
          <p className="text-2xl md:text-4xl font-extrabold text-[#283275]">
            78{" "}
            <span className="text-base text-[#283275] font-semibold">
              Active
            </span>
          </p>
          <p className="text-2xl md:text-4xl font-extrabold text-[#6b6a6b]">
            2{" "}
            <span className="text-base text-[#6b6a6b] font-semibold">
              Inactive
            </span>
          </p>
        </div>
      ),
      className: "col-span-1",
    },
    {
      title: "COMMITTEES",
      content: (
        <div className="grid items-baseline w-full grid-cols-2 gap-4 md:gap-5">
          <p className="text-2xl md:text-4xl font-extrabold text-[#283275]">
            102{" "}
            <span className="text-base text-[#283275] font-semibold">
              Active
            </span>
          </p>
          <p className="text-2xl md:text-4xl font-extrabold text-[#6b6a6b]">
            23{" "}
            <span className="text-base text-[#6b6a6b] font-semibold">
              Inactive
            </span>
          </p>
        </div>
      ),
      className: "col-span-1",
    },
    {
      title: "SUBSCRIBERS",
      content: (
        <div className="grid items-baseline w-full grid-cols-2 gap-4 mx-1 md:gap-5">
          <p className="text-2xl md:text-4xl font-extrabold text-[#283275]">
            325{" "}
            <span className="text-base text-[#283275] font-semibold">
              Active
            </span>
          </p>
          <p className="text-2xl md:text-4xl font-extrabold text-[#6b6a6b]">
            11{" "}
            <span className="text-base text-[#6b6a6b] font-semibold">
              Inactive
            </span>
          </p>
        </div>
      ),
      className: "col-span-1",
    },
    {
      title: "MEMBERS",
      content: (
        <div className="w-full ">
          <div className="grid w-full grid-cols-2 gap-4 mt-4 xl:grid-cols-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl md:text-4xl font-extrabold text-[#283275]">
                1,240
              </span>
              <span className="text-sm md:text-base text-[#283275] font-semibold">
                Total Active
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl md:text-4xl font-extrabold text-[#6b6a6b]">
                2
              </span>
              <span className="text-sm md:text-base text-[#6b6a6b] font-semibold">
                Total Inactive
              </span>
            </div>
          </div>

          <div className="grid w-full grid-cols-3 gap-10 mt-8 xl:grid-cols-6 ">
            <div className="space-y-4 text-left">
              <h3 className="text-sm md:text-lg font-extrabold text-[#283275]">
                BOD
              </h3>
              <p className="text-xl md:text-4xl font-extrabold text-[#283275]">
                6
              </p>
            </div>
            <div className="space-y-4 text-left">
              <h3 className="text-sm md:text-lg font-extrabold text-[#283275]">
                STAFF
              </h3>
              <p className="text-xl md:text-4xl font-extrabold text-[#283275]">
                16
              </p>
            </div>
            <div className="col-span-2 space-y-4 text-left">
              <h3 className="text-sm md:text-lg font-extrabold text-[#283275]">
                CHAPTER MEMBERS
              </h3>
              <p className="text-xl md:text-4xl font-extrabold text-[#283275]">
                1,123
              </p>
            </div>
            <div className="col-span-2 space-y-4 text-left">
              <h3 className="text-sm md:text-lg font-extrabold text-[#283275]">
                COMMITTEE MEMBERS
              </h3>
              <p className="text-xl md:text-4xl font-extrabold text-[#283275]">
                234
              </p>
            </div>
          </div>
        </div>
      ),
      className: "col-span-1 md:col-span-2",
    },
    {
      title: "NONMEMBERS",
      content: (
        <div className="grid items-baseline w-full grid-cols-2 gap-4 md:gap-8">
          <p className="text-2xl md:text-4xl font-extrabold text-[#283275]">
            115{" "}
            <span className="text-base font-semibold text-[#283275]">
              Active
            </span>
          </p>
          <p className="text-2xl md:text-4xl font-extrabold mt-4 md:mt-24 text-[#6b6a6b]">
            12 <span className="text-sm text-[#6b6a6b]">Inactive</span>
          </p>
        </div>
      ),
      className: "col-span-1",
    },
  ];

  return (
    <PrimaryContainer>
      <div>
        <h1 className="text-2xl  font-extrabold text-[#283275] mb-12 ">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 ">
   
        </div>
      </div>
    </PrimaryContainer>
  );
};

export default Dashboard;
