import { useMutation } from '@apollo/client'
import { useState } from 'react'
import BoardWriteUI from './BoardWrite.presenter'
import {CREATE_BOARD, RESTFUL_CREATE_BOARD, RESTFUL_UPDATE_BOARD, UPDATE_BOARD} from './BoardWrite.queries'
import {useRouter} from "next/router";

export default function BoardWrite(props){
    // only logic
    const router = useRouter();

    const [isActive,setIsActive] = useState(false)

    const [writer, setWriter] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    const [writerError,setWriterError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [titleError, setTitleError] = useState("")
    const [contentsError, setContentsError] = useState("")

    const [createBoard] = useMutation(CREATE_BOARD);
    const [updateBoard] = useMutation(UPDATE_BOARD)

    const onChangeWriter = (event) => {
        setWriter(event.target.value);
        if(event.target.value !==""){
            setWriterError("")
        }

        if(event.target.value && password && contents) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
        if(event.target.value !== ""){
            setPasswordError("")
        }

        if(title && event.target.value && contents) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
        if(event.target.value !== ""){
            setTitleError("");
        }

        if (writer && password && event.target.value && contents) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }

    const onChangeContents = (event) => {
        setContents(event.target.value);
        if(event.target.value !== "") {
            setContentsError("");
        }

        if(event.target.value && password && contents) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }

    const onClickSubmit = async () => {
        if(!writer) {
            setWriterError("작성자를 입력해주세요.");
        }
        if(!password) {
            setPasswordError("비밀번호를 입력해주세요.");
        }
        if(!title){
            setTitleError("제목을 입력해주세요.");
        }
        if(!contents){
            setContentsError("내용을 입력해주세요.");
        }

        if(writer && password && title && contents){
                const boardPostData = {
                    writer,
                    password,
                    title,
                    contents,
                }
                try {
                    const result = await RESTFUL_CREATE_BOARD(boardPostData);
                    alert('Post submitted successfully!'); // 성공 메시지
                    console.log(result);
                    router.push(`/boards/${result.data.id}`)
                } catch (error) {
                    alert(error.message); // 실패 메시지
                }

        }
    }

    const onClickUpdate = async () => {
        if(!title && !contents) alert('수정한 내용이 없습니다.')
        if(!password) alert('비밀번호를 입력해주세요')
        // 변경 내용이 있으면 뮤테이션에 포함해서 날려주고 아니면 없음
        const updateBoardInput = {}
        if(title) updateBoardInput.title = title
        if(contents) updateBoardInput.contents = contents
        if(password) updateBoardInput.password = password

        console.log("onClickUpdate!!")

        try {
            // 수정하기 하자
            try {
                const result = await RESTFUL_UPDATE_BOARD(router.query.boardId, updateBoardInput);
                alert('Post submitted successfully!'); // 성공 메시지
                console.log(result);
                router.push(`/boards/${router.query.boardId}`)
            } catch (error) {
                alert(error.message); // 실패 메시지
            }
        } catch (e) {
            alert(e.message)
        }



    }


    return (
    <div>
        <div> 여기는 컨테이너 입니다.</div>        
        <BoardWriteUI
            //
            writerError={writerError}
            passwordError={passwordError}
            titleError={titleError}
            contentsError={contentsError}
            //
            onClickSubmit = {onClickSubmit}
            isActive = {isActive}
            //
            onClickUpdate = {onClickUpdate}
            onChangeWriter={onChangeWriter}
            onChangePassword = {onChangePassword}
            onChangeTitle = {onChangeTitle}

            onChangeContents = {onChangeContents}
            isEdit = {props.isEdit} // true or false
            data = {props.data} // data or undefiend
            />

    </div>
    )
}