import React from 'react';
import PrimaryContainer from '../../Components/PrimaryContainer';
import ChatBox from './Partials/ChatBox';
import { Tab } from '@headlessui/react';
import { classNames } from '../../provider';
import SearchBar from '../../Components/SearchBar';
import ListsNames from './Partials/ListsNames';

const Messages = () => {
  // use map fuction with the timeline in where check which message came first sender and reciver sort them in order with the time sender on right reciver on
  // create conversation table with the
  // create mass conversatin table with the selected ids

  const tabs = [
    "Inquiry", "Admission"
  ]
  return (
    <PrimaryContainer className={'w-full flex '}>

      <div className='flex flex-col px-4 py-3 bg-white border-r rounded-l-lg lg:w-1/4 xl:1/4'>
        <Tab.Group>
          <Tab.List className="flex flex-col border-b-2 border-gray-300 sm:flex-row sm:space-x-9">
            {tabs.map((tab, index) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    "text-base font-semibold text-seamlessBlue-700 focus:none ",
                    selected ? "border-b-4 border-inquiryBlue-700 py-1.5  font-semibold " : "font-semibold  mb-1"
                  )
                }
              >
                {({ hover, selected }) => (
                  <>
                    {tab}

                  </>
                )}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <ListsNames />
            </Tab.Panel>
            <Tab.Panel>
              <ListsNames />
            </Tab.Panel>

          </Tab.Panels>
        </Tab.Group>
      </div>
      <ChatBox />

    </PrimaryContainer>

  );
}

export default Messages;
