import { Image, Send, X } from 'lucide-react'
import React, { useState } from 'react'
import { useMessage } from '../store/useMessageStore'

function MessageInput() {
    const [showImage, setShowImage] = useState({
        filename: "",
        bytes: ""
    })
    const [text, setText] = useState("")
    const { setMessagesWithSelectedUser } = useMessage()

    const handleImage = async (e) => {
        const file = e.target.files[0]
        if (!file) return;
        setShowImage({ filename: URL.createObjectURL(file), bytes: file });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text && !showImage.filename) return;

        if (showImage.filename) {
            const formdata = new FormData();
            formdata.append("text", text);
            formdata.append("image", showImage.bytes)
            await setMessagesWithSelectedUser(formdata,"image")
        }
        else{
            const formdata={text:text}
            await setMessagesWithSelectedUser(formdata,"text")
        }
        

       
        setShowImage("")
        setText("")
    }
    return (
        <div className='h-12 w-full mt-3 relative'>
            <div className={`absolute top-[-65px]  ${showImage.filename ? "" : "hidden"}`}>
                <img src={showImage.filename} className={`w-17 h-15 object-contain`} />
                <X className='absolute top-[-10px] left-15 size-4 ' onClick={() => setShowImage({ filename: "", bytes: "" })} />
            </div>
            <form className='h-full w-full flex gap-2 relative' onSubmit={handleSubmit}>
                <input
                    type='text'
                    className='w-[calc(100%-62px)] border-0 border-b-2 h-full  outline-0 bg-base-300 pl-4 pr-12 focus:border-blue-400 rounded-sm '
                    placeholder='Message...'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <label for="picfile" >
                    <Image className={`absolute right-17 top-3  ${showImage.filename ? "text-cyan-400" : ""}`} />
                </label>
                <input type="file" id="picfile" className='hidden'
                    onChange={handleImage} />

                <button
                    className='flex-1 bg-base-300 rounded-full relative'

                    type="submit"
                >
                    <Send className='absolute top-3 left-2.5 active:text-cyan-300' />
                </button>
            </form>
        </div>
    )
}

export default MessageInput