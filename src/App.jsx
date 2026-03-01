
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './Component/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Setting from './Pages/Setting';
import { useAuth } from './store/useAuth.js';
import { useEffect, useState } from 'react';
import { LoaderCircle } from "lucide-react";
import {Toaster} from "react-hot-toast"


function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuth();

  useEffect(() => {
    checkAuth()
  },[checkAuth]);


  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <LoaderCircle className=" size-20  text-cyan-400 animate-spin" />
      </div>)

  }

  return (
    <div className="h-screen overflow-y-hidden">
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/Login" />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Login />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
      <Toaster/>
      
    </div>

  )
}

export default App