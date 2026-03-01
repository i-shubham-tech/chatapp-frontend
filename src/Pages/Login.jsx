import React, { useState } from 'react'
import { Eye, EyeOff, Loader2, LockKeyhole, MessageSquare, User } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAuth } from '../store/useAuth';
import AuthImagePattern from '../Component/AuthImagePattern';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { login, isLogin } = useAuth()
  const navigate = useNavigate()

  const formVaildDate = () => {
    if (!formData.email.trim()) return toast.error("Email is required")
    if (!formData.password.trim()) return toast.error("Password is required");

    return true;



  }
  const handleSubmit = async (e) => {

    e.preventDefault()
    const success = formVaildDate();

    if (success === true) {

      await login(formData);
    
      navigate("/")

    }
  }
  return (
    <main className='w-full h-[calc(100%-64px)] grid grid-cols-1 lg:grid-cols-2  p-2'>
      {/* Left side  */}
      <section className='h-full flex items-center justify-center'>
        {/* FORM BOX */}
        <div className='w-[370px] h-auto flex flex-col items-center p-3'>
          {/* LOGO */}
          <div className='flex flex-col items-center'>
            <div className=' bg-primary/10  p-2 rounded-sm w-10 h-10'>
              <MessageSquare className=' size-6' />
            </div>
            <h1 className='w-auto my-2 text-2xl font-bold'>Welcome Back</h1>
            <p className='text-base-content/60'>Login to your account</p>
          </div>
          {/* FORM FIELD */}
          <form
            onSubmit={handleSubmit}
            className='w-full'>
            <div className='relative w-full mt-4'>
              <User className='absolute top-10 left-2 size-4.5 text-base-content/40' />
              <label className='label text-amber-50 text-sm font-semibold' for="user">Email</label>
              <input
                className='input w-full bg-transparent pl-9 mt-1'
                placeholder='Email'
                id="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className='relative w-full flex flex-col gap-1 mt-4'>

              <LockKeyhole className='absolute top-9 left-2 size-4.5 text-base-content/40' />
              <label className='label text-amber-50 text-sm'>Password</label>
              <input className='input w-full bg-transparent pl-8.5 '
                type={showPassword ? "text" : "password"}
                placeholder='password'
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}

              />
              {showPassword ?
                <EyeOff className='absolute top-9 right-2 text-base-content/40'
                  onClick={() => setShowPassword(false)} />
                :
                <Eye className='absolute top-9 right-2 size-4 text-base-content/40'
                  onClick={() => setShowPassword(true)} />
              }
            </div>
            <button className='btn bg-warning w-full mt-6' type='submit' disabled={isLogin}>
              {isLogin ?
                <div className='flex justify-center gap-2 font-bold'>
                  <Loader2 className='size-5 animate-spin' />
                  Loading...
                </div>
                :
                <span className=" font-bold text-[20px] tracking-[2px] mb-1">Login</span>

              }</button>

            <div className=' flex justify-center mt-5'>
              <p className=' text-base-content/40 select-none'>Don't have an account?</p>
              <p className=' text-warning ml-2 underline'>
                <Link to="/signup">Signup</Link>
              </p>

            </div>

          </form>

        </div>


      </section>

      {/* Right side */}
      <section>
        <AuthImagePattern tittle="Join our community" subtittle="Connenct with friends,share moments,and stay in touch with your loved ones" />
      </section>
    </main >

  )
}

export default Login