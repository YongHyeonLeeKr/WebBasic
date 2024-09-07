'use-client'
import { useState } from 'react'

 

export default function NewNote({setIsCreating}) {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const onSave = async () => {
        // supabase에 노트 저장하기
        setIsCreating(false)
    }


    return <div className='w-2/3 p-2 gap-2 flex flex-col absolute top-0 bottom-0 right-0'>
        <input type="text" 
        className='border rounded-md border-gray-300 text-xl p-2'
        placeholder='노트의 제목을 입력하세요.'
        value={title}
        onChange={(e) => setTitle(e.target.value)} />

        <textarea 
        value={content} 
        className='border rounded-md border-gray-300 text-lg p-2 grow'
        onChange={(e) => setContent(e.target.value)}
        
        ></textarea>
        <div className="w-full flex justify-end">

        <button
         onClick={() => onSave()}
         className='py-1 px-3 rounded-full border-2 border-green-600 hover:bg-green-200 duration-300 transition-all ease-in-out'>
        저장</button>
        </div>
    </div>
}