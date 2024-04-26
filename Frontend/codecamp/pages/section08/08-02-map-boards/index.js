import { gql, useQuery } from '@apollo/client'


const FETCH_BOARDS = gql`
query {
  fetchBoards{
    writer
    title
    contents
  }
}
`

export default function StaticRountingMovedPage() {



    const { data } = useQuery(FETCH_BOARDS)
    console.log(data)
    console.log(data?.fetchBoards)

    const mystyle = {
        margin: "10px",
        padding: "10px"
    }
    return( 
        <div>
            {data?.fetchBoards.map(el => 
                <div>      
                    <span style={mystyle}> <input type="checkbox"/>  </span>
                    <span style={mystyle}> {el.title}  </span>
                    <span style={mystyle}> {el.writer}  </span>
                </div>
                 )}
{/*             <div>  {router.query.address}번 게시글 페이지 이동이 완료됐습니다. </div>
            <div>  작성자 :  {data?.fetchBoard?.writer}</div>
            <div>  제목 :  {data?.fetchBoard?.title}</div>
            <div>  작성자 :  {data?.fetchBoard?.contents}</div> */}
        </div>
    )
}