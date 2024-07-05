import { useMutation } from '@apollo/client'
import { useState, ChangeEvent } from 'react'
import BoardWriteUI from './BoardWrite.presenter'
import {CREATE_BOARD, UPDATE_BOARD} from './BoardWrite.queries'
import {useRouter} from "next/router";
import React from 'react';
import { IBoardWriteProps, IMyvariables } from './boardWrite.types';



export default function BoardWrite(props: IBoardWriteProps){
    // only logic
    const [createBoard] = useMutation(CREATE_BOARD);
    const [updateBoard] = useMutation(UPDATE_BOARD);
    const [writer, setWriter] = useState("")
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")
    const router = useRouter();

    const onClickSubmit = async () => {

        const result = await createBoard({
            variables : {
                createBoardInput: {
                    writer,
                    password,
                    title,
                    contents,
                }
            }
        })
        console.log(result)
        // After submit, need to be moved the page
        router.push(`/section10/10-02-typescript-boards/${result.data.createBoard._id}`)
    }

    const onClickUpdate = async () => {
        // 변경 내용이 있으면 뮤테이션에 포함해서 날려주고 아니면

        const myVariables: IMyvariables = {
            number: Number(router.query.number)
        }

        if(writer) myVariables.writer = writer
        if(title) myVariables.title = title
        if(contents) myVariables.contents = contents

        console.log("onClickUpdate!!")
        // 수정하기 하자
        const result = await updateBoard({
                variables: myVariables
        })
        // 상세보기 페이지로 이동
        router.push(`/section10/10-02-typescript-boards/${result.data.updateBoard._id}`)

    }

    const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
        setWriter(event.target.value)
    }

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
        setContents(event.target.value)
    }

    return (
    <div>
        <div> 여기는 컨테이너 입니다.</div>        
        <BoardWriteUI 
            onClickUpdate = {onClickUpdate}
            onClickSubmit = {onClickSubmit}
            onChangeWriter ={onChangeWriter}
            onChangePassword = {onChangePassword}
            onChangeTitle = {onChangeTitle}
            onChangeContents = {onChangeContents}
            isEdit = {props.isEdit}
            data = {props.data} //undefiened or data
            />
        <div> 여기는 컨테이너 입니다.</div>
    </div>
    )
}