import BoardListUI from "./BoardList.presenter";
import {useQuery} from "@apollo/client";
import {FETCH_BOARDS} from "./BoardList.queries";
import {useRouter} from "next/router";

export default function BoardList() {

    const router = useRouter()
    const { data } = useQuery(FETCH_BOARDS);

    const onClickMoveToBoardNew = () => {
        router.push("/boards/new")
    }

    const onClickMoveToBoardDetail = (e) => {
        router.push(`/boards/${e.target.id}`)
    }

    return (
        <BoardListUI
        data = {data}
        onClickMoveToBoardNew = {onClickMoveToBoardNew}
        onClickMoveToBoardDetail = {onClickMoveToBoardDetail}
        />
    )

}
