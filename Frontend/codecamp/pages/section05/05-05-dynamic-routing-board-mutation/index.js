import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'


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

    const router = useRouter()

    const [나의함수] = useMutation(CREATE_BOARD)

    const onClickSubmit = async () => {

        try {
            
            const result = await 나의함수({
                variables : { // variables === $ 
                    writer: "Noah",
                    title: "Hi",
                    contents: "Hello!"
                }
            })
            console.log(result.data.createBoard.number)
            router.push(`/section05/05-05-dynamic-routing-board-mutation-moved/${result.data.createBoard.number}`)
        } catch (error) {
            alert(error.message)   
        }
    }

    return <button onClick={onClickSubmit}> GraphQL 요청하기 </button>
}