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
