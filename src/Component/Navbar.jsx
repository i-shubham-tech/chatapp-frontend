import React, { useState } from 'react'
import { LogOut, MessageSquare, Settings, User, } from "lucide-react"
import { useAuth } from '../store/useAuth'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const { authUser, logOut } = useAuth()
  return (
    <nav className='h-16 w-full py-2 px-4 flex justify-between items-center bg-base-content/4'>
      
      <section >
        <Link to="/" className='flex items-center gap-2'>
          <div className=' w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-primary/10 p-2 rounded-sm '>
            <MessageSquare className='size-5 sm:size-6' />
          </div>
          <h1 className='text-sm font-bold sm:text-xl'>Chatty</h1>
        </Link>
      </section>

      <section className="flex items-center gap-2 lg:pr-[80px]">
        <div>
          <Link to="/setting" className='flex justify-center items-center gap-3'>
            <h1 className='hidden sm:inline font-bold'>Settings</h1>
            <div className='flex justify-center items-center bg-primary/10 p-2 rounded-sm w-8 h-8 '>
              <Settings className=' size-5' />
            </div>
          </Link>
        </div>

        <div className={`${authUser ? "" : "hidden"} flex items-center gap-2`}>
          <h1 className='hidden sm:inline font-bold'>Profile</h1>
          <div className='flex justify-center items-center bg-primary/10 p-2 rounded-sm w-8 h-8 '>
            <Link to="/profile"><User className=' size-5' /></Link>
          </div>
        </div>
        <div className={`${authUser ? "" : "hidden"} flex items-center gap-2`}>
          <h1 className='hidden sm:inline font-bold'>Logout</h1>
          <div className='flex justify-center items-center bg-primary/10 p-2 rounded-sm w-8 h-8 '>
            <LogOut className=' size-5 cursor-pointer' onClick={logOut}></LogOut>
          </div>
        </div>
      </section>

    </nav >
  )
}
