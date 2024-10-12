import React from 'react';
import SearchBar from '../../../Components/SearchBar';
import CheckBox from '../../../Components/CheckBox'
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { classNames } from '../../../provider';
const ListsNames = ({ className, selectedNumber, placeholder, messageList, setSelectedNumber }) => {
    return (
        <div className='flex flex-col h-full '>
            <div className='py-4 bg-white '>
                <SearchBar placeholder={placeholder} className="py-2 " />
            </div>
            <div className='flex flex-col overflow-auto divide-y cursor-pointer grow'>
                {messageList?.map((message, index) => <div key={message?.id} onClick={() => setSelectedNumber(message)} className={classNames('flex items-center justify-between px-3 py-3',
                    selectedNumber?.id === message?.id ? 'bg-gray-100' : ''
                )}>

                    <div className='flex items-center gap-x-2'>
                        <CheckBox />
                        {message?.first_name + " " + message?.last_name}
                    </div>
                    <div>
                        <ChatBubbleBottomCenterIcon className='w-6 h-6' />
                    </div>
                </div>)}
            </div>


        </div>
    );
}

export default ListsNames;
