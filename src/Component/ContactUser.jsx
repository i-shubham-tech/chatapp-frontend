import React from 'react'
import { useMessage } from '../store/useMessageStore';
import { useAuth } from '../store/useAuth';

function ContactUser({ userInfo }) {
  const { id, username, picture } = userInfo;
  const { getselectedUser, selectedUser } = useMessage();
  const { activeUser } = useAuth()

  return (
    <button
      className={`flex gap-3 items-center p-2 rounded-[10px] ${selectedUser.id === id ? 'bg-base-300' : ''}`}
      type='button'
      onClick={() => getselectedUser(userInfo)}
    >
      <img src={picture || "default.jpg"} className='w-12 h-12 rounded-full object-cover' />
      <div className='flex flex-col text-left'>
        <h1>{username}</h1>
        <p className='text-base-content/40 text-sm'>
          {activeUser && JSON.parse(activeUser).includes(String(id)) ? 'Online' : 'offline' }
        </p>
      </div>
    </button>
  )
}

export default ContactUser