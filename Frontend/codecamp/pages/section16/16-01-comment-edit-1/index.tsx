import { gql, useQuery } from '@apollo/client'
import { IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/types'
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

export default function StaticRountingMovedPage():JSX.Element {
    const { data, refetch } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS)
    console.log(data)
    console.log(data?.fetchBoards)

    const [selectedIndex, setSelectedIndex] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,

        
    ]);

    const mystyle = {
        margin: "10px",
        padding: "10px"
    }

    const onClickEdit = (event:React.MouseEvent<HTMLButtonElement> ): void => {
        // 원본을 건드리지 말고 복사해서 안전하게 써야함 --> 그럴 때 쓰는 것이 스프레드 연산자. 
        const seletedIndexes = [...selectedIndex];
        seletedIndexes[Number(event.currentTarget.id)] = true; 

        setSelectedIndex(seletedIndexes)
    }

    const onClickPage = (event:React.MouseEvent<HTMLSpanElement>): void => {
        void refetch({ page: Number(event.currentTarget.id) })

    }
    return( 
        <>
        <div>
            {data?.fetchBoards.map((el, index) => !selectedIndex[index] ? ( 
                <div key={el._id}>
                    <span style={mystyle}> {el.title}  </span>
                    <span style={mystyle}> {el.writer}  </span>
                    <button id={String(index)} onClick={onClickEdit}>수정하기</button>
                </div>
            ): (
                <input type="text" key={el._id} />
            ))}
        </div>
        {new Array(10).fill(1).map((_, idx)=> (
            <span key={idx + 1} id={String(idx + 1)} onClick={onClickPage}>{idx + 1} </span>
        ))}
        </>
    )
}