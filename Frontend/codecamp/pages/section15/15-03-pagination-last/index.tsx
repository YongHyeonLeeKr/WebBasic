import { gql, useQuery } from '@apollo/client'
import { IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from '../../../src/commons/types/generated/types'
import { useState } from 'react'


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

const FETCH_BOARDS_COUNT = gql `
    query  { ferchBoardsCount }
`

export default function StaticRountingMovedPage():JSX.Element {
    const [startPage, setStartPage] = useState(1);
    const { data, refetch } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS)
    console.log(data)
    console.log(data?.fetchBoards)

    const { data: dataBoardsCount} = useQuery<
    Pick<IQuery, 'fetchBoardsCount'>,
    IQueryFetchBoardsCountArgs>(FETCH_BOARDS_COUNT)

    const lastPage = Math.ceil(dataBoardsCount?.fetchBoardsCount ?? 10 / 10)

    const mystyle = {
        margin: "10px",
        padding: "10px"
    }

    const onClickPage = (event:React.MouseEvent<HTMLSpanElement>): void => {
        void refetch({ page: Number(event.currentTarget.id) })
    }
    
    const onClickPrevPage = (): void => {
        if(startPage === 1) return;
        setStartPage(startPage - 10)
        refetch({page: startPage - 10})

    }

    const onClickNextPage = (): void => {
        if(startPage + 10 > lastPage) return;
        setStartPage(startPage + 10)
        refetch({page: startPage + 10})
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
        <span onClick={onClickPrevPage}>이전페이지</span>
        {new Array(10).fill(1).map((_, idx)=> (
            idx + startPage <= lastPage && (
                <span key={idx + startPage} id={String(idx + startPage)} onClick={onClickPage} style={{ margin: '5px'}}>{idx + startPage}  </span>
            )
        ))}
        <span onClick={onClickNextPage}>다음페이지</span>
        </>

    )
}