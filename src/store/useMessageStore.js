import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { useAuth } from "./useAuth"


export const useMessage = create((set, get) => ({
    users: [],
    messages: [],
    selectedUser: false,
    usersLoading: false,
    messagesLoading: false,

    getUsers: async () => {
        set({ usersLoading: true })

        try {

            const res = await axiosInstance.get("/message/users");
            set({ users: res.data })
        } catch (error) {
            console.log(error)
            toast.error("NOT MINE")


        }
        finally {
            set({ usersLoading: false })

        }

    },
    getselectedUser: async (id) => {
        set({ selectedUser: id })
    },
    getMessagesWithSelectedUser: async (ID) => {
        try {

            const res = await axiosInstance.get(`message/get/${ID}`)
            set({ messages: res.data.Messages })

        } catch (error) {
            console.log(error)
        }

    },
    setMessagesWithSelectedUser: async (messageData, state) => {

        set({ messagesLoading: true })
        try {
            const { selectedUser } = get()
            if (state === "image") {
                const res = await axiosInstance.post(`message/send/${selectedUser.id}`, messageData)
                set({ messages: res.data.message })
            }
            else {
                const res = await axiosInstance.post(`message/sendtext/${selectedUser.id}`, messageData)
                const currentMessages = get().messages;
                console.log(currentMessages)
                set({ messages: [...currentMessages, res.data.data] });
                console.log(get().messages)
            }

            console.log(res)

        } catch (error) {
            console.log(error)
        }
        finally {
            set({ messagesLoading: false })
        }

    },
    receiverSubscribeToMessage: async () => {

        try {
            const socket = useAuth.getState().socket
            socket.on("newMessage", get().handlerFunction);
        } catch (error) {
            console.error('Error subscribing to messages:', error);
        }
    },
    receiverUnsubscribeToMessage: async () => {

        try {
            const socket = useAuth.getState().socket
            socket.off("newMessage", get().handlerFunction);
        } catch (error) {
            console.error('Error subscribing to messages:', error);
        }
    },
    handlerFunction: (message) => {
        const currentMessages = get().messages;
        console.log(currentMessages)
        console.log(message)
        set({ messages: [...currentMessages, message] });
    }
}))

