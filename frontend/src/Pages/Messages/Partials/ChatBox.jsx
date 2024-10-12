import { ExclamationTriangleIcon, PaperAirplaneIcon, PaperClipIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { classNames } from '../../../provider';

const ChatBox = ({className,selectedNumber}) => {
  console.log(selectedNumber)
  return (
    <div className={classNames("flex flex-col justify-between w-3/4 h-full py-4 bg-white rounded-r-lg",className)}>
      <div className='overflow-auto grow scrollbar-hide'>
        { selectedNumber ? <div className='relative'>
          <div className='sticky top-0 flex items-center px-4 bg-white shadow gap-x-5 borde-b'>
          <img src="https://pagedone.io/asset/uploads/1710412177.png" alt="Shanay image" className="w-10 h-10" /> <h5 className="text-sm font-semibold leading-snug text-gray-900 ">{selectedNumber?.first_name +" "+ selectedNumber?.last_name}</h5>
            </div>
          <div className="grid px-4 pb-11">
          <div className="flex gap-2.5 mb-4">
           
            <div className="grid">
             
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
        <div className="flex gap-2.5 justify-end pb-40 px-4">
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
        </div></div> :
        <div className='flex flex-col items-center justify-center h-full text-sm'>
          <ExclamationTriangleIcon className='w-20 h-20 text-gray-500'/>
          No Message Number Selected
          <div className='text-xs'>Please Select A number to start Conversation</div>
        </div>}
        {/*  */}
      </div>
      <div className="inline-flex items-center justify-between gap-2 p-5 py-1 pl-3 pr-1 mx-4 border border-gray-200 grow rounded-3xl">
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
