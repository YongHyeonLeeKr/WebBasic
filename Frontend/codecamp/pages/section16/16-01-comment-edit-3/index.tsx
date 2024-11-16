import { gql, useQuery } from '@apollo/client'
import { IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/types'
import { useState } from 'react'
import CommnetItem from '../../../src/components/units/16-commnet-item'


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
// component로 분리하기
export default function StaticRountingMovedPage():JSX.Element {
    const { data, refetch } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS)

    const onClickPage = (event:React.MouseEvent<HTMLSpanElement>): void => {
        void refetch({ page: Number(event.currentTarget.id) })

    }
    return( 
        <>
        <div>
            {data?.fetchBoards.map((el) => (
                <CommnetItem key={el._id} el={el} />
            ))}
        </div>
        {new Array(10).fill(1).map((_, idx)=> (
            <span key={idx + 1} id={String(idx + 1)} onClick={onClickPage}>{idx + 1} </span>
        ))}
        </>
    )
}