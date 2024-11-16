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
    const [inputs, setInputs] = useState({
        writer: "",
        title: "",
        contents: "",
    })
    const [나의함수] = useMutation(CREATE_BOARD)
    const onClickSubmit = async () => {

        
        const result = await 나의함수({
            variables : { // variables === $ 의 역할을 함 
                ...inputs
            }
        })
        console.log(result)
    }

    const onChangeInputs = (event) => {
        setInputs({
            ...inputs,
            [event.target.id]: event.target.value,
         })
    }

    return (
        <div>
            작성자: <input type="text" id='writer' onChange={onChangeInputs}/>
            제목: <input type="text" id='title'onChange={onChangeInputs}/>
            내용: <input type="text" id='contents'onChange={onChangeInputs}/>
            <button onClick={onClickSubmit}> GraphQL 요청하기 </button>
        </div>
        )   
}