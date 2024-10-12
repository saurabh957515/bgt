import { PaperAirplaneIcon, PaperClipIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

const ChatBox = () => {
  return (
    <div className="flex flex-col justify-between w-3/4 h-full p-4 bg-white rounded-r-lg">
      <div className='overflow-auto grow scrollbar-hide'>
        <div className="grid pb-11">
          <div className="flex gap-2.5 mb-4">
            <img src="https://pagedone.io/asset/uploads/1710412177.png" alt="Shanay image" className="w-10 h-11" />
            <div className="grid">
              <h5 className="pb-1 text-sm font-semibold leading-snug text-gray-900">Shanay cruz</h5>
              <div className="grid w-max">
                <div className="px-3.5 py-2 bg-gray-100 rounded justify-start  items-center gap-3 inline-flex">
                  <h5 className="text-sm font-normal leading-snug text-gray-900">Guts, I need a review of work. Are you ready?</h5>
                </div>
                <div className="justify-end items-center inline-flex mb-2.5">
                  <h6 className="py-1 text-xs font-normal leading-4 text-gray-500">05:14 PM</h6>
                </div>
              </div>
              <div className="grid w-max">
                <div className="px-3.5 py-2 bg-gray-100 rounded justify-start items-center gap-3 inline-flex">
                  <h5 className="text-sm font-normal leading-snug text-gray-900">Let me know</h5>
                </div>
                <div className="justify-end items-center inline-flex mb-2.5">
                  <h6 className="py-1 text-xs font-normal leading-4 text-gray-500">05:14 PM</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2.5 justify-end pb-40">
          <div className="">
            <div className="grid mb-2">
              <h5 className="pb-1 text-sm font-semibold leading-snug text-right text-gray-900">You</h5>
              <div className="px-3 py-2 bg-indigo-600 rounded">
                <h2 className="text-sm font-normal leading-snug text-white">Yes, let’s see, send your work here</h2>
              </div>
              <div className="inline-flex items-center justify-start">
                <h3 className="py-1 text-xs font-normal leading-4 text-gray-500">05:14 PM</h3>
              </div>
            </div>
            <div className="justify-center">
              <div className="grid ml-auto w-fit">
                <div className="px-3 py-2 bg-indigo-600 rounded ">
                  <h2 className="text-sm font-normal leading-snug text-white">Anyone on for lunch today</h2>
                </div>
                <div className="inline-flex items-center justify-start">
                  <h3 className="py-1 text-xs font-normal leading-4 text-gray-500">You</h3>
                </div>
              </div>
            </div>
          </div>
          <img src="https://pagedone.io/asset/uploads/1704091591.png" alt="Hailey image" className="w-10 h-11" />
        </div>
      </div>
      <div className="inline-flex items-center justify-between w-full gap-2 py-1 pl-3 pr-1 border border-gray-200 rounded-3xl">
        <div className="flex items-center gap-2">
            <UserCircleIcon className='w-6 h-6'/>
          <input className="text-xs font-medium leading-4 text-black grow shrink basis-0 focus:outline-none" placeholder="Type here..." />
        </div>
        <div className="flex items-center gap-2">
          <PaperClipIcon className='w-6 h-5' />
          <button className="flex items-center px-3 py-2 bg-indigo-600 rounded-full shadow ">
           <PaperAirplaneIcon className='w-5 h-6 text-white'/>
            <h3 className="px-2 text-xs font-semibold leading-4 text-white">Send</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
