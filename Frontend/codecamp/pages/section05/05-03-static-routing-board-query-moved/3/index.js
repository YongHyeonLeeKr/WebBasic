import { gql, useQuery } from '@apollo/client'


const FETCH_BOARD = gql`
    query{
        fetchBoard(number:56) {
            number
            writer
            title
            contents
        }
    }
`
// data ?? fetch -> data 가 비어있으면 fetch 실행
// data || fetch -> data가 거짓미녀 fetch 실행
// boolean && fetch -> boolean 이 true이면 fetch 실행, 거짓이면  boolean return
export default function StaticRoutingPager() {
    const { data } = useQuery(FETCH_BOARD)

    return( 
        <div>
            <div> 1번 게시글 페이지 이동이 완료됐습니다. </div>
            <div>  작성자 :  {data && data.fetchBoard.writer}</div>
            <div>  제목 :  {data?.fetchBoard.title}</div>
            <div>  작성자 :  { data  ? data.fetchBoard.contents : "로딩중"}</div>
        </div>
    )
}