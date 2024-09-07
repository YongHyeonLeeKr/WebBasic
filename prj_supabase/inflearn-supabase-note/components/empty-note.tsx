'use-client'
import { useState } from 'react'

 

export default function EmptyNote() {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    
    return <div className='w-2/3 p-2 gap-2 flex flex-col absolute top-0 bottom-0 right-0'>
        새로운 노트를 만들어주세요!
    </div>
}