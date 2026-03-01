import { MessageSquare } from 'lucide-react'
import React from 'react'

function NotselecteContainer() {
  return (
   <section className='hidden sm:inline h-full w-full flex-1'>
    <div className='w-full h-full flex flex-col justify-center items-center text-center gap-4'>
    <div className='w-12 h-12 rounded-xl  bg-base-content/10 flex justify-center items-center animate-pulse'>
      <MessageSquare className='size-6'/>
    </div>
    <h1 className='font-bold text-xl'>Welcome to Chatty</h1>
    <p className='text-base-content/40'>Select a conversation from the sidebar to start chatting</p>
    </div>
   </section>
  )
}

export default NotselecteContainer