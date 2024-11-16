'use-client'
import { useEffect, useState } from 'react'

 

export default function NoteViewer({note}) {

    const [title, setTitle] = useState(note?.title)
    const [content, setContent] = useState(note?.content)
    const [isEdit, SetIsEdit] = useState(false);

    useEffect(() => {
        setTitle(note?.title)
        setContent(note?.content)
        SetIsEdit(false)
    }, [note])

    
    return <div className='w-2/3 p-2 gap-2 flex flex-col absolute top-0 bottom-0 right-0'>
        {
            isEdit ? ( 
            <>
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
            </>

            ) : 
            (
            <>
                        <h1 className='border rounded-md text-xl p-2'
                         > {title}</h1>
                        
                        <p 
                        className='border rounded-md border-gray-300 text-lg p-2 grow'
                        >{content} </p>
            </>
            )
        }

        <div className="w-full flex justify-end gap-2">
        { isEdit ? 
        (<><button className='py-1 px-3 border rounded-full border-green-600 hover:bg-green-200 duration-300 transition-all ease-in-out'> 저장</button>
            <button className='py-1 px-3 border rounded-full border-red-600 hover:bg-green-200 duration-300 transition-all ease-in-out'>삭제</button>
        </>
            )
        :
        <button 
        onClick={() => SetIsEdit(true)}
        className='py-1 px-3 border rounded-full border-green-600 hover:bg-green-200 duration-300 transition-all ease-in-out'>
            수정</button>
        }



        </div>
    </div>
}