import React, { useEffect, Link, useState, useRef } from 'react'
import { useMessage } from '../store/useMessageStore'
import { ArrowLeft, Cross, Image, MoveLeftIcon, MoveRightIcon, Send, X } from "lucide-react"
import { useAuth } from '../store/useAuth'
import { dateFormate } from '../lib/util'
import MessageInput from './MessageInput'
import { useMediaQuery } from "@mui/material"


function Chatcontainer() {
  const { authUser, activeUser } = useAuth()
  const { setMessage, receiverUnsubscribeToMessage, messages, getMessagesWithSelectedUser, selectedUser, getselectedUser, setMessagesWithSelectedUser, messagesLoading, receiverSubscribeToMessage } = useMessage()
  const messageEndref = useRef(null)
  const sm = useMediaQuery("(max-width:767px)")
  const [imgSelected, setImgSelected] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [inp_message, set_inp_message] = useState({
    text: "",
    image: ""
  })


  const handleSumbit = async (e) => {
    e.preventDefault();
    if (!inp_message.text.trim() && !inp_message.image.trim()) return;
    await setMessagesWithSelectedUser(inp_message)
    set_inp_message({
      text: "",
      image: ""
    })
    setImgSelected(false)
  }

  const handleImage = async (e) => {
    setImgSelected(true)
    const file = await e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onload = async () => {
      const base64Image = reader.result;
      set_inp_message({ ...inp_message, image: base64Image })
    }
  }

  useEffect(() => {
    receiverSubscribeToMessage()

    return (() => {
      receiverUnsubscribeToMessage()
    })
  }, [])

  useEffect(() => {
    getMessagesWithSelectedUser(selectedUser.id);
  }, [selectedUser])

  useEffect(() => {
    messageEndref.current?.scrollIntoView();
    setRefresh(!refresh)
  }, [messages])

  return (
    <section className='h-full w-full flex-1 relative'>
      <div className='h-15 w-full chat-header flex gap-3 items-center text-center'>
        {sm && <ArrowLeft onClick={() => getselectedUser("")}   />}
        <img src={selectedUser.picture || "default.jpg"} className='h-full w-16 rounded-full object-cover' />
        <div className='flex flex-col text-left'>
          <h1 className='text-xl font-semibold'>{selectedUser.username}</h1>
          <p className='font-semibold text-base-content/60 text-sm'>{activeUser && JSON.parse(activeUser).includes(String(selectedUser.id)) ? <span className='text-green-400'>Online</span> : "Offline"}</p>
        </div>
        {!sm && <X className='absolute right-2 top-1' onClick={() => getselectedUser("")} />}
      </div>
      <div className='h-[calc(100%-120px)] w-full flex flex-col overflow-scroll mt-1 gap-2'>
        {messages.map((item) => {
          return (
            <div className={`chat ${item.sender_id === authUser.id ? "chat-end" : "chat-start"}`}>
              <div className='chat-image avatar'>
                <div className='size-10 rounded-full border'>
                  <img
                    src={item.sender_id === authUser.id ? authUser.picture || 'default.jpg' : selectedUser.picture || 'default.jpg'}
                    alt="User profile" />
                </div>
              </div>

              <div className='text-xs opacity-50 m-1 chat-header'>
                <time>{dateFormate(item.sent_at)}</time>
              </div>

              <div className='chat-bubble flex flex-col'>
                {item.message_img && (
                  <img src={item.message_img} className='max-w-30' />)}
                {item.message_text && <p>{item.message_text}</p>}
              </div>

            </div>
          )

        })}
        <div className='text-right pr-11 text-zinc-300 absolute bottom-15 right-0'>
          {
            messagesLoading ? <p>Sending....</p> : ""
          }
        </div>

        <div ref={messageEndref}></div>

      </div>
      <MessageInput />

    </section>
  )
}

export default Chatcontainer