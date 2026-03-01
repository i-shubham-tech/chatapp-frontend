import { Camera, Mail, User } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '../store/useAuth'

function Profile() {
  const [showImage, setShowImage] = useState(null)
  const { authUser, uploadProfile, isUpdatingProfile } = useAuth()
  const handleImageUpload = async (e) => {

    const file = await e.target.files[0]

    if (!file) return;
    const formData=new FormData();
    formData.append("profilePic",file);
    formData.append("id",authUser.id);
    try {
      await uploadProfile(formData);
      
    } catch (error) {
      
    }
   
    
  }

  const FormattedDate = (date) => {
    const d = new Date(date)
    const dateNumber = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const formattedDate = dateNumber.toString() + "-" + month + "-" + year;
    return formattedDate;

  }

  return (
    <main className='h-[calc(100%-64px)] w-full flex justify-center items-center p-2'>
      {/* profile box */}
      <section className='w-[370px] h-full bg-base-300 rounded-sm flex flex-col items-center p-3 overflow-y-auto'>
        <div className='flex flex-col items-center gap-2'>
          <h1 className='font-bold text-amber-200'>Profile</h1>
          <p className='text-base-content/60'>Your profile information</p>
        </div>

        <div className=' w-52 relative flex flex-col items-center mt-4 gap-3'>
          <div className='h-27 w-27 rounded-full border-4 p-1'>
            <img className="w-full h-full rounded-full object-cover" src={(authUser.picture) || (showImage) || "default.jpg"} />
          </div>
          <div className='w-7 h-7 rounded-full bg-amber-100 flex justify-center items-center absolute top-20 right-14'>
            <label for="profileUpload"><Camera className='size-5  text-black' /></label>
            <input type="file" className='hidden' id="profileUpload" onChange={handleImageUpload} />
          </div>
        </div>

        {isUpdatingProfile ? (
            <p className='text-base-content/60'>Uploading...</p>
          ) : (
            <p className='text-base-content/60'>Click on camera to update your profile</p>
          )}

        <div className='flex flex-col gap-2 mt-2 w-full'>
          <div className='flex gap-2 items-center'>
            <User className='size-4' />
            <p className='text-sm'>Full Name</p>
          </div>
          <div className='border-2 w-full h-10 flex items-center p-3 rounded-box'>
            <p className='text-amber-200'>{authUser.username}</p>
          </div>
        </div>

        <div className='flex flex-col gap-2 mt-2 w-full'>
          <div className='flex gap-2 items-center'>
            <Mail className='size-4' />
            <p className='text-sm'>Email Address</p>
          </div>
          <div className='border-2 w-full h-10 flex items-center p-3 rounded-box'>
            <p className='text-amber-200'>{authUser.email}</p>
          </div>
        </div>

        <div className='bg-base-content/6 p-2 mt-5 rounded-[3px] w-full'>
          <h1 className='font-bold'>Account Information</h1>
          <div className='flex items-center justify-between'>
            <p className='text-base-content/60'>Member Since</p>
            <p className='text-base-content/60'>{FormattedDate(authUser.created_at)}</p>
          </div>
          <hr className='mt-2 text-base-content/40' />
          <div className='flex items-center justify-between rounded-[3px] mt-2'>
            <p>Account Status</p>
            <p className='text-green-600 font-semibold'>Active</p>
          </div>
        </div>



      </section>

    </main>
  )
}

export default Profile