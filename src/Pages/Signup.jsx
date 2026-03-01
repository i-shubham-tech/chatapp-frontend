import { MessageSquare, User, Mail, LockKeyhole, Eye, EyeOff, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import AuthImagePattern from '../Component/AuthImagePattern';
import toast from 'react-hot-toast';
import { useAuth } from '../store/useAuth';
import { Link, useNavigate } from 'react-router-dom';


function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    console.log(formData)
    const { signup, isSigningUp } = useAuth();
    const navigate = useNavigate();
    const isValidGmail = (email) => {
        const pattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return pattern.test(email);
    }
    const formVaildDate = () => {
        if (!formData.username.trim()) return toast.error("Username is required")
        if (!formData.email.trim()) return toast.error("Email is required")
        if (!isValidGmail(formData.email)) return toast.error("Invalid Email")
        if (!formData.password.trim()) return toast.error("Password is required")
        if (formData.password.length < 6) return toast.error("Password Length Must be 6");

        return true;

    }
    const handleSumbmit = async (e) => {
        e.preventDefault()
        
        const success = formVaildDate();
        if (success == true) {
           
            await signup(formData)
            navigate("/login");
        }
    }

    return (
        <main className='w-full h-[calc(100%-64px)] grid grid-cols-1 lg:grid-cols-2 p-2'>
            {/* Left side  */}
            <section className=" h-full flex justify-center items-center">
                <div className='w-[370px] flex flex-col  p-3 rounded-sm'>
                    {/* LOGO */}
                    <div className="flex flex-col items-center">
                        <div className=' bg-primary/10  p-2 rounded-sm'>
                            <MessageSquare className=' size-6' />
                        </div>
                        <h1 className='w-auto my-2 text-2xl font-bold'>Create Account</h1>
                        <p className='text-base-content/60'>Get started with your free account</p>
                    </div>

                    {/* form */}
                    <div className='mt-5'>
                        <form
                            className=' flex flex-col items-center gap-4'
                            onSubmit={handleSumbmit}>
                            <div className='relative w-full flex flex-col gap-1'>
                                <User className='absolute left-2 top-9 size-4.5 text-base-content/40'
                                />
                                <label className='label text-amber-50 text-sm' for="user">Full Name</label>
                                <input
                                    className='input w-full bg-transparent pl-9'
                                    placeholder='John Doe'
                                    id="user"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                            <div className='relative w-full flex flex-col gap-1'>
                                <Mail className='absolute left-2 top-9 size-4.5 text-base-content/40' />
                                <label className='label text-amber-50 text-sm'>Email</label>
                                <input
                                    className='input w-full bg-transparent pl-8.5'
                                    placeholder='you@example.com'
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div className='relative w-full  flex flex-col gap-1'>
                                
                                <LockKeyhole className='absolute left-2 top-9 size-4.5 text-base-content/40' />
                                <label className='label text-amber-50 text-sm'>Password</label>
                                <input className='input w-full bg-transparent pl-8.5 '
                                    type={showPassword ? "text" : "password"}
                                    placeholder='password'
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                {showPassword ?
                                    <EyeOff className='absolute right-2 top-9 size-4 text-base-content/40'
                                        onClick={() => setShowPassword(false)} />
                                    :
                                    <Eye className='absolute right-2 top-9 size-4 text-base-content/40'
                                        onClick={() => setShowPassword(true)} />
                                }


                            </div>
                            <button
                                className='btn btn-warning w-full font-bold mt-2'
                                type="submit" disabled={isSigningUp}>
                                {isSigningUp ? (

                                    <>
                                        <Loader2 className=' size-5 animate-spin' />
                                        Loading...
                                    </>
                                ) : (
                                    "Create Account"
                                )
                                }
                            </button>
                            <div className=' flex'>
                                <p className=' text-base-content/40'>Already have an account?</p>
                                <p className=' text-warning ml-2 underline'>
                                    <Link to="/login">Login</Link>
                                </p>

                            </div>

                        </form>


                    </div>


                </div>




            </section>
            {/* Right side */}
            <section>
                <AuthImagePattern tittle="Join our community" subtittle="Connenct with friends,share moments,and stay in touch with your loved ones" />
            </section>
        </main>

    )
}

export default Signup


