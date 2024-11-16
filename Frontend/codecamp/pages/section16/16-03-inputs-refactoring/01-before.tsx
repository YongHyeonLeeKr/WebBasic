import { useMutation, gql } from '@apollo/client'
import { useState } from 'react'


const CREATE_BOARD =gql`
    mutation createBoard($writer: String, $title: String, $contents: String){
        createBoard(writer: $writer, title: $title, contents: $contents){
            _id 
            number 
            message
        }
    }
`

export default function GraphqlMutationPage() {
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
            작성자: <input type="text" onChange={onChangeWriter}/>
            제목: <input type="text" onChange={onChangeTitle}/>
            내용: <input type="text" onChange={onChangeContents}/>
            <button onClick={onClickSubmit}> GraphQL 요청하기 </button>
        </div>
        )   
}