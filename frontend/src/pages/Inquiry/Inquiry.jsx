import React from "react";
import Layout from "../../Fileds/Layout";

const Inquiry = () => {
  return (
    <Layout title="Inquiry">
      <div className="p-4 ml-4">
        <div className="flex justify-between">
        <h1 className="text-base font-medium text-gray-800">Inquiry List</h1>
        <button className="p-2 font-semibold text-white bg-[#5B8EDC] rounded">
            Create Inquiry
        </button>
        </div>
       
        <div className="mt-2 space-y-2 text-sm text-gray-800">
          <div className="grid grid-cols-6 px-3 py-3 font-bold bg-gray-100 rounded">
            <div>Inquir No</div>
            <div className="col-span-2">Country/Capital</div>
            <div>Reason</div>
            <div>Time</div>
            <div>Action</div>
          </div>
          <div className="grid grid-cols-6 px-3 py-3 bg-gray-100 rounded">
            <div>1</div>
            <div className="col-span-2">U.S</div>
            <div>Study</div>
            <div>Time</div>
            <div className="font-medium text-red-500">Action</div>
          </div>
          <div className="grid grid-cols-6 px-3 py-3 bg-gray-100 rounded">
            <div>2</div>
            <div className="col-span-2">London</div>
            <div>Job</div>
            <div>Time</div>
            <div className="font-medium text-red-500">Action</div>
          </div>
          <div className="grid grid-cols-6 px-3 py-3 bg-gray-100 rounded">
            <div>3</div>
            <div className="col-span-2">France</div>
            <div>Study</div>
            <div>Time</div>
            <div className="font-medium text-red-500">Action</div>
          </div>
          <div className="grid grid-cols-6 px-3 py-3 bg-gray-100 rounded">
            <div>4</div>
            <div className="col-span-2">Australia</div>
            <div>Job/Study</div>
            <div>Time</div>
            <div className="font-medium text-red-500">Action</div>
          </div>
          <div className="grid grid-cols-6 px-3 py-3 bg-gray-100 rounded">
            <div>5</div>
            <div className="col-span-2">Germany</div>
            <div>Study</div>
            <div>Time</div>
            <div className="font-medium text-red-500">Action</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Inquiry;
