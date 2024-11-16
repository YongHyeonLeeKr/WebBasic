import { gql, useQuery } from '@apollo/client'
import { IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/types'


const FETCH_BOARDS = gql`
query fetchBoards($page: Int){
  fetchBoards(page: $page){
    _id
    writer
    title
    contents
  }
}
`

export default function StaticRountingMovedPage():JSX.Element {
    const { data, refetch } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS)
    console.log(data)
    console.log(data?.fetchBoards)

    const mystyle = {
        margin: "10px",
        padding: "10px"
    }

    const onClickPage = (event:React.MouseEvent<HTMLSpanElement>): void => {
        void refetch({ page: Number(event.currentTarget.id) })

    }
    return( 
        <>
        <div>
            {data?.fetchBoards.map((el) => ( 
                <div key={el._id}>
                    <span style={mystyle}> {el.title}  </span>
                    <span style={mystyle}> {el.writer}  </span>
                </div>
            ))}
        </div>
        {new Array(10).fill(1).map((_, idx)=> (
            <span key={idx + 1} id={String(idx + 1)} onClick={onClickPage}>{idx + 1} </span>
        ))}
        </>
    )
}