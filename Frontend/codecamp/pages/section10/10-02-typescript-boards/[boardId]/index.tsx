import {gql, useQuery} from '@apollo/client'
import { useRouter } from 'next/router'
import {FETCH_BOARD} from "../../../../src/components/units/board/10-write/BoardWrite.queries";
import React from 'react';




export default function GraphqlMutationPage() {

    const router = useRouter()
    const { data } = useQuery(FETCH_BOARD, {
        variables: {boardId: router.query.boardId},
    })

    console.log(data);

    const onClickMove = () => {
        router.push(`/section10/10-02-typescript-boards/${router.query.boardId}/edit`)
    }

    return(
        <div>
            <div>  {router.query.boardId}번 게시글 페이지 이동이 완료됐습니다. </div>
            <div>  작성자 :  {data?.fetchBoard?.writer}</div>
            <div>  제목 :  {data?.fetchBoard?.title}</div>
            <div>  작성자 :  {data?.fetchBoard?.contents}</div>
            <button onClick={onClickMove}> 수정하러가기</button>
        </div>
    )
}