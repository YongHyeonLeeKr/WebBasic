import { gql, useQuery } from '@apollo/client'


const FETCH_BOARD = gql`
    query{
        fetchBoard(number:154) {
            number
            writer
            title
            contents
        }
    }
`

export default function StaticRoutingPager() {
    const { data } = useQuery(FETCH_BOARD)

    return( 
        <div>
            <div> 2번 게시글 페이지 이동이 완료됐습니다. </div>
            <div>  작성자 :  {data && data.fetchBoard.writer}</div>
            <div>  제목 :  {data?.fetchBoard.title}</div>
            <div>  작성자 :  { data  ? data.fetchBoard.contents : "로딩중"}</div>
        </div>
    )
}