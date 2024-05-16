import React from 'react';
import BoardWrite from "../../../../../src/components/units/board/10-write/BoardWrite.container";
import {FETCH_BOARD} from "../../../../../src/components/units/board/10-write/BoardWrite.queries";
import {useQuery} from "@apollo/client";
import {useRouter} from 'next/router'



export default function GraphqlMutationPage(){

    const router = useRouter()
    const { data } = useQuery(FETCH_BOARD, {
        variables: {boardId: router.query.boardId},
    })


    return (
        <div>
            <BoardWrite
                isEdit = {true}
                data = {data}
            />
        </div>
    )
}