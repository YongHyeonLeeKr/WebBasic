import {useRouter} from "next/router";
import {useQuery} from "@apollo/client";
import BoardDetailUI from "./boardDetail.presenter";
import {FETCH_BOARD} from "./boardsDetail.queries";


export default function BoardDetail() {
    const router = useRouter()
    const { data } = useQuery(FETCH_BOARD, {
        variables: { boardId: router.query.boardId},
    })
    console.log( data);

    return <BoardDetailUI data={data} />
}