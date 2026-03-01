import { MessageSquare, Users } from 'lucide-react'
import React from 'react'
import { useMessage } from '../store/useMessageStore'
import Sidebar from '../Component/Sidebar';
import Chatcontainer from '../Component/Chatcontainer';
import NotselecteContainer from '../Component/NotselecteContainer';
import { useMediaQuery } from "@mui/material"




function Home() {
  const { selectedUser } = useMessage();
  const sm = useMediaQuery("(max-width:768px)")
  return (


    <main className=' h-[calc(100%-64px)] w-full p-2 flex justify-center'>
      <section className='h-full w-full max-w-6xl  bg-base-content/3 rounded-sm flex p-3 gap-2'>
        {
          sm && selectedUser ? <Chatcontainer /> : <Sidebar />
        }

        {!sm && (
          selectedUser ? (
            <Chatcontainer />
          ) : (
            <NotselecteContainer />
          )
        )}

      </section>


    </main>
  )
}

export default Home