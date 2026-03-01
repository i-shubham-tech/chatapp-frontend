import { Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useMessage } from '../store/useMessageStore'
import ContactUser from './ContactUser';
import { useAuth } from '../store/useAuth';

function Sidebar() {
    const { getUsers, users, selectedUser } = useMessage();
    const { activeUser, setActiveUser } = useAuth()
    const [showOnlineUserOnly, setShowOnlineUserOnly] = useState(false)
    console.log(activeUser)



    useEffect(() => {
        setActiveUser()
    }, [setActiveUser])

    useEffect(() => {
        getUsers();
    }, [getUsers])

    return (

        <aside className='h-full w-full md:max-w-[350px] flex flex-col overflow-y-hidden'>
            {/* LOGO */}
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center '>
                    <Users />
                    <h1 className=' font-bold'>Contacts </h1>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox" className='checkbox size-4.5 mt-1 col' onChange={() => setShowOnlineUserOnly(!showOnlineUserOnly)} />
                    <p>Shows online user only</p>
                    <p className='text-base-content/40'>(
                        {
                            activeUser == null ?
                                <span> 0 </span> :
                                <span className='text-green-400'> {JSON.parse(activeUser)?.length - 1} Online </span>

                        })
                    </p>
                </div>
            </div>

            {/* Contacts */}
            <div className=' w-full flex-1 mt-6 gap-1.5 flex flex-col  overflow-scroll'>

                {!showOnlineUserOnly ? users.map((item, i) => {

                    return (

                        <ContactUser userInfo={item} key={i} />
                    )
                })
                    :
                    users.filter((item) => JSON.parse(activeUser).includes(String(item.id))).map((item, i) => {

                        return (

                            <ContactUser userInfo={item} key={i} />
                        )
                    })
                }





            </div>

        </aside>
    )
}

export default Sidebar