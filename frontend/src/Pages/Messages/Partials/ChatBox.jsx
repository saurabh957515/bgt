import { ExclamationTriangleIcon, PaperAirplaneIcon, PaperClipIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from 'react';
import { classNames } from '../../../provider';
import useApi from '../../../utils/UseApi';
import ViewImage from '../../Admission/Partials/ViewImage';

const ChatBox = ({ className, selectedNumber }) => {
  const { postRoute, getRoute } = useApi();
  const [conversation, setConversation] = useState([])
  const [message, setMessage] = useState('');
  const senderNumber = '9595959303'
  const chatboxRef = useRef(null);
  const sendMessage = async (e) => {


    if (selectedNumber?.contact_no) {
      e.preventDefault();
      const { data } = await postRoute("/api/whatsapp/message", {
        sender: senderNumber,
        recipient: selectedNumber?.contact_no,
        message: message,
      });
      if (data?.status === 'success') {
        setMessage('');
        getConversations();
      }
    }
  }

  const getConversations = async () => {
    const { data } = await getRoute("/api/whatsapp/conversation", {
      sender: senderNumber,
      recipient: selectedNumber?.contact_no,
    });
    const sortedMessages = data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    setConversation(sortedMessages)
  }

  useEffect(() => {
    if (selectedNumber?.contact_no) {
      getConversations()
    }
  }, [selectedNumber]);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [conversation]);
  return (
    <div className={classNames("flex flex-col justify-between w-3/4 h-full bg-white rounded-r-lg", className)}>
      <div ref={chatboxRef} className='overflow-auto grow scrollbar-hide'>
        {selectedNumber?.contact_no ? <div className='relative'>
          <div className='sticky top-0 flex items-center px-4 py-4 bg-white shadow gap-x-5 borde-b'>
            <div className='w-8 h-8 overflow-hidden rounded-3xl '>
              <ViewImage className={'w-10 h-full rounded--3xl'} imageDoc={selectedNumber?.photo_document} />
            </div>
            <h5 className="text-sm font-semibold leading-snug text-gray-900 ">{selectedNumber?.first_name + " " + selectedNumber?.last_name}</h5>
          </div>
          <div className="grid px-4 py-4">
            {conversation.map((message) => {
              const isSender = message.sender === senderNumber;
                return (
                <div className={`flex gap-2.5 mb-4 ${isSender ? 'justify-end' : 'justify-start'}`} key={message.id}>
                  {!isSender && (
                    <img
                      src="https://pagedone.io/asset/uploads/1704091591.png" // You can change this to dynamic user images later
                      alt="Hailey image"
                      className="w-10 h-11"
                    />
                  )}
                  <div className="grid">
                    <div className="grid w-max">
                      <div className={`px-3.5 py-2 ${isSender ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-900'} rounded inline-flex items-center gap-3`}>
                        <h5 className="text-sm font-normal leading-snug">{message.message}</h5>
                      </div>
                      <div className={`justify-end items-center inline-flex mb-2.5 ${isSender ? 'text-right' : ''}`}>
                        <h6 className="py-1 text-xs font-normal leading-4 text-gray-500">
                          {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </h6>
                      </div>
                    </div>
                  </div>
                  {isSender && (
                    <img
                      src="https://pagedone.io/asset/uploads/1704091591.png" // Sender image placeholder, update as needed
                      alt="You"
                      className="w-10 h-11"
                    />
                  )}
                </div>
              );
            })}
          </div></div> :
          <div className='flex flex-col items-center justify-center h-full text-sm'>
            <ExclamationTriangleIcon className='w-20 h-20 text-gray-500' />
            No Message Number Selected
            <div className='text-xs'>Please Select A number to start Conversation</div>
          </div>}
      </div>
      <div className="inline-flex items-center justify-between gap-2 p-5 py-1 pl-3 pr-1 mx-4 my-4 border border-gray-200 h-fit rounded-3xl">
        <div className="flex items-center w-full gap-2">
          <UserCircleIcon className='w-6 h-6' />
          <input onKeyDown={(e) => e?.key === "Enter" && sendMessage(e)} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full text-xs font-medium leading-4 text-black grow shrink basis-0 focus:outline-none" placeholder="Type here..." />
        </div>
        <div className="flex items-center gap-2">
          <PaperClipIcon className='w-6 h-5' />
          <button onClick={sendMessage} className="flex items-center px-3 py-2 bg-indigo-600 rounded-full shadow ">
            <PaperAirplaneIcon className='w-5 h-6 text-white' />
            <h3 className="px-2 text-xs font-semibold leading-4 text-white">Send</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
