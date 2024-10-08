import React from "react";
import PrimaryContainer from "../Components/PrimaryContainer";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import Chart from "react-google-charts";
import NaccLogo from "../Images/NaccLogo.png";

const Financials = () => {
  const data = [
    ["Day", "Background Engagement", "Foreground Engagement"],
    ["Mon", 10, 7],
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
        <img
          src={NaccLogo}
          alt="Organization Logo"
          className="w-full h-auto mx-6 my-4" 
        />
      ),
      className: "col-span-1 md:col-span-1",
    },
    {
      title: "ENGAGEMENT",
      content: (
        <div className="relative">
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
        <div className="flex gap-4 md:gap-10 items-baseline mx-1">
          <p className="text-2xl md:text-4xl font-extrabold text-[#283275]">
            78 <span className="text-base text-[#283275] font-semibold">Active</span>
          </p>
          <p className="text-2xl md:text-4xl font-extrabold text-[#6b6a6b]">
            2 <span className="text-base text-[#6b6a6b] font-semibold">Inactive</span>
          </p>
        </div>
      ),
      className: "col-span-1",
    },
    {
      title: "COMMITTEES",
      content: (
        <div className="flex gap-4 md:gap-5 items-baseline">
        <p className="text-2xl md:text-4xl font-extrabold text-[#283275]">
          102 <span className="text-base text-[#283275] font-semibold">Active</span>
        </p>
        <p className="text-2xl md:text-4xl font-extrabold text-[#6b6a6b]">
          23 <span className="text-base text-[#6b6a6b] font-semibold">Inactive</span>
        </p>
      </div>
      ),
      className: "col-span-1",
    },
    {
      title: "SUBSCRIBERS",
      content: (
         <div className="flex gap-4 md:gap-5 items-baseline mx-1">
          <p className="text-2xl md:text-4xl font-extrabold text-[#283275]">
            325 <span className="text-base text-[#283275] font-semibold">Active</span>
          </p>
          <p className="text-2xl md:text-4xl font-extrabold text-[#6b6a6b]">
            11 <span className="text-base text-[#6b6a6b] font-semibold">Inactive</span>
          </p>
        </div>
      ),
      className: "col-span-1",
    },
    {
      title: "MEMBERS",
      content: (
        <div className="mx-1">
          <div className="flex items-baseline mb-4 gap-4 md:gap-10">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-4xl font-extrabold text-[#283275]">1,240</span>
              <span className="text-base text-[#283275] font-semibold">Total Active</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-4xl font-extrabold text-[#6b6a6b]">2</span>
              <span className="text-base text-[#6b6a6b] font-semibold">Total Inactive</span>
            </div>
          </div>

          <div className="flex space-x-6">
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-[#283275]">BOD</h3>
              <p className="text-2xl md:text-4xl font-extrabold text-[#283275]">6</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-[#283275]">STAFF</h3>
              <p className="text-2xl md:text-4xl font-extrabold text-[#283275]">16</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-[#283275]">CHAPTER MEMBERS</h3>
              <p className="text-2xl md:text-4xl font-extrabold text-[#283275]">1,123</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-[#283275]">COMMITTEE MEMBERS</h3>
              <p className="text-2xl md:text-4xl font-extrabold text-[#283275]">234</p>
            </div>
          </div>
        </div>
      ),
      className: "col-span-1 md:col-span-2",
    },
    {
      title: "NONMEMBERS",
      content: (
        <div className="flex  items-baseline  gap-4 md:gap-8">
          <p className="text-2xl md:text-4xl font-extrabold text-[#283275]">
            115 <span className="text-base font-semibold text-[#283275]">Active</span>
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
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#283275] mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`bg-[#d9e3e2] shadow-md relative border ${card.className} p-4 rounded-lg`} // Add padding and rounded corners
            >
              <div className="flex justify-between items-center mx-2 md:mx-4 mt-2">
                <h2 className="font-extrabold text-[#283275] text-lg">{card.title}</h2>
                <EllipsisHorizontalCircleIcon className="w-6 h-6 text-gray-400" />
              </div>
              <div className="mx-2 md:mx-4 my-4">{card.content}</div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500" />
            </div>
          ))}
        </div>
      </div>
    </PrimaryContainer>
  );
};

export default Financials;





