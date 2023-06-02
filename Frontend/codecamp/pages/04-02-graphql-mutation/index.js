import { useMutation, gql } from '@apollo/client'


const CREATE_BOARD =gql`
    mutation{
        createBoard(writer: "노아", title: "안녕하세요", contents: "반갑습니다"){
            _id 
            number 
            message
        }
    }
`

export default function GraphqlMutationPage() {
    const [CB] = useMutation(CREATE_BOARD)

    const onClickSubmit = async () => {
        const result = await CB()
        console.log(result)
    }

    return <button onClick={onClickSubmit}> GraphQL 요청하기 </button>
}