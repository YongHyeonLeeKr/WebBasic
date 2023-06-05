import { useMutation, gql } from '@apollo/client'


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

    const onClickSubmit = async () => {
        const result = await 나의함수({
            variables : { // variables === $ 
                writer: "Noah",
                title: "Hi",
                contents: "Hello!"
            }
        })
        console.log(result)
    }

    return <button onClick={onClickSubmit}> GraphQL 요청하기 </button>
}