import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client"


export const useAuth = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLogin: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket: null,
    activeUser: null,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/checkAuth")
            set({ authUser: res.data });
            get().connectSocket()
            console.log(get().socket)


        } catch (error) {
            console.log(error)
            set({ authUser: null });

        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {

        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)

            console.log(res)
            toast.success(res.data.message)

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        finally {
            set({ isSigningUp: false })
        }

    },

    login: async (data) => {
        set({ isLogin: true })

        try {
            const res = await axiosInstance.post("/auth/login", data)
            console.log(res)
            set({ authUser: res.data.userData });
            get().connectSocket()
            toast.success(res.data.message)

        } catch (error) {
            console.log(error)
            set({ authUser: null })
            toast.error(error.response.data.message)
        }
        finally {
            set({ isLogin: false })
        }

    },

    logOut: async () => {
        try {
            const socket = get().socket;
            const res = await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            socket.disconnect()
            set({ socket: null })
            toast.success(res.data.message);
        } catch (error) {
            set({ authUser: null })
            toast.error(error.response.data.message)
        }

    },

    uploadProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put("/auth/updateProfile", data)

            set({ authUser: res.data.user })
            console.log(res)
            toast.success(res.data.message)
        } catch (error) {
            console.log(error)

        }
        finally {
            set({ isUpdatingProfile: false })
        }

    },

    connectSocket: () => {
        const socket = io(import.meta.env.VITE_API_URL, {
            query: {
                userId: get().authUser.id,
            }
        })
        set({ socket: socket })
    },

    setActiveUser: () => {
        const socket = get().socket
        socket.on("activeUser", (users) => {
            set({ activeUser: users })
        })

    }

}))