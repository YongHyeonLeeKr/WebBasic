
import { gql } from '@apollo/client'
import axios from "axios";

export const CREATE_BOARD =gql`
    mutation createBoard($createBoardInput: CreateBoardInput!){
        createBoard(createBoardInput: $createBoardInput){
         _id
    }
  }
`


export const UPDATE_BOARD =gql`
    mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!){
        updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId){
            _id
            writer
            title
            contents
            createdAt
        }
    }
`

export const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!) {
        fetchBoard(boardId: $boardId) {
            _id
            writer
            title
            contents
            createdAt
    }
}
`

export const RESTFUL_CREATE_BOARD = async (postData) => {
    try {
        const response = await axios.post('http://localhost:6376/boards', postData);
        console.log('Post created:', response);
        return response; // or handle further like redirecting or showing success message
    } catch (error) {
        if (error.response) {
            console.error('Error data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
};

export const RESTFUL_UPDATE_BOARD = async (postId, patchData) => {
    try {
        const response = await axios.patch(`http://localhost:6376/boards/${postId}/edit`, patchData);
        console.log('Post updated:', response);
        return response.data; // 또는 리다이렉션 또는 성공 메시지 처리 등
    } catch (error) {
        if (error.response) {
            console.error('Error data:', error.response.data);
            // 추가적인 오류 처리를 할 수 있습니다. 예를 들어, 상태 코드에 따라 다른 메시지를 보여줄 수 있습니다.
        } else {
            console.error('Error:', error.message);
        }
    }
};

