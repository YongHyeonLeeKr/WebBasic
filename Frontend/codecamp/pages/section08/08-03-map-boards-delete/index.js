import {gql, useMutation, useQuery} from '@apollo/client'


const FETCH_BOARDS = gql`
query {
  fetchBoards{
    _id
    writer
    title
    contents
  }
}
`

const DELETE_BOARD = gql`
    mutation deleteBoard($boardId: ID!){
        deleteBoard(boardId: $boardId)
    }
`

export default function StaticRountingMovedPage() {

    const { data } = useQuery(FETCH_BOARDS)
    console.log(data?.fetchBoards)
    const [deleteBoard] = useMutation(DELETE_BOARD)
    const onClickDelete = (e) => {
        deleteBoard({
            variables : { boardId: e.target.id},
            refetchQueries : [ {query : FETCH_BOARDS}]
        })
    }
    const mystyle = {
        margin: "10px",
        padding: "10px"
    }
    return(
        <div>
            {data?.fetchBoards.map((el, idx) =>
                // 특별한 사유가 없으면 <div /> 태그 대신에 프래그먼트를 쓰자. (성능상 유리)
                // 1. 프레그먼트란?  - <></>, <Fragment></Fragment>
                // 2. 프래그먼트에 key일력 방법 <Fragment key={1}></Fragment>
                <div key = {el._id}>
                    <span style={mystyle}> <input type="checkbox"/>  </span>
                    <span style={mystyle}> id:  {el._id}  idx : {idx}</span>
                    <span style={mystyle}> {el.title}  </span>
                    <span style={mystyle}> {el.writer}  </span>
                    <span>
                        <button id={el._id} onClick={onClickDelete}>삭제</button>
                    </span>
                </div>
            )}
        </div>
    )
}