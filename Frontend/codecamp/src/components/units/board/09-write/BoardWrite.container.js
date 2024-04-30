import { useMutation } from '@apollo/client'
import { useState } from 'react'
import BoardWriteUI from './BoardWrite.presenter'
import {CREATE_BOARD, UPDATE_BOARD} from './BoardWrite.queries'
import {useRouter} from "next/router";

export default function BoardWrite(props){
    // only logic
    const [createBoard] = useMutation(CREATE_BOARD);
    const [updateBoard] = useMutation(UPDATE_BOARD);
    const [writer, setWriter] = useState()
    const [password, setPassword] = useState();
    const [title, setTitle] = useState()
    const [contents, setContents] = useState()
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
        router.push(`/section09/09-03-boards/${result.data.createBoard._id}`)
    }

    const onClickUpdate = async () => {
        console.log("onClickUpdate!!")
        // 수정하기 하자
        const result = await updateBoard({
                variables: {
                    updateBoardInput: {
                        title,
                        contents,
                    },
                    password,
                    boardId: router.query.boardId
                }
        })
        // 상세보기 페이지로 이동
        router.push(`/section09/09-03-boards/${result.data.updateBoard._id}`)

    }

    const onChangeWriter = (event) => {
        setWriter(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
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
            onClickSubmit = {onClickSubmit}
            onClickUpdate = {onClickUpdate}
            onChangeWriter={onChangeWriter}
            onChangePassword = {onChangePassword}
            onChangeTitle = {onChangeTitle}
            onChangeContents = {onChangeContents}
            isEdit = {props.isEdit}
            />
        <div> 여기는 컨테이너 입니다.</div>
    </div>
    )
}