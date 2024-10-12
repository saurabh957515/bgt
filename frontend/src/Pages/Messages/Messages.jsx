import React, { useEffect, useState } from 'react';
import PrimaryContainer from '../../Components/PrimaryContainer';
import ChatBox from './Partials/ChatBox';
import { Tab } from '@headlessui/react';
import { classNames } from '../../provider';
import SearchBar from '../../Components/SearchBar';
import ListsNames from './Partials/ListsNames';
import useApi from '../../utils/UseApi';

const Messages = () => {
  // use map fuction with the timeline in where check which message came first sender and reciver sort them in order with the time sender on right reciver on
  // create conversation table with the
  // create mass conversatin table with the selected ids
  const { getRoute } = useApi();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedNumber,setSelectedNumber]=useState({})
  const [messageList, setMessagesLists] = useState([]);
  const getData = async () => {
    const response = selectedIndex ? await getRoute('/api/admission') : await getRoute(
      "/api/inquiry/filter",
      {},
      false
    );
    setMessagesLists(response?.data)
  }

  useEffect(() => {
    getData();
  }, [selectedIndex])
  const tabs = [
    "Inquiry", "Admission"
  ]
  return (
    <PrimaryContainer className={'w-full flex h-full'}>
      <div className='flex flex-col h-full px-4 py-3 bg-white border-r rounded-l-lg lg:w-1/3 xl:1/4'>
        <Tab.Group

          onChange={setSelectedIndex}
          as='div' className={'h-full flex flex-col'}>
          <Tab.List className="sticky flex flex-col border-b-2 border-gray-300 sm:flex-row sm:space-x-9">
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
          <Tab.Panels as='div' className={'grow overflow-auto'}>
            <Tab.Panel as='div' className={'h-full '}>
              <ListsNames selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} messageList={messageList} className='h-full' />
            </Tab.Panel>
            <Tab.Panel as='div' className={'h-full '}>
              <ListsNames selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} messageList={messageList} />
            </Tab.Panel>

          </Tab.Panels>
        </Tab.Group>
      </div>
      <ChatBox className='grow' selectedNumber={selectedNumber} />

    </PrimaryContainer>

  );
}

export default Messages;
