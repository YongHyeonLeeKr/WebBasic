import { gql} from "@apollo/client";
import axios from 'axios';


export const FETCH_BOARDS = gql`
query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      createdAt
    }
  }
`


// REST API를 사용하여 게시판 목록을 가져오는 함수
export const RESTFUL_FETCH_BOARDS = async () => {
    try {
        const response = await axios.get('http://localhost:6376/boards');
        return response; // 서버 응답에서 데이터 부분만 반환
    } catch (error) {
        console.error("Failed to fetch boards:", error);
        throw error; // 에러 처리는 이 함수를 사용하는 쪽에서 진행
    }
}