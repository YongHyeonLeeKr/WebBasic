import { useMutation } from '@apollo/client'
import { useState } from 'react'
import BoardWriteUI from './BoardWrite.presenter'
import {CREATE_BOARD } from './BoardWrite.queries'

export default function BoardWrite(){
    // only logic
    const [나의함수] = useMutation(CREATE_BOARD)
    const [writer, setWriter] = useState()
    const [title, setTitle] = useState()
    const [contents, setContents] = useState()

    const onClickSubmit = async () => {

        
        const result = await 나의함수({
            variables : { // variables === $ 의 역할을 함 
                writer: writer,
                title: title,
                contents: contents
            }
        })
        console.log(result)
    }

    const onChangeWriter = (event) => {
        setWriter(event.target.value)
    }
    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }
    const onChangeContents = (event) => {
        setContents(event.target.value)
    }

    return (
    <div>
        <div> 여기는 컨테이너 입니다.</div>        
        <BoardWriteUI 
            onclickSubmit = {onClickSubmit} 
            onChangeWriter={onChangeWriter} 
            onChangeTitle = {onChangeTitle}
            onChangeContents = {onChangeContents}
            />

    </div>
    )
}